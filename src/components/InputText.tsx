import React from 'react'
import InputContent, { type InputContentProps } from './InputContent'
import inputStyle from '@styles/Input.module.scss'

interface InputBaseProps extends InputContentProps {
  placeholder?: string
  value?: string
  type?:
    | 'text'
    | 'password'
    | 'number'
    | 'email'
    | 'url'
    | 'search'
    | 'tel'
    | 'date'
    | 'datetime-local'
    | 'time'
    | 'color'
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

interface InputTextProps extends InputBaseProps {
  msgError?: string
}

function InputText(props: InputTextProps) {
  const { placeholder, value, onChange, onBlur, msgError, title, height, width, type } = props
  return (
    <InputContent title={title} height={height} width={width} className={msgError ? inputStyle.error : ''}>
      <input
        type={type}
        className={inputStyle.props}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      {!msgError || <span className={inputStyle.error}>{msgError}</span>}
    </InputContent>
  )
}

export default InputText
