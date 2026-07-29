'use client'

import { useSyncExternalStore } from 'react'
import Image from 'next/image'

const LINE_BASE_URL = 'https://skg.ecai.jp/optin/13'
const DEFAULT_ECAIAD = 'itZfluaz'

// The query string never changes while the LP is open, so there is nothing to subscribe to.
const subscribe = () => () => {}

const getEcaiad = () => new URLSearchParams(window.location.search).get('ecaiad')

// Prerendered HTML has no query string, so it always gets the default code.
const getServerEcaiad = () => null

// Read ecaiad from the page query string, fall back to the default code.
// Read on the client only so the page stays statically rendered.
export function useLineUrl() {
  const ecaiad = useSyncExternalStore(subscribe, getEcaiad, getServerEcaiad)

  return ecaiad
    ? `${LINE_BASE_URL}?ecaiad=${encodeURIComponent(ecaiad)}`
    : `${LINE_BASE_URL}?ecaiad=${DEFAULT_ECAIAD}`
}

export default function LineCtaButton({ v }: { v: string }) {
  const lineUrl = useLineUrl()

  return (
    <a href={lineUrl} className='GTM_cv_click' target='_blank' rel='noopener noreferrer'>
      <Image
        src={`/images/ico_line.webp?v=${v}`}
        className='ico_line'
        alt='LINE'
        width={40}
        height={40}
      />
      今すぐLINEで相談する
    </a>
  )
}
