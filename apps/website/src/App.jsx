import { DocMarkdown, InputContent, InputText } from "frova-react-kit";
import "./App.css";
import "highlight.js/styles/github-dark.css";

function App() {
  return (
    <>
      <div className="input-container">
        <InputText title="color" placeholder="Title" type="color" />
        <InputText title="number" placeholder="Title" type="number" />
        <InputText title="search" placeholder="Title" type="search" />
        <InputText title="date" placeholder="Title" type="date" />
        <InputText title="datetime-local" placeholder="Title" type="datetime-local" />
        <InputText title="url" placeholder="Title" type="url" />
        <InputText title="email" placeholder="Title" type="email" />
        <InputText title="tel" placeholder="Title" type="tel" />
        <InputText title="password" placeholder="Title" type="password" />
        <InputText
          title="Title 2"
          placeholder="Title"
          width="min-content"
          onChange={(e) => console.log(e.target.value)}
        />
        <InputContent
          title="Content"
          placeholder="Content"
          value="Beatriz Bot is a bot that can help you to create a markdown file from a text input."
          onChange={(e) => console.log(e.target.value)}
        >
          description
        </InputContent>
      </div>
      <DocMarkdown
        articles={[
          {
            title: "Beatriz Bot",
            sections: [
              {
                title: "What is Beatriz Bot?",
                hashtag: "what-is-beatriz-bot",
                space: 0,
                url: "https://gist.githubusercontent.com/FrovaHappy/58c836c7b48c4b2094f3037005c24b04/raw/exemple.md",
              },
              {
                title: "How to use Beatriz Bot?",
                space: 1,
                hashtag: "how-to-use-beatriz-bot",
                url: "https://raw.githubusercontent.com/FrovaHappy/anime_hoshi/main/README.md",
              },
            ],
          },
        ]}
      />
    </>
  );
}

export default App;
