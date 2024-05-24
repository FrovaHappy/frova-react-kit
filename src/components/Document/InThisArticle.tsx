import type { Anchor } from '@/types'

interface InThisArticleProps {
  items: Anchor[]
}
function InThisArticle(props: InThisArticleProps) {
  const { items } = props
  const spaces: Record<number, string> = {
    0: 'space',
    1: 'space__1',
    2: 'space__2',
    3: 'space__3'
  }
  return (
    <ul>
      {items.map(item => {
        const hasSpace = spaces[item.space] ?? spaces[0]
        return (
          <a key={item.title} href={`#${item.url}`} className={hasSpace}>
            {item.title}
          </a>
        )
      })}
    </ul>
  )
}

export default InThisArticle
