import React from 'react'
import InputText from '@/components/InputText'
import { InputContentProps } from '@/components/InputContent'
import { InputReturn } from '@/types'
type Value = string | undefined

interface Props extends InputContentProps {
  placeholder?: string
  defaultValue?: `${number}`
  step: number
  min: number
  max: number
}

export default function useInputNumber(props: Props): InputReturn<number> {
  const { title, max, min, step, defaultValue = '', placeholder, height, width } = props
  const [value, setValue] = React.useState<Value>(defaultValue)
  const [msgError, setMsgError] = React.useState<Value>()
  const onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault()
    const m = e.target.value ?? ''
    const test = Number.parseInt(m) <= max && Number.parseInt(m) >= min
    if (!test) {
      setMsgError(`el numero debe ser mayor a ${min} o menor a ${max}.`)
      return
    }
    if (Number.parseFloat(m) % step !== 0) {
      setMsgError(`el numero debe ser divisible por ${step}.`)
      return
    }
    setMsgError(undefined)
  }
  const onBlur: React.FocusEventHandler<HTMLInputElement> = e => {
    e.preventDefault()
    if (e.target.value === '') e.target.value = defaultValue ?? ''
  }
  const Component = (
    <InputText
      height={height}
      width={width}
      title={title}
      max={max}
      min={min}
      msgError={msgError}
      step={step}
      defaultValue={defaultValue}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
    />
  )
  return [parseFloat(value ?? ''), Component]
}
