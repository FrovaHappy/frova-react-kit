import { fireEvent, render, screen } from '@testing-library/react'
import Nav from '@components/Document/Nav'
import articles from '@mocks/articles'
import { useState } from 'react'

const Component = () => {
  const [section, SetSection] = useState(articles[0].sections[0])
  return <Nav articles={articles} section={section} setSection={SetSection} />
}
const sections = articles[0].sections

describe('test Nav', () => {
  test('render title', () => {
    render(<Component />)
    const text = screen.getAllByText(articles[0].title, { selector: 'x-title' })
    expect(text).toHaveLength(1)
  })
  test('render section', () => {
    render(<Component />)
    const text = screen.getByText(sections[1].title, { selector: 'button' })
    expect(text.innerHTML).toBe(sections[1].title)
  })
  test('render active section', () => {
    render(<Component />)
    const button = screen.getByText(sections[1].title, { selector: 'button' })
    const buttonClass = button.classList.value // expect to be without active class by default
    fireEvent.click(button)
    const buttonClassModified = screen.getByText(sections[1].title, { selector: 'button' }).classList.value

    expect(buttonClass).not.toEqual(buttonClassModified)
  })
})
