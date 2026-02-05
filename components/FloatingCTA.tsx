'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState<'fixed' | 'absolute'>('fixed')
  const [bottom, setBottom] = useState('0px')
  const lineUrl = 'https://skg.ecai.jp/optin/13?ecaiad=itZfluaz'

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop

      // Show/hide based on scroll position
      if (scrollTop > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      // Change position when near footer
      const scrollHeight = document.documentElement.scrollHeight
      const scrollPosition = window.innerHeight + scrollTop
      const ctaLastElement = document.getElementById('cta_last')
      const footerElement = document.getElementById('footer')

      const ctaHeight = ctaLastElement?.offsetHeight || 0
      const footHeight = footerElement?.offsetHeight || 0

      if (scrollHeight - scrollPosition <= footHeight + ctaHeight) {
        setPosition('absolute')
        setBottom('100px')
      } else {
        setPosition('fixed')
        setBottom('0px')
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      id='float'
      style={{
        position: position,
        bottom: bottom,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      <div className='inner'>
        <div className='cta_btn'>
          <a href={lineUrl} className='GTM_cv_click' target='_blank' rel='noopener noreferrer'>
            <Image
              src='/images/ico_line.webp'
              className='ico_line'
              alt='LINE'
              width={40}
              height={40}
            />
            今すぐLINEで相談する
          </a>
        </div>
      </div>
    </div>
  )
}
