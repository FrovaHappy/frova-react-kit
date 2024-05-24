import { Suspense, useEffect, useState } from 'react'
import Nav from './Nav'
import { Anchor, Article, Section } from '@/types'
import Content from './Content'
import useFetchMd from '@hooks/useFetchMd'
import useParseMd from '@hooks/useParseMd'
import Loading from '@/components/Loading'
import InThisArticle from './InThisArticle'
import useBuildAnchors from '@hooks/useBuildAnchors'
interface DocumentProps {
  articles: Article[]
}
function Document(props: DocumentProps) {
  const { articles } = props
  const [section, setSection] = useState<Section>(articles[0].sections[0])
  const [data, setData] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [anchors, setAnchors] = useState<Anchor[]>([])

  useEffect(() => {
    const promise = async () => {
      try {
        const md = await useFetchMd(section.url)
        const html = await useParseMd(md)
        setData(html)
        setAnchors(useBuildAnchors(html))
      } catch (e: any) {
        setError(e.message)
      }
    }
    promise()
  }, [])
  if (error) return <div>{error}</div>
  return (
    <div>
      <Nav articles={articles} section={section} setSection={setSection} />
      <Suspense fallback={<Loading />}>
        <Content html={data} />
        <InThisArticle items={anchors} />
      </Suspense>
    </div>
  )
}

export default Document
