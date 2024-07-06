import style from '@styles/DocumentMarkdown/content.module.scss'
import shared from '@styles/DocumentMarkdown/shared.module.scss'
import hljs from 'highlight.js'
import React from 'react'
interface Props {
  html: string
}
function Content(props: Props) {
  const htmlRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (!htmlRef.current) return
    hljs.highlightAll()
    const options = {
      root: null,
      rootMargin: `-40px`,
      threshold: 1
    }
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      if (!entries[0].isIntersecting) return
      const active = entries[0].target.id

      const anchor = window.document.querySelector('a[href="#' + active + '"]')
      anchor?.parentElement?.parentElement?.querySelectorAll('a').forEach(a => {
        a.classList.remove(shared.active)
      })
      anchor?.classList.add(shared.active)
    }

    const observer = new IntersectionObserver(handleObserver, options)
    htmlRef.current.querySelectorAll('h1, h2, h3, h4').forEach(el => {
      observer.observe(el)
    })
  }, [htmlRef])
  const { html } = props
  return <div className={style.content} dangerouslySetInnerHTML={{ __html: html }} ref={htmlRef} />
}

export default Content
