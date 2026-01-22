import { NextRequest, NextResponse } from 'next/server'
import { messagingApi } from '@line/bot-sdk'

const config = {
  channelAccessToken: process.env.NEXT_PUBLIC_LINE_CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.NEXT_PUBLIC_LINE_CHANNEL_SECRET || '',
}
const groupId = process.env.NEXT_PUBLIC_LINE_CLEANING_GROUP_ID
const imgbbApiKey = process.env.IMGBB_API_KEY || ''

const client = new messagingApi.MessagingApiClient(config)

// Upload with size limit check
async function uploadToImgbb(file: File): Promise<{ url: string | null; error?: string }> {
  try {
    // Check file size (imgbb limit is 32MB, but we set 5MB for safety)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      console.warn(`File too large: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)`)
      return { url: null, error: 'File too large' }
    }

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
      return { url: data.data?.url || null }
    }

    const errorText = await response.text()
    console.error('imgbb upload failed:', errorText)
    return { url: null, error: errorText }
  } catch (error) {
    console.error('Error uploading to imgbb:', error)
    return { url: null, error: String(error) }
  }
}

// Batch send images to LINE
async function sendImagesToLine(imageUrls: string[], label: string) {
  if (!groupId || imageUrls.length === 0) return

  try {
    // Send label first
    await client.pushMessage({
      to: groupId,
      messages: [{ type: 'text', text: `${label} ${imageUrls.length}枚` }],
    })

    // Send up to 5 images per request (LINE API limit)
    const chunks = []
    for (let i = 0; i < imageUrls.length; i += 5) {
      chunks.push(imageUrls.slice(i, i + 5))
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

      // Small delay between batches to avoid rate limiting
      if (chunks.length > 1) {
        await new Promise((resolve) => setTimeout(resolve, 300))
      }
    }
  } catch (error) {
    console.error('Error sending images to LINE:', error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    const formData = await request.formData()

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

    console.log('=== LINE NOTIFY START ===')
    console.log('AirCon images:', airConImages.length)
    console.log('Cleaning images:', cleaningImages.length)

    // Log file sizes
    airConImages.forEach((file, idx) => {
      console.log(`  AirCon[${idx}]: ${file.name} - ${(file.size / 1024).toFixed(1)}KB`)
    })
    cleaningImages.forEach((file, idx) => {
      console.log(`  Cleaning[${idx}]: ${file.name} - ${(file.size / 1024).toFixed(1)}KB`)
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
      return NextResponse.json(
        { success: false, message: 'LINE group ID not configured' },
        { status: 400 },
      )
    }

    // Send text message
    console.log('Sending text message...')
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

    // Upload all images in parallel (MUCH FASTER!)
    console.log('Uploading images to imgbb...')
    const uploadStart = Date.now()

    const [airConResults, cleaningResults] = await Promise.all([
      Promise.all(airConImages.map((img) => uploadToImgbb(img))),
      Promise.all(cleaningImages.map((img) => uploadToImgbb(img))),
    ])

    console.log(`✓ Upload completed in ${Date.now() - uploadStart}ms`)

    // Filter successful uploads
    const airConUrls = airConResults.filter((r) => r.url).map((r) => r.url!)
    const cleaningUrls = cleaningResults.filter((r) => r.url).map((r) => r.url!)

    const failedUploads =
      airConResults.filter((r) => !r.url).length + cleaningResults.filter((r) => !r.url).length

    if (failedUploads > 0) {
      console.warn(`${failedUploads} images failed to upload`)
    }

    // Send images in batches
    console.log('Sending images to LINE...')
    await Promise.all([
      airConUrls.length > 0
        ? sendImagesToLine(airConUrls, '【エアコン型番の写真】')
        : Promise.resolve(),
      cleaningUrls.length > 0
        ? sendImagesToLine(cleaningUrls, '【掃除箇所の写真】')
        : Promise.resolve(),
    ])
    console.log('✓ Images sent to LINE')

    const totalTime = Date.now() - startTime
    const totalSent = airConUrls.length + cleaningUrls.length
    const totalImages = airConImages.length + cleaningImages.length

    console.log('=== LINE NOTIFY COMPLETE ===')
    console.log(`Total time: ${totalTime}ms`)
    console.log(`Images sent: ${totalSent}/${totalImages}`)

    return NextResponse.json({
      success: true,
      totalImages: totalSent,
      failed: failedUploads,
      processingTime: totalTime,
    })
  } catch (error) {
    const totalTime = Date.now() - startTime
    console.error('=== LINE NOTIFY ERROR ===')
    console.error('Error:', error)
    console.error(`Failed after ${totalTime}ms`)

    return NextResponse.json(
      {
        success: false,
        message: 'Internal Server Error',
        error: String(error),
      },
      { status: 500 },
    )
  }
}
