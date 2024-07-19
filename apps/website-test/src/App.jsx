import { DocMarkdown } from 'frova-ui'
import './App.css'
import 'highlight.js/styles/github-dark.css'

function App() {
  return (
    <>
      <DocMarkdown
        articles={[
          {
            title: 'Beatriz Bot',
            sections: [
              {
                title: 'What is Beatriz Bot?',
                hashtag: 'what-is-beatriz-bot',
                space: 0,
                url: 'https://gist.githubusercontent.com/FrovaHappy/58c836c7b48c4b2094f3037005c24b04/raw/exemple.md'
              },
              {
                title: 'How to use Beatriz Bot?',
                space: 1,
                hashtag: 'how-to-use-beatriz-bot',
                url: 'https://raw.githubusercontent.com/FrovaHappy/anime_hoshi/main/README.md'
              }
            ]
          }
        ]}
      />
    </>
  )
}

export default App
