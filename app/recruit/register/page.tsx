'use client'

import React, { useRef, useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { FormProvider, useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'
import Head from 'next/head'
import isEmpty from 'lodash/isEmpty'
import { Oaza } from 'jp-zipcode-lookup'
import fieldMap, { RegisterFieldKeys, experienceItems } from '../../../constants/registerCleaning'
import axiosInstance, { handleAPIErrors } from '../../../utils/axiosInstance'
import transformResponse from '../../../utils/transformResponse'
import FormField from '../../../components/FormField/FormField'
import FormFieldInputButton from '../../../components/FormField/FormFieldInputButton'
import InputField from '../../../components/FormField/InputField'
import RadioField from '../../../components/FormField/RadioField'
import SelectField from '../../../components/FormField/SelectField'
import OrderField from '../../../components/FormField/OrderField'

export type DrFormInputs = {
  drName: string | string[]
  drAge: string
  drPhoneNumber: string | string[]
  drPostCode: string
  drExperience: string
  drAddress?: string
  drDay: string
  drStartTime: string
  drEndTime: string
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
  const methods = useForm<DrFormInputs>({
    mode: 'onChange',
    defaultValues: {
      drName: '',
      drPhoneNumber: '',
      drAge: '',
      drPostCode: '',
      drExperience: '',
      drDay: '',
      drStartTime: '',
      drEndTime: '',
    },
  })

  const orderFields: RegisterFieldKeys[] = [
    'drName',
    'drPhoneNumber',
    'drAge',
    'drPostCode',
    'drExperience',
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

  const [isDisplayedSubmit, setIsDisplayedSubmit] = useState<boolean>(false)
  const [isSending, setIsSending] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [postCode, setPostCode] = useState<string>('')
  const [isHiddenImg, setIsHiddenImg] = useState(false)
  const [isDisableAutoScroll, setIsDisableAutoScroll] = useState(disableAutoScroll)
  const address = lookupAddress(postCode)

  const isLiBa = [
    'libinst',
    'libx',
    'libtiktok',
    'libtube',
    'libsg',
    'asJVWJ7x',
    'ahmeazEW',
    'lNDY2w6W',
    'Wmw0cffI',
    'libyahoo',
    'libbaitoru',
    'libindeed',
    'libjmty0',
    'libindeed0',
    'libjmty',
    'libyda',
  ].includes(adsCode as string)

  const [renderedFields, setRenderedFields] = useState<
    Record<RegisterFieldKeys, { type: 'radio' | 'select' | 'input'; displayed: boolean }>
  >({
    drName: {
      type: 'input',
      displayed: false,
    },
    drPhoneNumber: {
      type: 'input',
      displayed: false,
    },
    drAge: {
      type: 'input',
      displayed: false,
    },
    drPostCode: {
      type: 'input',
      displayed: false,
    },
    drExperience: {
      type: 'radio',
      displayed: false,
    },
  })

  useEffect(() => {
    if (nameParams && phoneParams) {
      setValue('drName', nameParams)
      setValue('drPhoneNumber', phoneParams)
      setRenderedFields({
        ...renderedFields,
        drName: {
          type: 'input',
          displayed: true,
        },
        drPhoneNumber: {
          type: 'input',
          displayed: true,
        },
        drAge: {
          type: 'input',
          displayed: true,
        },
      })
    }
  }, [nameParams, phoneParams])

  useEffect(() => {
    const fieldKeys = Object.keys(fields) as RegisterFieldKeys[]
    fieldKeys.forEach((k, index) => {
      const nextFieldKey = orderFields[index + 1]

      if (renderedFields[nextFieldKey]?.displayed) {
        return
      }
      if (renderedFields[k]?.type === 'input') {
        return
      }

      if (fields[k]) {
        setRenderedFields((prev) => ({
          ...prev,
          [nextFieldKey]: { ...prev[nextFieldKey], displayed: true },
        }))
        setIsDisableAutoScroll(false)
        if (!nextFieldKey) {
          setIsDisplayedSubmit(true)
        }
      }
    })
  }, [fields])

  useEffect(() => {
    if (ref.current && !isDisableAutoScroll) {
      const offsetBottom = ref.current.offsetTop + ref.current.offsetHeight
      window.scrollTo({ top: offsetBottom, behavior: 'smooth' })
    }
  }, [renderedFields, ref])

  useEffect(() => {
    setPostCode(fields.drPostCode)
  }, [fields])

  useEffect(() => {
    setIsHiddenImg(hiddenCoverImg || false)
  }, [])

  const getJapaneseLabel = (experienceValue: string) => {
    const foundItem = experienceItems.find((item) => item.value === experienceValue)
    return foundItem ? foundItem.label : ''
  }

  const onSubmit = async (formData: DrFormInputs) => {
    setIsSending(true)
    const contatStartTime = isEmpty(formData.drStartTime) ? '指定なし' : formData.drStartTime
    const contatEndTime = isEmpty(formData.drEndTime) ? '指定なし' : formData.drEndTime
    const newAddress = address ? address.prefecture + address.address1 + address.address2 : ''

    try {
      // Save data to Spreadsheet
      await transformResponse<{ data: DrFormInputs }>(
        axiosInstance.post('/api/spreadsheet/driver_register', {
          ...formData,
          adsCode,
          drAddress: newAddress,
          drExperience: getJapaneseLabel(formData.drExperience),
          registerDate: dayjs().format('YYYY-MM-DD'),
          registerTime: dayjs().format('HH:mm:ss'),
        }),
      )

      // LINE Notify
      if (isLiBa) {
        await transformResponse<{ data: DrFormInputs }>(
          axiosInstance.post('/api/driver_line_notify', {
            drName: formData.drName,
            drAge: formData.drAge,
            drPhoneNumber: formData.drPhoneNumber,
            drPostCode: formData.drPostCode,
            drExperience: getJapaneseLabel(formData.drExperience),
            drAddress: newAddress,
            drDay: formData.drDay,
            drStartTime: contatStartTime,
            drEndTime: contatEndTime,
            adsCode,
          }),
        )
      }

      router.push(`/recruit/register-thankyou?ecaiad=${adsCode}`)
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
        <title>NANYARU-求人フォーム</title>
      </Head>

      <div>
        {isHiddenImg ? (
          <div className='text-center font-bold'>求人フォーム</div>
        ) : (
          <img className='mx-auto' src='/images/recruit/register_image.png' alt='' width='100%' />
        )}
      </div>
      <div className='h-max w-screen max-w-screen-sm mx-auto overflow-x-hidden flex p-4 flex-col justify-start items-center'>
        <FormProvider {...methods}>
          <form className='w-full' onSubmit={(e: any) => e.preventDefault()}>
            {formFieldKeys.map((key, index) => {
              const value = fieldMap[key]
              const nextFieldKey = orderFields[index + 1]
              const inputType = fieldMap[key].inputType || 'text'
              const rules = fieldMap[key].rules
              const placeholder = fieldMap[key].placeholder
              const orderLength = orderFields.length

              let child = (
                <InputField
                  name={key}
                  type={inputType}
                  error={errors[key]}
                  rules={rules}
                  placeholder={placeholder}
                />
              )

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
                      flexCol
                      isDriver
                    />
                  )

                  break

                default:
                  {
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
                        <FormFieldInputButton
                          disabled={
                            !Boolean(!isEmpty(fields[key]) && isEmpty(errors[key]?.message))
                          }
                          onClickBtn={() => {
                            setRenderedFields((prev) => ({
                              ...prev,
                              [nextFieldKey]: { ...prev[nextFieldKey], displayed: true },
                            }))
                            setIsDisableAutoScroll(false)
                          }}
                          isDriver
                        />
                        {orderFields.length > 0 && (
                          <OrderField orderNumber={index} orderLength={orderLength} />
                        )}
                      </>
                    )
                  }
                  break
              }

              if (!index) {
                return (
                  <React.Fragment key={key}>
                    <FormField key={`${key}-${index}`} questionName={value.question} isDriver>
                      {child}
                    </FormField>
                  </React.Fragment>
                )
              }
              if (renderedFields[key].displayed) {
                return (
                  <React.Fragment key={key}>
                    <FormField key={`${key}-${index}`} questionName={value.question} isDriver>
                      {child}
                    </FormField>
                  </React.Fragment>
                )
              }

              return null
            })}

            {isDisplayedSubmit && (
              <button
                className='w-full mt-6 py-4 px-6 
              text-lg font-medium text-white bg-green-400 
              rounded-md border border-gray-200 
              focus:outline-none focus:z-10 focus:ring-1 disabled:bg-gray-300'
                type='button'
                disabled={!isValid || isSending}
                onClick={handleSubmit(onSubmit)}
              >
                {isSending ? '送信中...' : '応募する'}
              </button>
            )}
          </form>
          {errorMsg && <p className='m-3 text-sm font-semibold text-rose-500'>{errorMsg}</p>}
          <div className='h-40' ref={ref}></div>
        </FormProvider>
      </div>
    </>
  )
}

export default Register
