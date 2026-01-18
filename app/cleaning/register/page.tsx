'use client'

import React, { useRef, useState, useEffect, Suspense } from 'react'
import dayjs from 'dayjs'
import { FormProvider, useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'
import Head from 'next/head'
import isEmpty from 'lodash/isEmpty'
import { Oaza } from 'jp-zipcode-lookup'
import fieldMap, { RegisterFieldKeys, RegisterFields, usingItems } from '../../../constants/registerCleaning'
import axiosInstance, { handleAPIErrors } from '../../../utils/axiosInstance'
import transformResponse from '../../../utils/transformResponse'
import FormField from '../../../components/FormField/FormField'
import FormFieldInputButton from '../../../components/FormField/FormFieldInputButton'
import InputField from '../../../components/FormField/InputField'
import RadioField from '../../../components/FormField/RadioField'
import SelectField from '../../../components/FormField/SelectField'
import MultiSelectField from '../../../components/FormField/MultiSelectField'
import DateField from '../../../components/FormField/DateField'
import TextareaField from '../../../components/FormField/TextareaField'
import OrderField from '../../../components/FormField/OrderField'

export type CleaningFormInputs = {
  cleanName: string
  cleanFurigana: string
  cleanPhoneNumber: string
  cleanPostCode: string
  cleanExperience: string
  cleanNumOfAirCon: string
  cleanNumOfAirConOut: string
  cleanOtherRequest: string
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
  cleanAddress: string
  cleanBike: string
  cleanOtherWarning: string
  adsCode?: string
  registerTime?: string
  registerDate?: string
}

type Address = {
  prefectureCode: string // 都道府県コード
  prefecture: string // 都道府県
  address1: string // 市区町村
  address2: string // 市区町村配下
}

type RegisterProps = {
  code: string | string[]
  hiddenCoverImg?: boolean
  disableAutoScroll?: boolean
}

function lookupAddress(postCode: string): Address | null {
  if (postCode.length < 7) return null

  const result = Oaza.byZipcode(postCode)[0]
  if (!result) return null

  return {
    prefectureCode: result.pref.code,
    prefecture: result.pref.name,
    address1: result.city.name,
    address2: result.name,
  }
}

const Register: React.FC<RegisterProps> = ({ code, hiddenCoverImg, disableAutoScroll = true }) => {
  const methods = useForm<CleaningFormInputs>({
    mode: 'onChange',
    defaultValues: {
      cleanName: '',
      cleanFurigana: '',
      cleanPhoneNumber: '',
      cleanPostCode: '',
      cleanExperience: '',
      cleanNumOfAirCon: '',
      cleanNumOfAirConOut: '',
      cleanOtherRequest: '',
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
      cleanAddress: '',
      cleanBike: '',
      cleanOtherWarning: '',
    },
  })

  const orderFields: RegisterFieldKeys[] = [
    'cleanName',
    'cleanFurigana',
    'cleanPhoneNumber',
    'cleanPostCode',
    'cleanExperience',
    'cleanNumOfAirCon',
    'cleanNumOfAirConOut',
    'cleanOtherRequest',
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
    'cleanAddress',
    'cleanBike',
    'cleanOtherWarning',
  ]

  const ref = useRef<HTMLDivElement>(null)
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
  const fields = watch()

  const [isSending, setIsSending] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [postCode, setPostCode] = useState<string>('')
  const [isDisableAutoScroll, setIsDisableAutoScroll] = useState(disableAutoScroll)
  const address = lookupAddress(postCode)

  useEffect(() => {
    if (nameParams && phoneParams) {
      setValue('cleanName', nameParams)
      setValue('cleanPhoneNumber', phoneParams)
    }
  }, [nameParams, phoneParams])

  useEffect(() => {
    if (ref.current && !isDisableAutoScroll) {
      const offsetBottom = ref.current.offsetTop + ref.current.offsetHeight
      window.scrollTo({ top: offsetBottom, behavior: 'smooth' })
    }
  }, [ref])

  useEffect(() => {
    setPostCode(fields.cleanPostCode)
  }, [fields])

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
    const newAddress = address ? address.prefecture + address.address1 + address.address2 : formData.cleanAddress

    try {
      // Save data to Spreadsheet
      await transformResponse<{ data: CleaningFormInputs }>(
        axiosInstance.post('/api/spreadsheet/cleaning_register', {
          cleanName: formData.cleanName,
          cleanFurigana: formData.cleanFurigana,
          cleanPhoneNumber: formData.cleanPhoneNumber,
          cleanPostCode: formData.cleanPostCode,
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
          cleanAddress: newAddress,
          cleanBike: formData.cleanBike,
          cleanOtherWarning: formData.cleanOtherWarning,
          adsCode,
          registerDate: dayjs().format('YYYY-MM-DD'),
          registerTime: dayjs().format('HH:mm:ss'),
        }),
      )

      // LINE Notify
      await transformResponse<{ data: CleaningFormInputs }>(
        axiosInstance.post('/api/cleaning_line_notify', {
          cleanName: formData.cleanName,
          cleanFurigana: formData.cleanFurigana,
          cleanPhoneNumber: formData.cleanPhoneNumber,
          cleanPostCode: formData.cleanPostCode,
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
          cleanAddress: newAddress,
          cleanBike: formData.cleanBike,
          cleanOtherWarning: formData.cleanOtherWarning,
          adsCode,
        }),
      )

      router.push(`/recruit/cleaning-thankyou?ecaiad=${adsCode}`)
    } catch (e) {
      handleAPIErrors(e)
      setErrorMsg('送信エラーが発生しました。再度お応募してください。')
    } finally {
      setIsSending(false)
    }
  }

  const formFieldKeys = Object.keys(fieldMap) as RegisterFieldKeys[]

  return (
    <>
      <Head>
        <title>NANYARU-クリーニング予約フォーム</title>
      </Head>
      <div>
          <div className='text-center font-bold'>クリーニング予約フォーム</div>
      </div>
      <div className='h-max w-screen max-w-screen-sm mx-auto overflow-x-hidden flex p-4 flex-col justify-start items-center'>
        <FormProvider {...methods}>
          <form className='w-full' onSubmit={(e: any) => e.preventDefault()}>
            {orderFields.map((key, index) => {
              const value = fieldMap[key]
              const nextFieldKey = orderFields[index + 1]
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
                          error={errors[key]}
                          rules={rules}
                        />
                        <div className='h-fit'>〜</div>
                        <SelectField
                          items={fieldMap[endTimeKey].items}
                          name={endTimeKey}
                          orderNumber={0}
                          orderLength={0}
                          error={errors[endTimeKey]}
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
                        orderNumber={index}
                        orderLength={orderLength}
                        error={errors[key]}
                        rules={rules}
                      />
                  )
                  break

                case 'radio':
                  child = (
                    <RadioField
                      items={value.items}
                      name={key}
                      orderNumber={index}
                      orderLength={orderLength}
                      error={errors[key]}
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
                        orderNumber={index}
                        orderLength={orderLength}
                        error={errors[key]}
                        rules={rules}
                      />
                  )
                  break

                case 'date':
                  child = (
                      <DateField
                        name={key}
                        error={errors[key]}
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
                        error={errors[key]}
                        rules={rules}
                        placeholder={placeholder}
                      />
                  )
                  break

                default:
                  child = (
                    <>
                      <InputField
                        name={key}
                        type={inputType}
                        suffix={value?.suffix}
                        error={errors[key]}
                        rules={rules}
                        placeholder={placeholder}
                      />
                      {orderLength > 0 && (
                        <OrderField orderNumber={index} orderLength={orderLength} />
                      )}
                    </>
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
              className='w-full mt-6 py-4 px-6 
              text-lg font-medium text-white bg-green-400 
              rounded-md border border-gray-200 
              focus:outline-none focus:z-10 focus:ring-1 disabled:bg-gray-300'
              type='button'
              disabled={!isValid || isSending}
              onClick={handleSubmit(onSubmit)}
            >
              {isSending ? '送信中...' : '予約する'}
            </button>
          </form>
          {errorMsg && <p className='m-3 text-sm font-semibold text-rose-500'>{errorMsg}</p>}
          <div className='h-40' ref={ref}></div>
        </FormProvider>
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
