declare module '*.module.scss' {
  const content: Record<string, string>
  export default content
}

namespace JSX {
  interface IntrinsicElements {
    'x-title': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
  }
}
