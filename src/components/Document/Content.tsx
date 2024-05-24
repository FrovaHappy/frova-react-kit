interface Props {
  html: string
}
function Content(props: Props) {
  const { html } = props
  console.log(html)
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export default Content
