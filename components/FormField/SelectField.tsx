'use client'

import React from 'react'
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
}

const ControlledSelectField: React.FC<IControlledSelectFieldProps> = ({
  name,
  items,
  rules,
  error,
  orderNumber,
  orderLength,
}) => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, ...fieldRest }, formState, fieldState }) => (
        <div className='w-full flex flex-col'>
          <select
            onChange={onChange}
            id={name}
            className='block w-full p-2.5 mt-2 
            text-gray-900 text-sm bg-gray-50 
            border border-gray-300 rounded-lg 
            focus:ring-blue-500 focus:border-blue-500'
            {...fieldRest}
          >
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
