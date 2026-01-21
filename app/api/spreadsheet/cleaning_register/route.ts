import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

const SHEET_NAME = 'クリーニング予約'

// Initialize auth once
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
    private_key: (process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY || '')?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

const sheetsClient = google.sheets({ version: 'v4', auth })

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      cleanName,
      cleanFurigana,
      cleanPhoneNumber,
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
      registerTime,
      registerDate,
    } = body

    const updateTime = `${registerDate} ${registerTime}`

    const sheetData = [
      registerDate,
      registerTime,
      cleanName,
      cleanFurigana,
      `'${cleanPhoneNumber}`,
      cleanAddress,
      cleanExperience,
      cleanNumOfAirCon,
      cleanNumOfAirConOut,
      cleanOtherRequest,
      cleanOtherMenu,
      appointmentDayOne,
      `${startTimeOne}〜${endTimeOne}`,
      appointmentDayTwo,
      `${startTimeTwo}〜${endTimeTwo}`,
      appointmentDayThree,
      `${startTimeThree}〜${endTimeThree}`,
      cleanBike,
      cleanOtherWarning,
      adsCode,
      updateTime,
    ]

    // Use append instead of get + update (faster!)
    await sheetsClient.spreadsheets.values.append({
      spreadsheetId: process.env.NEXT_PUBLIC_CLEANING_GOOGLE_SHEET_ID,
      range: `${SHEET_NAME}!A:V`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [sheetData],
      },
    })

    return NextResponse.json({ message: 'Data saved successfully!' })
  } catch (error) {
    console.error('Error sending data to Google Sheets:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
