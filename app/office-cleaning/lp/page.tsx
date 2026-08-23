import type { Metadata } from 'next'
import Script from 'next/script'

import OfficeCtaLink from '@/components/OfficeCtaLink'

const TITLE = '【大手と同品質で格安】元ダスキン仕込みのオフィスエアコンクリーニング'
const DESCRIPTION =
  '大手の見積もりが高いとお悩みの総務担当者様へ。ダスキンで修行した元プロが直伝の技術で一から育てたスタッフが伺います！中間マージンを徹底排除した自社一貫体制だから、大手と同等の徹底洗浄が驚きの価格で実現。業務に影響のない夜間・休日施工も対応可能です。まずは無料見積もりから！'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    '業務用エアコンクリーニング',
    'オフィスエアコンクリーニング',
    '店舗エアコンクリーニング',
    '法人向けエアコン清掃',
    '天井埋込エアコン クリーニング',
    '事務所 エアコン 清掃',
    '東京',
    '神奈川',
    '埼玉',
    '千葉',
    '合同会社なんやる',
  ],
  alternates: { canonical: '/office-cleaning/lp' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://nanyaru.com/office-cleaning/lp',
    siteName: '合同会社なんやる',
    locale: 'ja_JP',
    type: 'website',
    images: [{ url: '/images/office-cleaning/ogp.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/images/office-cleaning/ogp_x.png'],
  },
  icons: {
    icon: [
      { url: '/images/office-cleaning/favicon16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/office-cleaning/favicon32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/office-cleaning/favicon48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: { url: '/images/office-cleaning/apple-touch-icon.png', sizes: '180x180' },
  },
}

export default function OfficeCleaningLp() {
  return (
    <>
      {/* Đặt class 'js' lên <html> lúc parse (không chờ hydrate), để CSS bàn giao
          (html.js .opening { display: flex }) hiện overlay opening TRƯỚC khung hình đầu,
          đúng hành vi bản gốc thay vì để opening đổ xuống sau khi trang đã vẽ xong.

          Kèm theo: bắt click vào CTA form ở capture phase trước khi hydrate xong, để
          gắn ?ecaiad= (mã quảng cáo) từ query string của trang vào URL đích trước khi
          điều hướng — nếu không, click trong cửa sổ FCP→hydrate sẽ tới form không mang
          mã (OfficeCtaLink chỉ tự gắn param sau khi hydrate). Không viết lại href trong
          DOM trước hydrate (đó là loại mismatch gây ra lỗi #418) — chỉ điều hướng thủ
          công tại thời điểm click. Ngữ nghĩa khớp useOfficeFormUrl() trong
          components/OfficeCtaLink.tsx: không có ecaiad trên URL trang → giữ nguyên href
          trần. Sau khi hydrate, href đã tự mang ecaiad nên điều kiện href đã có
          'ecaiad=' sẽ bỏ qua, không gắn chồng. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.classList.add('js');
(function () {
  var FORM_URL_PREFIX = 'https://cleaning.nanyaru.com/register-business';
  document.addEventListener(
    'click',
    function (e) {
      var a = e.target.closest && e.target.closest('a[href^="' + FORM_URL_PREFIX + '"]');
      if (!a) return;
      var href = a.getAttribute('href') || '';
      if (href.indexOf('ecaiad=') !== -1) return;
      var ecaiad = new URLSearchParams(window.location.search).get('ecaiad');
      if (!ecaiad) return;
      e.preventDefault();
      var sep = href.indexOf('?') === -1 ? '?' : '&';
      window.location.href = href + sep + 'ecaiad=' + encodeURIComponent(ecaiad);
    },
    true
  );
})();`,
        }}
      />

      {/* M PLUS Rounded 1c: dùng cho .faq__q/.faq__a, badge tròn, nhãn dọc (styles/office-cleaning.css).
          React 19 tự hoist <link> lên <head>. */}
      <link
        rel='stylesheet'
        href='https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@500;700&display=swap'
      />

      <Script id='gtm-office-cleaning' strategy='afterInteractive'>
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-PVRH5BH9');`}
      </Script>

      <noscript>
        <iframe
          src='https://www.googletagmanager.com/ns.html?id=GTM-PVRH5BH9'
          height='0'
          width='0'
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      {/* ===== オープニング（泡が舞い上がる＋エアコン→ロゴ→ページ表示） ===== */}
      <div className='opening' id='opening' aria-hidden='true'>
        <div className='op-bubbles'>
          <span
            className='op-bubble'
            style={
              {
                '--x': '4%',
                '--sz': '118px',
                '--d': '-3.0s',
                '--dur': '6.4s',
                '--sway': '34px',
              } as React.CSSProperties
            }
          ></span>
          <span
            className='op-bubble'
            style={
              {
                '--x': '10%',
                '--sz': '44px',
                '--d': '-1.2s',
                '--dur': '5.0s',
                '--sway': '-22px',
              } as React.CSSProperties
            }
          ></span>
          <span
            className='op-bubble'
            style={
              {
                '--x': '16%',
                '--sz': '74px',
                '--d': '0.35s',
                '--dur': '5.8s',
                '--sway': '28px',
              } as React.CSSProperties
            }
          ></span>
          <span
            className='op-bubble'
            style={
              {
                '--x': '22%',
                '--sz': '36px',
                '--d': '-2.4s',
                '--dur': '4.7s',
                '--sway': '-18px',
              } as React.CSSProperties
            }
          ></span>
          <span
            className='op-bubble'
            style={
              {
                '--x': '28%',
                '--sz': '96px',
                '--d': '0.8s',
                '--dur': '6.8s',
                '--sway': '38px',
              } as React.CSSProperties
            }
          ></span>
          <span
            className='op-bubble'
            style={
              {
                '--x': '34%',
                '--sz': '52px',
                '--d': '-1.8s',
                '--dur': '5.2s',
                '--sway': '24px',
              } as React.CSSProperties
            }
          ></span>
          <span
            className='op-bubble'
            style={
              {
                '--x': '40%',
                '--sz': '132px',
                '--d': '-0.5s',
                '--dur': '7.2s',
                '--sway': '-40px',
              } as React.CSSProperties
            }
          ></span>
          <span
            className='op-bubble'
            style={
              {
                '--x': '46%',
                '--sz': '30px',
                '--d': '1.5s',
                '--dur': '4.4s',
                '--sway': '16px',
              } as React.CSSProperties
            }
          ></span>
          <span
            className='op-bubble'
            style={
              {
                '--x': '52%',
                '--sz': '66px',
                '--d': '-2.9s',
                '--dur': '5.6s',
                '--sway': '-26px',
              } as React.CSSProperties
            }
          ></span>
          <span
            className='op-bubble'
            style={
              {
                '--x': '58%',
                '--sz': '104px',
                '--d': '0.15s',
                '--dur': '6.6s',
                '--sway': '36px',
              } as React.CSSProperties
            }
          ></span>
          <span
            className='op-bubble'
            style={
              {
                '--x': '64%',
                '--sz': '40px',
                '--d': '-1.5s',
                '--dur': '4.9s',
                '--sway': '-20px',
              } as React.CSSProperties
            }
          ></span>
          <span
            className='op-bubble'
            style={
              {
                '--x': '70%',
                '--sz': '80px',
                '--d': '1.0s',
                '--dur': '6.0s',
                '--sway': '30px',
              } as React.CSSProperties
            }
          ></span>
          <span
            className='op-bubble'
            style={
              {
                '--x': '76%',
                '--sz': '56px',
                '--d': '-2.2s',
                '--dur': '5.4s',
                '--sway': '-24px',
              } as React.CSSProperties
            }
          ></span>
          <span
            className='op-bubble'
            style={
              {
                '--x': '82%',
                '--sz': '124px',
                '--d': '-0.2s',
                '--dur': '7.0s',
                '--sway': '42px',
              } as React.CSSProperties
            }
          ></span>
          <span
            className='op-bubble'
            style={
              {
                '--x': '88%',
                '--sz': '34px',
                '--d': '1.2s',
                '--dur': '4.6s',
                '--sway': '-16px',
              } as React.CSSProperties
            }
          ></span>
          <span
            className='op-bubble'
            style={
              {
                '--x': '94%',
                '--sz': '90px',
                '--d': '-1.0s',
                '--dur': '6.2s',
                '--sway': '32px',
              } as React.CSSProperties
            }
          ></span>
          <span
            className='op-bubble'
            style={
              {
                '--x': '7%',
                '--sz': '62px',
                '--d': '1.8s',
                '--dur': '5.5s',
                '--sway': '-28px',
              } as React.CSSProperties
            }
          ></span>
          <span
            className='op-bubble'
            style={
              {
                '--x': '37%',
                '--sz': '44px',
                '--d': '-3.4s',
                '--dur': '4.8s',
                '--sway': '20px',
              } as React.CSSProperties
            }
          ></span>
          <span
            className='op-bubble'
            style={
              {
                '--x': '67%',
                '--sz': '116px',
                '--d': '2.0s',
                '--dur': '6.9s',
                '--sway': '-36px',
              } as React.CSSProperties
            }
          ></span>
          <span
            className='op-bubble'
            style={
              {
                '--x': '97%',
                '--sz': '48px',
                '--d': '-2.6s',
                '--dur': '5.1s',
                '--sway': '22px',
              } as React.CSSProperties
            }
          ></span>
        </div>
        <div className='opening__inner'>
          <img
            className='op-eacon'
            src='/images/office-cleaning/eacon.webp'
            alt=''
            width={339}
            height={215}
          />
          <img
            className='op-logo'
            src='/images/office-cleaning/logo_t.webp'
            alt='NAN YARU'
            width={555}
            height={565}
          />
        </div>
      </div>

      {/* ===== FV（参考LP構成／背景白＋幾何学地紋／葉っぱ形バッジ） ===== */}
      <section className='fv'>
        <span className='dia dia--teal fv-dia1'></span>
        <span className='dia dia--orange fv-dia2'></span>
        <span className='dia dia--orange fv-dia3'></span>
        <span className='dia dia--blue fv-dia4'></span>
        <span className='dia dia--green fv-dia5'></span>
        <span className='dia dia--red fv-dia6'></span>

        <nav className='fv__nav pcnav'>
          <a href='#reason' className='GTM_cv_click'>
            選ばれる理由
          </a>
          <a href='#price' className='GTM_cv_click'>
            料金プラン
          </a>
          <a href='#flow' className='GTM_cv_click'>
            サービスの流れ
          </a>
          <a href='#faq' className='GTM_cv_click'>
            よくあるご質問
          </a>
          {/* <a className="fv__nav-tel" href="tel:0424542350">TEL：042-454-2350</a> */}
          <OfficeCtaLink className='fv__nav-btn GTM_cv_click'>無料お見積りはこちら</OfficeCtaLink>
        </nav>
        {/* SP：左上のロゴ＋サービス名パネル（参考構図の左上ロゴパネル相当） */}
        <div className='fv__brandbar sp-only'>
          <img
            className='fv__brandbar-logo'
            src='/images/office-cleaning/logo_t.webp'
            alt='NAN YARU'
            width={555}
            height={565}
          />
          <p className='fv__brandbar-txt'>
            オフィス向けの
            <br />
            エアコンクリーニング
          </p>
        </div>
        <button className='fv__menu spnav' type='button' aria-label='メニューを開く'>
          <span className='fv__menu-bar'></span>
        </button>

        {/* SPメニューパネル（カンプでは閉じた状態＝非表示。workでJS開閉） */}
        <div className='spmenu' aria-hidden='true'>
          <button className='spmenu__close' type='button'>
            ×
          </button>
          <nav className='spmenu__nav'>
            <a href='#reason' className='GTM_cv_click'>
              選ばれる理由
            </a>
            <a href='#price' className='GTM_cv_click'>
              料金プラン
            </a>
            <a href='#flow' className='GTM_cv_click'>
              サービスの流れ
            </a>
            <a href='#faq' className='GTM_cv_click'>
              よくあるご質問
            </a>
          </nav>
          <a className='spmenu__tel GTM_cv_click' href='tel:0424542350'>
            TEL：042-454-2350
          </a>
          <OfficeCtaLink className='btn btn--line spmenu__btn GTM_cv_click'>
            無料お見積りはこちら
          </OfficeCtaLink>
        </div>

        <div className='fv__inner'>
          {/* SP：飾り罫つきの小見出し（参考構図の上部リード相当） */}
          <p className='fv__lead sp-only'>
            <span className='thin'>＼</span>
            <span className='fv__lead-txt'>品質はダスキンのまま。価格だけ、変えました。</span>
            <span className='thin'>／</span>
          </p>
          <div className='fv__catch'>
            <p className='fv__eyebrow'>
              <span className='thin pc-only-i'>＼</span>
              <span className='box'>
                <span className='pc-arch'>
                  <i style={{ '--y': '9.0px', '--r': '-3.20deg' } as React.CSSProperties}>オ</i>
                  <i style={{ '--y': '6.9px', '--r': '-2.80deg' } as React.CSSProperties}>フ</i>
                  <i style={{ '--y': '5.1px', '--r': '-2.40deg' } as React.CSSProperties}>ィ</i>
                  <i style={{ '--y': '3.5px', '--r': '-2.00deg' } as React.CSSProperties}>ス</i>
                  <i style={{ '--y': '2.2px', '--r': '-1.60deg' } as React.CSSProperties}>向</i>
                  <i style={{ '--y': '1.3px', '--r': '-1.20deg' } as React.CSSProperties}>け</i>
                  <i style={{ '--y': '0.6px', '--r': '-0.80deg' } as React.CSSProperties}>の</i>
                  <i style={{ '--y': '0.1px', '--r': '-0.40deg' } as React.CSSProperties}>エ</i>
                  <i style={{ '--y': '0.0px', '--r': '0.00deg' } as React.CSSProperties}>ア</i>
                  <i style={{ '--y': '0.1px', '--r': '0.40deg' } as React.CSSProperties}>コ</i>
                  <i style={{ '--y': '0.6px', '--r': '0.80deg' } as React.CSSProperties}>ン</i>
                  <i style={{ '--y': '1.3px', '--r': '1.20deg' } as React.CSSProperties}>ク</i>
                  <i style={{ '--y': '2.2px', '--r': '1.60deg' } as React.CSSProperties}>リ</i>
                  <i style={{ '--y': '3.5px', '--r': '2.00deg' } as React.CSSProperties}>ー</i>
                  <i style={{ '--y': '5.1px', '--r': '2.40deg' } as React.CSSProperties}>ニ</i>
                  <i style={{ '--y': '6.9px', '--r': '2.80deg' } as React.CSSProperties}>ン</i>
                  <i style={{ '--y': '9.0px', '--r': '3.20deg' } as React.CSSProperties}>グ</i>
                </span>
                <span className='sp-plain'>
                  オフィス向けの
                  <br className='sp' />
                  エアコンクリーニング
                </span>
              </span>
              <span className='thin pc-only-i'>／</span>
            </p>
            <h1 className='fv__title'>
              <span className='box'>
                <em className='hl'>
                  <i style={{ '--y': '30.0px', '--r': '-7.50deg' } as React.CSSProperties}>ダ</i>
                  <i style={{ '--y': '23.4px', '--r': '-6.62deg' } as React.CSSProperties}>ス</i>
                  <i style={{ '--y': '17.5px', '--r': '-5.74deg' } as React.CSSProperties}>キ</i>
                  <i style={{ '--y': '12.6px', '--r': '-4.85deg' } as React.CSSProperties}>ン</i>
                </em>
                <i style={{ '--y': '8.4px', '--r': '-3.97deg' } as React.CSSProperties}>仕</i>
                <i style={{ '--y': '5.1px', '--r': '-3.09deg' } as React.CSSProperties}>込</i>
                <i style={{ '--y': '2.6px', '--r': '-2.21deg' } as React.CSSProperties}>み</i>
                <i style={{ '--y': '0.9px', '--r': '-1.32deg' } as React.CSSProperties}>の</i>
              </span>
              <span className='box box--2'>
                <em className='hl stamp--sp'>
                  <i style={{ '--y': '0.1px', '--r': '-0.44deg' } as React.CSSProperties}>技</i>
                  <i style={{ '--y': '0.1px', '--r': '0.44deg' } as React.CSSProperties}>術</i>
                </em>
                <i style={{ '--y': '0.9px', '--r': '1.32deg' } as React.CSSProperties}>を</i>
                <i
                  className='pt'
                  style={{ '--y': '2.6px', '--r': '2.21deg' } as React.CSSProperties}
                >
                  、
                </i>
              </span>
              <span className='box box--3'>
                <i style={{ '--y': '5.1px', '--r': '3.09deg' } as React.CSSProperties}>も</i>
                <i style={{ '--y': '8.4px', '--r': '3.97deg' } as React.CSSProperties}>っ</i>
                <i style={{ '--y': '12.6px', '--r': '4.85deg' } as React.CSSProperties}>と</i>
                <em className='hl'>
                  <i style={{ '--y': '17.5px', '--r': '5.74deg' } as React.CSSProperties}>安</i>
                  <i style={{ '--y': '23.4px', '--r': '6.62deg' } as React.CSSProperties}>く</i>
                </em>
                <i
                  className='pt'
                  style={{ '--y': '30.0px', '--r': '7.50deg' } as React.CSSProperties}
                >
                  。
                </i>
              </span>
            </h1>
          </div>
          <div className='fv__stage'>
            <img
              className='fv__side fv__side--l pc-only'
              src='/images/office-cleaning/flow_07.png'
              alt=''
              width={506}
              height={395}
            />
            <img
              className='fv__photo'
              src='/images/office-cleaning/fv_main.webp'
              alt=''
              width={1024}
              height={1024}
            />
            <img
              className='fv__side fv__side--r pc-only'
              src='/images/office-cleaning/flow_03.png'
              alt=''
              width={506}
              height={395}
            />
            {/* <img className="fv__bub fv__bub--1" src="/images/office-cleaning/bable.webp" alt="" /> */}
            {/* <img className="fv__bub fv__bub--2 pc-only" src="/images/office-cleaning/bable.webp" alt="" /> */}
            <div className='fv__leaf fv__leaf--1'>
              元ダスキンの
              <br />
              プロが対応
            </div>
            <div className='fv__leaf fv__leaf--2'>
              24時間365日
              <br />
              受付
            </div>
            <div className='fv__leaf fv__leaf--3'>
              複数台
              <br />
              割引あり
            </div>
          </div>
          <div className='fv__brand'>
            <img
              src='/images/office-cleaning/logo_t.webp'
              alt='NAN YARU'
              width={555}
              height={565}
            />
          </div>
          <p className='fv__sub'>
            <span className='pc-arch'>
              <i style={{ '--y': '13.0px', '--r': '-3.40deg' } as React.CSSProperties}>品</i>
              <i style={{ '--y': '10.8px', '--r': '-3.10deg' } as React.CSSProperties}>質</i>
              <i style={{ '--y': '8.9px', '--r': '-2.81deg' } as React.CSSProperties}>は</i>
              <i style={{ '--y': '7.1px', '--r': '-2.51deg' } as React.CSSProperties}>ダ</i>
              <i style={{ '--y': '5.5px', '--r': '-2.22deg' } as React.CSSProperties}>ス</i>
              <i style={{ '--y': '4.2px', '--r': '-1.92deg' } as React.CSSProperties}>キ</i>
              <i style={{ '--y': '3.0px', '--r': '-1.63deg' } as React.CSSProperties}>ン</i>
              <i style={{ '--y': '2.0px', '--r': '-1.33deg' } as React.CSSProperties}>の</i>
              <i style={{ '--y': '1.2px', '--r': '-1.03deg' } as React.CSSProperties}>ま</i>
              <i style={{ '--y': '0.6px', '--r': '-0.74deg' } as React.CSSProperties}>ま</i>
              <i
                className='pt'
                style={{ '--y': '0.2px', '--r': '-0.44deg' } as React.CSSProperties}
              >
                。
              </i>
              <i style={{ '--y': '0.0px', '--r': '-0.15deg' } as React.CSSProperties}>価</i>
              <i style={{ '--y': '0.0px', '--r': '0.15deg' } as React.CSSProperties}>格</i>
              <i style={{ '--y': '0.2px', '--r': '0.44deg' } as React.CSSProperties}>だ</i>
              <i style={{ '--y': '0.6px', '--r': '0.74deg' } as React.CSSProperties}>け</i>
              <i className='pt' style={{ '--y': '1.2px', '--r': '1.03deg' } as React.CSSProperties}>
                、
              </i>
              <i style={{ '--y': '2.0px', '--r': '1.33deg' } as React.CSSProperties}>変</i>
              <i style={{ '--y': '3.0px', '--r': '1.63deg' } as React.CSSProperties}>え</i>
              <i style={{ '--y': '4.2px', '--r': '1.92deg' } as React.CSSProperties}>ま</i>
              <i style={{ '--y': '5.5px', '--r': '2.22deg' } as React.CSSProperties}>し</i>
              <i style={{ '--y': '7.1px', '--r': '2.51deg' } as React.CSSProperties}>た</i>
              <i className='pt' style={{ '--y': '8.9px', '--r': '2.81deg' } as React.CSSProperties}>
                。
              </i>
            </span>
            <span className='sp-plain'>
              品質はダスキンのまま。
              <br className='sp' />
              価格だけ、変えました。
            </span>
          </p>
          <div className='cta fv__cta-pc pc-only'>
            <OfficeCtaLink className='fv__cta-imgbtn GTM_cv_click'>
              <img
                src='/images/office-cleaning/CTA_BT2.png'
                alt='＼写真を送るだけ！最短当日回答！／無料お見積り'
                width={370}
                height={373}
              />
            </OfficeCtaLink>
          </div>
        </div>
      </section>

      {/* ===== 問題提起（背景白／白パネル＋✓縦リスト） ===== */}
      <section className='nayami'>
        <div className='container'>
          <div className='nayami__panel'>
            <h2 className='nayami__title'>
              エアコンのこと、
              <br className='sp' />
              こんな風に<em>後回し</em>に<br className='sp' />
              なっていませんか？
            </h2>
            <ul className='nayami__list'>
              <li>
                エアコンから出る風が、
                <br className='sp' />
                なんだかカビ臭い
              </li>
              <li>
                効きが悪くなって、
                <br className='sp' />
                電気代だけが上がっている
              </li>
              <li>
                大手に頼んだら、
                <br className='sp' />
                見積りが想像以上に高かった
              </li>
              <li>格安業者は、正直ちょっと不安…</li>
              <li>
                複数台あるので、
                <br className='sp' />
                1台ずつ頼むと高くつく
              </li>
              <li>営業時間中に作業されると困る</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== 選ばれる理由（参考LP「4つの特徴」構成：破線枠＋カラーカード） ===== */}
      <section className='whyline' id='reason'>
        <span className='dia dia--teal why-dia1'></span>
        <span className='dia dia--orange why-dia2'></span>
        <div className='container'>
          <h2 className='sec-title'>
            選ばれる<span className='em-num'>3</span>つの理由
          </h2>
          <div className='whyline__frame'>
            <div className='whyline__cards'>
              <div className='whyline__card whyline__card--1'>
                <div className='whyline__num'>1</div>
                <h3>
                  ダスキンで長年培った、
                  <br />
                  そのままの品質
                </h3>
                <p>
                  代表はダスキンで長年、業務用エアコンの分解洗浄を担当してきました。
                  <br />
                  工程も品質基準も、当時のまま一切妥協していません。
                  <br />
                  スタッフにも同じ手順を一人ひとりみっちり教え込んでいるので、誰が伺っても同じ仕上がりをお約束します。
                </p>
              </div>
              <div className='whyline__card whyline__card--2'>
                <div className='whyline__num'>2</div>
                <h3>
                  中間マージンゼロだから、
                  <br />
                  この価格
                </h3>
                <p>
                  大手の見積りには、フランチャイズ費用や広告費が乗っています。
                  <br />
                  私たちはどこも通さず直接お受けするので、同じ作業でもここまで価格を下げられました。
                  <br />
                  安い理由が<span className='nw'>「手抜き」</span>ではなく
                  <span className='nw'>「仕組み」</span>なので、ご安心ください。
                </p>
              </div>
              <div className='whyline__card whyline__card--3'>
                <div className='whyline__num'>3</div>
                <h3>
                  24時間365日受付。
                  <br />
                  営業の邪魔はしません
                </h3>
                <p>
                  閉店後・休業日・早朝など、お客様の営業に響かない時間帯で施工が可能です。
                  <br />
                  受付は<span className='nw'>24時間365日</span>。<br />
                  <span className='nw'>「今週中になんとかしたい」</span>もまずはご相談ください。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 代表ストーリー（参考LP「おまかせください」構成：パネルなし・左テキスト×右写真） ===== */}
      <section className='story'>
        <div className='container'>
          <h2 className='sec-title'>代表ストーリー</h2>
          <div className='story__wrap'>
            <div className='story__text'>
              <h3 className='story__lead'>
                <span className='story__quote'>「ダスキンの品質を、もっと届けやすい価格で」</span>
                <br />
                <span className='story__because'>それが独立した理由です</span>
              </h3>
              <p>
                代表はダスキンで長年、オフィスや店舗のエアコンクリーニングに携わってきました。品質には自信がある。
                <br />
                でも、お客様に見積りをお渡しするたび
                <span className='nw'>「もう少し安くできたら」</span>と思っていたのも事実です。
                <br />{' '}
                だからこそ培ったノウハウはそのままに、余計なコストを全部そぎ落としたクリーニング会社に独立しました。
              </p>
              <p>
                いまは同じ品質基準で施工できる仲間を一人ずつ育てながら、
                <br />
                <span className='nw'>「いつでも、なんでもやるクリーニング店」</span>
                を首都圏で目指しています。
              </p>
            </div>

            {/* =====画像追加後に表示お願いいたします。===== */}
            {/* <div className="story__photo">
        <span className="dia dia--teal story-dia1"></span>
        <span className="dia dia--orange story-dia2"></span>
        <span className="dia dia--teal story-dia3"></span>
        <img loading="lazy" className="story__img" src="/images/office-cleaning/story_01.webp" alt="" />
      </div> */}
          </div>
        </div>
      </section>

      {/* ===== CTA（ピル型枠） ===== */}
      <section className='cta-band'>
        <div className='container'>
          <div className='cta-pill'>
            <p className='cta-pill__catch'>写真を送るだけ！最短当日回答！</p>
            <div className='cta-pill__contact'>
              <a className='cta-pill__tel GTM_cv_click' href='tel:0424542350'>
                TEL：042-454-2350
              </a>
              <OfficeCtaLink className='btn btn--line cta-pill__btn GTM_cv_click'>
                無料お見積りはこちら
              </OfficeCtaLink>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 料金プラン（参考LP「清掃メニュー」構成：グレーパネル＋ピルヘッダーカード） ===== */}
      <section className='price' id='price'>
        <div className='container'>
          <div className='price__panel'>
            <h2 className='sec-title'>料金プラン</h2>
            <p className='price__lead'>
              台数が増えるほど、
              <br className='sp' />
              1台あたりは<span className='marker'>お得</span>に！
            </p>
            <div className='price__cards'>
              <div className='price__card'>
                <p className='price__head'>1台目</p>
                <span className='price__ico'>
                  <i></i>
                </span>
                <p className='price__value'>
                  <span className='price__yen'>29,800</span>円
                </p>
              </div>
              <div className='price__card'>
                <p className='price__head'>2台目</p>
                <span className='price__ico'>
                  <i></i>
                </span>
                <p className='price__value'>
                  <span className='price__yen'>27,500</span>円
                </p>
              </div>
              <div className='price__card price__card--best'>
                <p className='price__head'>3〜5台目</p>
                <span className='price__ico'>
                  <i></i>
                </span>
                <p className='price__value'>
                  <span className='price__yen'>19,800</span>円
                </p>
              </div>
              <div className='price__card'>
                <p className='price__head'>6台目以降</p>
                <span className='price__ico'>
                  <i></i>
                </span>
                <p className='price__value price__value--talk'>要相談</p>
                <p className='price__note'>（さらにお安くできます）</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 他社との比較（緑系メインカラーの当社列ハイライト表） ===== */}
      <section className='hikaku'>
        <div className='container'>
          <h2 className='sec-title'>他社との比較</h2>
          <div className='hikaku__scroll'>
            <table className='hikaku__table'>
              <thead>
                <tr>
                  <th className='hikaku__item'>依頼先</th>
                  <th className='hikaku__us'>なんやる</th>
                  <th>
                    大手
                    <br className='sp' />
                    クリーニング
                    <br className='sp' />
                    会社
                  </th>
                  <th>
                    中堅の
                    <br className='sp' />
                    専門業者
                  </th>
                  <th>
                    格安・
                    <br className='sp' />
                    個人業者
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>
                    料金
                    <br />
                    <span className='hikaku__spec'>
                      （天井埋込
                      <br />
                      4方向・1台）
                    </span>
                  </th>
                  <td className='hikaku__us'>
                    <span className='mark'>〇</span>29,800円〜
                    <small>
                      （3台以上で
                      <br className='sp' />
                      1台19,800円〜）
                    </small>
                  </td>
                  <td>
                    <span className='mark mark--low'>△</span>4万円前後〜
                  </td>
                  <td>
                    <span className='mark'>〇</span>3万円前後〜
                  </td>
                  <td>
                    <span className='mark mark--top'>◎</span>2万円前後〜
                  </td>
                </tr>
                <tr>
                  <th>複数台割引</th>
                  <td className='hikaku__us'>あり</td>
                  <td>あり</td>
                  <td>あり</td>
                  <td>なし</td>
                </tr>
                <tr>
                  <th>施工品質</th>
                  <td className='hikaku__us'>
                    <span className='mark mark--top'>◎</span>
                  </td>
                  <td>
                    <span className='mark mark--top'>◎</span>
                  </td>
                  <td>
                    <span className='mark'>〇</span>
                  </td>
                  <td>
                    <span className='mark mark--low'>△</span>
                  </td>
                </tr>
                <tr>
                  <th>大手経験者の施工</th>
                  <td className='hikaku__us'>
                    <span className='mark mark--top'>◎</span>
                  </td>
                  <td>
                    <span className='mark mark--top'>◎</span>
                  </td>
                  <td>
                    <span className='mark'>〇</span>
                  </td>
                  <td>
                    <span className='mark mark--low'>×</span>
                  </td>
                </tr>
                <tr>
                  <th>夜間・休日対応</th>
                  <td className='hikaku__us'>
                    <span className='mark mark--top'>◎</span>
                  </td>
                  <td>
                    <span className='mark mark--low'>△</span>
                  </td>
                  <td>
                    <span className='mark'>〇</span>
                  </td>
                  <td>
                    <span className='mark'>〇</span>
                  </td>
                </tr>
                <tr>
                  <th>中間コスト</th>
                  <td className='hikaku__us'>なし</td>
                  <td>あり</td>
                  <td>一部あり</td>
                  <td>一部あり</td>
                </tr>
                <tr>
                  <th>見積りの手軽さ</th>
                  <td className='hikaku__us'>
                    <span className='mark mark--top'>◎</span>
                  </td>
                  <td>
                    <span className='mark mark--low'>△</span>
                  </td>
                  <td>
                    <span className='mark'>〇</span>
                  </td>
                  <td>
                    <span className='mark'>〇</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== サービスの流れ（緑系背景・写真×工程名の縦リスト） ===== */}
      <section className='flow' id='flow'>
        <div className='container'>
          <h2 className='sec-title'>サービスの流れ</h2>
          <ol className='flow__list'>
            <li className='flow__step'>
              <img
                loading='lazy'
                className='flow__img'
                src='/images/office-cleaning/flow_01.webp'
                alt=''
                width={640}
                height={477}
              />
              <p className='flow__label'>
                <span className='flow__no'>①</span>
                <span className='flow__txt'>動作確認・養生</span>
              </p>
            </li>
            <li className='flow__step'>
              <img
                loading='lazy'
                className='flow__img'
                src='/images/office-cleaning/flow_02.webp'
                alt=''
                width={640}
                height={477}
              />
              <p className='flow__label'>
                <span className='flow__no'>②</span>
                <span className='flow__txt'>
                  パネル・フィルター
                  <br className='sp' />
                  取り外し
                </span>
              </p>
            </li>
            <li className='flow__step'>
              <img
                loading='lazy'
                className='flow__img'
                src='/images/office-cleaning/flow_03.webp'
                alt=''
                width={640}
                height={477}
              />
              <p className='flow__label'>
                <span className='flow__no'>③</span>
                <span className='flow__txt'>ドレンパン等の分解</span>
              </p>
            </li>
            <li className='flow__step'>
              <img
                loading='lazy'
                className='flow__img'
                src='/images/office-cleaning/flow_04.webp'
                alt=''
                width={640}
                height={477}
              />
              <p className='flow__label'>
                <span className='flow__no'>④</span>
                <span className='flow__txt'>業務用洗剤で薬剤洗浄</span>
              </p>
            </li>
            <li className='flow__step'>
              <img
                loading='lazy'
                className='flow__img'
                src='/images/office-cleaning/flow_05.webp'
                alt=''
                width={640}
                height={477}
              />
              <p className='flow__label'>
                <span className='flow__no'>⑤</span>
                <span className='flow__txt'>高圧洗浄ですすぎ</span>
              </p>
            </li>
            <li className='flow__step'>
              <img
                loading='lazy'
                className='flow__img'
                src='/images/office-cleaning/flow_06.webp'
                alt=''
                width={640}
                height={477}
              />
              <p className='flow__label'>
                <span className='flow__no'>⑥</span>
                <span className='flow__txt'>部品洗浄</span>
              </p>
            </li>
            <li className='flow__step'>
              <img
                loading='lazy'
                className='flow__img'
                src='/images/office-cleaning/flow_07.webp'
                alt=''
                width={640}
                height={477}
              />
              <p className='flow__label'>
                <span className='flow__no'>⑦</span>
                <span className='flow__txt'>組み立て・拭き上げ</span>
              </p>
            </li>
            <li className='flow__step'>
              <img
                loading='lazy'
                className='flow__img'
                src='/images/office-cleaning/flow_08.webp'
                alt=''
                width={640}
                height={477}
              />
              <p className='flow__label'>
                <span className='flow__no'>⑧</span>
                <span className='flow__txt'>
                  動作確認・
                  <br className='sp' />
                  作業箇所の清掃
                </span>
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* ===== オプション紹介（枠付き2列テーブル） ===== */}
      <section className='option'>
        <div className='container'>
          <h2 className='sec-title'>オプション紹介</h2>
          <p className='option__lead'>
            ついでに頼めて、
            <br className='sp' />
            ついでに<span className='marker'>お得</span>
          </p>
          <table className='option__table'>
            <tbody>
              <tr>
                <th>
                  <img
                    loading='lazy'
                    className='option__ico'
                    src='/images/office-cleaning/opt_01.webp'
                    alt=''
                    width={128}
                    height={128}
                  />
                  室外機洗浄
                </th>
                <td>
                  <span className='nw'>電気代対策の</span>
                  <span className='nw'>仕上げに。</span>
                </td>
              </tr>
              <tr>
                <th>
                  <img
                    loading='lazy'
                    className='option__ico'
                    src='/images/office-cleaning/opt_02.webp'
                    alt=''
                    width={128}
                    height={128}
                  />
                  防カビ・
                  <br className='sp' />
                  抗菌コート
                </th>
                <td>
                  <span className='nw'>キレイを</span>
                  <span className='nw'>長持ちさせたい方に。</span>
                </td>
              </tr>
              <tr>
                <th>
                  <img
                    loading='lazy'
                    className='option__ico'
                    src='/images/office-cleaning/opt_03.webp'
                    alt=''
                    width={128}
                    height={128}
                  />
                  フィルターのみ
                  <br className='sp' />
                  定期清掃
                </th>
                <td>
                  <span className='nw'>分解洗浄の間の</span>
                  <span className='nw'>メンテナンスに。</span>
                </td>
              </tr>
              <tr>
                <th>
                  <img
                    loading='lazy'
                    className='option__ico'
                    src='/images/office-cleaning/opt_04.webp'
                    alt=''
                    width={128}
                    height={128}
                  />
                  定期清掃契約
                  <br className='sp' />
                  （割引あり）
                </th>
                <td>
                  <span className='nw'>ご希望の場合は</span>
                  <span className='nw'>LINEでご相談ください。</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ===== エアコン以外も対応（2026-08-19追加：オプション紹介の直下・向け先2カード） ===== */}
      <section className='igai'>
        <span className='dia dia--teal igai-dia1'></span>
        <span className='dia dia--orange igai-dia2'></span>
        <div className='container'>
          <div className='igai__panel'>
            <h2 className='sec-title'>
              エアコン<span className='em-txt'>以外</span>も対応！
            </h2>
            <h3 className='igai__lead'>エアコン以外の清掃もお任せ！</h3>
            <p className='igai__body'>
              「ここも一緒にキレイにしてほしい」という声に
              <br className='sp' />
              お応えし、エアコン以外の各種クリーニングも
              <br className='sp' />
              承っております。
            </p>
            <p className='igai__body'>
              元ダスキンのプロが持つ確かな技術で、<span className='nw'>「高品質・低価格」</span>
              でご提供します。
            </p>
            <p className='igai__note'>※価格は現地に伺ってからのお見積りとなります</p>
            <div className='igai__cards'>
              <div className='igai__card'>
                <h4 className='igai__card-title'>オフィス</h4>
                <ul className='igai__list'>
                  <li>トイレ・洗面</li>
                  <li>床洗浄・ワックスがけ</li>
                  <li>カーペット清掃</li>
                  <li>ソファー・イスのクリーニング</li>
                </ul>
              </div>
              <div className='igai__card'>
                <h4 className='igai__card-title'>飲食店</h4>
                <ul className='igai__list'>
                  <li>キッチン・シンク</li>
                  <li>レンジフード（換気扇）</li>
                  <li>トイレ</li>
                  <li>床洗浄・ワックスがけ</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== お客様の声（「お客様の声.png」構成：名前ピル＋イラスト＋テキストの3カード） ===== */}
      <section className='voice'>
        <div className='container'>
          <h2 className='sec-title'>お客様の声</h2>
          <div className='voice__cards'>
            <div className='voice__card'>
              <p className='voice__name'>S.S様　東京都　品川区</p>
              <img
                loading='lazy'
                className='voice__img'
                src='/images/office-cleaning/voice_01.webp'
                alt=''
                width={256}
                height={256}
              />
              <p className='voice__body'>
                「フォームから申し込みました。
                <br />
                写真を送るだけで見積が確定し、当日の追加もなしでした！またお願いします！」
              </p>
            </div>
            <div className='voice__card'>
              <p className='voice__name'>M.I様　埼玉県　草加市</p>
              <img
                loading='lazy'
                className='voice__img'
                src='/images/office-cleaning/voice_02.webp'
                alt=''
                width={256}
                height={256}
              />
              <p className='voice__body'>
                「料金が最初から明確で、相場よりも<span className='nw'>納得の価格。</span>
                作業は手早いのに丁寧でした。
                <br />
                ダスキン経験者恐るべし、、、」
              </p>
            </div>
            <div className='voice__card'>
              <p className='voice__name'>Y.S様　神奈川県　横浜市</p>
              <img
                loading='lazy'
                className='voice__img'
                src='/images/office-cleaning/voice_03.webp'
                alt=''
                width={256}
                height={256}
              />
              <p className='voice__body'>
                「複数依頼でもスムーズで助かりました。
                <br />
                定期的にお願いしようと思っています！」
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ（Qカード＋開閉アイコン） ===== */}
      <section className='faq' id='faq'>
        <div className='container'>
          <h2 className='sec-title'>よくあるご質問</h2>
          <dl className='faq__list'>
            <div className='faq__item is-open'>
              <dt>
                <span className='faq__q'>Q1.</span>見積りは無料ですか？
                <span className='faq__toggle'>−</span>
              </dt>
              <dd>
                <span className='faq__a'>A1.</span>
                無料です。フォームから写真と台数をお送りいただければ、概算は最短当日にお返しします。
              </dd>
            </div>
            <div className='faq__item'>
              <dt>
                <span className='faq__q'>Q2.</span>見積り以外の費用は発生しますか？
                <span className='faq__toggle'>−</span>
              </dt>
              <dd>
                <span className='faq__a'>A2.</span>お見積り確定後の追加費用は
                <br className='sp' />
                一切発生しません。
              </dd>
            </div>
            <div className='faq__item'>
              <dt>
                <span className='faq__q'>Q3.</span>営業時間中の作業は
                <br className='sp' />
                避けられますか？<span className='faq__toggle'>−</span>
              </dt>
              <dd>
                <span className='faq__a'>A3.</span>
                はい。閉店後・休業日・早朝など、ご都合に合わせて施工します。
              </dd>
            </div>
            <div className='faq__item'>
              <dt>
                <span className='faq__q'>Q4.</span>作業時間はどのくらいですか？
                <span className='faq__toggle'>−</span>
              </dt>
              <dd>
                <span className='faq__a'>A4.</span>
                天井埋込タイプで1台あたり約60〜90分が目安です。複数台の場合は事前にスケジュールをお伝えします。
              </dd>
            </div>
            <div className='faq__item'>
              <dt>
                <span className='faq__q'>Q5.</span>どんなメーカーでも
                <br className='sp' />
                対応できますか？<span className='faq__toggle'>−</span>
              </dt>
              <dd>
                <span className='faq__a'>A5.</span>
                <span>
                  国内主要メーカーに対応していますが、
                  <br className='sp' />
                  一部対応できない機種もあります。
                  <br />
                  型番をお送りいただければ事前にご案内します。
                </span>
              </dd>
            </div>
            <div className='faq__item'>
              <dt>
                <span className='faq__q'>Q6.</span>定期的にお願いすることは
                <br className='sp' />
                できますか？<span className='faq__toggle'>−</span>
              </dt>
              <dd>
                <span className='faq__a'>A6.</span>
                定期清掃割引をご用意しています。頻度やご所在地によって最適なプランが変わるため、無料でご相談ください。
              </dd>
            </div>
            <div className='faq__item'>
              <dt>
                <span className='faq__q'>Q7.</span>当日や直近の依頼もできますか？
                <span className='faq__toggle'>−</span>
              </dt>
              <dd>
                <span className='faq__a'>A7.</span>
                <span>
                  スケジュール次第ですが、
                  <br className='sp' />
                  まずはフォームから<span className='nw'>ご相談ください。</span>
                  <br />
                  最短日程をご案内します
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ===== CTA（ピル型枠） ===== */}
      <section className='cta-band cta-band--last'>
        <div className='container'>
          <div className='cta-pill'>
            <p className='cta-pill__catch'>写真を送るだけ！最短当日回答！</p>
            <div className='cta-pill__contact'>
              <a className='cta-pill__tel GTM_cv_click' href='tel:0424542350'>
                TEL：042-454-2350
              </a>
              <OfficeCtaLink className='btn btn--line cta-pill__btn GTM_cv_click'>
                無料お見積りはこちら
              </OfficeCtaLink>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 写真バンド（パララックス：PC/SPともwork側でJS実装） ===== */}
      <div className='band'>
        <img
          loading='lazy'
          className='band__img'
          src='/images/office-cleaning/band_photo.webp'
          alt=''
          width={1376}
          height={768}
        />
      </div>

      {/* ===== Footer（「フッター.png」構成：左ナビ／中央ロゴ／右会社情報） ===== */}
      <footer className='footer'>
        <div className='footer__grid'>
          <nav className='footer__nav'>
            <a href='#reason' className='GTM_cv_click'>
              選ばれる理由
            </a>
            <a href='#price' className='GTM_cv_click'>
              料金プラン
            </a>
            <a href='#flow' className='GTM_cv_click'>
              サービスの流れ
            </a>
            <a href='#faq' className='GTM_cv_click'>
              よくあるご質問
            </a>
          </nav>
          <div className='footer__brand'>
            <img
              src='/images/office-cleaning/logo_t.webp'
              alt='NAN YARU'
              width={555}
              height={565}
            />
          </div>
          <p className='footer__company'>合同会社なんやる</p>
        </div>
        <p className='footer__copy'>Copyright © 2026 LIBTECH All Rights Reserved.</p>
        <div className='pagetop'>
          <span></span>
        </div>
      </footer>

      {/* ===== SP：下部固定CTAバー（参考構図の画面下端固定バー相当） ===== */}
      <div className='fixedcta sp-only'>
        <p className='fixedcta__catch'>写真を送るだけ！最短当日回答！</p>
        <OfficeCtaLink className='btn btn--line fixedcta__btn GTM_cv_click'>
          無料お見積りはこちら
        </OfficeCtaLink>
      </div>

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: '見積りは無料ですか？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '無料です。フォームから写真と台数をお送りいただければ、概算は最短当日にお返しします。',
                },
              },
              {
                '@type': 'Question',
                name: '見積り以外の費用は発生しますか？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'お見積り確定後の追加費用は一切発生しません。',
                },
              },
              {
                '@type': 'Question',
                name: '営業時間中の作業は避けられますか？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'はい。閉店後・休業日・早朝など、ご都合に合わせて施工します。',
                },
              },
              {
                '@type': 'Question',
                name: '作業時間はどのくらいですか？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '天井埋込タイプで1台あたり約60〜90分が目安です。複数台の場合は事前にスケジュールをお伝えします。',
                },
              },
              {
                '@type': 'Question',
                name: 'どんなメーカーでも対応できますか？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '国内主要メーカーに対応していますが、一部対応できない機種もあります。型番をお送りいただければ事前にご案内します。',
                },
              },
              {
                '@type': 'Question',
                name: '定期的にお願いすることはできますか？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '定期清掃割引をご用意しています。頻度やご所在地によって最適なプランが変わるため、無料でご相談ください。',
                },
              },
              {
                '@type': 'Question',
                name: '当日や直近の依頼もできますか？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'スケジュール次第ですが、まずはフォームからご相談ください。最短日程をご案内します',
                },
              },
            ],
          }),
        }}
      />

      <Script src='/office-cleaning/script.js' strategy='afterInteractive' />
    </>
  )
}
