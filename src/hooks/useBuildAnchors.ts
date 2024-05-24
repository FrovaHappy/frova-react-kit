import { Anchor } from '@/types'

export default function useBuildAnchors(docStr: string): Anchor[] {
  const doc = document.createElement('div')
  doc.insertAdjacentHTML('beforeend', docStr)

  const anchorsElements = doc.querySelectorAll('h1, h2, h3')

  const anchors = Array.from(anchorsElements).map(el => {
    const space: Record<string, number> = {
      h1: 0,
      h2: 1,
      h3: 2
    }
    return {
      space: space[el.localName],
      title: el.innerHTML,
      url: el.id
    } satisfies Anchor
  })

  return anchors
}
