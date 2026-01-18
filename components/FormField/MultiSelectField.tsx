import React from 'react'
import Select from 'react-select'
import { Controller, FieldError, useFormContext } from 'react-hook-form'
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

const MultiSelectField: React.FC<IControlledSelectFieldProps> = ({
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
      render={({ field: { onChange, value, ...fieldRest }, formState, fieldState }) => (
        <div className='w-full flex flex-col'>
          <Select
            closeMenuOnSelect={false}
            id={name}
            options={items}
            onChange={onChange}
            placeholder='曜日を選択してください。'
            value={value}
            isMulti
            isSearchable={false}
            className='mt-3 [&>div]:p-1 [&>div]:border-gray-300 [&>div]:rounded-lg'
            {...fieldRest}
          />
          {orderLength > 0 && <OrderField orderNumber={orderNumber} orderLength={orderLength} />}
          {error?.message && <ErrorMessage message={error.message} />}
        </div>
      )}
    />
  )
}

export default MultiSelectField
