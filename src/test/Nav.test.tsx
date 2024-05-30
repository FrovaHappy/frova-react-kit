import { fireEvent, render, screen } from '@testing-library/react'
import Nav from '@components/Document/Nav'
import articles from '@mocks/articles'
import { useState } from 'react'

const Component = () => {
  const [section, SetSection] = useState({ title: '', hashtag: '', url: '', space: 0 })
  return <Nav articles={articles} section={section} setSection={SetSection} />
}

describe('test Nav', () => {
  test('render title', () => {
    render(<Component />)
    const text = screen.getAllByText(/Beatriz Bot/, { selector: 'x-title' })
    expect(text).toHaveLength(1)
  })
  test('render section', () => {
    render(<Component />)
    const text = screen.getAllByText('What is Beatriz Bot?', { selector: 'button' })
    expect(text).toHaveLength(1)
  })
  test('render active section', () => {
    render(<Component />)
    const button = screen.getByText('What is Beatriz Bot?', { selector: 'button' })
    const buttonClass = button.classList.value
    fireEvent.click(button)
    const buttonClassModified = screen.getByText('What is Beatriz Bot?').classList.value

    expect(buttonClass !== buttonClassModified).toBeTruthy()
  })
})
