import React from 'react'
import InputContent, { type InputContentProps } from './InputContent'
import inputStyle from '@styles/Input.module.scss'

interface InputTextProps extends InputContentProps {
  msgError?: string
}

function InputText(props: InputTextProps & React.HTMLProps<HTMLInputElement>) {
  const { msgError, title, height, width, className, ...rest } = props
  return (
    <InputContent title={title} height={height} width={width} className={msgError ? inputStyle.error : ''}>
      <input className={[inputStyle.props, className].filter(i => i).join(' ')} {...rest} />
      {!msgError || <span className={inputStyle.error}>{msgError}</span>}
    </InputContent>
  )
}

export default InputText
