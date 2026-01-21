import React from 'react'

type TextProps = {
  message: string
}

const ErrorMessage: React.FC<TextProps> = ({ message }) => {
  return <p className='text-xs text-rose-600 text-center mt-2'>{message}</p>
}

export default ErrorMessage
