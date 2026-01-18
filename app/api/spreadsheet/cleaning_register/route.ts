import { NextRequest, NextResponse } from 'next/server'

const SHEET_NAME = 'クリーニング予約'

async function getGoogleSheetsClient() {
  const { google } = await import('googleapis')
  const sheets = google.sheets({ version: 'v4' })
  return { google, sheets }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { google } = await getGoogleSheetsClient()

    // Authenticate with the Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
        private_key: (process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY || '')?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheetsClient = google.sheets({ version: 'v4', auth })

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

    const getLastRowResponse = await sheetsClient.spreadsheets.values.get({
      spreadsheetId:
        process.env.NEXT_PUBLIC_CLEANING_GOOGLE_SHEET_ID || process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID,
      range: `${SHEET_NAME}!A2:A`,
    })

    const lastRow = getLastRowResponse.data.values?.length || 0
    const newRow = lastRow + 2

    await sheetsClient.spreadsheets.values.update({
      spreadsheetId:
        process.env.NEXT_PUBLIC_CLEANING_GOOGLE_SHEET_ID || process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID,
      range: `${SHEET_NAME}!A${newRow}:V${newRow}`,
      valueInputOption: 'USER_ENTERED',
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
