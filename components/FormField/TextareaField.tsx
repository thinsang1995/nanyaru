'use client'

import React from 'react'
import { Controller, FieldError, useFormContext } from 'react-hook-form'
import { RulesProps } from '../../typing/utils'
import ErrorMessage from './ErrorMessage'

type ITextareaFieldProps = {
  name: string
  id?: string
  className?: string
  rules?: RulesProps
  error?: FieldError
  placeholder?: string
  rows?: number
  isLarge?: boolean
}

const TextareaField: React.FC<ITextareaFieldProps> = ({
  name,
  className = '',
  error,
  rules,
  placeholder,
  rows = 4,
  isLarge,
}) => {
  const { control } = useFormContext()
  const baseClassName =
    'block w-full p-2.5 mt-2 text-black text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none'
  const largeClassName =
    'block w-full p-3 mt-2 text-black text-lg border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none'

  return (
    <Controller
      render={({ field: { onChange, value, ...fieldRest }, formState, fieldState }) => {
        return (
          <div className='flex flex-col w-full'>
            <div className='w-full flex items-center gap-2 relative'>
              <textarea
                id={name}
                className={
                  isLarge
                    ? [largeClassName, className].join(' ')
                    : [baseClassName, className].join(' ')
                }
                onChange={onChange}
                value={value || ''}
                placeholder={placeholder}
                rows={rows}
                {...fieldRest}
              />
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

export default TextareaField
