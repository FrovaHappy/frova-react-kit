const rulesMatches = {
  ul: /^-\s/,
  ol: /^\d+\.\s/,
  blockquote: /^>\s/,
  tasklist: /^-\s\[([\sx])\]\s/,
  image: /^!\[([\w\s()!@:%_\+.~#?&\/=-]+)\]\(([\w()!@:%_\+.~#?&\/=-]+)\)/,
  code: /^```([\w\W]+)/,
  table: /^\|([\w\d\s<>"()!@:%_\+.~#?&\/=-]+)\|/
}

let endBlock = -1

type FormatBlock = {
  md: string[]
  startIndex: number
  match: RegExp
  remplaceWith: [RegExp, `${string}<contentReplaced>${string}` | string][]
  contentExternal: string
}

const formatBlock = (props: FormatBlock) => {
  const { remplaceWith, contentExternal, startIndex, md, match } = props
  let textResult = ''
  for (let j = startIndex; j < md.length; j++) {
    endBlock = j
    const text = md[j]
    if (text.match(match)) {
      for (const [startWith, textToReplace] of remplaceWith) {
        if (!text.match(startWith)) continue
        if (textToReplace.includes('<contentReplaced>')) {
          textResult += textToReplace.replace('<contentReplaced>', text.replace(startWith, ''))
        } else {
          textResult += text.replace(startWith, textToReplace)
        }
      }
    } else {
      break
    }
  }
  textResult = contentExternal.replace('<contentReplaced>', textResult)
  return textResult
}

const formatCode = (props: FormatBlock) => {
  const { remplaceWith, contentExternal, startIndex, md, match } = props
  const [[startWith, replace]] = remplaceWith
  let textResult = md[startIndex].replace(startWith, replace)

  let index = startIndex + 1
  while (!md[index]?.match(match) && index < md.length) {
    const text = md[index]
    textResult += text + '\n'
    index++
  }
  endBlock = index
  textResult += contentExternal
  return textResult
}
type FormatTable = {
  md: string[]
  startIndex: number
}
const formatTable = (props: FormatTable) => {
  const { md, startIndex } = props
  let index = startIndex
  const tableRegex = rulesMatches.table
  const cellsContent = (i: number) => {
    let text = md[i]
    let result: string[] = text
      .split('|')
      .map(v => v.trim() ?? undefined)
      .filter(v => v)
    return result
  }
  const tableHeader: string[] = cellsContent(index)
  index += 1 // Skip header line
  const align: Array<string | undefined> = (() => {
    const alignRegex = /\|(\s+:?-+:?\s+)\|/
    let text = md[index]

    if (!alignRegex.test(text)) return []

    const result: typeof align = text
      .split('|')
      .map(v => v ?? undefined)
      .filter(v => v)
      .map(v => {
        const aligns = {
          left: /\s+:-+\s+/,
          right: /\s+-+:\s+/,
          center: /\s+:-+:\s+/
        }
        if (aligns.left.test(v)) return 'left'
        if (aligns.right.test(v)) return 'right'
        if (aligns.center.test(v)) return 'center'
        return undefined
      })
    return result
  })()
  index += 1 // skip align line

  const tableBody: string[][] = []
  for (let i = index; i < md.length; i++) {
    if (!md[i].match(tableRegex)) break
    tableBody.push(cellsContent(i))
    index++
  }
  endBlock = index
  const tableHeaderHtml = tableHeader
    .map((header, i) => `<th${align[i] ? ` align="${align[i]}"` : ''}>${header}</th>`)
    .join('')
  const tableBodyHtml = tableBody
    .map(
      row => `<tr>${row.map((cell, i) => `<td${align[i] ? ` align="${align[i]}"` : ''}>${cell}</td>`).join('')}</tr>`
    )
    .join('')
  return `<table><thead><tr>${tableHeaderHtml}</tr></thead><tbody>${tableBodyHtml}</tbody></table>`
}

const formatLinkWithRefs = (props: { md: string[] }) => {
  const { md } = props
  const recordLinksReferences = () => {
    const references: Record<string, string> = {}
    let str = md.join('\n')
    const reg = /^\[([\w\s()!@:%_\+.~#?&\/=-]+)\]:\s([\w()!@:%_\+.~#?&\/=-]+)$/gm
    let match = reg.exec(str)
    while (match) {
      references[match[1]] = match[2]
      str = str.replace(match[0], '')
      match = reg.exec(str)
    }
    return [str, references] as [string, typeof references]
  }

  const remplaceLinkInLineWithRefs = (line: string) => {
    let text = line
    const linkRegex = /\[([\w\s()<>()!@:%_\+.~#?&\/=-]+)\]\[([\w()!@:%_\+.~#?&\/=-]+)\]/g
    let match = linkRegex.exec(text)
    if (!match) return text
    do {
      const [remplace, anchorContent, keyRef] = match
      text = text.replace(remplace, `<a href="${refs[keyRef] ?? '#'}">${anchorContent}</a>`)
      match = linkRegex.exec(text)
    } while (match)
    return text
  }

  const [s, refs] = recordLinksReferences()

  return s.split('\n').map(line => remplaceLinkInLineWithRefs(line))
}

function formatInline(str: string) {
  let line = str
  const regInline: Record<string, [RegExp, string]> = {
    code: [/`([\w\W]+?[^`])`/, `<code>$1</code>`],
    strong: [/[\*]{2}(([\w\W]+?[^*]))[\*]{2}/, '<strong>$1</strong>'],
    italic: [/\*(([\w\W]+?[^*]))\*/, '<em>$1</em>'],
    image: [/\!\[([\w\s()!@:%_\+.~#?&\/=-]+)\]\(([\w()!@:%_\+.~#?&\/=-]+)\)/, '<img src="$2" alt="$1">'],
    anchor: [/\[([\w\s<>"()!@:%_\+.~#?&\/=-]+)\]\(([\w()!@:%_\+.~#?&\/=-]+)\)/, '<a href="$2">$1</a>']
  }
  Object.values(regInline).forEach(([reg, replace]) => {
    if (!line.match(reg)) return

    while (line.match(reg)?.length ?? 0 > 0) {
      line = line.replace(reg, replace)
    }
  })
  return line
}

export default async function useParseMd(str: string) {
  endBlock = -1

  let md = str.split('\n')
  md = formatLinkWithRefs({ md })

  const result: string[] = []

  md = md.map(line => {
    line = formatInline(line)
    line = line.startsWith('<') ? ` ${line}` : line
    return line
  })

  for (let i = 0; i < md.length; i++) {
    if (endBlock >= i) continue
    let line = md[i]

    if (line.length === 0) continue

    if (line.match(rulesMatches.table)) {
      const text = formatTable({
        md,
        startIndex: i
      })
      result.push(text)
      continue
    }
    if (line.startsWith('#')) {
      const count = line.split('#').length - 1
      const text = line.replace(/^#+\s*/, '')
      result.push(`<h${count} id="${text.replaceAll(' ', '-')}">${text}</h${count}>`)
      continue
    }
    if (line.match(/^ <img/)) {
      const text = formatBlock({
        md,
        startIndex: i,
        match: /^ <img/,
        remplaceWith: [[/^\s([\w\W]+)/, '$1']],
        contentExternal: '<p><contentReplaced></p>'
      })
      result.push(text)
      continue
    }

    if (line.match(rulesMatches.code)) {
      const text = formatCode({
        md,
        startIndex: i,
        match: /```/,
        remplaceWith: [[rulesMatches.code, '<pre><code class="language-$1">']],
        contentExternal: '</code></pre>'
      })
      result.push(text)
      continue
    }
    if (line.match(rulesMatches.blockquote)) {
      const text = formatBlock({
        md,
        startIndex: i,
        match: rulesMatches.blockquote,
        remplaceWith: [[rulesMatches.blockquote, '<p><contentReplaced></p>']],
        contentExternal: '<blockquote><contentReplaced></blockquote>'
      })
      result.push(text)
      continue
    }
    if (line.match(rulesMatches.tasklist)) {
      const text = formatBlock({
        md,
        startIndex: i,
        match: rulesMatches.tasklist,
        remplaceWith: [
          [/-\s\[\s\]\s/, '<li><input type="checkbox" disabled><contentReplaced></li>'],
          [/-\s\[x\]\s/, '<li><input type="checkbox" checked disabled><contentReplaced></li>']
        ],
        contentExternal: '<ul><contentReplaced></ul>'
      })
      result.push(text)
      continue
    }
    if (line.match(rulesMatches.ul)) {
      const text = formatBlock({
        md,
        startIndex: i,
        match: rulesMatches.ul,
        remplaceWith: [[rulesMatches.ul, '<li><contentReplaced></li>']],
        contentExternal: '<ul><contentReplaced></ul>'
      })
      result.push(text)
      continue
    }
    if (line.match(rulesMatches.ol)) {
      const text = formatBlock({
        md,
        startIndex: i,
        match: rulesMatches.ol,
        remplaceWith: [[rulesMatches.ol, '<li><contentReplaced></li>']],
        contentExternal: '<ol><contentReplaced></ol>'
      })
      result.push(text)
      continue
    }
    if (line.startsWith('---')) {
      result.push(`<hr>`)
      continue
    }
    result.push(line)
  }

  result.forEach(line => {
    if (line.startsWith(' <img')) {
    }
  })

  return result.map(line => (line.startsWith('<') && line.endsWith('>') ? line : `<p>${line}</p>`)).join('')
}
