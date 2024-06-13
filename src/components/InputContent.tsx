import type { HTMLProps } from 'react'

import classList from '@styles/Input.module.scss'
import useReduceByPercentRatio, { Reduced } from '@/hooks/useReduceByPercentRatio'
import { StringUnitsWidth, StringUnitsHeight } from '@/types'

export interface InputContentProps {
  title?: string
  height?: StringUnitsHeight
  width?: StringUnitsWidth
}

export default function InputContent(props: InputContentProps & HTMLProps<HTMLDivElement>) {
  const { height = '2rem', width = 'fit-content', title, children, className, style, ...ext } = props
  return (
    <div
      className={`${classList['inputContainer']} ${className}`}
      style={{
        height,
        width,
        padding: Reduced.padding(height),
        fontSize: Reduced.fontSize(height),
        gap: useReduceByPercentRatio(height, 0.2),
        ...style
      }}
      {...ext}>
      {!title || (
        <>
          <span className={classList['inputContainer--title']}>{title}</span>
          <span className={classList['inputContainer--line']} />
        </>
      )}
      {children}
    </div>
  )
}
