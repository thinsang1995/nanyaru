import type { Metadata } from 'next'
import Script from 'next/script'

const TITLE = '【大手と同品質で格安】元ダスキン仕込みのオフィスエアコンクリーニング'
const DESCRIPTION =
  '大手の見積もりが高いとお悩みの総務担当者様へ。ダスキンで修行した元プロが直伝の技術で一から育てたスタッフが伺います！中間マージンを徹底排除した自社一貫体制だから、大手と同等の徹底洗浄が驚きの価格で実現。業務に影響のない夜間・休日施工も対応可能です。まずは無料見積もりから！'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/office-cleaning/lp' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://nanyaru.com/office-cleaning/lp',
    siteName: '合同会社なんやる',
    locale: 'ja_JP',
    type: 'website',
    images: [{ url: '/images/office-cleaning/ogp.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/images/office-cleaning/ogp_x.png'],
  },
  icons: {
    icon: [
      { url: '/images/office-cleaning/favicon16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/office-cleaning/favicon32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/office-cleaning/favicon48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: { url: '/images/office-cleaning/apple-touch-icon.png', sizes: '180x180' },
  },
}

export default function OfficeCleaningLp() {
  return (
    <>
      <Script id='gtm-office-cleaning' strategy='afterInteractive'>
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-PVRH5BH9');`}
      </Script>

      <noscript>
        <iframe
          src='https://www.googletagmanager.com/ns.html?id=GTM-PVRH5BH9'
          height='0'
          width='0'
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      {/* Markup LP đặt ở đây — Task 5 */}

      <Script src='/office-cleaning/script.js' strategy='afterInteractive' />
    </>
  )
}
