const rulesMatches = {
  ul: /^-\s/,
  ol: /^\d+\.\s/,
  blockquote: /^>\s/,
  tasklist: /^-\s\[([\sx])\]\s/,
  image: /^!\[([\w\s()!@:%_\+.~#?&\/=-]+)\]\(([\w()!@:%_\+.~#?&\/=-]+)\)/,
  code: /^```([\w\W]+)/,
  table: /^\|([\w\s<>"()!@:%_\+.~#?&\/=-]+)\|/
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
    const result: string[] = []
    let text = md[i]
    let match = text.match(tableRegex)
    while ((match = text.match(tableRegex)) !== null) {
      result.push(match[1].trim())
      text = text.replace('|', '').replace(match[1], '')
    }
    return result
  }
  const tableHeader: string[] = cellsContent(index)
  index += 1 // Skip header line
  const align: Array<string | undefined> = (() => {
    const result: typeof align = []
    const alignRegex = /\|(\s+:?-+:?\s+)\|/
    let text = md[index]
    let match = text.match(alignRegex)
    if (!match) return result
    while ((match = text.match(alignRegex)) !== null) {
      const aligns = {
        left: text.match(/^\|\s+:-+\s+\|/),
        right: text.match(/^\|\s+-+:\s+\|/),
        center: text.match(/^\|\s+:-+:\s+\|/)
      }
      const indexAligns = Object.values(aligns).findIndex(v => {
        console.log(v)
        return v
      })
      if (indexAligns === -1) {
        console.log('none')
        result.push(undefined)
      } else {
        console.log(Object.keys(aligns)[indexAligns])
        result.push(Object.keys(aligns)[indexAligns])
      }
      text = text.replace('|', '').replace(match[1], '')
    }

    console.log(result)
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

const linkRefs = (str: string) => {
  const refs: Record<string, string> = {}
  const reg = /^\[([\w\s()!@:%_\+.~#?&\/=-]+)\]:\s([\w()!@:%_\+.~#?&\/=-]+)$/gm
  let match = reg.exec(str)
  while (match) {
    refs[match[1]] = match[2]
    str = str.replace(match[0], '')
    match = reg.exec(str)
  }
  return [str, refs] as [string, typeof refs]
}

const formatLink = (props: { md: string[]; startIndex: number; refs: Record<string, string> }) => {
  const { md, startIndex, refs } = props
  let text = md[startIndex]
  const linkRegex = /\[([\w\s()<>()!@:%_\+.~#?&\/=-]+)\]\[([\w()!@:%_\+.~#?&\/=-]+)\]/g
  let match = linkRegex.exec(text)
  while (match) {
    const [remplace, anchorContent, keyRef] = match
    console.log(anchorContent, keyRef)
    text = text.replace(remplace, `<a href="${refs[keyRef] ?? '#'}">${anchorContent}</a>`)
    console.log(text)
    match = linkRegex.exec(text)
  }
  return text
}

export default async function useParseMd(str: string) {
  endBlock = -1
  const [s, refs] = linkRefs(str)
  const md = s.split('\n')
  const result: string[] = []
  for (let i = 0; i < md.length; i++) {
    if (endBlock >= i) continue
    let line = md[i]

    if (line.length === 0) continue

    line = formatLink({
      md,
      startIndex: i,
      refs
    })

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
    if (line.match(rulesMatches.image)) {
      const text = formatBlock({
        md,
        startIndex: i,
        match: rulesMatches.image,
        remplaceWith: [[rulesMatches.image, '<img src="$2" alt="$1">']],
        contentExternal: ' <contentReplaced>'
      })
      result.push(text)
      continue
    }
    if (line.startsWith('---')) {
      result.push(`<hr>`)
      continue
    }

    // Style in line
    const regInline: Record<string, [RegExp, string]> = {
      code: [/`([\w\W]+?[^`])`/, `<code>$1</code>`],
      strong: [/[\*]{2}(([\w\W]+?[^*]))[\*]{2}/, '<strong>$1</strong>'],
      italic: [/\*(([\w\W]+?[^*]))\*/, '<em>$1</em>'],
      image: [/\!\[([\w\s()!@:%_\+.~#?&\/=-]+)\]\(([\w()!@:%_\+.~#?&\/=-]+)\)/, '<img src="$2" alt="$1">'],
      anchor: [/\[([\w\s<>"()!@:%_\+.~#?&\/=-]+)\]\(([\w()!@:%_\+.~#?&\/=-]+)\)/, '<a href="$2">$1</a>']
    }
    Object.values(regInline).forEach(([reg, replace]) => {
      while (line.match(reg)?.length ?? 0 > 0) {
        line = line.replace(reg, replace)
      }
    })

    result.push(' ' + line)
  }

  return result.map(line => (line.startsWith('<') && line.endsWith('>') ? line : `<p>${line}</p>`)).join('')
}
