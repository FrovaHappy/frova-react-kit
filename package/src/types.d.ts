import { JSX } from 'react'

export interface Section {
  title: string
  hashtag: string
  space: number
  url: string
}

export interface Article {
  title: string
  sections: Section[]
}

export interface Anchor {
  title: string
  url: string
  space: number
}

export type StringUnitsHeight = `${number}px` | `${number}rem`

export type StringUnitsWidth =
  | StringUnitsHeight
  | 'fit-content'
  | 'auto'
  | 'min-content'
  | 'max-content'
  | 'max-content'
  | '-webkit-fill-available'

export type InputReturn<T> = [T, JSX.Element]
