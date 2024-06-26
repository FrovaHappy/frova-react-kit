import rehypeHighlight from 'rehype-highlight'
import remarkParse from 'remark-parse'
import remarkHeadingId from 'remark-heading-id'
import { remark } from 'remark'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'

export default async function useParseMd(str: string) {
  const md = await remark()
    .use(remarkParse)
    .use(remarkHeadingId, { defaults: true })
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(str)
  return md.value.toString()
}
