import type { Anchor } from '@/types'
import style from '@styles/DocumentMarkdown/InThisArticle.module.scss'

interface InThisArticleProps {
  items: Anchor[]
}
function InThisArticle(props: InThisArticleProps) {
  const { items } = props
  const spaces: Record<number, string> = {
    0: style.space,
    1: style.space__1
  }
  return (
    <ul className={style.inThisArticle}>
      <x-title>In this article</x-title>
      {items.map(item => {
        const hasSpace = spaces[item.space]
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
