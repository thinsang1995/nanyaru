import React from 'react'
import FormFieldBotTalk from './FormFieldBotTalk'

type IFormFieldWrapperProps = {
  children: React.ReactNode
  questionName: string[]
  isDriver?: boolean
}

const FormFieldWrapper: React.FC<IFormFieldWrapperProps> = ({
  questionName,
  children,
  isDriver,
}) => {
  return (
    <FormFieldBotTalk questionName={questionName} isDriver={isDriver}>
      {children}
    </FormFieldBotTalk>
  )
}

export default FormFieldWrapper
