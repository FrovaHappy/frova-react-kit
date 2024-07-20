import React, { useEffect, useState } from 'react'
import Nav, { type NavProps } from './Nav'
import { type Anchor, type Article, type Section } from '@/types'
import Content from './Content'
import useFetchMd from '@hooks/useFetchMd'
import useParseMd from '@hooks/useParseMd'
import Loading from '@/components/Loading'
import InThisArticle from './InThisArticle'
import useBuildAnchors from '@hooks/useBuildAnchors'
import style from '@styles/DocumentMarkdown/index.module.scss'
import IconChevronRight from '@/icons/IconChevronRight'
import IconMenu2 from '@/icons/IconMenu2'

function SectionsPhone(props: { inArticleContent?: boolean; title?: string }) {
  const { inArticleContent, title } = props
  const handleClick = (el: 'title' | 'inArticle') => {
    return (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const parent = e.currentTarget.parentElement?.parentElement ?? null
      const [firth, second] = parent?.querySelectorAll(`.${style.aside}`) ?? []
      if (el === 'title') {
        firth.classList.toggle(style['aside--active'])
        second?.classList.remove(style['aside--active'])
        return
      }
      if (el === 'inArticle') {
        if (!second) firth.classList.toggle(style['aside--active'])
        else {
          firth.classList.remove(style['aside--active'])
          second.classList.toggle(style['aside--active'])
        }
        return
      }
    }
  }
  return (
    <div className={style.document__phone}>
      {!title || (
        <div onClick={handleClick('title')}>
          <p>{title}</p>
          <IconChevronRight />
        </div>
      )}
      {!inArticleContent || (
        <div onClick={handleClick('inArticle')}>
          <IconMenu2 />
        </div>
      )}
    </div>
  )
}
interface DocumentProps {
  articles: Article[]
}
function MainContent(props: React.PropsWithChildren<{}> & NavProps) {
  const { articles, section, setSection, children } = props
  return (
    <div className={style.document}>
      <Nav articles={articles} section={section} setSection={setSection} />
      <SectionsPhone />
      {children}
    </div>
  )
}

function Document(props: DocumentProps) {
  const { articles } = props
  const [section, setSection] = useState<Section>(articles[0].sections[0])
  const [data, setData] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [anchors, setAnchors] = useState<Anchor[]>([])

  useEffect(() => {
    const promise = async () => {
      setLoading(true)
      try {
        const md = await useFetchMd(section.url)
        const html = await useParseMd(md)
        setData(html)
        setAnchors(useBuildAnchors(html))
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    promise()
  }, [section])

  if (loading) {
    return (
      <div className={style.document}>
        <Nav articles={articles} section={section} setSection={setSection} />
        <SectionsPhone />
        <Loading />
      </div>
    )
  }

  if (error) {
    return (
      <div className={style.document}>
        <Nav articles={articles} section={section} setSection={setSection} />
        <SectionsPhone />
        {error}
      </div>
    )
  }
  return (
    <div className={style.document}>
      <Nav articles={articles} section={section} setSection={setSection} />
      <SectionsPhone inArticleContent={anchors.length > 0} title={section.title} />
      <Content html={data} />
      <InThisArticle items={anchors} />
    </div>
  )
}

export default Document
