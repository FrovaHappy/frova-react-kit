import type { StringUnitsWidth } from '@/types'

const getUnitValue = (s: StringUnitsWidth) => {
  const unit = s.includes('px') ? 'px' : 'rem'
  const value = parseInt(s.replace(unit, ''))
  return [value, unit] as [number, string]
}

export const Reduced = {
  padding: (p: StringUnitsWidth) => `${useReduceByPercentRatio(p, 0.15)} ${useReduceByPercentRatio(p, 0.25)}`,
  fontSize: (fontSize: StringUnitsWidth) => useReduceByPercentRatio(fontSize, 0.45)
}

export default function useReduceByPercentRatio(value: StringUnitsWidth, percent: number) {
  const [val, unit] = getUnitValue(value)
  const fontSize = val * percent
  return `${fontSize}${unit}`
}
