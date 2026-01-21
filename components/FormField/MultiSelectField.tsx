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
            placeholder='選択してください'
            value={value}
            isMulti
            isSearchable={false}
            className='[&>div]:p-1 [&>div]:border-gray-200 [&>div]:rounded-lg [&>div]:bg-gray-50 [&>div:hover]:bg-white [&>div]:transition-all'
            styles={{
              control: (base) => ({
                ...base,
                borderColor: '#e5e7eb',
                boxShadow: 'none',
                '&:hover': {
                  borderColor: '#4ade80',
                },
                '&:focus-within': {
                  borderColor: '#4ade80',
                  boxShadow: '0 0 0 2px rgba(74, 222, 128, 0.2)',
                },
              }),
              multiValue: (base) => ({
                ...base,
                backgroundColor: '#dcfce7',
                borderRadius: '6px',
              }),
              multiValueLabel: (base) => ({
                ...base,
                color: '#166534',
              }),
              multiValueRemove: (base) => ({
                ...base,
                color: '#166534',
                '&:hover': {
                  backgroundColor: '#bbf7d0',
                  color: '#14532d',
                },
              }),
            }}
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
