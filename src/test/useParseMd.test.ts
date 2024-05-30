import useParseMd from '@hooks/useParseMd'

const Rules = {
  empty: { title: 'should return a html string with empty', expect: ['', ''] },
  h1: {
    title: 'should return a html string with h1',
    expect: ['# hello-h1', '<h1 id="hello-h-1">hello-h1</h1>']
  },
  h2: {
    title: 'should return a html string with h2',
    expect: ['## hello h2', '<h2 id="hello-h-2">hello h2</h2>']
  },
  h3: {
    title: 'should return a html string with h3',
    expect: ['### hello h3', '<h3 id="hello-h-3">hello h3</h3>']
  },
  h4: {
    title: 'should return a html string with h4',
    expect: ['#### hello h4', '<h4 id="hello-h-4">hello h4</h4>']
  },
  h5: {
    title: 'should return a html string with h5',
    expect: ['##### hello h5', '<h5 id="hello-h-5">hello h5</h5>']
  },
  h6: {
    title: 'should return a html string with h6',
    expect: ['###### hello h6', '<h6 id="hello-h-6">hello h6</h6>']
  },
  p: {
    title: 'should return a html string with p',
    expect: ['hello p', '<p>hello p</p>']
  },
  code: {
    title: 'should return a html string with code',
    expect: [
      '```js\nconst a = 1\n```',
      '<pre><code class="hljs language-js"><span class="hljs-keyword">const</span> a = <span class="hljs-number">1</span>\n</code></pre>'
    ]
  },
  blockquote: {
    title: 'should return a html string with blockquote',
    expect: ['> hello blockquote', '<blockquote>\n<p>hello blockquote</p>\n</blockquote>']
  },
  ul: {
    title: 'should return a html string with ul',
    expect: ['- hello ul \n- hello ul', '<ul>\n<li>hello ul</li>\n<li>hello ul</li>\n</ul>']
  },
  img: {
    title: 'should return a html string with img',
    expect: ['![alt](https://example.com/image.png)', '<p><img src="https://example.com/image.png" alt="alt"></p>']
  },
  imgs: {
    title: 'should return a html string with imgs',
    expect: [
      '![alt](https://example.com/image.png)\n![alt](https://example.com/image.png)',
      '<p><img src="https://example.com/image.png" alt="alt">\n<img src="https://example.com/image.png" alt="alt"></p>'
    ]
  },
  a: {
    title: 'should return a html string with a',
    expect: ['[hello a](https://example.com)', '<p><a href="https://example.com">hello a</a></p>']
  },
  hr: {
    title: 'should return a html string with hr',
    expect: ['---', '<hr>']
  },
  bold: {
    title: 'should return a html string with bold',
    expect: ['**hello bold**', '<p><strong>hello bold</strong></p>']
  },
  italic: {
    title: 'should return a html string with italic',
    expect: ['*hello italic*', '<p><em>hello italic</em></p>']
  },
  codeInLine: {
    title: 'should return a html string with code',
    expect: ['`hello code`', '<p><code>hello code</code></p>']
  }
  // TODO: add table
  // TODO: add github-blockquote-alert
}

describe('test useParseMd', () => {
  for (const rule of Object.values(Rules)) {
    test(rule.title, async () => {
      const result = await useParseMd(rule.expect[0])
      expect(result).toBe(rule.expect[1])
    })
  }
})
