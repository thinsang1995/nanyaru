'use client'

import { useSyncExternalStore } from 'react'

const FORM_BASE_URL = 'https://cleaning.nanyaru.com/register-business'

// Chưa có mã quảng cáo mặc định từ phía 大沢さん. Để rỗng nghĩa là:
// URL không kèm ?ecaiad= thì link form cũng không gắn param.
const DEFAULT_ECAIAD = ''

// Query string không đổi trong lúc LP đang mở, nên không có gì để subscribe.
const subscribe = () => () => {}

const getEcaiad = () => new URLSearchParams(window.location.search).get('ecaiad')

// HTML prerender không có query string.
const getServerEcaiad = () => null

export function useOfficeFormUrl() {
  const ecaiad = useSyncExternalStore(subscribe, getEcaiad, getServerEcaiad)
  const code = ecaiad || DEFAULT_ECAIAD

  return code ? `${FORM_BASE_URL}?ecaiad=${encodeURIComponent(code)}` : FORM_BASE_URL
}

export default function OfficeCtaLink({
  className,
  children,
}: {
  className: string
  children: React.ReactNode
}) {
  return (
    <a href={useOfficeFormUrl()} className={className}>
      {children}
    </a>
  )
}
