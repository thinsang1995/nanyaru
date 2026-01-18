'use client'

import React from 'react'
import { Controller, FieldError, useFormContext } from 'react-hook-form'
import { RulesProps } from '../../typing/utils'
import ErrorMessage from './ErrorMessage'

type IInputFieldProps = {
  name: string
  id?: string
  className?: string
  suffix?: string[]
  rules?: RulesProps
  error?: FieldError
  type: 'text' | 'tel' | 'email' | 'file'
  placeholder?: string
  isLarge?: boolean
}

const InputField: React.FC<IInputFieldProps> = ({
  name,
  className = '',
  suffix = [],
  error,
  rules,
  type,
  placeholder,
  isLarge,
}) => {
  const { control } = useFormContext()
  const baseClassName =
    'block w-full p-2.5 mt-2 text-black text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
  const largeClassName =
    'block w-full p-3 mt-2 text-black text-lg border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'

  return (
    <Controller
      render={({ field: { onChange, value, ...fieldRest }, formState, fieldState }) => {
        return (
          <div className='flex flex-col w-full'>
            <div className='w-full flex items-center gap-2 relative'>
              <input
                type={type}
                id={name}
                className={
                  isLarge
                    ? [largeClassName, className].join(' ')
                    : [baseClassName, className].join(' ')
                }
                onChange={onChange}
                value={value || ''}
                placeholder={placeholder}
                {...fieldRest}
              />
              {suffix.length > 0 &&
                suffix.map((text) => (
                  <>
                    <span key={text} className='h-fit mt-2'>
                      {text}
                    </span>
                  </>
                ))}
            </div>
            {error?.message && <ErrorMessage message={error.message} />}
          </div>
        )
      }}
      rules={rules}
      name={name}
      control={control}
    />
  )
}

export default InputField
