import articles from '@mocks/articles'
import useFetchMd from '@hooks/useFetchMd'
describe('test useFetchMd', () => {
  const section = articles[0].sections[0]
  test('should return a string', async () => {
    const res = await useFetchMd(section.url)
    expect(res).toBeTypeOf('string')
  })
  test('should throw an error if the url is invalid', async () => {
    section.url = 'invalid url'
    await expect(useFetchMd(section.url)).rejects.toThrow('fetch: File not found')
  })
  test('should throw an error if the file is not found', async () => {
    section.url = 'https://google.com/not-found'
    await expect(useFetchMd(section.url)).rejects.toThrow('fetch: Error fetching file')
  })
  test('should throw an error if the content type is not text/plain', async () => {
    section.url = 'https://google.com/'
    await expect(useFetchMd(section.url)).rejects.toThrow('fetch: content type is not text/plain')
  })
})
