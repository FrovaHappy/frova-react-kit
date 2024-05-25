import type { Article, Section } from '@/types'

import style from '@styles/Nav.module.scss'
interface Props {
  articles: Article[]
  section: Section
  setSection: (article: Section) => void
}
interface NavItemProps extends Omit<Props, 'articles'> {
  sectionActive: Section
}
function NavItem(props: NavItemProps) {
  const { section, setSection, sectionActive } = props
  const isActive = section.hashtag === sectionActive.hashtag ? 'active' : ''
  return (
    <li>
      <button className={isActive} onClick={() => setSection(sectionActive)}>
        {sectionActive.title}
      </button>
    </li>
  )
}

function Nav(props: Props) {
  const { articles, section, setSection } = props
  return (
    <nav className={style.nav}>
      {articles.map(article => (
        <ul key={article.title}>
          <div className={style.nav__title}>{article.title}</div>
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
