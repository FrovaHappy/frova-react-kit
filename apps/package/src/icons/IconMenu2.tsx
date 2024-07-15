import { Icons } from '@/types'

export default function IconMenu2(props: Icons) {
  const { size = 24, strokeWidth = 2, color = 'currentColor', ...others } = props
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      fill='none'
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...others}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M4 6l16 0' />
      <path d='M4 12l16 0' />
      <path d='M4 18l16 0' />
    </svg>
  )
}
