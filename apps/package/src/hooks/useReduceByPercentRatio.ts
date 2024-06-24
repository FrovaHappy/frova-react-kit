import type { StringUnitsWidth } from '@/types'

const getUnitValue = (s: StringUnitsWidth): [number | undefined, string] => {
  const unit = s.includes('px') ? 'px' : 'rem'
  const value = parseInt(s.replace(unit, ''))
  if (Number.isNaN(value)) return [, s]
  return [value, unit]
}

export const Reduced = {
  padding: (p: StringUnitsWidth) => `${useReduceByPercentRatio(p, 0.15)} ${useReduceByPercentRatio(p, 0.25)}`,
  fontSize: (fontSize: StringUnitsWidth) => useReduceByPercentRatio(fontSize, 0.45)
}

export default function useReduceByPercentRatio(value: StringUnitsWidth, percent: number) {
  const [val, unit] = getUnitValue(value)
  if (!val) return value
  const fontSize = val * percent
  return `${fontSize}${unit}`
}
