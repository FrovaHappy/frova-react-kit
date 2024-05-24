import { Anchor } from '@/types'

const documents = `
<h1 id="hello-world">Hello World</h1>
<p>This is a paragraph.</p>
<h2 id="this-is-a-heading-h2">This is a heading h2</h2>
<p>This is a paragraph in a subheading.</p>
<h3 id="this-is-a-heading-h3">This is a heading h3</h3>
<p>This is a paragraph in a subheading.</p>
<h3 >This is a heading h3 without an id</h3>
`
const documentAnchorsExp: Anchor[] = [
  {
    space: 0,
    title: 'Hello World',
    url: 'hello-world'
  },
  {
    space: 1,
    title: 'This is a heading h2',
    url: 'this-is-a-heading-h2'
  },
  {
    space: 2,
    title: 'This is a heading h3',
    url: 'this-is-a-heading-h3'
  },
  {
    space: 2,
    title: 'This is a heading h3 without an id',
    url: ''
  }
]

export default documents
export { documentAnchorsExp }
