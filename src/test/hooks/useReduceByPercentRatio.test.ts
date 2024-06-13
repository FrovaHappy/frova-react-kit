import useCalcPercent from '@hooks/useReduceByPercentRatio'

describe('test useCalcPercent', () => {
  test('should return a "auto" value if passed "auto" as value', () => {
    const percent = useCalcPercent('auto', 0.5)
    expect('auto')
  })
  test('should return a "min-content" value if passed "min-content" as value', () => {
    const percent = useCalcPercent('min-content', 0.5)
    expect('min-content')
  })
  test('should return a "max-content" value if passed "max-content" as value', () => {
    const percent = useCalcPercent('max-content', 0.5)
    expect('max-content')
  })
  test('should return a "fit-content" value if passed "max-content" as value', () => {
    const percent = useCalcPercent('fit-content', 0.5)
    expect('fit-content')
  })

  test('should return a reduced value', () => {
    expect(useCalcPercent('100px', 0.5)).toBe('50px')
    expect(useCalcPercent('100px', 0.25)).toBe('25px')
    expect(useCalcPercent('100px', 0.75)).toBe('75px')
    expect(useCalcPercent('100rem', 0.5)).toBe('50rem')
    expect(useCalcPercent('100rem', 0.25)).toBe('25rem')
    expect(useCalcPercent('100rem', 0.75)).toBe('75rem')
  })
})
