import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://nanyaru.com'),
  title: {
    default: '合同会社なんやる｜暮らしのなんでも屋｜東京・神奈川・埼玉・千葉',
    template: '%s｜合同会社なんやる',
  },
  description:
    '東京・神奈川・埼玉・千葉対応の便利屋「合同会社なんやる」。エアコンクリーニング、不用品回収、引越しサポート、家電取付、草刈り・庭木剪定など、暮らしのお困りごとを8:00〜22:00 年中無休で対応。LINEで無料見積もり受付中。',
  keywords: [
    '便利屋',
    'なんでも屋',
    'エアコンクリーニング',
    '不用品回収',
    '引越しサポート',
    '家電取付',
    '草刈り',
    '庭木剪定',
    'ハウスクリーニング',
    '東京',
    '神奈川',
    '埼玉',
    '千葉',
    '合同会社なんやる',
  ],
  authors: [{ name: '合同会社なんやる' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://nanyaru.com',
    siteName: '合同会社なんやる',
    title: '合同会社なんやる｜暮らしのなんでも屋',
    description:
      'エアコンクリーニング、不用品回収、引越しサポート、家電取付、草刈りまで。東京・神奈川・埼玉・千葉エリア対応。8:00〜22:00 年中無休、LINEで無料相談受付中。',
    images: [
      {
        url: '/logo.jpg',
        width: 400,
        height: 400,
        alt: '合同会社なんやる',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: '合同会社なんやる｜暮らしのなんでも屋',
    description:
      'エアコンクリーニング・不用品回収・引越しサポート・家電取付など、東京/神奈川/埼玉/千葉対応の便利屋。LINEで無料相談。',
    images: ['/logo.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}
