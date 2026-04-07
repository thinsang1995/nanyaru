import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'クリーニング予約フォーム｜なんやるエアコンクリーニング',
  description:
    'なんやるのエアコンクリーニング予約フォーム。簡単入力で予約完了。見積もり通りで追加費用なし、低刺激洗剤・防カビ仕上げ、夜間/休日も対応。',
  openGraph: {
    title: 'クリーニング予約フォーム｜なんやるエアコンクリーニング',
    description:
      'なんやるのエアコンクリーニング予約フォーム。簡単入力で予約完了。見積もり通りで追加費用なし、低刺激洗剤・防カビ仕上げ、夜間/休日も対応。',
    url: 'https://nanyaru.com/cleaning/register',
    siteName: 'なんやるエアコンクリーニング',
    images: [{ url: '/images/ogp_1200x630.png' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'クリーニング予約フォーム｜なんやるエアコンクリーニング',
    description:
      'なんやるのエアコンクリーニング予約フォーム。簡単入力で予約完了。見積もり通りで追加費用なし、低刺激洗剤・防カビ仕上げ、夜間/休日も対応。',
    images: ['/images/ogp_1200x675.png'],
  },
}

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
