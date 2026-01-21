import { NextRequest, NextResponse } from 'next/server'
import { messagingApi } from '@line/bot-sdk'

const config = {
  channelAccessToken: process.env.NEXT_PUBLIC_LINE_CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.NEXT_PUBLIC_LINE_CHANNEL_SECRET || '',
}
const groupId = process.env.NEXT_PUBLIC_LINE_CLEANING_GROUP_ID
const imgbbApiKey = process.env.IMGBB_API_KEY || ''

const client = new messagingApi.MessagingApiClient(config)

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

// Batch send images to LINE
async function sendImagesToLine(images: string[]) {
  if (!groupId || images.length === 0) return

  // Send up to 5 images per request (LINE API limit)
  const chunks = []
  for (let i = 0; i < images.length; i += 5) {
    chunks.push(images.slice(i, i + 5))
  }

  for (const chunk of chunks) {
    const messages = chunk.map((url) => ({
      type: 'image' as const,
      originalContentUrl: url,
      previewImageUrl: url,
    }))

    await client.pushMessage({
      to: groupId,
      messages,
    })

    // Small delay between batches
    if (chunks.length > 1) {
      await new Promise((resolve) => setTimeout(resolve, 200))
    }
  }
}

export async function POST(request: NextRequest) {
  console.log('=== LINE NOTIFY API START ===')

  try {
    // Log environment variables (masked)
    console.log('Environment check:', {
      hasAccessToken: !!config.channelAccessToken,
      hasSecret: !!config.channelSecret,
      hasGroupId: !!groupId,
      hasImgbbKey: !!imgbbApiKey,
      tokenLength: config.channelAccessToken?.length,
      groupIdLength: groupId?.length,
    })

    const formData = await request.formData()
    console.log('FormData received, keys:', Array.from(formData.keys()))

    const cleanName = (formData.get('cleanName') as string) || ''
    const cleanFurigana = (formData.get('cleanFurigana') as string) || ''
    const cleanPhoneNumber = (formData.get('cleanPhoneNumber') as string) || ''
    const cleanExperience = (formData.get('cleanExperience') as string) || ''
    const cleanNumOfAirCon = (formData.get('cleanNumOfAirCon') as string) || ''
    const cleanNumOfAirConOut = (formData.get('cleanNumOfAirConOut') as string) || ''
    const cleanOtherRequest = (formData.get('cleanOtherRequest') as string) || ''
    const cleanOtherMenu = (formData.get('cleanOtherMenu') as string) || ''
    const appointmentDayOne = (formData.get('appointmentDayOne') as string) || ''
    const startTimeOne = (formData.get('startTimeOne') as string) || ''
    const endTimeOne = (formData.get('endTimeOne') as string) || ''
    const appointmentDayTwo = (formData.get('appointmentDayTwo') as string) || ''
    const startTimeTwo = (formData.get('startTimeTwo') as string) || ''
    const endTimeTwo = (formData.get('endTimeTwo') as string) || ''
    const appointmentDayThree = (formData.get('appointmentDayThree') as string) || ''
    const startTimeThree = (formData.get('startTimeThree') as string) || ''
    const endTimeThree = (formData.get('endTimeThree') as string) || ''
    const cleanAddress = (formData.get('cleanAddress') as string) || ''
    const cleanBike = (formData.get('cleanBike') as string) || ''
    const cleanOtherWarning = (formData.get('cleanOtherWarning') as string) || ''
    const adsCode = (formData.get('adsCode') as string) || ''

    const airConImages = formData.getAll('airConImages') as File[]
    const cleaningImages = formData.getAll('images') as File[]

    console.log('Images count:', {
      airCon: airConImages.length,
      cleaning: cleaningImages.length,
    })

    const message = `
新規クリーニング予約が入りました。
○お名前：${cleanName}
○フリガナ：${cleanFurigana}
○電話番号：${cleanPhoneNumber}
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

    if (!groupId) {
      console.error('LINE group ID not configured')
      return NextResponse.json(
        { success: false, message: 'LINE group ID not configured' },
        { status: 400 },
      )
    }

    // Send text message
    console.log('Sending text message to LINE...')
    try {
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
      console.log('✓ Text message sent')
    } catch (lineError: any) {
      console.error('LINE text message error:', lineError?.message || lineError)
      throw lineError
    }

    // Upload all images in parallel
    console.log('Starting image uploads...')
    const [airConUrls, cleaningUrls] = await Promise.all([
      Promise.all(
        airConImages.map((img, idx) => {
          console.log(`Uploading airCon image ${idx + 1}/${airConImages.length}`)
          return uploadToImgbb(img)
        }),
      ),
      Promise.all(
        cleaningImages.map((img, idx) => {
          console.log(`Uploading cleaning image ${idx + 1}/${cleaningImages.length}`)
          return uploadToImgbb(img)
        }),
      ),
    ])

    // Filter out failed uploads
    const validAirConUrls = airConUrls.filter((url) => url !== null) as string[]
    const validCleaningUrls = cleaningUrls.filter((url) => url !== null) as string[]

    console.log('Upload results:', {
      airConSuccess: validAirConUrls.length,
      airConFailed: airConImages.length - validAirConUrls.length,
      cleaningSuccess: validCleaningUrls.length,
      cleaningFailed: cleaningImages.length - validCleaningUrls.length,
    })

    // Send images in batches
    console.log('Sending images to LINE...')
    await Promise.all([sendImagesToLine(validAirConUrls), sendImagesToLine(validCleaningUrls)])
    console.log('✓ Images sent to LINE')

    const totalSent = validAirConUrls.length + validCleaningUrls.length
    const totalFailed = airConImages.length + cleaningImages.length - totalSent

    console.log('=== LINE NOTIFY API SUCCESS ===')
    return NextResponse.json({
      success: true,
      totalImages: totalSent,
      failed: totalFailed,
    })
  } catch (error: any) {
    console.error('=== LINE NOTIFY API ERROR ===')
    console.error('Error details:', {
      name: error?.name,
      message: error?.message,
      stack: error?.stack,
    })
    return NextResponse.json(
      {
        success: false,
        message: error?.message || 'Internal Server Error',
        error: error?.toString(),
      },
      { status: 500 },
    )
  }
}
