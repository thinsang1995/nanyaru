import { DrFormInputs } from '@/app/recruit/register/page'
import { NextApiRequest, NextApiResponse } from 'next'

const SHEET_NAME = 'ドライバー応募'

async function getGoogleSheetsClient() {
  const { google } = await import('googleapis')
  const sheets = google.sheets({ version: 'v4' })
  return { google, sheets }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
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
        drName,
        drAge,
        drPhoneNumber,
        drPostCode,
        drExperience,
        adsCode,
        drAddress,
        registerTime,
        registerDate,
      } = {
        ...req.body,
      } as DrFormInputs

      const newAddress = `${drPostCode} ${drAddress}`
      const updateTime = `${registerDate} ${registerTime}`

      const isLiBa = [
        'libinst',
        'libx',
        'libtiktok',
        'libtube',
        'libsg',
        'asJVWJ7x',
        'ahmeazEW',
        'lNDY2w6W',
        'Wmw0cffI',
        'libyahoo',
        'libbaitoru',
        'libindeed',
        'libjmty0',
        'libindeed0',
        'libjmty',
        'libyda',
      ].includes(adsCode as string)

      const sheetData = [
        registerDate,
        registerTime,
        drName,
        drAge,
        newAddress,
        `'${drPhoneNumber}`,
        adsCode,
        '',
        drExperience,
        '',
        updateTime,
      ]

      const getLastRowResponse = await sheetsClient.spreadsheets.values.get({
        spreadsheetId: isLiBa
          ? process.env.NEXT_PUBLIC_LIBE_GOOGLE_SHEET_ID
          : process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID,
        range: `${SHEET_NAME}!A2:A`,
      })

      const lastRow = getLastRowResponse.data.values?.length || 0
      const newRow = lastRow + 2

      await sheetsClient.spreadsheets.values.update({
        spreadsheetId: isLiBa
          ? process.env.NEXT_PUBLIC_LIBE_GOOGLE_SHEET_ID
          : process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID,
        range: `${SHEET_NAME}!A${newRow}:O${newRow}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [sheetData],
        },
      })

      res.status(200).json({ message: 'Data saved successfully!' })
    } catch (error) {
      console.error('Error sending data to Google Sheets:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
