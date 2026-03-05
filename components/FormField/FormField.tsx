import React from 'react'
import FormFieldBotTalk from './FormFieldBotTalk'

type IFormFieldWrapperProps = {
  children: React.ReactNode
  questionName: string[]
  isDriver?: boolean
  required?: boolean
}

const FormFieldWrapper: React.FC<IFormFieldWrapperProps> = ({
  questionName,
  children,
  isDriver,
  required,
}) => {
  return (
    <FormFieldBotTalk questionName={questionName} isDriver={isDriver} required={required}>
      {children}
    </FormFieldBotTalk>
  )
}

export default FormFieldWrapper
