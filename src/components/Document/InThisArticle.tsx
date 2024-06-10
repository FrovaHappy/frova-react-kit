import type { Anchor } from '@/types'
import style from '@styles/DocumentMarkdown/shared.module.scss'

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
    <aside className={style.aside}>
      <x-title>In this article</x-title>
      <ul>
        {items.map(item => {
          const hasSpace = spaces[item.space]
          return (
            <li key={item.url}>
              <a href={`#${item.url}`} className={hasSpace}>
                {item.title}
              </a>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

export default InThisArticle
