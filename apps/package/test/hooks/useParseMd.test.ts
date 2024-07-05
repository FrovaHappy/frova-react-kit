import useParseMd from '@hooks/useParseMd'

const Rules = {
  empty: { title: 'should return a html string with empty', expect: ['', ''] },
  h1: {
    title: 'should return a html string with h1',
    expect: ['# hello-h1', '<h1 id="hello-h1">hello-h1</h1>']
  },
  h2: {
    title: 'should return a html string with h2',
    expect: ['## hello h2', '<h2 id="hello-h2">hello h2</h2>']
  },
  h3: {
    title: 'should return a html string with h3',
    expect: ['### hello h3', '<h3 id="hello-h3">hello h3</h3>']
  },
  h4: {
    title: 'should return a html string with h4',
    expect: ['#### hello h4', '<h4 id="hello-h4">hello h4</h4>']
  },
  h5: {
    title: 'should return a html string with h5',
    expect: ['##### hello h5', '<h5 id="hello-h5">hello h5</h5>']
  },
  h6: {
    title: 'should return a html string with h6',
    expect: ['###### hello h6', '<h6 id="hello-h6">hello h6</h6>']
  },
  p: {
    title: 'should return a html string with p',
    expect: ['hello p', '<p> hello p</p>']
  },
  code: {
    title: 'should return a html string with code',
    expect: ['```js\nconst a = 1\n```', '<pre><code class="language-js">const a = 1\n</code></pre>']
  },
  blockquote: {
    title: 'should return a html string with blockquote',
    expect: ['> hello blockquote\n> line2', '<blockquote><p>hello blockquote</p><p>line2</p></blockquote>']
  },
  ol: {
    title: 'should return a html string with ol',
    expect: ['1. hello ol\n2. hello ol', '<ol><li>hello ol</li><li>hello ol</li></ol>']
  },
  tasklist: {
    title: 'should return a html string with tasklist',
    expect: [
      '- [ ] hello tasklist\n- [x] hello tasklist',
      '<ul><li><input type="checkbox" disabled>hello tasklist</li><li><input type="checkbox" checked disabled>hello tasklist</li></ul>'
    ]
  },
  table: {
    title: 'should return a html string with table',
    expect: [
      '| a | b  |  c |  d  |\n| - | :- | :-: | -: |\n| 1 | 2 | 3 | 4 |',
      '<table><thead><tr><th>a</th><th align="left">b</th><th align="center">c</th><th align="right">d</th></tr></thead><tbody><tr><td>1</td><td align="left">2</td><td align="center">3</td><td align="right">4</td></tr></tbody></table>'
    ]
  },
  ul: {
    title: 'should return a html string with ul',
    expect: ['- hello ul\n- hello ul', '<ul><li>hello ul</li><li>hello ul</li></ul>']
  },
  img: {
    title: 'should return a html string with img',
    expect: ['![alt](https://example.com/image.png)', '<p> <img src="https://example.com/image.png" alt="alt"></p>']
  },
  imgWithUrl: {
    title: 'should return a html string with img with url',
    expect: [
      '[![alt](https://example.com/image.png)](https://example.com)',
      '<p> <a href="https://example.com"><img src="https://example.com/image.png" alt="alt"></a></p>'
    ]
  },
  imgs: {
    title: 'should return a html string with imgs',
    expect: [
      '![alt](https://example.com/image.png)\n![alt](https://example.com/image.png)',
      '<p> <img src="https://example.com/image.png" alt="alt"><img src="https://example.com/image.png" alt="alt"></p>'
    ]
  },
  link: {
    title: 'should return a html string with a',
    expect: ['[hello a](https://example.com)', '<p> <a href="https://example.com">hello a</a></p>']
  },
  linkRef: {
    title: 'should return a html string with a',
    expect: ['[hello a][1]\n\n[1]: https://example.com', '<p> <a href="https://example.com">hello a</a></p>']
  },
  hr: {
    title: 'should return a html string with hr',
    expect: ['---', '<hr>']
  },
  bold: {
    title: 'should return a html string with bold',
    expect: ['**hello bold**', '<p> <strong>hello bold</strong></p>']
  },
  italic: {
    title: 'should return a html string with italic',
    expect: ['*hello italic*', '<p> <em>hello italic</em></p>']
  },
  codeInLine: {
    title: 'should return a html string with code',
    expect: ['`hello code`', '<p> <code>hello code</code></p>']
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
