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
  gridCol = 1,
}) => {
  const { control } = useFormContext()

  const firstClassName =
    'inline-flex justify-center items-center p-3 w-full bg-white rounded-lg border border-gray-200 text-gray-500 cursor-pointer'
  const basicClassName =
    'peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100'
  const driverClassName =
    'peer-checked:bg-[#fce50e] peer-checked:text-black hover:text-black hover:bg-[#fce50e]'
  const flexColClassName = `flex ${flexCol ? 'flex-col' : 'flex-row'}`
  const gridColClassName = `grid grid-cols-${gridCol}`

  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      render={({ field: { onChange, ...fieldRest }, formState, fieldState }) => {
        return (
          <div className='w-full flex flex-col'>
            <ul className={`${gridCol ? gridColClassName : flexColClassName} gap-2 w-full mt-2`}>
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
