# frova-ui

[![cov](https://FrovaHappy.github.io/frova-react-kit/badges/coverage.svg)](https://github.com/FrovaHappy/frova-react-kit/actions) [![tests](https://github.com/FrovaHappy/frova-react-kit/actions/workflows/main.yml/badge.svg)](https://github.com/FrovaHappy/frova-react-kit/actions/actions) [![npm](https://img.shields.io/npm/v/frova-react-kit)](https://www.npmjs.com/package/frova-react-kit) [![license](https://img.shields.io/github/license/FrovaHappy/frova-react-kit)](https://github.com/FrovaHappy/frova-react-kit/blob/main/LICENSE)

A catalog of react components and custom hooks for easy the development of the UI

> [!WARNING]
>This is a work in progress and not ready for production use yet.

## Installation

> [!WARNING]
> this package requires `react` and `react-dom` to be installed in your project. If you don't have them, you can install them with `npm install react react-dom`.

```bash
npm install frova-ui
```

## Usage

### DocumentMarkdown

```jsx
import { DocumentMarkdown } from 'frova-ui';

const externalLink = https://gist.githubusercontent.com/FrovaHappy/58c836c7b48c4b2094f3037005c24b04/raw/exemple.md

const App = () => (
  <DocumentMarkdown
    articles={[
      {
        title: 'Hello Title',
        sections: [
          {
            title: 'Hello Section 1',
            url: externalLink,
            space: 0,
          },
        ],
      },
    ]}
  />  
);
```

#### Types

```ts
type Article = {
  title: string
  sections: Section[]
}

type Section = {
  title: string
  hashtag: string
  url: string
  space: number
}
```

- `section.space`: add a margin-left for show the hierarchy of the section

#### Props

- `articles` - Array of Article

## Roadmap

> [!NOTE]
> If you have any ideas or suggestions, please open an issue or a PR. I will be happy to discuss it with you.

### Development

```bash

# 1. first install the dependencies
npm install

# 2. compile the code with rollup
npm run pack:build

# 3. link the package in your project
npm run pack:link

# 4. vincule the package in your project
npm run web-test:link

# 5. finally start the development server
npm run web-test:dev
```

### Features

- [ ] useButton hook
- [ ] useSelect hook
- [ ] useInput hook
- [ ] useColorPicker hook
- [ ] useSwitch hook
- [ ] `documentMarkdown` remember active section position with url parameters
- [ ] `documentMarkdown` add light and dark mode support

### Ideas

- [ ] useCheckbox hook
- [ ] useFilePicker hook
- [ ] useTextarea hook
- [ ] useTabs hook
- [ ] `documentMarkdown` add a `<tag />` rule for the markdown parse

## License

[MIT](/LICENSE) © [frova_happy](https://github.com/FrovaHappy)
