import type { Metadata, Viewport } from 'next'
import '../../../styles/style.css'

export const metadata: Metadata = {
  formatDetection: {
    telephone: false,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
