'use client'

import React, { Suspense } from 'react'
import Head from 'next/head'
import Image from 'next/image'

const CleaningThankYou: React.FC = () => {
  return (
    <>
      <Head>
        <title>予約完了 - NANYARU クリーニング</title>
      </Head>
      <div className='min-h-screen w-screen bg-gray-50 flex flex-col items-center justify-center p-2'>
        <div className='max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center'>
          <div className='mb-6'>
            <div className='w-24 h-24 mx-auto mb-4 flex items-center justify-center'>
              <Image
                src='/images/cleaning/register_bot1.png'
                alt='あらいぐま'
                width={96}
                height={96}
                className='object-contain'
              />
            </div>
            <h1 className='text-xl font-bold text-gray-800 mb-2'>ご予約ありがとうございます</h1>
            <p className='text-gray-600'>クリーニングのご予約を承りました。</p>
          </div>

          <div className='text-sm text-gray-500 mb-6'>
            <p>ご不明な点がございましたら、</p>
            <p>お気軽にお問い合わせください。</p>
          </div>

          <a
            href='https://skg.ecai.jp/optin/13?ecaiad=itZfluaz'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-block w-full py-3 px-6 bg-green-400 text-white font-medium rounded-md hover:bg-green-500 transition-colors'
          >
            公式ラインに戻る
          </a>
        </div>
      </div>
    </>
  )
}

function CleaningThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className='w-screen h-screen flex items-center justify-center'>Loading...</div>
      }
    >
      <CleaningThankYou />
    </Suspense>
  )
}

export default CleaningThankYouPage
