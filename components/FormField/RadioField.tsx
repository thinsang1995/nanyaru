'use client'

import React from 'react'
import { Controller, FieldError, useFormContext } from 'react-hook-form'
import { RulesProps } from '../../typing/utils'
import ErrorMessage from './ErrorMessage'
import OrderField from './OrderField'

type IRadioFieldProps = {
  items: { label: string; value: string }[]
  name: string
  rules?: RulesProps
  error?: FieldError
  flexCol?: boolean
  orderNumber: number
  orderLength: number
  isDriver?: boolean
  gridCol?: number
}

const RadioField: React.FC<IRadioFieldProps> = ({
  name,
  items,
  rules = {},
  error = {},
  flexCol = false,
  orderNumber,
  orderLength,
  isDriver,
  gridCol,
}) => {
  const { control } = useFormContext()

  const firstClassName =
    'inline-flex justify-center items-center p-3 w-full bg-gray-50 rounded-lg border-2 border-gray-200 text-gray-600 cursor-pointer transition-all duration-200'
  const basicClassName =
    'peer-checked:border-green-400 peer-checked:bg-green-50 peer-checked:text-green-700 hover:bg-gray-100 hover:border-gray-300'
  const driverClassName =
    'peer-checked:bg-green-400 peer-checked:border-green-400 peer-checked:text-white hover:bg-green-50 hover:border-green-300'
  const flexColClassName = `flex ${flexCol ? 'flex-col' : 'flex-row'}`

  // Get specific grid class based on gridCol value
  const getGridClassName = () => {
    if (!gridCol) return ''
    switch (gridCol) {
      case 1:
        return 'grid grid-cols-1'
      case 2:
        return 'grid grid-cols-2'
      case 3:
        return 'grid grid-cols-3'
      case 4:
        return 'grid grid-cols-4'
      default:
        return 'grid grid-cols-3'
    }
  }

  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      render={({ field: { onChange, ...fieldRest }, formState, fieldState }) => {
        return (
          <div className='w-full flex flex-col'>
            <ul className={`${gridCol ? getGridClassName() : flexColClassName} gap-2 w-full mt-2`}>
              {items.map(({ label, value }) => (
                <li key={value} className='w-full'>
                  <input
                    checked={fieldRest.value === value}
                    type='radio'
                    id={value}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className='hidden peer'
                  />
                  <label
                    htmlFor={value}
                    className={
                      isDriver
                        ? [firstClassName, driverClassName].join(' ')
                        : [firstClassName, basicClassName].join(' ')
                    }
                  >
                    <div className='block'>
                      <div className='w-full text-sm font-semibold'>{label}</div>
                    </div>
                  </label>
                </li>
              ))}
            </ul>
            {orderLength > 0 && <OrderField orderNumber={orderNumber} orderLength={orderLength} />}
            {error?.message && <ErrorMessage message={error.message} />}
          </div>
        )
      }}
    />
  )
}

export default RadioField
