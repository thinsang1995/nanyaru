import { NextRequest, NextResponse } from 'next/server'
import { messagingApi } from '@line/bot-sdk'

const config = {
  channelAccessToken: process.env.NEXT_PUBLIC_LINE_CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.NEXT_PUBLIC_LINE_CHANNEL_SECRET || '',
}
const groupId = process.env.NEXT_PUBLIC_LINE_CLEANING_GROUP_ID

// imgbb config
const imgbbApiKey = process.env.IMGBB_API_KEY || ''

const client = new messagingApi.MessagingApiClient(config)

// Upload image to imgbb and get public URL
async function uploadToImgbb(file: File): Promise<string | null> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')
    
    const formData = new FormData()
    formData.append('key', imgbbApiKey)
    formData.append('image', base64)
    
    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    })
    
    if (response.ok) {
      const data = await response.json()
      return data.data?.url || null
    }
    return null
  } catch (error) {
    console.error('Error uploading to imgbb:', error)
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const cleanName = formData.get('cleanName') as string || ''
    const cleanFurigana = formData.get('cleanFurigana') as string || ''
    const cleanPhoneNumber = formData.get('cleanPhoneNumber') as string || ''
    const cleanPostCode = formData.get('cleanPostCode') as string || ''
    const cleanExperience = formData.get('cleanExperience') as string || ''
    const cleanNumOfAirCon = formData.get('cleanNumOfAirCon') as string || ''
    const cleanNumOfAirConOut = formData.get('cleanNumOfAirConOut') as string || ''
    const cleanOtherRequest = formData.get('cleanOtherRequest') as string || ''
    const cleanOtherMenu = formData.get('cleanOtherMenu') as string || ''
    const appointmentDayOne = formData.get('appointmentDayOne') as string || ''
    const startTimeOne = formData.get('startTimeOne') as string || ''
    const endTimeOne = formData.get('endTimeOne') as string || ''
    const appointmentDayTwo = formData.get('appointmentDayTwo') as string || ''
    const startTimeTwo = formData.get('startTimeTwo') as string || ''
    const endTimeTwo = formData.get('endTimeTwo') as string || ''
    const appointmentDayThree = formData.get('appointmentDayThree') as string || ''
    const startTimeThree = formData.get('startTimeThree') as string || ''
    const endTimeThree = formData.get('endTimeThree') as string || ''
    const cleanAddress = formData.get('cleanAddress') as string || ''
    const cleanBike = formData.get('cleanBike') as string || ''
    const cleanOtherWarning = formData.get('cleanOtherWarning') as string || ''
    const adsCode = formData.get('adsCode') as string || ''
    
    // Get images
    const images = formData.getAll('images') as File[]

    const message = `
新規クリーニング予約が入りました。
○お名前：${cleanName}
○フリガナ：${cleanFurigana}
○電話番号：${cleanPhoneNumber}
○郵便番号：${cleanPostCode}
○住所：${cleanAddress}
○ご利用経験：${cleanExperience}
○エアコン(お掃除機能なし)：${cleanNumOfAirCon}
○エアコン室外機：${cleanNumOfAirConOut}
○エアコン型番：${cleanOtherRequest}
○水回りメニュー：${cleanOtherMenu}
○第1希望日時：${appointmentDayOne} ${startTimeOne}〜${endTimeOne}
○第2希望日時：${appointmentDayTwo} ${startTimeTwo}〜${endTimeTwo}
○第3希望日時：${appointmentDayThree} ${startTimeThree}〜${endTimeThree}
○駐輪スペース：${cleanBike}
○その他：${cleanOtherWarning}
○広告コード：${adsCode}
`

    if (groupId) {
      // Send text message first
      await client.pushMessage({
        to: groupId,
        messages: [
          {
            type: 'textV2',
            text: `{everyone}${message}`,
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

      // Send images via imgbb + LINE Messaging API
      if (images.length > 0 && imgbbApiKey) {
        for (let i = 0; i < images.length; i++) {
          const image = images[i]
          try {
            // Upload to imgbb to get public HTTPS URL
            const imageUrl = await uploadToImgbb(image)
            
            if (imageUrl) {
              // Send image via LINE Messaging API
              await client.pushMessage({
                to: groupId,
                messages: [
                  {
                    type: 'image',
                    originalContentUrl: imageUrl,
                    previewImageUrl: imageUrl,
                  },
                ],
              })
            } else {
              // Fallback: send text if upload fails
              const sizeKB = Math.round(image.size / 1024)
              await client.pushMessage({
                to: groupId,
                messages: [
                  {
                    type: 'text',
                    text: `写真アップロード失敗: ${image.name} (${sizeKB}KB)`,
                  },
                ],
              })
            }
          } catch (imgError) {
            console.error('Error sending image to LINE:', imgError)
          }
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending LINE notification:', error)
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 })
  }
}
