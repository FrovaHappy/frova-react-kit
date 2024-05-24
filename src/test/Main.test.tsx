import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import Main from '@components/Document'
import articles from '@mocks/articles'
describe('test Main Component', () => {
  test('loading md component', async () => {
    render(<Main articles={articles} />)
    const loading = await waitFor(() => screen.getByText('Hello World', { selector: 'h1' }))
    expect(loading.innerHTML).toBe('Hello World')
  })
  test('error with invalid url section', async () => {
    articles[0].sections[0].url = ''
    render(<Main articles={articles} />)
    const loading = await waitFor(() => screen.getByText('fetch: File not found'))
    expect(loading.innerHTML).toBe('fetch: File not found')
  })
})
