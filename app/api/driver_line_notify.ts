import { messagingApi } from '@line/bot-sdk'
import { NextApiRequest, NextApiResponse } from 'next'

const config = {
  channelAccessToken: process.env.NEXT_PUBLIC_LINE_CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.NEXT_PUBLIC_LINE_CHANNEL_SECRET || '',
}
const groupId = process.env.NEXT_PUBLIC_LINE_DRIVER_GROUP_ID

const client = new messagingApi.MessagingApiClient(config)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
      drName,
      drAge,
      drPhoneNumber,
      drPostCode,
      drAddress,
      drExperience,
      drEndTime,
      drDay,
      drStartTime,
      adsCode,
    } = req.body

    const message = `
    新規ドライバー情報が入りました。一度ご連絡をお試して下さい。
      ○お名前：${drName || ''}
      ○年齢：${drAge || ''}
      ○電話番号：${drPhoneNumber || ''}
      ○郵便番号：${drPostCode || ''}
      ○住所：${drAddress || ''}
      ○経験：${drExperience || ''}
      ○連絡希望時間：${drDay + ' ' + drStartTime + '-' + drEndTime || ''}
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

    res.status(200).json({ success: true })
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' })
  }
}
