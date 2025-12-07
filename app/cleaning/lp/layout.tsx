import type { Metadata } from 'next'
import '../../globals.css'
import '../../../styles/style.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://nanyaru-domain.com'), // Update with actual domain
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja' suppressHydrationWarning>
      <head>
        <meta
          name='viewport'
          content='width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1'
        />
        <meta name='format-detection' content='telephone=no' />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
