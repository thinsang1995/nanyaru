import React from 'react'

type IFormFieldInputButtonProps = {
  disabled: boolean
  onClickBtn?: React.MouseEventHandler<HTMLButtonElement>
  buttonLabel?: string
  isDriver?: boolean
}

const FormFieldInputButton: React.FC<IFormFieldInputButtonProps> = ({
  disabled,
  onClickBtn,
  buttonLabel = '入力完了',
  isDriver,
}) => {
  return (
    <button
      disabled={disabled}
      type='button'
      onClick={onClickBtn}
      className='w-full inline-flex justify-center items-center mt-2 py-3 px-5 
      text-sm font-medium text-black bg-white outline-none border border-gray-300
      rounded-lg border 
      focus:z-10 focus:ring-2'
      style={{ background: isDriver ? '#fce50e' : '' }}
    >
      {buttonLabel}
    </button>
  )
}

export default FormFieldInputButton
