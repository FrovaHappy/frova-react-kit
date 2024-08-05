import { render, screen, waitFor } from '@testing-library/react'
import Main from '@components/Document'
import articles from '@mocks/articles'
import { ErrorMessages } from '@/hooks/useFetchMd'
describe('test Main Component', () => {
  test('loading md component', async () => {
    render(<Main articles={articles} />)
    const loading = await waitFor(() => screen.getByText('Hello World', { selector: 'h1' }), { timeout: 3000 })
    expect(loading.innerHTML).toBe('Hello World')
  })
  test('error with invalid url section', async () => {
    articles[0].sections[0].url = ''
    render(<Main articles={articles} />)

    const loading = await waitFor(() => screen.getByText(ErrorMessages.noFound, { selector: 'div' }), { timeout: 3000 })

    // check if the Nav component is rendered
    const navTitle = screen.getByText(articles[0].title, { selector: 'x-title' })
    expect(navTitle).not.toBeTypeOf('undefined')

    // check if the error message is rendered
    expect(loading.innerHTML).toContain(ErrorMessages.noFound)
  })
})
