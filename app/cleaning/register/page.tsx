'use client'

import React, { useState, useEffect, Suspense } from 'react'
import dayjs from 'dayjs'
import { FieldError, FormProvider, useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'
import Head from 'next/head'
import fieldMap, { RegisterFieldKeys, usingItems } from '../../../constants/registerCleaning'
import axiosInstance, { handleAPIErrors } from '../../../utils/axiosInstance'
import transformResponse from '../../../utils/transformResponse'
import FormField from '../../../components/FormField/FormField'
import InputField from '../../../components/FormField/InputField'
import RadioField from '../../../components/FormField/RadioField'
import SelectField from '../../../components/FormField/SelectField'
import MultiSelectField from '../../../components/FormField/MultiSelectField'
import DateField from '../../../components/FormField/DateField'
import TextareaField from '../../../components/FormField/TextareaField'
import ImageUploadField from '../../../components/FormField/ImageUploadField'
import OrderField from '../../../components/FormField/OrderField'

export type CleaningFormInputs = {
  cleanName: string
  cleanFurigana: string
  cleanPhoneNumber: string
  cleanAddress: string
  cleanExperience: string
  cleanNumOfAirCon: string
  cleanNumOfAirConOut: string
  cleanOtherRequest: string
  cleanAirConNumber: File[]
  cleanImages: File[]
  cleanOtherMenu: string
  dayOne: string
  startTimeOne: string
  endTimeOne: string
  dayTwo: string
  startTimeTwo: string
  endTimeTwo: string
  dayThree: string
  startTimeThree: string
  endTimeThree: string
  cleanBike: string
  cleanOtherWarning: string
  adsCode?: string
  registerTime?: string
  registerDate?: string
}

type RegisterProps = {
  code: string | string[]
  hiddenCoverImg?: boolean
  disableAutoScroll?: boolean
}

const Register: React.FC<RegisterProps> = () => {
  const methods = useForm<CleaningFormInputs>({
    mode: 'onChange',
    defaultValues: {
      cleanName: '',
      cleanFurigana: '',
      cleanPhoneNumber: '',
      cleanAddress: '',
      cleanExperience: '',
      cleanNumOfAirCon: '',
      cleanNumOfAirConOut: '',
      cleanOtherRequest: '',
      cleanAirConNumber: [],
      cleanImages: [],
      cleanOtherMenu: '',
      dayOne: '',
      startTimeOne: '',
      endTimeOne: '',
      dayTwo: '',
      startTimeTwo: '',
      endTimeTwo: '',
      dayThree: '',
      startTimeThree: '',
      endTimeThree: '',
      cleanBike: '',
      cleanOtherWarning: '',
    },
  })

  const orderFields: RegisterFieldKeys[] = [
    'cleanName',
    'cleanFurigana',
    'cleanPhoneNumber',
    'cleanAddress',
    'cleanExperience',
    'cleanNumOfAirCon',
    'cleanNumOfAirConOut',
    'cleanOtherRequest',
    'cleanAirConNumber',
    'cleanImages',
    'cleanOtherMenu',
    'dayOne',
    'startTimeOne',
    'endTimeOne',
    'dayTwo',
    'startTimeTwo',
    'endTimeTwo',
    'dayThree',
    'startTimeThree',
    'endTimeThree',
    'cleanBike',
    'cleanOtherWarning',
  ]

  const router = useRouter()
  const searchParams = useSearchParams()
  const adsCode = searchParams.get('ecaiad')
  const nameParams = searchParams.get('name')
  const phoneParams = searchParams.get('phone')

  const {
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue,
  } = methods

  const [isSending, setIsSending] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>('')

  useEffect(() => {
    if (nameParams && phoneParams) {
      setValue('cleanName', nameParams)
      setValue('cleanPhoneNumber', phoneParams)
    }
  }, [nameParams, phoneParams])

  const getExperienceLabel = (experienceValue: string) => {
    const foundItem = usingItems.find((item) => item.value === experienceValue)
    return foundItem ? foundItem.label : experienceValue
  }

  // Convert multi-select array to comma-separated string
  const getMultiSelectString = (value: any): string => {
    if (!value) return ''
    if (typeof value === 'string') return value
    if (Array.isArray(value)) {
      return value.map((item) => (typeof item === 'object' ? item.label || item.value : item)).join(',')
    }
    return String(value)
  }

  const onSubmit = async (formData: CleaningFormInputs) => {
    setIsSending(true)

    try {
      // Save data to Spreadsheet
      await transformResponse<{ data: CleaningFormInputs }>(
        axiosInstance.post('/api/spreadsheet/cleaning_register', {
          cleanName: formData.cleanName,
          cleanFurigana: formData.cleanFurigana,
          cleanPhoneNumber: formData.cleanPhoneNumber,
          cleanExperience: getExperienceLabel(formData.cleanExperience),
          cleanNumOfAirCon: formData.cleanNumOfAirCon,
          cleanNumOfAirConOut: formData.cleanNumOfAirConOut,
          cleanOtherRequest: formData.cleanOtherRequest,
          cleanOtherMenu: getMultiSelectString(formData.cleanOtherMenu),
          appointmentDayOne: formData.dayOne ? dayjs(formData.dayOne).format('YYYY年MM月DD日') : '',
          startTimeOne: formData.startTimeOne || '指定なし',
          endTimeOne: formData.endTimeOne || '指定なし',
          appointmentDayTwo: formData.dayTwo ? dayjs(formData.dayTwo).format('YYYY年MM月DD日') : '指定なし',
          startTimeTwo: formData.startTimeTwo || '指定なし',
          endTimeTwo: formData.endTimeTwo || '指定なし',
          appointmentDayThree: formData.dayThree ? dayjs(formData.dayThree).format('YYYY年MM月DD日') : '指定なし',
          startTimeThree: formData.startTimeThree || '指定なし',
          endTimeThree: formData.endTimeThree || '指定なし',
          cleanAddress: formData.cleanAddress,
          cleanBike: formData.cleanBike,
          cleanOtherWarning: formData.cleanOtherWarning,
          adsCode,
          registerDate: dayjs().format('YYYY-MM-DD'),
          registerTime: dayjs().format('HH:mm:ss'),
        }),
      )

      // LINE Notify with images
      const lineFormData = new FormData()
      lineFormData.append('cleanName', formData.cleanName)
      lineFormData.append('cleanFurigana', formData.cleanFurigana)
      lineFormData.append('cleanPhoneNumber', formData.cleanPhoneNumber)
      lineFormData.append('cleanExperience', getExperienceLabel(formData.cleanExperience))
      lineFormData.append('cleanNumOfAirCon', formData.cleanNumOfAirCon)
      lineFormData.append('cleanNumOfAirConOut', formData.cleanNumOfAirConOut)
      lineFormData.append('cleanOtherRequest', formData.cleanOtherRequest)
      lineFormData.append('cleanOtherMenu', getMultiSelectString(formData.cleanOtherMenu))
      lineFormData.append('appointmentDayOne', formData.dayOne ? dayjs(formData.dayOne).format('YYYY年MM月DD日') : '')
      lineFormData.append('startTimeOne', formData.startTimeOne || '指定なし')
      lineFormData.append('endTimeOne', formData.endTimeOne || '指定なし')
      lineFormData.append('appointmentDayTwo', formData.dayTwo ? dayjs(formData.dayTwo).format('YYYY年MM月DD日') : '指定なし')
      lineFormData.append('startTimeTwo', formData.startTimeTwo || '指定なし')
      lineFormData.append('endTimeTwo', formData.endTimeTwo || '指定なし')
      lineFormData.append('appointmentDayThree', formData.dayThree ? dayjs(formData.dayThree).format('YYYY年MM月DD日') : '指定なし')
      lineFormData.append('startTimeThree', formData.startTimeThree || '指定なし')
      lineFormData.append('endTimeThree', formData.endTimeThree || '指定なし')
      lineFormData.append('cleanAddress', formData.cleanAddress)
      lineFormData.append('cleanBike', formData.cleanBike)
      lineFormData.append('cleanOtherWarning', formData.cleanOtherWarning)
      lineFormData.append('adsCode', adsCode || '')
      
      // Append air conditioner number images
      if (formData.cleanAirConNumber && formData.cleanAirConNumber.length > 0) {
        formData.cleanAirConNumber.forEach((file) => {
          lineFormData.append('airConImages', file)
        })
      }

      // Append cleaning spot images
      if (formData.cleanImages && formData.cleanImages.length > 0) {
        formData.cleanImages.forEach((file) => {
          lineFormData.append('images', file)
        })
      }

      await fetch('/api/cleaning_line_notify', {
        method: 'POST',
        body: lineFormData,
      })

      router.push(`/cleaning/cleaning-thankyou?ecaiad=${adsCode}`)
    } catch (e) {
      handleAPIErrors(e)
      setErrorMsg('送信エラーが発生しました。再度お応募してください。')
    } finally {
      setIsSending(false)
    }
  }

  Object.keys(fieldMap) as RegisterFieldKeys[]

  return (
    <>
      <Head>
        <title>NANYARU-クリーニング予約フォーム</title>
      </Head>
      
      {/* Header */}
      <div className='bg-linear-to-r from-green-400 to-green-500 py-6 px-4 shadow-md'>
        <div className='max-w-screen-sm mx-auto'>
          <h1 className='text-center text-2xl font-bold text-white'>
          クリーニング予約フォーム
          </h1>
          <p className='text-center text-green-100 text-sm mt-2'>
            ご予約ありがとうございます。以下のフォームにご記入ください。
          </p>
        </div>
      </div>

      <div className='min-h-screen bg-gray-50'>
        <div className='h-max w-screen max-w-screen-sm mx-auto overflow-x-hidden flex p-1 flex-col justify-start items-center'>
          <FormProvider {...methods}>
            <form className='w-full bg-white rounded-lg shadow-sm p-2 mt-2 mb-4' onSubmit={(e: any) => e.preventDefault()}>
            {orderFields.map((key, index) => {
              const value = fieldMap[key]
              const inputType = fieldMap[key].inputType || 'text'
              const rules = fieldMap[key].rules
              const placeholder = fieldMap[key].placeholder
              const orderLength = orderFields.length

              // Skip end time fields - they are rendered with start time
              if (['endTimeOne', 'endTimeTwo', 'endTimeThree'].includes(key)) {
                return null
              }

              // Render time selection fields together
              if (['startTimeOne', 'startTimeTwo', 'startTimeThree'].includes(key)) {
                const endTimeKey = key.replace('start', 'end') as RegisterFieldKeys
                
                return (
                  <React.Fragment key={key}>
                    <FormField questionName={['時間帯']} isDriver>
                      <div className='flex flex-row gap-2 w-full items-center'>
                        <SelectField
                          items={value.items}
                          name={key}
                          orderNumber={0}
                          orderLength={0}
                          error={errors[key] as FieldError | undefined}
                          rules={rules}
                        />
                        <div className='h-fit'>〜</div>
                        <SelectField
                          items={fieldMap[endTimeKey].items}
                          name={endTimeKey}
                          orderNumber={0}
                          orderLength={0}
                          error={errors[endTimeKey] as FieldError | undefined}
                          rules={fieldMap[endTimeKey].rules}
                        />
                      </div>
                    </FormField>
                  </React.Fragment>
                )
              }

              let child = null

              switch (value.type) {
                case 'select':
                  child = (
                      <SelectField
                        items={value.items}
                        name={key}
                        orderNumber={0}
                        orderLength={0}
                        error={errors[key]as FieldError | undefined}
                        rules={rules}
                      />
                  )
                  break

                case 'radio':
                  child = (
                    <RadioField
                      items={value.items}
                      name={key}
                      orderNumber={0}
                      orderLength={0}
                      error={errors[key] as FieldError | undefined}
                      rules={rules}
                      // 1-3 items → show according to number of items
                      // 4 items → 2 columns
                      // 5+ items → 3 columns
                      gridCol={value.items.length <= 3 ? value.items.length : value.items.length <= 4 ? 2 : 3}
                      isDriver
                    />
                  )
                  break

                case 'multiselect':
                  child = (
                      <MultiSelectField
                        items={value.items}
                        name={key}
                        orderNumber={0}
                        orderLength={0}
                        error={errors[key] as FieldError | undefined}
                        rules={rules}
                      />
                  )
                  break

                case 'date':
                  child = (
                      <DateField
                        name={key}
                        error={errors[key] as FieldError | undefined}
                        rules={rules}
                        dateFormat='yyyy年MM月dd日'
                        placeholder='日付を選択してください'
                        adsCode={adsCode || ''}
                      />
                  )
                  break

                case 'textarea':
                  child = (
                      <TextareaField
                        name={key}
                        error={errors[key] as FieldError | undefined}
                        rules={rules}
                        placeholder={placeholder}
                      />
                  )
                  break

                case 'image':
                  child = (
                      <ImageUploadField
                        name={key}
                        error={errors[key] as FieldError | undefined}
                        rules={rules}
                        maxFiles={5}
                      />
                  )
                  break

                default:
                  child = (
                      <InputField
                        name={key}
                        type={inputType}
                        suffix={value?.suffix}
                        error={errors[key] as FieldError | undefined}
                        rules={rules}
                        placeholder={placeholder}
                      />
                  )
                  break
              }

              return (
                <FormField key={key} questionName={value.question} isDriver>
                  {child}
                </FormField>
              )
            })}

            <button
              className='w-full mt-8 py-4 px-6 
              text-lg font-bold text-white 
              bg-linear-to-r from-green-400 to-green-500
              hover:from-green-500 hover:to-green-600
              rounded-lg shadow-lg
              transform transition-all duration-200
              hover:scale-[1.02] hover:shadow-xl
              focus:outline-none focus:ring-4 focus:ring-green-300
              disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none'
              type='button'
              disabled={!isValid || isSending}
              onClick={handleSubmit(onSubmit)}
            >
              {isSending ? (
                <span className='flex items-center justify-center gap-2'>
                  <svg className='animate-spin h-5 w-5' viewBox='0 0 24 24'>
                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' fill='none'></circle>
                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                  </svg>
                  送信中...
                </span>
              ) : (
                <span className='flex items-center justify-center gap-2'>
                予約する
                </span>
              )}
            </button>
          </form>
          {errorMsg && (
            <div className='mt-4 p-4 bg-red-50 border border-red-200 rounded-lg '>
              <p className='text-sm font-semibold text-rose-600 flex items-center gap-2'>
              {errorMsg}
              </p>
            </div>
          )}
        </FormProvider>
      </div>
    </div>
    </>
  )
}

function RegisterPage() {
  return (
    <Suspense fallback={<div className='w-screen h-screen flex items-center justify-center'>Loading...</div>}>
      <Register code="" />
    </Suspense>
  )
}

export default RegisterPage
