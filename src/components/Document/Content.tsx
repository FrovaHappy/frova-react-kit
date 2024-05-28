import style from '@styles/DocumentMarkdown/Content.module.scss'
interface Props {
  html: string
}
function Content(props: Props) {
  const { html } = props
  return <div className={style.content} dangerouslySetInnerHTML={{ __html: html }} />
}

export default Content
