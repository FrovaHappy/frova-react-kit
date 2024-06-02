import type { Article, Section } from '@/types'

import style from '@styles/DocumentMarkdown/Nav.module.scss'
export interface NavProps {
  articles: Article[]
  section: Section
  setSection: (article: Section) => void
}
interface NavItemProps extends Omit<NavProps, 'articles'> {
  sectionActive: Section
}
function NavItem(props: NavItemProps) {
  const { section, setSection, sectionActive } = props
  const isActive = section.hashtag === sectionActive.hashtag ? style.active : ''
  const spaces: Record<number, string> = {
    1: style.space__1,
    2: style.space__2
  }
  const isSpace = spaces[sectionActive.space] ?? ''
  return (
    <li className={isSpace}>
      <button className={isActive} onClick={() => setSection(sectionActive)}>
        {sectionActive.title}
      </button>
    </li>
  )
}

function Nav(props: NavProps) {
  const { articles, section, setSection } = props
  return (
    <nav className={style.nav}>
      {articles.map(article => (
        <ul key={article.title}>
          <x-title>{article.title}</x-title>
          {article.sections.map(sectionActive => (
            <NavItem
              section={section}
              sectionActive={sectionActive}
              setSection={setSection}
              key={sectionActive.title}
            />
          ))}
        </ul>
      ))}
    </nav>
  )
}

export default Nav
