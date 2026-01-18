import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller, FieldError, useFormContext } from 'react-hook-form'
import { RulesProps } from '../../typing/utils'
import ErrorMessage from './ErrorMessage'

type IDateFieldProps = {
  name: string
  className?: string
  rules?: RulesProps
  error?: FieldError
  isLarge?: boolean
  placeholder?: string
  dateFormat: string
  adsCode?: string | string[]
}

const DateField: React.FC<IDateFieldProps> = ({
  name,
  error,
  rules,
  isLarge,
  className,
  placeholder,
  dateFormat,
}) => {
  const { control } = useFormContext()
  const [minDate, setMinDate] = useState<Date | null>(null)

  const isSunday = (date: Date) => {
    return date.getDay() !== 0
  }

  useEffect(() => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    setMinDate(tomorrow)
  }, [])

  const baseClassName =
    'block w-full p-3 text-black text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-200 bg-gray-50 hover:bg-white cursor-pointer'
  const largeClassName =
    'block w-full p-4 text-black text-lg border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-200 bg-gray-50 hover:bg-white cursor-pointer'

  return (
    <Controller
      render={({ field: { onChange, value, ...fieldRest }, formState, fieldState }) => {
        // Ensure value is a valid Date object
        const selectedDate = value instanceof Date ? value : value ? new Date(value) : null
        const isValidDate = selectedDate && !isNaN(selectedDate.getTime())

        return (
          <div className='flex flex-col w-full relative'>
            <DatePicker
              dateFormat={dateFormat}
              id={name}
              placeholderText={placeholder}
              selected={isValidDate ? selectedDate : null}
              onChange={(date: Date | null) => onChange(date)}
              minDate={minDate ?? undefined}
              filterDate={isSunday}
              className={
                isLarge
                  ? [largeClassName, className].join(' ')
                  : [baseClassName, className].join(' ')
              }
              onKeyDown={(e) => {
                e.preventDefault()
              }}
              disabledKeyboardNavigation
            />
            <div className='absolute top-3 right-3 pointer-events-none'>
              <svg
                className='w-5 h-5 text-green-500'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                />
              </svg>
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

export default DateField
