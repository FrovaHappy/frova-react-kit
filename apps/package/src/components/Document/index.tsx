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
interface DocumentProps {
  articles: Article[]
}
function MainContent(props: React.PropsWithChildren<{}> & NavProps) {
  const { articles, section, setSection, children } = props
  return (
    <div className={style.document}>
      <Nav articles={articles} section={section} setSection={setSection} />
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

  if (loading)
    {return (
      <MainContent articles={articles} section={section} setSection={setSection}>
        <Loading />
      </MainContent>
    )}

  if (error)
    {return (
      <MainContent articles={articles} section={section} setSection={setSection}>
        <div>{error}</div>
      </MainContent>
    )}
  return (
    <MainContent articles={articles} section={section} setSection={setSection}>
      <Content html={data} />
      <InThisArticle items={anchors} />
    </MainContent>
  )
}

export default Document
