import React, { Fragment } from 'react'
import Image from 'next/image'

type IFormFieldBotTalkProps = {
  questionName: string[]
  children?: React.ReactNode
  isDriver?: boolean
}

const FormFieldBotTalk: React.FC<IFormFieldBotTalkProps> = ({
  questionName,
  children,
  isDriver,
}) => {
  return (
    <div className='mt-6 flex flex-col justify-start'>
      {questionName.length > 0 && questionName[0] != '' && (
        <div className='flex justify-between w-full'>
          <div className='mt-2 overflow-hidden relative w-10 h-10 bg-gray-100 rounded-full'>
            <Image
              src={
                isDriver ? '/images/recruit/register_bot.png' : '/images/worksheet/bot-image.png'
              }
              alt='bot-image'
              width={100}
              height={100}
              layout='responsive'
              objectFit='contain'
            />
          </div>
          <div
            className='relative w-fit bg-slate-200 py-4 px-4 ml-4 rounded-md 
          before:absolute before:content-[""] before:top-4 before:left-[-15px] before:w-0 before:h-0 
          before:border-t-[10px] before:border-t-transparent before:border-b-[10px] before:border-b-transparent before:border-r-[15px] before:border-r-slate-200'
          >
            {questionName.map((question) => (
              <Fragment key={question}>
                <span>{question}</span>
                <br />
              </Fragment>
            ))}
          </div>
        </div>
      )}
      {children}
    </div>
  )
}

export default FormFieldBotTalk
