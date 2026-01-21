import React, { Fragment } from 'react'
import Image from 'next/image'

type IFormFieldBotTalkProps = {
  questionName: string[]
  children?: React.ReactNode
  isDriver?: boolean
}

const FormFieldBotTalk: React.FC<IFormFieldBotTalkProps> = ({ questionName, children }) => {
  return (
    <div className='mt-6 flex flex-col justify-start'>
      {questionName.length > 0 && questionName[0] != '' && (
        <div className='flex justify-between w-full'>
          <div className='mt-2 overflow-hidden relative w-10 h-10 bg-linear-to-br from-green-400 to-green-500 rounded-full shadow-md shrink-0'>
            <Image
              src='/images/cleaning/register_bot.png'
              alt='bot-image'
              width={100}
              height={100}
            />
          </div>
          <div
            className='relative w-fit content-center bg-white border border-gray-200 px-4 py-2 ml-4 rounded-xl shadow-sm
          before:absolute before:content-[""] before:top-4 before:-left-2.5 before:w-0 before:h-0 
          before:border-t-8 before:border-t-transparent before:border-b-8 before:border-b-transparent before:border-r-10 before:border-r-gray-200
          after:absolute after:content-[""] after:top-4 after:-left-2 after:w-0 after:h-0 
          after:border-t-8 after:border-t-transparent after:border-b-8 after:border-b-transparent after:border-r-10 after:border-r-white'
          >
            {questionName.map((question) => (
              <Fragment key={question}>
                <span className='text-gray-700 text-sm leading-relaxed'>{question}</span>
                <br />
              </Fragment>
            ))}
          </div>
        </div>
      )}
      <div className='mt-3'>{children}</div>
    </div>
  )
}

export default FormFieldBotTalk
