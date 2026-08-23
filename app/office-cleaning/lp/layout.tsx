import type { Metadata, Viewport } from 'next'
import '../../../styles/office-cleaning.css'

export const metadata: Metadata = {
  formatDetection: {
    telephone: false,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
