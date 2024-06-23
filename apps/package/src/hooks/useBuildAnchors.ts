import { type Anchor } from '@/types'

export default function useBuildAnchors(docStr: string): Anchor[] {
  const doc = document.createElement('div')
  doc.insertAdjacentHTML('beforeend', docStr)

  const anchorsElements = doc.querySelectorAll('h2, h3')

  const anchors = Array.from(anchorsElements).map(el => {
    const space: Record<string, number> = {
      h2: 0,
      h3: 1
    }
    return {
      space: space[el.localName],
      title: el.innerHTML,
      url: el.id
    } satisfies Anchor
  })

  return anchors
}
