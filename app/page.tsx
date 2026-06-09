import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='font-body text-steel bg-white antialiased'>
      {/* Utility bar */}
      <div className='hidden lg:block bg-ink text-mute text-xs'>
        <div className='max-w-7xl mx-auto px-8 h-9 flex items-center justify-between'>
          <div className='flex items-center gap-5'>
            <span className='flex items-center gap-1.5'>
              <span className='w-1.5 h-1.5 bg-safety rounded-full animate-pulse'></span>
              東京・神奈川・埼玉・千葉エリア対応中
            </span>
          </div>
          <div className='flex items-center gap-5'>
            <a href='#contact' className='hover:text-warn transition-colors'>
              受付 8:00〜22:00（年中無休）
            </a>
            <span className='text-slate2'>|</span>
            <a
              href='tel:0424542350'
              className='hover:text-warn transition-colors flex items-center gap-1.5'
            >
              <svg
                className='w-3 h-3'
                fill='none'
                stroke='currentColor'
                strokeWidth='2.5'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z'
                />
              </svg>
              042-454-2350
            </a>
          </div>
        </div>
      </div>

      {/* Rainbow accent stripe */}
      <div className='h-1 chamel-gradient'></div>

      {/* Navbar */}
      <header className='sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-line'>
        <div className='max-w-7xl mx-auto px-4 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2'>
          <a href='#' className='flex items-center gap-2 sm:gap-3 min-w-0'>
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
          </a>
          <nav className='hidden lg:flex items-center gap-8 text-sm font-jp font-bold text-ink'>
            <a href='#' className='nav-link active'>
              ホーム
            </a>
            <a href='#about' className='nav-link'>
              私たちのこと
            </a>
            <a href='#services' className='nav-link'>
              サービス
            </a>
            <a href='#company' className='nav-link'>
              会社概要
            </a>
            <a href='#contact' className='nav-link'>
              お問い合わせ
            </a>
          </nav>
          <a
            href='https://lin.ee/TCzj0uN'
            target='_blank'
            rel='noopener noreferrer'
            className='btn-line cursor-pointer inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg font-display font-bold text-xs sm:text-sm'
          >
            <svg
              className='w-4 h-4 sm:w-4 sm:h-4'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path d='M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314' />
            </svg>
            <span className='hidden sm:inline'>LINEで無料相談</span>
            <span className='sm:hidden'>LINE相談</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className='relative overflow-hidden bg-paper'>
        <div className='absolute inset-0 grid-bg opacity-50'></div>
        <div className='absolute -top-32 -right-32 w-[500px] h-[500px] bg-safety/8 rounded-full blur-3xl'></div>
        <div className='absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-warn/8 rounded-full blur-3xl'></div>

        <div className='relative max-w-7xl mx-auto px-4 lg:px-8 pt-6 lg:pt-24 pb-10 lg:pb-28'>
          <div className='grid lg:grid-cols-12 gap-6 lg:gap-12 items-center'>
            <div className='lg:col-span-7 order-1'>
              <div className='flex items-center gap-3 mb-4 lg:mb-6'>
                <span className='h-px w-8 lg:w-10 bg-safety'></span>
                <span className='text-safety text-[10px] lg:text-xs font-jp font-bold tracking-[0.3em]'>
                  創業 2025年
                </span>
              </div>
              <h1 className='jp-heading text-ink text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-2 lg:mb-3'>
                「なんでもやります。」
              </h1>
              <div className='border-l-4 border-safety pl-3 lg:pl-4 my-3 lg:my-5'>
                <p className='jp-heading text-ink text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.2]'>
                  それが、
                  <span className='relative inline-block'>
                    <span className='relative z-10 text-safety'>なんやる</span>
                    <span className='absolute bottom-0.5 left-0 right-0 h-2 lg:h-2.5 chamel-gradient opacity-50 z-0'></span>
                  </span>
                  。<br />
                  それが、<span className='text-safety'>仕事</span>。
                </p>
              </div>
              <p className='hidden md:block text-base md:text-lg text-steel leading-relaxed max-w-xl mb-10 font-jp'>
                エアコンクリーニング、不用品回収、引越しサポート、家電取付、草刈り…
                <br className='hidden md:block' />
                暮らしの「ちょっと困った」を、まるごと解決する地域密着の便利屋です。
              </p>
              <div className='hidden lg:flex flex-col sm:flex-row gap-3'>
                <a
                  href='https://lin.ee/TCzj0uN'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn-line cursor-pointer inline-flex items-center justify-center gap-2 px-7 py-4 rounded-lg font-display font-bold text-base'
                >
                  <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314' />
                  </svg>
                  LINEで無料相談
                </a>
                <a
                  href='#services'
                  className='btn-outline cursor-pointer inline-flex items-center justify-center gap-2 px-7 py-4 rounded-lg font-display font-bold text-base'
                >
                  サービスを見る
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
                      d='M13 7l5 5m0 0l-5 5m5-5H6'
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right visual: Service Board */}
            <div className='lg:col-span-5 relative order-2'>
              <div className='relative max-w-md mx-auto'>
                {/* Top status bar */}
                <div className='flex items-center justify-between mb-2 lg:mb-3 px-1'>
                  <div className='flex items-center gap-2 lg:gap-2.5'>
                    <div className='flex items-center gap-1.5 bg-ink text-white px-2.5 lg:px-3 py-1 lg:py-1.5 rounded-full'>
                      <span className='w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse'></span>
                      <span className='text-[10px] font-jp font-bold tracking-widest'>
                        稼働中
                      </span>
                    </div>
                    <span className='text-[11px] lg:text-xs font-jp font-medium text-steel'>
                      対応中のサービス
                    </span>
                  </div>
                  <span className='text-[10px] text-mute font-jp font-bold tracking-widest'>
                    8種のサービス
                  </span>
                </div>

                {/* Service Board */}
                <div className='bg-ink rounded-2xl p-2.5 lg:p-4 relative overflow-hidden'>
                  <div
                    className='absolute inset-0 opacity-[0.08]'
                    style={{
                      backgroundImage:
                        'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
                      backgroundSize: '32px 32px',
                    }}
                  ></div>
                  <div className='absolute -top-20 -right-20 w-40 h-40 bg-safety/20 rounded-full blur-2xl'></div>

                  <div className='relative grid grid-cols-3 gap-1.5 lg:gap-2.5'>
                    {/* Active card */}
                    <div className='aspect-square bg-safety text-white rounded-lg lg:rounded-xl p-2 lg:p-3 flex flex-col justify-between relative overflow-hidden'>
                      <div className='absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-white rounded-full animate-pulse'></div>
                      <svg
                        className='w-5 h-5 lg:w-6 lg:h-6'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z'
                        />
                      </svg>
                      <div>
                        <div className='text-[10px] lg:text-[12px] font-jp font-bold opacity-80 tracking-wider mb-0.5'>
                          対応中
                        </div>
                        <div className='text-[12px] lg:text-[14px] font-jp font-bold leading-tight'>
                          エアコン
                          <br />
                          洗浄
                        </div>
                      </div>
                    </div>

                    <div className='aspect-square bg-white text-ink rounded-lg lg:rounded-xl p-2 lg:p-3 flex flex-col justify-between hover:bg-warn transition-colors cursor-pointer'>
                      <svg
                        className='w-5 h-5 lg:w-6 lg:h-6 text-safety'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m14 0H5'
                        />
                      </svg>
                      <div className='text-[12px] lg:text-[14px] font-jp font-bold leading-tight'>
                        不用品
                        <br />
                        回収
                      </div>
                    </div>

                    <div className='aspect-square bg-white text-ink rounded-lg lg:rounded-xl p-2 lg:p-3 flex flex-col justify-between hover:bg-warn transition-colors cursor-pointer'>
                      <svg
                        className='w-5 h-5 lg:w-6 lg:h-6 text-safety'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25'
                        />
                      </svg>
                      <div className='text-[12px] lg:text-[14px] font-jp font-bold leading-tight'>
                        引越し
                        <br />
                        サポート
                      </div>
                    </div>

                    <div className='aspect-square bg-white text-ink rounded-lg lg:rounded-xl p-2 lg:p-3 flex flex-col justify-between hover:bg-warn transition-colors cursor-pointer'>
                      <svg
                        className='w-5 h-5 lg:w-6 lg:h-6 text-safety'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75z'
                        />
                      </svg>
                      <div className='text-[12px] lg:text-[14px] font-jp font-bold leading-tight'>
                        家電
                        <br />
                        取付
                      </div>
                    </div>

                    <div className='aspect-square bg-white text-ink rounded-lg lg:rounded-xl p-2 lg:p-3 flex flex-col justify-between hover:bg-warn transition-colors cursor-pointer'>
                      <svg
                        className='w-5 h-5 lg:w-6 lg:h-6 text-safety'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z'
                        />
                      </svg>
                      <div className='text-[12px] lg:text-[14px] font-jp font-bold leading-tight'>
                        草刈り
                        <br />
                        庭木
                      </div>
                    </div>

                    <div className='aspect-square bg-white text-ink rounded-lg lg:rounded-xl p-2 lg:p-3 flex flex-col justify-between hover:bg-warn transition-colors cursor-pointer'>
                      <svg
                        className='w-5 h-5 lg:w-6 lg:h-6 text-safety'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                      </svg>
                      <div className='text-[12px] lg:text-[14px] font-jp font-bold leading-tight'>
                        ハウス
                        <br />
                        清掃
                      </div>
                    </div>

                    <div className='aspect-square bg-white text-ink rounded-lg lg:rounded-xl p-2 lg:p-3 flex flex-col justify-between hover:bg-warn transition-colors cursor-pointer'>
                      <svg
                        className='w-5 h-5 lg:w-6 lg:h-6 text-safety'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75z'
                        />
                      </svg>
                      <div className='text-[12px] lg:text-[14px] font-jp font-bold leading-tight'>
                        ペット
                        <br />
                        関連
                      </div>
                    </div>

                    {/* + Other */}
                    <a
                      href='#contact'
                      className='aspect-square bg-warn text-ink rounded-lg lg:rounded-xl p-2 lg:p-3 flex flex-col items-center justify-center hover:bg-yellow-300 transition-colors cursor-pointer'
                    >
                      <div className='font-display font-black text-2xl lg:text-3xl leading-none'>
                        +
                      </div>
                      <div className='text-[12px] lg:text-[14px] font-jp font-bold mt-1 lg:mt-1.5'>
                        その他
                      </div>
                    </a>
                  </div>
                </div>

                {/* Bottom footer strip */}
                <div className='hidden lg:flex mt-3 items-center justify-between px-1'>
                  <div className='flex items-center gap-2 text-xs font-jp text-steel'>
                    <svg
                      className='w-3.5 h-3.5 text-safety'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314' />
                    </svg>
                    どれでもLINEで相談可
                  </div>
                  <span className='text-[10px] font-jp font-bold tracking-widest text-safety'>
                    24時間対応
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom marquee */}
        <div className='bg-ink py-4 overflow-hidden'>
          <div
            className='flex gap-12 whitespace-nowrap'
            style={{ animation: 'nanyaru-marquee 30s linear infinite' }}
          >
            <span className='text-warn font-display font-bold text-sm flex items-center gap-3'>
              エアコン洗浄 <span className='text-mute'>•</span>
            </span>
            <span className='text-white font-display font-bold text-sm flex items-center gap-3'>
              不用品回収 <span className='text-mute'>•</span>
            </span>
            <span className='text-warn font-display font-bold text-sm flex items-center gap-3'>
              引越しサポート <span className='text-mute'>•</span>
            </span>
            <span className='text-white font-display font-bold text-sm flex items-center gap-3'>
              家電取付 <span className='text-mute'>•</span>
            </span>
            <span className='text-warn font-display font-bold text-sm flex items-center gap-3'>
              草刈り・庭木剪定 <span className='text-mute'>•</span>
            </span>
            <span className='text-warn font-display font-bold text-sm flex items-center gap-3'>
              ハウスクリーニング <span className='text-mute'>•</span>
            </span>
            <span className='text-white font-display font-bold text-sm flex items-center gap-3'>
              ペット関連 <span className='text-mute'>•</span>
            </span>
            <span className='text-warn font-display font-bold text-sm flex items-center gap-3'>
              エアコン洗浄 <span className='text-mute'>•</span>
            </span>
            <span className='text-white font-display font-bold text-sm flex items-center gap-3'>
              不用品回収 <span className='text-mute'>•</span>
            </span>
          </div>
        </div>
      </section>

      {/* About / Mission */}
      <section id='about' className='py-20 lg:py-28 bg-white'>
        <div className='max-w-7xl mx-auto px-4 lg:px-8'>
          <div className='grid lg:grid-cols-12 gap-12 mb-16'>
            <div className='lg:col-span-5'>
              <div className='inline-block bg-warn/20 text-ink px-3 py-1 rounded text-xs font-jp font-bold mb-3 tracking-wider'>
                — 私たちのこと 01
              </div>
              <h2 className='jp-heading text-ink text-4xl lg:text-5xl leading-tight mb-2'>
                私たちのこと。
              </h2>
              <p className='serif text-safety text-lg'>— なんやるについて</p>
            </div>
            <div className='lg:col-span-7 text-steel leading-loose font-jp space-y-4'>
              <p>
                「なんでもやります！」
                <br />
                この一言が、私たち合同会社なんやるの原点であり、すべてです。
              </p>
              <p>
                日々の暮らしの中には、専門業者に頼むほどでもない、けれど自分ではちょっと難しい——
                そんな「グレーゾーン」がたくさんあります。
                エアコンの内部洗浄、重い家具の運び出し、伸びすぎた庭木の剪定、棚を一本だけ取り付けたい。
              </p>
              <p>
                「これくらいで連絡しても良いのかな？」と迷ってしまう、そんな相談こそ、なんやるの出番です。
                カメレオンのように環境に合わせて姿を変え、お客様一人ひとりの「困った」に最適な解決を。
              </p>
            </div>
          </div>

          {/* Mission / Vision / Values cards */}
          <div className='grid md:grid-cols-3 gap-5'>
            <div className='card-hover bg-paper border border-line rounded-2xl p-7 relative overflow-hidden'>
              <div className='absolute top-0 left-0 right-0 h-1 bg-safety'></div>
              <div className='text-mute text-xs font-jp font-bold mb-5 tracking-widest'>
                私たちの使命
              </div>
              <h3 className='jp-heading text-ink text-xl mb-3'>
                暮らしに、寄り添う。
              </h3>
              <p className='text-sm text-steel font-jp leading-relaxed'>
                どんな小さなお困りごとも、一つひとつ丁寧に向き合います。
              </p>
            </div>
            <div className='card-hover bg-paper border border-line rounded-2xl p-7 relative overflow-hidden'>
              <div className='absolute top-0 left-0 right-0 h-1 bg-warn'></div>
              <div className='text-mute text-xs font-jp font-bold mb-5 tracking-widest'>
                目指す未来
              </div>
              <h3 className='jp-heading text-ink text-xl mb-3'>
                地域の、頼れる仲間に。
              </h3>
              <p className='text-sm text-steel font-jp leading-relaxed'>
                「困ったらなんやる」と、まず思い出していただける存在へ。
              </p>
            </div>
            <div className='card-hover bg-paper border border-line rounded-2xl p-7 relative overflow-hidden'>
              <div className='absolute top-0 left-0 right-0 h-1 chamel-gradient'></div>
              <div className='text-mute text-xs font-jp font-bold mb-5 tracking-widest'>
                大切にすること
              </div>
              <h3 className='jp-heading text-ink text-xl mb-3'>
                なんでも、やる。
              </h3>
              <p className='text-sm text-steel font-jp leading-relaxed'>
                &quot;できません&quot; の前に、&quot;やってみます&quot;
                を。可能性を、決めつけない。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id='services' className='py-20 lg:py-28 bg-paper'>
        <div className='max-w-7xl mx-auto px-4 lg:px-8'>
          <div className='flex items-end justify-between mb-12 flex-wrap gap-4'>
            <div>
              <div className='inline-block bg-warn/20 text-ink px-3 py-1 rounded text-xs font-jp font-bold mb-3 tracking-wider'>
                — サービス 02
              </div>
              <h2 className='jp-heading text-ink text-4xl lg:text-5xl leading-tight mb-2'>
                事業内容
              </h2>
              <p className='serif text-safety text-lg'>— 私たちが提供すること</p>
            </div>
            <a
              href='#contact'
              className='hidden md:inline-flex items-center gap-2 text-ink font-display font-bold text-sm border-b-2 border-ink pb-1 hover:gap-3 transition-all'
            >
              すべてのサービスを相談する
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
                  d='M17 8l4 4m0 0l-4 4m4-4H3'
                />
              </svg>
            </a>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
            <Link
              href='/cleaning/lp'
              target='_blank'
              rel='noopener noreferrer'
              className='card-hover bg-white border border-line rounded-2xl overflow-hidden block'
            >
              <div className='aspect-16/10 relative overflow-hidden'>
                <Image
                  src='/home/air-cleaning.jpg'
                  alt='エアコンクリーニング'
                  fill
                  sizes='(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'
                  className='object-cover'
                />
                <div className='absolute top-4 left-4 bg-safety text-white text-[10px] font-display font-bold px-2 py-1 rounded'>
                  01
                </div>
              </div>
              <div className='p-6'>
                <h3 className='jp-heading text-ink text-xl mb-2'>
                  エアコンクリーニング
                </h3>
                <p className='text-sm text-steel font-jp leading-relaxed mb-4'>
                  分解洗浄でカビ・花粉・ホコリを徹底除去。お子さま・ペットにも安心の洗剤を使用。
                </p>
                <div className='flex items-center justify-between pt-4 border-t border-line'>
                  <span className='text-sm text-mute font-jp'>¥9,800〜</span>
                  <span className='text-safety font-display font-bold text-sm inline-flex items-center gap-1'>
                    詳しく見る →
                  </span>
                </div>
              </div>
            </Link>

            <div className='card-hover bg-white border border-line rounded-2xl overflow-hidden'>
              <div className='aspect-16/10 relative overflow-hidden'>
                <Image
                  src='/home/unwanted-item.jpg'
                  alt='不用品回収・処分'
                  fill
                  sizes='(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'
                  className='object-cover'
                />
                <div className='absolute top-4 left-4 bg-ink text-warn text-[10px] font-display font-bold px-2 py-1 rounded'>
                  02
                </div>
              </div>
              <div className='p-6'>
                <h3 className='jp-heading text-ink text-xl mb-2'>
                  不用品回収・処分
                </h3>
                <p className='text-sm text-steel font-jp leading-relaxed mb-4'>
                  家具・家電1点から、お部屋まるごと整理まで。ごみ屋敷の片付けもご相談ください。
                </p>
                <div className='flex items-center justify-between pt-4 border-t border-line'>
                  <span className='text-sm text-mute font-jp'>¥3,000〜</span>
                  <a
                    href='#contact'
                    className='text-safety font-display font-bold text-sm hover:gap-2 inline-flex items-center gap-1'
                  >
                    詳しく見る →
                  </a>
                </div>
              </div>
            </div>

            <div className='card-hover bg-white border border-line rounded-2xl overflow-hidden'>
              <div className='aspect-16/10 relative overflow-hidden'>
                <Image
                  src='/home/moving-support.jpg'
                  alt='引越しサポート'
                  fill
                  sizes='(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'
                  className='object-cover'
                />
                <div className='absolute top-4 left-4 bg-ink text-warn text-[10px] font-display font-bold px-2 py-1 rounded'>
                  03
                </div>
              </div>
              <div className='p-6'>
                <h3 className='jp-heading text-ink text-xl mb-2'>
                  引越しサポート
                </h3>
                <p className='text-sm text-steel font-jp leading-relaxed mb-4'>
                  単身・少量・近距離の引越しに。トラック手配から搬入・設置まで。
                </p>
                <div className='flex items-center justify-between pt-4 border-t border-line'>
                  <span className='text-sm text-mute font-jp'>¥15,000〜</span>
                  <a
                    href='#contact'
                    className='text-safety font-display font-bold text-sm hover:gap-2 inline-flex items-center gap-1'
                  >
                    詳しく見る →
                  </a>
                </div>
              </div>
            </div>

            <div className='card-hover bg-white border border-line rounded-2xl overflow-hidden'>
              <div className='aspect-16/10 relative overflow-hidden'>
                <Image
                  src='/home/cutting-and-tree-pruning.jpg'
                  alt='草刈り・庭木剪定'
                  fill
                  sizes='(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'
                  className='object-cover'
                />
                <div className='absolute top-4 left-4 bg-ink text-warn text-[10px] font-display font-bold px-2 py-1 rounded'>
                  04
                </div>
              </div>
              <div className='p-6'>
                <h3 className='jp-heading text-ink text-xl mb-2'>
                  草刈り・庭木剪定
                </h3>
                <p className='text-sm text-steel font-jp leading-relaxed mb-4'>
                  お庭、空き地、植木の手入れ。除草剤の散布もご相談ください。
                </p>
                <div className='flex items-center justify-between pt-4 border-t border-line'>
                  <span className='text-sm text-mute font-jp'>¥8,000〜</span>
                  <a
                    href='#contact'
                    className='text-safety font-display font-bold text-sm hover:gap-2 inline-flex items-center gap-1'
                  >
                    詳しく見る →
                  </a>
                </div>
              </div>
            </div>

            <div className='card-hover bg-ink text-white rounded-2xl overflow-hidden relative'>
              <div className='absolute top-0 left-0 right-0 h-1 chamel-gradient'></div>
              <div className='aspect-16/10 flex items-center justify-center relative'>
                <svg
                  className='w-20 h-20 text-warn'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 4.5v15m7.5-7.5h-15'
                  />
                </svg>
                <div className='absolute top-4 left-4 bg-warn text-ink text-[10px] font-display font-bold px-2 py-1 rounded'>
                  ??
                </div>
              </div>
              <div className='p-6'>
                <h3 className='jp-heading text-white text-xl mb-2'>
                  それ以外、なんでも。
                </h3>
                <p className='text-sm text-mute font-jp leading-relaxed mb-4'>
                  家電取付、ペットお世話、お買い物代行、お引越しの梱包…
                  一覧にない作業もご相談ください。
                </p>
                <div className='flex items-center justify-between pt-4 border-t border-slate2'>
                  <span className='text-sm text-warn font-jp'>要相談</span>
                  <a
                    href='#contact'
                    className='text-warn font-display font-bold text-sm hover:gap-2 inline-flex items-center gap-1'
                  >
                    相談する →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section id='company' className='py-20 lg:py-28 bg-paper'>
        <div className='max-w-7xl mx-auto px-4 lg:px-8'>
          <div className='grid lg:grid-cols-12 gap-12 items-start'>
            <div className='lg:col-span-4'>
              <div className='inline-block bg-warn/20 text-ink px-3 py-1 rounded text-xs font-jp font-bold mb-3 tracking-wider'>
                — 会社概要 04
              </div>
              <h2 className='jp-heading text-ink text-4xl lg:text-5xl leading-tight mb-2'>
                会社概要
              </h2>
              <p className='serif text-safety text-lg mb-8'>— 会社のご案内</p>

              <div className='bg-white rounded-2xl p-6 border border-line'>
                <div
                  className='logo h-24 w-24 mb-4'
                  role='img'
                  aria-label='合同会社なんやる ロゴ'
                ></div>
                <div className='jp-heading text-ink text-base mb-1'>
                  合同会社なんやる
                </div>
              </div>
            </div>

            <div className='lg:col-span-8'>
              <div className='bg-white border border-line rounded-2xl overflow-hidden'>
                <dl className='divide-y divide-line'>
                  <div className='grid grid-cols-12 gap-4 px-6 py-5 bg-paper/60'>
                    <dt className='col-span-12 md:col-span-3 font-jp font-bold text-ink text-sm flex items-center gap-2'>
                      <span className='w-1.5 h-1.5 bg-safety rounded-full'></span>
                      会社名
                    </dt>
                    <dd className='col-span-12 md:col-span-9 font-jp text-steel text-sm'>
                      合同会社なんやる
                    </dd>
                  </div>
                  <div className='grid grid-cols-12 gap-4 px-6 py-5'>
                    <dt className='col-span-12 md:col-span-3 font-jp font-bold text-ink text-sm flex items-center gap-2'>
                      <span className='w-1.5 h-1.5 bg-safety rounded-full'></span>
                      設立日
                    </dt>
                    <dd className='col-span-12 md:col-span-9 font-jp text-steel text-sm'>
                      2025年05月29日
                    </dd>
                  </div>
                  <div className='grid grid-cols-12 gap-4 px-6 py-5 bg-paper/60'>
                    <dt className='col-span-12 md:col-span-3 font-jp font-bold text-ink text-sm flex items-center gap-2'>
                      <span className='w-1.5 h-1.5 bg-safety rounded-full'></span>
                      資本金
                    </dt>
                    <dd className='col-span-12 md:col-span-9 font-jp text-steel text-sm'>
                      100万円
                    </dd>
                  </div>
                  <div className='grid grid-cols-12 gap-4 px-6 py-5'>
                    <dt className='col-span-12 md:col-span-3 font-jp font-bold text-ink text-sm flex items-center gap-2'>
                      <span className='w-1.5 h-1.5 bg-safety rounded-full'></span>
                      代表者
                    </dt>
                    <dd className='col-span-12 md:col-span-9 font-jp text-steel text-sm'>
                      横戸 拓己
                    </dd>
                  </div>
                  <div className='grid grid-cols-12 gap-4 px-6 py-5 bg-paper/60'>
                    <dt className='col-span-12 md:col-span-3 font-jp font-bold text-ink text-sm flex items-center gap-2'>
                      <span className='w-1.5 h-1.5 bg-safety rounded-full'></span>
                      所在地
                    </dt>
                    <dd className='col-span-12 md:col-span-9 font-jp text-steel text-sm'>
                      埼玉県和光市中央1丁目1-54-101
                    </dd>
                  </div>
                  <div className='grid grid-cols-12 gap-4 px-6 py-5'>
                    <dt className='col-span-12 md:col-span-3 font-jp font-bold text-ink text-sm flex items-center gap-2'>
                      <span className='w-1.5 h-1.5 bg-safety rounded-full'></span>
                      電話番号
                    </dt>
                    <dd className='col-span-12 md:col-span-9 font-jp text-steel text-sm'>
                      <a
                        href='tel:0424542350'
                        className='text-ink font-display font-bold hover:text-safety transition-colors'
                      >
                        042-454-2350
                      </a>
                      <span className='text-mute ml-2 text-xs'>
                        （受付 8:00〜22:00 年中無休）
                      </span>
                    </dd>
                  </div>
                  <div className='grid grid-cols-12 gap-4 px-6 py-5 bg-paper/60'>
                    <dt className='col-span-12 md:col-span-3 font-jp font-bold text-ink text-sm flex items-center gap-2'>
                      <span className='w-1.5 h-1.5 bg-safety rounded-full'></span>
                      FAX
                    </dt>
                    <dd className='col-span-12 md:col-span-9 font-display font-bold text-ink text-sm'>
                      042-454-2351
                    </dd>
                  </div>
                  <div className='grid grid-cols-12 gap-4 px-6 py-5'>
                    <dt className='col-span-12 md:col-span-3 font-jp font-bold text-ink text-sm flex items-center gap-2'>
                      <span className='w-1.5 h-1.5 bg-safety rounded-full'></span>
                      事業内容
                    </dt>
                    <dd className='col-span-12 md:col-span-9 font-jp text-steel text-sm leading-relaxed'>
                      ・ハウスクリーニング、エアコンクリーニング
                      <br />
                      ・不用品回収、引越しサポート
                      <br />
                      ・家電取付
                      <br />
                      ・草刈り、庭木剪定
                      <br />
                      ・その他便利屋業務全般
                    </dd>
                  </div>
                  <div className='grid grid-cols-12 gap-4 px-6 py-5 bg-paper/60'>
                    <dt className='col-span-12 md:col-span-3 font-jp font-bold text-ink text-sm flex items-center gap-2'>
                      <span className='w-1.5 h-1.5 bg-safety rounded-full'></span>
                      対応エリア
                    </dt>
                    <dd className='col-span-12 md:col-span-9 font-jp text-steel text-sm'>
                      東京都・神奈川県・埼玉県・千葉県（エリア外も応相談）
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id='contact'
        className='relative py-20 lg:py-28 bg-ink overflow-hidden'
      >
        <div
          className='absolute inset-0 opacity-[0.05]'
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        ></div>
        <div className='absolute -top-32 -right-20 w-96 h-96 bg-safety/15 rounded-full blur-3xl'></div>
        <div className='absolute -bottom-32 -left-20 w-96 h-96 bg-warn/10 rounded-full blur-3xl'></div>

        <div className='relative max-w-6xl mx-auto px-4 lg:px-8'>
          <div className='text-center mb-12'>
            <div className='inline-block bg-warn text-ink px-3 py-1 rounded text-xs font-jp font-bold mb-4 tracking-wider'>
              — お問い合わせ 05
            </div>
            <h2 className='jp-heading text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-4'>
              まずはお気軽に、
              <br />
              ご相談ください。
            </h2>
            <p className='text-mute font-jp leading-relaxed max-w-xl mx-auto'>
              サービスのお見積もり、ご依頼、その他お問い合わせ。
              <br />
              ご都合の良い方法でどうぞ。
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-5'>
            <a
              href='https://lin.ee/TCzj0uN'
              target='_blank'
              rel='noopener noreferrer'
              className='card-hover bg-line-green text-white p-7 rounded-2xl cursor-pointer relative overflow-hidden'
            >
              <div className='absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mt-12 -mr-12'></div>
              <div className='relative'>
                <div className='w-14 h-14 bg-white text-line-green rounded-xl flex items-center justify-center mb-5'>
                  <svg
                    className='w-7 h-7'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314' />
                  </svg>
                </div>
                <div className='text-white/80 text-xs font-jp font-bold tracking-widest mb-2'>
                  おすすめ
                </div>
                <h3 className='jp-heading text-white text-2xl mb-2'>LINE</h3>
                <p className='text-white/90 text-sm font-jp leading-relaxed mb-4'>
                  写真を送って即お見積もり。24時間受付中。
                </p>
                <span className='inline-flex items-center gap-2 text-white font-display font-bold text-sm'>
                  友だち追加 →
                </span>
              </div>
            </a>

            <a
              href='tel:0424542350'
              className='card-hover bg-white text-ink p-7 rounded-2xl cursor-pointer'
            >
              <div className='w-14 h-14 bg-ink text-warn rounded-xl flex items-center justify-center mb-5'>
                <svg
                  className='w-7 h-7'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z'
                  />
                </svg>
              </div>
              <div className='text-mute text-xs font-jp font-bold tracking-widest mb-2'>
                お電話で
              </div>
              <h3 className='jp-heading text-ink text-2xl mb-2'>お電話</h3>
              <p className='text-steel text-sm font-jp leading-relaxed mb-4'>
                受付 8:00〜22:00（年中無休）
              </p>
              <span className='number-display text-ink text-2xl'>
                042-454-2350
              </span>
            </a>

            <a
              href='mailto:info@nanyaru.com'
              className='card-hover bg-warn text-ink p-7 rounded-2xl cursor-pointer'
            >
              <div className='w-14 h-14 bg-ink text-warn rounded-xl flex items-center justify-center mb-5'>
                <svg
                  className='w-7 h-7'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75'
                  />
                </svg>
              </div>
              <div className='text-ink/70 text-xs font-jp font-bold tracking-widest mb-2'>
                メールで
              </div>
              <h3 className='jp-heading text-ink text-2xl mb-2'>メール</h3>
              <p className='text-ink/80 text-sm font-jp leading-relaxed mb-4'>
                24時間受付。1営業日以内にご返信。
              </p>
              <span className='inline-flex items-center gap-2 text-ink font-display font-bold text-sm'>
                info@nanyaru.com →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-slate2 text-mute py-16'>
        <div className='max-w-7xl mx-auto px-4 lg:px-8'>
          <div className='grid md:grid-cols-12 gap-8 lg:gap-12 mb-12'>
            <div className='md:col-span-4'>
              <div className='flex items-center gap-3 mb-5'>
                <div className='bg-white rounded-lg p-1.5'>
                  <div
                    className='logo h-12 w-12'
                    role='img'
                    aria-label='合同会社なんやる'
                  ></div>
                </div>
                <div className='leading-tight'>
                  <div className='jp-heading text-white text-base'>
                    合同会社なんやる
                  </div>
                </div>
              </div>
              <p className='text-sm font-jp leading-relaxed max-w-md mb-5'>
                「なんでもやります！」の気持ちで生まれた、地域密着の便利屋。お客様の暮らしに寄り添う仕事をしています。
              </p>
              <div className='flex items-center gap-3'>
                <a
                  href='#'
                  className='w-10 h-10 bg-ink rounded-lg flex items-center justify-center text-mute hover:text-warn hover:bg-slate2 transition-colors'
                >
                  <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314' />
                  </svg>
                </a>
                <a
                  href='#'
                  className='w-10 h-10 bg-ink rounded-lg flex items-center justify-center text-mute hover:text-warn hover:bg-slate2 transition-colors'
                >
                  <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z' />
                  </svg>
                </a>
              </div>
            </div>

            <div className='md:col-span-2'>
              <h4 className='text-warn font-jp font-bold text-xs mb-4 tracking-widest'>
                サービス
              </h4>
              <ul className='space-y-2.5 text-sm font-jp'>
                <li>
                  <a
                    href='#services'
                    className='hover:text-warn transition-colors'
                  >
                    エアコンクリーニング
                  </a>
                </li>
                <li>
                  <a
                    href='#services'
                    className='hover:text-warn transition-colors'
                  >
                    ハウスクリーニング
                  </a>
                </li>
                <li>
                  <a
                    href='#services'
                    className='hover:text-warn transition-colors'
                  >
                    不用品回収
                  </a>
                </li>
                <li>
                  <a
                    href='#services'
                    className='hover:text-warn transition-colors'
                  >
                    引越しサポート
                  </a>
                </li>
                <li>
                  <a
                    href='#services'
                    className='hover:text-warn transition-colors'
                  >
                    草刈り・庭木
                  </a>
                </li>
              </ul>
            </div>

            <div className='md:col-span-2'>
              <h4 className='text-warn font-jp font-bold text-xs mb-4 tracking-widest'>
                会社情報
              </h4>
              <ul className='space-y-2.5 text-sm font-jp'>
                <li>
                  <a
                    href='#about'
                    className='hover:text-warn transition-colors'
                  >
                    私たちのこと
                  </a>
                </li>
                <li>
                  <a
                    href='#company'
                    className='hover:text-warn transition-colors'
                  >
                    会社概要
                  </a>
                </li>
              </ul>
            </div>

            <div className='md:col-span-4'>
              <h4 className='text-warn font-jp font-bold text-xs mb-4 tracking-widest'>
                お問い合わせ
              </h4>
              <ul className='space-y-3 text-sm font-jp'>
                <li className='flex items-start gap-3'>
                  <svg
                    className='w-4 h-4 text-warn mt-0.5 shrink-0'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
                    />
                  </svg>
                  <span>埼玉県和光市中央1丁目1-54-101</span>
                </li>
                <li className='flex items-center gap-3'>
                  <svg
                    className='w-4 h-4 text-warn shrink-0'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z'
                    />
                  </svg>
                  <a href='tel:0424542350' className='hover:text-warn'>
                    TEL：042-454-2350
                  </a>
                </li>
                <li className='flex items-center gap-3'>
                  <svg
                    className='w-4 h-4 text-warn shrink-0'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5'
                    />
                  </svg>
                  <span>FAX：042-454-2351</span>
                </li>
                <li className='flex items-center gap-3'>
                  <svg
                    className='w-4 h-4 text-warn shrink-0'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75'
                    />
                  </svg>
                  <a href='mailto:info@nanyaru.com' className='hover:text-warn'>
                    info@nanyaru.com
                  </a>
                </li>
                <li className='flex items-center gap-3'>
                  <svg
                    className='w-4 h-4 text-warn shrink-0'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  <span>受付 8:00〜22:00（年中無休）</span>
                </li>
              </ul>
            </div>
          </div>

          <div className='pt-6 border-t border-ink flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-jp'>
            <p>© 2026 合同会社なんやる. All rights reserved.</p>
            <div className='flex gap-6'>
              <a
                href='/privacy'
                className='hover:text-warn transition-colors'
              >
                プライバシーポリシー
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating LINE button mobile */}
      <a
        href='https://lin.ee/TCzj0uN'
        target='_blank'
        rel='noopener noreferrer'
        className='fixed bottom-6 right-6 md:hidden z-50 btn-line cursor-pointer w-14 h-14 rounded-full flex items-center justify-center'
      >
        <svg className='w-7 h-7' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314' />
        </svg>
      </a>
    </div>
  )
}
