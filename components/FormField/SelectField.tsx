'use client'

import React, { useId } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import type { FieldError } from 'react-hook-form'
import { RulesProps } from '../../typing/utils'
import ErrorMessage from './ErrorMessage'
import OrderField from './OrderField'

type IControlledSelectFieldProps = {
  name: string
  items: { value: string; label: string }[]
  rules?: RulesProps
  error?: FieldError
  orderNumber: number
  orderLength: number
  placeholder?: string
}

const ControlledSelectField: React.FC<IControlledSelectFieldProps> = ({
  name,
  items,
  rules,
  error,
  orderNumber,
  orderLength,
  placeholder = '選択してください',
}) => {
  const { control } = useFormContext()
  const selectId = useId()

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value, ...fieldRest } }) => (
        <div className='w-full flex flex-col'>
          <select
            onChange={onChange}
            value={value || ''}
            id={`${name}-${selectId}`}
            className='block w-full p-3 min-h-[44px]
            text-gray-900 text-base sm:text-sm bg-gray-50 
            border border-gray-200 rounded-lg 
            focus:ring-2 focus:ring-green-400 focus:border-green-400
            focus:outline-none
            transition-all duration-200 hover:bg-white cursor-pointer
            appearance-none bg-no-repeat bg-right
            pr-10'
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23374151'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundSize: '1.5em 1.5em',
              backgroundPosition: 'right 0.5rem center',
            }}
            {...fieldRest}
          >
            <option value='' disabled>
              {placeholder}
            </option>
            {items.map((i) => (
              <option key={i.value} value={i.value}>
                {i.label}
              </option>
            ))}
          </select>
          {orderLength > 0 && <OrderField orderNumber={orderNumber} orderLength={orderLength} />}
          {error?.message && <ErrorMessage message={error.message} />}
        </div>
      )}
    />
  )
}

export default ControlledSelectField
