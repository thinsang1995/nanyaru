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
  adsCode,
}) => {
  const { control } = useFormContext()
  const [minDate, setMinDate] = useState<Date | null>(null)

  const isLiBa = [
    'libyahoo',
    'libbaitoru',
    'libindeed',
    'libjmty0',
    'libindeed0',
    'libjmty',
    'libyda',
    'libsg',
  ].includes(adsCode as string)

  const isSunday = (date: Date) => {
    if (isLiBa) return date.getDay() !== 7
    return date.getDay() !== 0
  }

  useEffect(() => {
    const today = new Date()
    if (isLiBa) {
      setMinDate(today)
    } else {
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      setMinDate(tomorrow)
    }
  }, [isLiBa])

  const baseClassName =
    'block w-full p-2.5 mt-2 text-black text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
  const largeClassName =
    'block w-full p-3 mt-2 text-black text-lg border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'

  return (
    <Controller
      render={({ field: { onChange, value, ...fieldRest }, formState, fieldState }) => {
        return (
          <div className='flex flex-col w-full relative'>
            <DatePicker
              dateFormat={dateFormat}
              id={name}
              placeholderText={placeholder}
              selected={value}
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
            <img
              className='absolute top-4 right-4'
              src='/images/recruit/calendar.svg'
              alt='calendar'
              width={22}
              height={22}
            />
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
