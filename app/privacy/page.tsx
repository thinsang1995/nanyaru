import Link from 'next/link'

export const metadata = {
  title: 'プライバシーポリシー｜合同会社なんやる',
  description:
    '合同会社なんやるの個人情報保護方針。お客様の個人情報の取扱いについてご説明します。',
}

export default function PrivacyPage() {
  return (
    <div className='font-body text-steel bg-white antialiased min-h-screen'>
      {/* Rainbow accent stripe */}
      <div className='h-1 chamel-gradient'></div>

      {/* Header */}
      <header className='sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-line'>
        <div className='max-w-7xl mx-auto px-4 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2'>
          <Link
            href='/'
            className='flex items-center gap-2 sm:gap-3 min-w-0'
          >
            <div
              className='logo h-10 w-10 sm:h-14 sm:w-14 shrink-0'
              role='img'
              aria-label='合同会社なんやる ロゴ'
            ></div>
            <div className='leading-tight border-l border-line pl-2 sm:pl-3 min-w-0'>
              <div className='jp-heading text-ink text-[11px] sm:text-sm whitespace-nowrap'>
                合同会社なんやる
              </div>
            </div>
          </Link>
          <Link
            href='/'
            className='btn-outline cursor-pointer inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg font-display font-bold text-xs sm:text-sm'
          >
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              strokeWidth='2.5'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M10 19l-7-7m0 0l7-7m-7 7h18'
              />
            </svg>
            <span>ホームに戻る</span>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className='relative overflow-hidden bg-paper py-12 lg:py-20'>
        <div className='absolute inset-0 grid-bg opacity-50'></div>
        <div className='absolute -top-32 -right-32 w-[400px] h-[400px] bg-safety/8 rounded-full blur-3xl'></div>

        <div className='relative max-w-4xl mx-auto px-4 lg:px-8'>
          <div className='flex items-center gap-3 mb-4'>
            <span className='h-px w-8 lg:w-10 bg-safety'></span>
            <span className='text-safety text-[10px] lg:text-xs font-jp font-bold tracking-[0.3em]'>
              Privacy Policy
            </span>
          </div>
          <h1 className='jp-heading text-ink text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-4'>
            プライバシーポリシー
          </h1>
          <p className='serif text-safety text-lg'>— 個人情報保護方針</p>
        </div>
      </section>

      {/* Content */}
      <section className='py-12 lg:py-20 bg-white'>
        <div className='max-w-4xl mx-auto px-4 lg:px-8'>
          <div className='bg-paper border border-line rounded-2xl p-6 lg:p-10 mb-10'>
            <p className='font-jp text-steel leading-loose text-sm lg:text-base'>
              合同会社なんやる（以下「当社」といいます）は、お客様の個人情報の重要性を認識し、適切に取り扱うことが当社の社会的責務であると考えています。当社は、個人情報の保護に関する法律およびその他関係法令を遵守し、以下の方針に基づきお客様の個人情報を適切に取り扱います。
            </p>
          </div>

          <div className='space-y-10'>
            {/* Section 1 */}
            <article>
              <div className='flex items-center gap-3 mb-4'>
                <span className='inline-block bg-warn/20 text-ink px-3 py-1 rounded text-xs font-jp font-bold tracking-wider'>
                  — 01
                </span>
                <h2 className='jp-heading text-ink text-xl lg:text-2xl'>
                  【利用目的】
                </h2>
              </div>
              <div className='border-l-4 border-safety pl-4 lg:pl-6 font-jp text-steel leading-loose text-sm lg:text-base space-y-3'>
                <p>
                  当社は、お客様からご提供いただいた個人情報を、以下の目的のために利用いたします。
                </p>
                <ul className='list-disc list-inside space-y-2 pl-2'>
                  <li>お客様へのサービス提供および業務遂行のため</li>
                  <li>お見積もり、ご予約、ご契約に関するご連絡のため</li>
                  <li>
                    サービスに関するお知らせ、アフターサービスのご案内のため
                  </li>
                  <li>お客様からのお問い合わせへの対応のため</li>
                  <li>当社の採用活動および採用に関するご連絡のため</li>
                  <li>サービス品質向上のための統計・分析のため</li>
                </ul>
              </div>
            </article>

            {/* Section 2 */}
            <article>
              <div className='flex items-center gap-3 mb-4'>
                <span className='inline-block bg-warn/20 text-ink px-3 py-1 rounded text-xs font-jp font-bold tracking-wider'>
                  — 02
                </span>
                <h2 className='jp-heading text-ink text-xl lg:text-2xl'>
                  【第三者への提供】
                </h2>
              </div>
              <div className='border-l-4 border-safety pl-4 lg:pl-6 font-jp text-steel leading-loose text-sm lg:text-base space-y-3'>
                <p>
                  当社は、以下の場合を除き、お客様の個人情報を事前の同意なく第三者に開示・提供することはありません。
                </p>
                <ul className='list-disc list-inside space-y-2 pl-2'>
                  <li>法令に基づく場合</li>
                  <li>
                    人の生命、身体または財産の保護のために必要であって、お客様の同意を得ることが困難な場合
                  </li>
                  <li>
                    公衆衛生の向上または児童の健全な育成の推進のために特に必要であって、お客様の同意を得ることが困難な場合
                  </li>
                  <li>
                    国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合
                  </li>
                </ul>
              </div>
            </article>

            {/* Section 3 */}
            <article>
              <div className='flex items-center gap-3 mb-4'>
                <span className='inline-block bg-warn/20 text-ink px-3 py-1 rounded text-xs font-jp font-bold tracking-wider'>
                  — 03
                </span>
                <h2 className='jp-heading text-ink text-xl lg:text-2xl'>
                  【個人情報提供の任意性】
                </h2>
              </div>
              <div className='border-l-4 border-safety pl-4 lg:pl-6 font-jp text-steel leading-loose text-sm lg:text-base'>
                <p>
                  当社への個人情報のご提供は、お客様のご判断によります。ただし、必要な情報をご提供いただけない場合は、サービスのご提供、お問い合わせへの対応、お見積もりの作成等ができない場合がございます。
                </p>
              </div>
            </article>

            {/* Section 4 */}
            <article>
              <div className='flex items-center gap-3 mb-4'>
                <span className='inline-block bg-warn/20 text-ink px-3 py-1 rounded text-xs font-jp font-bold tracking-wider'>
                  — 04
                </span>
                <h2 className='jp-heading text-ink text-xl lg:text-2xl'>
                  【個人情報の開示請求について】
                </h2>
              </div>
              <div className='border-l-4 border-safety pl-4 lg:pl-6 font-jp text-steel leading-loose text-sm lg:text-base space-y-3'>
                <p>
                  お客様ご本人から、ご自身の個人情報について、開示・訂正・追加・削除・利用停止・第三者提供の停止のご請求があった場合、合理的な期間内に、法令に従い対応いたします。
                </p>
                <p>
                  ご請求の際は、ご本人であることを確認させていただいた上で対応いたします。下記のお問い合わせ窓口までご連絡ください。
                </p>
              </div>
            </article>

            {/* Section 5: Security */}
            <article>
              <div className='flex items-center gap-3 mb-4'>
                <span className='inline-block bg-warn/20 text-ink px-3 py-1 rounded text-xs font-jp font-bold tracking-wider'>
                  — 05
                </span>
                <h2 className='jp-heading text-ink text-xl lg:text-2xl'>
                  【安全管理措置】
                </h2>
              </div>
              <div className='border-l-4 border-safety pl-4 lg:pl-6 font-jp text-steel leading-loose text-sm lg:text-base'>
                <p>
                  当社は、お客様の個人情報の漏えい、滅失または毀損の防止その他の個人情報の安全管理のために、必要かつ適切な措置を講じます。また、個人情報を取り扱う従業員に対し、適切な教育・監督を行います。
                </p>
              </div>
            </article>

            {/* Section 6: Policy changes */}
            <article>
              <div className='flex items-center gap-3 mb-4'>
                <span className='inline-block bg-warn/20 text-ink px-3 py-1 rounded text-xs font-jp font-bold tracking-wider'>
                  — 06
                </span>
                <h2 className='jp-heading text-ink text-xl lg:text-2xl'>
                  【本ポリシーの変更】
                </h2>
              </div>
              <div className='border-l-4 border-safety pl-4 lg:pl-6 font-jp text-steel leading-loose text-sm lg:text-base'>
                <p>
                  当社は、必要に応じて本プライバシーポリシーの内容を変更することがあります。変更後の内容は、当ウェブサイトに掲載した時点から効力を生じるものとします。
                </p>
              </div>
            </article>
          </div>

          {/* Contact info */}
          <div className='mt-14 bg-ink rounded-2xl p-6 lg:p-10 text-white relative overflow-hidden'>
            <div className='absolute -top-20 -right-20 w-40 h-40 bg-safety/15 rounded-full blur-3xl'></div>
            <div className='relative'>
              <div className='text-mute text-xs font-jp font-bold tracking-widest mb-3'>
                — お問い合わせ窓口
              </div>
              <h3 className='jp-heading text-white text-2xl mb-4'>
                個人情報に関するお問い合わせ
              </h3>
              <dl className='space-y-3 font-jp text-sm'>
                <div className='flex flex-col sm:flex-row sm:gap-4'>
                  <dt className='text-warn font-bold sm:w-32 shrink-0'>会社名</dt>
                  <dd>合同会社なんやる</dd>
                </div>
                <div className='flex flex-col sm:flex-row sm:gap-4'>
                  <dt className='text-warn font-bold sm:w-32 shrink-0'>所在地</dt>
                  <dd>埼玉県和光市中央1丁目1-54-101</dd>
                </div>
                <div className='flex flex-col sm:flex-row sm:gap-4'>
                  <dt className='text-warn font-bold sm:w-32 shrink-0'>TEL</dt>
                  <dd>
                    <a
                      href='tel:0424542350'
                      className='hover:text-warn transition-colors font-display font-bold'
                    >
                      042-454-2350
                    </a>
                  </dd>
                </div>
                <div className='flex flex-col sm:flex-row sm:gap-4'>
                  <dt className='text-warn font-bold sm:w-32 shrink-0'>FAX</dt>
                  <dd className='font-display font-bold'>042-454-2351</dd>
                </div>
                <div className='flex flex-col sm:flex-row sm:gap-4'>
                  <dt className='text-warn font-bold sm:w-32 shrink-0'>
                    E-mail
                  </dt>
                  <dd>
                    <a
                      href='mailto:info@nanyaru.com'
                      className='hover:text-warn transition-colors'
                    >
                      info@nanyaru.com
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Last updated */}
          <p className='mt-8 text-mute text-xs font-jp text-right'>
            制定日：2025年5月29日
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-slate2 text-mute py-10'>
        <div className='max-w-7xl mx-auto px-4 lg:px-8'>
          <div className='pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-jp'>
            <p>© 2026 合同会社なんやる. All rights reserved.</p>
            <Link
              href='/'
              className='hover:text-warn transition-colors'
            >
              ホームに戻る →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
