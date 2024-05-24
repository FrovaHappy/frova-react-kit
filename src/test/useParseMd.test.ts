import useParseMd from '@hooks/useParseMd'

describe('test useParseMd', () => {
  test('return a string', async () => {
    expect(await useParseMd('')).toBe('')
  })
  test('return a html string', async () => {
    expect(await useParseMd('# hello')).toBe('<h1 id="hello">hello</h1>')
  })
  test('return a html string with highlight', async () => {
    expect(await useParseMd('```js\nconst a = 1\n```')).toBe(
      '<pre><code class="hljs language-js"><span class="hljs-keyword">const</span> a = <span class="hljs-number">1</span>\n</code></pre>'
    )
  })
})
