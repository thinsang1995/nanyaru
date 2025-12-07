'use client'

import { useState, useRef, useEffect } from 'react'

const faqs = [
  {
    question: 'お電話で見積りはできますか?',
    answer: '電話での受付は対応しておりません。\n公式LINEでのやり取りとなります。',
    defaultOpen: true,
  },
  {
    question: 'お見積りは無料ですか?',
    answer: '完全無料です！\nLINEで写真を送るだけなので、簡単です。',
    defaultOpen: false,
  },
  {
    question: 'お見積り以外の費用は発生しますか?',
    answer:
      '見積もり後の追加費用は一切、発生しません。\nバイクで伺うので、駐車料金など追加費用ありませんので、ご安心ください。',
    defaultOpen: false,
  },
  {
    question: '費用はいつ支払うのでしょうか？',
    answer:
      '費用はクリーニング実施後に現金手渡しとなります。\nクレジットカードなどの電子決済をご希望の場合は見積もり前に公式LINEからご相談ください。',
    defaultOpen: false,
  },
  {
    question: '養生はしてもらえるのでしょうか?',
    answer: '床・壁・家具を防水シート等でしっかり養生します。',
    defaultOpen: false,
  },
  {
    question: '作業時間はどのぐらいですか？',
    answer: '機種によって異なりますが、1台につき45分~60分程度です。',
    defaultOpen: false,
  },
]

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Set<number>>(
    new Set(faqs.map((faq, idx) => (faq.defaultOpen ? idx : -1)).filter((idx) => idx >= 0)),
  )
  const ddRefs = useRef<(HTMLElement | null)[]>([])
  const isAnimating = useRef<boolean[]>(faqs.map(() => false))

  useEffect(() => {
    // Set initial display state
    ddRefs.current.forEach((dd, idx) => {
      if (dd) {
        if (openItems.has(idx)) {
          dd.style.display = 'block'
        } else {
          dd.style.display = 'none'
        }
      }
    })
  }, [])

  const toggleItem = (index: number) => {
    // Prevent multiple clicks during animation
    if (isAnimating.current[index]) return

    const ddElement = ddRefs.current[index]
    const dtElement = ddElement?.previousElementSibling as HTMLElement
    if (!ddElement || !dtElement) return

    isAnimating.current[index] = true
    const newOpenItems = new Set(openItems)

    if (openItems.has(index)) {
      // Toggle class immediately for icon
      dtElement.classList.remove('active')
      newOpenItems.delete(index)

      // Close with slideUp animation
      const currentHeight = ddElement.scrollHeight
      ddElement.style.height = currentHeight + 'px'
      ddElement.style.overflow = 'hidden'

      // Force reflow
      void ddElement.offsetHeight

      ddElement.style.transition = 'height 300ms ease'
      ddElement.style.height = '0px'

      setTimeout(() => {
        ddElement.style.display = 'none'
        ddElement.style.height = ''
        ddElement.style.overflow = ''
        ddElement.style.transition = ''
        isAnimating.current[index] = false
      }, 300)
    } else {
      // Toggle class immediately for icon
      dtElement.classList.add('active')
      newOpenItems.add(index)

      // Open with slideDown animation
      ddElement.style.display = 'block'
      ddElement.style.height = '0px'
      ddElement.style.overflow = 'hidden'

      const targetHeight = ddElement.scrollHeight

      // Force reflow
      void ddElement.offsetHeight

      ddElement.style.transition = 'height 300ms ease'
      ddElement.style.height = targetHeight + 'px'

      setTimeout(() => {
        ddElement.style.height = ''
        ddElement.style.overflow = ''
        ddElement.style.transition = ''
        isAnimating.current[index] = false
      }, 300)
    }

    setOpenItems(newOpenItems)
  }

  return (
    <>
      <style jsx>{`
        dl.qa dd {
          will-change: height;
        }
      `}</style>
      <section className='contents_block' id='faq'>
        <div className='inner'>
          <h2 className='ttl'>よくあるご質問</h2>
          {faqs.map((faq, index) => (
            <dl key={index} className='qa'>
              <dt
                className={openItems.has(index) ? 'active' : ''}
                onClick={() => toggleItem(index)}
              >
                <h3>{faq.question}</h3>
              </dt>
              <dd
                ref={(el) => {
                  ddRefs.current[index] = el
                }}
              >
                {faq.answer.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < faq.answer.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </dd>
            </dl>
          ))}
        </div>
      </section>
    </>
  )
}
