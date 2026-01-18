'use client'

import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Head from 'next/head'

const CleaningThankYou: React.FC = () => {
  return (
    <>
      <Head>
        <title>予約完了 - NANYARU クリーニング</title>
      </Head>
      <div className='min-h-screen w-screen bg-gray-50 flex flex-col items-center justify-center p-4'>
        <div className='max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center'>
          <div className='mb-6'>
            <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg
                className='w-8 h-8 text-green-500'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 13l4 4L19 7'
                />
              </svg>
            </div>
            <h1 className='text-xl font-bold text-gray-800 mb-2'>
              ご予約ありがとうございます
            </h1>
            <p className='text-gray-600'>
              クリーニングのご予約を承りました。
            </p>
          </div>

          <div className='bg-gray-50 rounded-lg p-4 mb-6 text-left'>
            <h2 className='font-semibold text-gray-800 mb-2'>今後の流れ</h2>
            <ul className='text-sm text-gray-600 space-y-2'>
              <li className='flex items-start'>
                <span className='text-green-500 mr-2'>①</span>
                <span>担当者より確認のお電話をさせていただきます</span>
              </li>
              <li className='flex items-start'>
                <span className='text-green-500 mr-2'>②</span>
                <span>日程を調整の上、作業日を確定いたします</span>
              </li>
              <li className='flex items-start'>
                <span className='text-green-500 mr-2'>③</span>
                <span>当日、スタッフがお伺いいたします</span>
              </li>
            </ul>
          </div>

          <div className='text-sm text-gray-500 mb-6'>
            <p>ご不明な点がございましたら、</p>
            <p>お気軽にお問い合わせください。</p>
          </div>

          <a
            href='/cleaning/lp'
            className='inline-block w-full py-3 px-6 bg-green-400 text-white font-medium rounded-md hover:bg-green-500 transition-colors'
          >
            トップページへ戻る
          </a>
        </div>
      </div>
    </>
  )
}

function CleaningThankYouPage() {
  return (
    <Suspense fallback={<div className='w-screen h-screen flex items-center justify-center'>Loading...</div>}>
      <CleaningThankYou />
    </Suspense>
  )
}

export default CleaningThankYouPage
