import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import fieldMap, {
  AppointmentFieldKeys,
  AppointmentFields,
} from '../../constants/appointmentDriver'
import axiosInstance, { handleAPIErrors } from '../../utils/axiosInstance'
import transformResponse from '../../utils/transformResponse'
import SelectField from '../../components/FormField/SelectField'
import DateField from '../../components/FormField/DateField'
import Logo from '../../components/Commons/Logo'

type ParameterKeys = 'adsCode' | 'drName' | 'drPhone' | 'drAddress' | 'drAge' | 'drExperience'

type ParameterFields = Record<ParameterKeys, string | string[]>

const libTimeItems = [
  { label: '指定なし', value: '指定なし' },
  { label: '9時', value: '9時' },
  { label: '10時', value: '10時' },
  { label: '11時', value: '11時' },
  { label: '12時', value: '12時' },
  { label: '13時', value: '13時' },
  { label: '14時', value: '14時' },
  { label: '15時', value: '15時' },
  { label: '16時', value: '16時' },
  { label: '17時', value: '17時' },
  { label: '18時', value: '18時' },
  { label: '19時', value: '19時' },
  { label: '20時', value: '20時' },
  { label: '21時', value: '21時' },
  { label: '22時', value: '22時' },
  { label: '23時', value: '23時' },
]

export default function Appointment() {
  const methods = useForm<AppointmentFields>({
    mode: 'onChange',
    defaultValues: {
      dayOne: '',
      startTimeOne: '',
      endTimeOne: '',
      dayTwo: '',
      startTimeTwo: '',
      endTimeTwo: '',
      dayThree: '',
      startTimeThree: '',
      endTimeThree: '',
    },
  })

  const orderFields: AppointmentFieldKeys[] = [
    'dayOne',
    'startTimeOne',
    'endTimeOne',
    'dayTwo',
    'startTimeTwo',
    'endTimeTwo',
    'dayThree',
    'startTimeThree',
    'endTimeThree',
  ]

  const router = useRouter()
  const param: ParameterFields = {
    adsCode: router.query?.ecaiad || '',
    drName: router.query?.name || '',
    drPhone: router.query?.phone || '',
    drAddress: router.query?.address || '',
    drAge: router.query?.age || '',
    drExperience: router.query?.experience || '',
  }

  const isLiBa = [
    'libyahoo',
    'libbaitoru',
    'libindeed',
    'libjmty0',
    'libindeed0',
    'libjmty',
    'libyda',
    'libsg',
  ].includes(param?.adsCode as string)

  const specialCode = [
    'libsg',
    'libjmty',
    'asJVWJ7x',
    'ahmeazEW',
    'lNDY2w6W',
    'Wmw0cffI',
    'W6muSqaJ',
  ]

  const specialCodeBS = ['bsexpindeed', 'bsexpjmty', 'bsexpbaitoru', 'bsexp']

  const {
    handleSubmit,
    formState: { errors },
  } = methods

  const [isSending, setIsSending] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>('')

  const onSubmit = async (formData: AppointmentFields) => {
    try {
      setIsSending(true)
      // LINE Notify
      if (specialCode.includes(param?.adsCode as string)) {
        await transformResponse<{ data: AppointmentFields }>(
          axiosInstance.post('/api/appointment_line_notify', {
            drName: param.drPhone,
            drAge: param.drAge,
            drPhoneNumber: param.drName,
            drExperience: param.drExperience,
            drAddress: param.drAddress,
            appointmentDayOne: dayjs(formData.dayOne).format('YYYY年MM月DD日'),
            startTimeOne: formData.startTimeOne || '指定なし',
            endTimeOne: formData.endTimeOne || '指定なし',
            appointmentDayTwo: formData.dayTwo
              ? dayjs(formData.dayTwo).format('YYYY年MM月DD日')
              : '指定なし',
            startTimeTwo: formData.startTimeTwo || '指定なし',
            endTimeTwo: formData.endTimeTwo || '指定なし',
            appointmentDayThree: formData.dayThree
              ? dayjs(formData.dayThree).format('YYYY年MM月DD日')
              : '指定なし',
            startTimeThree: formData.startTimeThree || '指定なし',
            endTimeThree: formData.endTimeThree || '指定なし',
            adsCode: param.adsCode,
          }),
        )
      }

      if (specialCodeBS.includes(param?.adsCode as string)) {
        await transformResponse<{ data: AppointmentFields }>(
          axiosInstance.post('/api/appointment_line_notify_bs', {
            drName: param.drPhone,
            drAge: param.drAge,
            drPhoneNumber: param.drName,
            drExperience: param.drExperience,
            drAddress: param.drAddress,
            appointmentDayOne: dayjs(formData.dayOne).format('YYYY年MM月DD日'),
            startTimeOne: formData.startTimeOne || '指定なし',
            endTimeOne: formData.endTimeOne || '指定なし',
            appointmentDayTwo: formData.dayTwo
              ? dayjs(formData.dayTwo).format('YYYY年MM月DD日')
              : '指定なし',
            startTimeTwo: formData.startTimeTwo || '指定なし',
            endTimeTwo: formData.endTimeTwo || '指定なし',
            appointmentDayThree: formData.dayThree
              ? dayjs(formData.dayThree).format('YYYY年MM月DD日')
              : '指定なし',
            startTimeThree: formData.startTimeThree || '指定なし',
            endTimeThree: formData.endTimeThree || '指定なし',
            adsCode: param.adsCode,
          }),
        )
      }

      router.push(`/recruit/appointment-thankyou?ecaiad=${param.adsCode}`)
      setIsSending(false)
    } catch (e) {
      handleAPIErrors(e)
      setErrorMsg('送信エラーが発生しました。再度お応募してください。')
    }
  }

  const formFieldKeys = Object.keys(fieldMap) as AppointmentFieldKeys[]

  return (
    <>
      <Head>
        <title>SKG-面接予約フォーム</title>
      </Head>

      <div className='h-max w-screen max-w-screen-sm mx-auto overflow-x-hidden flex p-4 flex-col justify-start items-center'>
        <Logo isDriver />
        <div className='text-center w-full'>
          <div className='mx-auto h-1/2'>
            <Image
              src='/images/recruit/thankyou.png'
              alt='thankyou'
              height={80}
              objectFit='contain'
            />
            <p className='text-lg font-bold text-cyan-400'>
              LINEを使った15分程度のオンライン面接となります。
              <br />
              面接可能日時をご指定ください。
              <br />
              (日時確定時に送るURLをクリックするだけで開始できます)
            </p>
          </div>
          <br />
          <p>面接前に確認、質問がある場合は公式ラインに送信をお願いします。</p>
        </div>
        <FormProvider {...methods}>
          <form className='w-full' onSubmit={(e: any) => e.preventDefault()}>
            {formFieldKeys.map((key, index) => {
              const value = fieldMap[key]
              const rules = fieldMap[key].rules
              const questionNumber = Math.round((index + 1) / 3) + 1
              const nextFieldKey = orderFields[index + 1]

              if (['endTimeOne', 'endTimeTwo', 'endTimeThree'].includes(key)) {
                return null
              }

              if (['startTimeOne', 'startTimeTwo', 'startTimeThree'].includes(key)) {
                return (
                  <React.Fragment key={key}>
                    <p className='mt-2'>時間</p>
                    <div className='flex flex-row gap-2 w-full items-center'>
                      <SelectField
                        items={isLiBa ? libTimeItems : value.items}
                        name={key}
                        rules={rules}
                        error={errors[key]}
                        orderNumber={0}
                        orderLength={0}
                      />
                      <div className='h-fit'>〜</div>
                      <SelectField
                        items={isLiBa ? libTimeItems : value.items}
                        name={nextFieldKey}
                        rules={rules}
                        error={errors[key]}
                        orderNumber={0}
                        orderLength={0}
                      />
                    </div>
                  </React.Fragment>
                )
              }

              return (
                <div className='mt-8' key={key}>
                  <div>
                    {`第${questionNumber}希望 `}
                    {rules.required ? <span className='text-red-600'>(必須)</span> : ''}
                  </div>
                  <DateField
                    name={key}
                    error={errors[key]}
                    rules={rules}
                    dateFormat='yyyy年MM月dd日'
                    placeholder='日付を選択してください'
                    adsCode={param?.adsCode || ''}
                  />
                </div>
              )
            })}

            <button
              className='w-full mt-6 py-4 px-6 
              text-lg font-medium text-white bg-green-400 
              rounded-md border border-gray-200 
              disabled:bg-gray-300'
              type='button'
              disabled={isSending}
              onClick={handleSubmit(onSubmit)}
            >
              {isSending ? '予約中...' : '面接予約する'}
            </button>
          </form>

          {errorMsg && <p className='m-3 text-sm font-semibold text-rose-500'>{errorMsg}</p>}
          <div className='h-40'></div>
        </FormProvider>
      </div>
    </>
  )
}
