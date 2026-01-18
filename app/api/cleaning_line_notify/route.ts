import { NextRequest, NextResponse } from 'next/server'
import { messagingApi } from '@line/bot-sdk'

const config = {
  channelAccessToken: process.env.NEXT_PUBLIC_LINE_CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.NEXT_PUBLIC_LINE_CHANNEL_SECRET || '',
}
const groupId = process.env.NEXT_PUBLIC_LINE_CLEANING_GROUP_ID

const client = new messagingApi.MessagingApiClient(config)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      cleanName,
      cleanFurigana,
      cleanPhoneNumber,
      cleanPostCode,
      cleanExperience,
      cleanNumOfAirCon,
      cleanNumOfAirConOut,
      cleanOtherRequest,
      cleanOtherMenu,
      appointmentDayOne,
      startTimeOne,
      endTimeOne,
      appointmentDayTwo,
      startTimeTwo,
      endTimeTwo,
      appointmentDayThree,
      startTimeThree,
      endTimeThree,
      cleanAddress,
      cleanBike,
      cleanOtherWarning,
      adsCode,
    } = body

    const message = `
新規クリーニング予約が入りました。
○お名前：${cleanName || ''}
○フリガナ：${cleanFurigana || ''}
○電話番号：${cleanPhoneNumber || ''}
○郵便番号：${cleanPostCode || ''}
○住所：${cleanAddress || ''}
○ご利用経験：${cleanExperience || ''}
○エアコン(お掃除機能なし)：${cleanNumOfAirCon || ''}
○エアコン室外機：${cleanNumOfAirConOut || ''}
○エアコン型番：${cleanOtherRequest || ''}
○水回りメニュー：${cleanOtherMenu || ''}
○第1希望日時：${appointmentDayOne || ''} ${startTimeOne}〜${endTimeOne}
○第2希望日時：${appointmentDayTwo || ''} ${startTimeTwo}〜${endTimeTwo}
○第3希望日時：${appointmentDayThree || ''} ${startTimeThree}〜${endTimeThree}
○駐輪スペース：${cleanBike || ''}
○その他：${cleanOtherWarning || ''}
○広告コード：${adsCode || ''}
`

    if (groupId) {
      await client.pushMessage({
        to: groupId,
        messages: [
          {
            type: 'textV2',
            text: `{everyone}\n ${message}`,
            substitution: {
              everyone: {
                type: 'mention',
                mentionee: {
                  type: 'all',
                },
              },
            },
          },
        ],
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending LINE notification:', error)
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 })
  }
}
