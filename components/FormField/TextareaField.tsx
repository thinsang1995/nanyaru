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
    'block w-full p-3 text-black text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-200 bg-gray-50 hover:bg-white resize-none'
  const largeClassName =
    'block w-full p-4 text-black text-lg border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-200 bg-gray-50 hover:bg-white resize-none'

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
