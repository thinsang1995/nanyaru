import { Metadata } from 'next'
import { useRouter, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import Image from 'next/image'
import FloatingCTA from '@/components/FloatingCTA'
import FAQ from '@/components/FAQ'

export const metadata: Metadata = {
  title: '最安値のエアコンクリーニングはなんやる｜夜間/休日OK・追加費なし',
  description:
    'エアコンクリーニング(エアコン清掃・エアコン掃除)はなんやる。見積もり通りで当日の追加費用なし。低刺激洗剤・防カビ仕上げ、夜間/休日も対応、LINEで予約可。',
  icons: {
    icon: [
      { url: '/images/favicon.ico' },
      { url: '/images/icon_16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/icon_32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/icon_48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [{ url: '/images/icon_180x180.png', sizes: '180x180' }],
  },
  openGraph: {
    title: '最安値のエアコンクリーニングはなんやる｜夜間/休日OK・追加費なし',
    description:
      'エアコンクリーニング(エアコン清掃・エアコン掃除)はなんやる。見積もり通りで当日の追加費用なし。低刺激洗剤・防カビ仕上げ、夜間/休日も対応、LINEで予約可。',
    url: 'https://nanyaru.com/cleaning/lp',
    siteName: 'なんやるエアコンクリーニング',
    images: [{ url: '/images/ogp_1200x630.png' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '最安値のエアコンクリーニングはなんやる｜夜間/休日OK・追加費なし',
    description:
      'エアコンクリーニング(エアコン清掃・エアコン掃除)はなんやる。見積もり通りで当日の追加費用なし。低刺激洗剤・防カビ仕上げ、夜間/休日も対応、LINEで予約可。',
    images: ['/images/ogp_1200x675.png'],
  },
}

export default function Home() {
  const lineUrl = 'https://skg.ecai.jp/optin/13?ecaiad=itZfluaz' // Add your LINE URL here

  return (
    <>
      <Script id='gtm-script' strategy='afterInteractive'>
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-W873ZVN4');`}
      </Script>

      <noscript>
        <iframe
          src='https://www.googletagmanager.com/ns.html?id=GTM-W873ZVN4'
          height='0'
          width='0'
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      <div id='wrapper'>
        <header id='header'>
          <h1>東京･神奈川･埼玉･千葉に在住の方必見!</h1>
        </header>

        <div id='contents'>
          {/* First View Section */}
          <section id='fv'>
            <div className='fv_inner'>
              <h1 className='fv_h1'>
                <Image
                  src='/images/fv_cp.webp'
                  className='fv_cp'
                  alt='無添加洗剤で安心×業界NO1のコスパ'
                  width={800}
                  height={200}
                  priority
                />
              </h1>
              <h2 className='fv_h2'>
                <Image
                  src='/images/fv_logo.webp'
                  className='fv_logo'
                  alt='エアコンクリーニングはなんやるにお任せ！'
                  width={600}
                  height={150}
                  priority
                />
              </h2>
              <h3 className='fv_h3'>
                <Image
                  src='/images/fv_yen.webp'
                  className='fv_yen'
                  alt='LINEで即日お見積り0円'
                  width={500}
                  height={100}
                  priority
                />
              </h3>
              <Image
                src='/images/bike1.webp'
                className='fv_bike1'
                alt=''
                width={400}
                height={300}
                priority
              />
            </div>
            <div className='fv_cta'>
              <Image
                src='/images/fv_ye_line.webp'
                className='fv_ye_line'
                alt=''
                width={300}
                height={100}
              />
              <p className='fv_line_txt'>
                LINEで24時間
                <br />
                即日対応!
              </p>
              {/* <p className='cta_txt'>
                <span className='slash'>500円クーポン配布中!</span>
              </p> */}
              <div className='cta_btn'>
                <a
                  href={lineUrl}
                  className='GTM_cv_click'
                  target='_blank'
                  rel='noopener noreferrer'
                >
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
          </section>

          {/* Campaign Section */}
          <section className='contents_block' id='thanks_cp'>
            <div className='inner'>
              <h2 className='th_ttl'>
                <Image
                  src='/images/ttl_ribbon_red.webp'
                  className='ttl_ribbon_red'
                  alt='お客様感謝キャンペーン実施中！'
                  width={600}
                  height={100}
                />
              </h2>
              <h3 className='ttl cp_ttl3'>
                <span className='s'>家庭基準をクリアした</span>
                <br />
                無添加洗剤<span className='s'>で</span>
                <br />
                エアコン丸ごと洗浄
              </h3>
              <div className='th_pr_area'>
                <Image src='/images/cha_1.webp' className='cha_1' alt='' width={200} height={200} />
                <div className='nomal_pr'>
                  <p>
                    通常価格
                    <br />
                    <span className='ll'>17,800</span>円(税込)
                  </p>
                  <Image
                    src='/images/label_off.webp'
                    className='label_off'
                    alt='21%OFF'
                    width={100}
                    height={100}
                  />
                </div>
                <p className='cp_pr fc_red cp_ttl3'>
                  今だけ感謝価格
                  <br />
                  <span className='ll'>14,000</span>円(税込)
                </p>
                <p className='cp_ttl3 cp_txt3'>60~90分でサッと終わるプロの分解清掃</p>
              </div>
              {/* <div className='credit'>
                <h4>各種クレジットカード対応</h4>
                <p>
                  <Image
                    src='/images/credit.webp'
                    className='creditcard'
                    alt=''
                    width={500}
                    height={80}
                  />
                </p>
              </div> */}
            </div>
          </section>

          {/* Recommend Section */}
          <section className='contents_block bg02' id='recommend'>
            <div className='inner'>
              <Image
                src='/images/fukidashi_yellow.webp'
                className='fukidashi_yellow'
                alt=''
                width={150}
                height={100}
              />
              <h2 className='ttl_fy rec_t'>イチオシポイント!</h2>
              <h2 className='ttl fc_white'>
                ｢なんやる｣
                <br />
                オリジナルの洗剤
              </h2>
              <p className='rec_txt1 fc_white'>
                赤ちゃんやペットがいるご家庭でも安心！
                <br />
                自社開発の無香料・無着色洗剤
                <br />
                「U/(ユー)」を使用
              </p>
              <div className='responsive'>
                <iframe
                  width='100%'
                  height='100%'
                  src='https://www.youtube.com/embed/T5U2KWQdhXM?si=FvYPKTkt71CSPxr6'
                  title='YouTube video player'
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  referrerPolicy='strict-origin-when-cross-origin'
                  allowFullScreen
                />
              </div>
              <div className='box_white'>
                <ul className='check_list'>
                  <li>人体に有害な成分は一切不使用</li>
                  <li>小さなお子様や喘息をお持ちの方にも安心</li>
                  <li>薬品のツンとしたニオイが残らない</li>
                  <li>汚れをしっかり分解･除去</li>
                </ul>
              </div>
              <div className='box_white'>
                <h3 className='ttl_ribbon_blue'>
                  <Image
                    src='/images/ttl_ribbon_blue.webp'
                    className='ttl_ribbon_b'
                    alt='大手メディアでも多数紹介！'
                    width={600}
                    height={80}
                  />
                </h3>
                <p className='award_txt1'>
                  日本テレビ「有吉ゼミ」
                  <br />
                  日本テレビ「ヒルナンデス！」
                  <br />
                  日本テレビ「ワケあり！レッドゾーン」
                  <br />
                  テレビ東京系「あるある発見バラエティ <br />
                  新Shock感 それな！て言わせて」
                </p>
                <p className='award_txt2'>
                  <span className='marker_yellow'>雑誌でも高評価！</span>
                </p>
                <Image
                  src='/images/trophy.webp'
                  className='trophy'
                  alt=''
                  width={300}
                  height={300}
                />
                <Image src='/images/award.webp' className='award' alt='' width={600} height={250} />
              </div>
              <Image src='/images/item.webp' className='item' alt='洗剤' width={300} height={300} />
            </div>
          </section>

          {/* Experience Section */}
          <section className='contents_block' id='exp'>
            <div className='inner'>
              <div className='exp'>
                <Image
                  src='/images/exp_img1.webp'
                  className='exp_img1'
                  alt=''
                  width={700}
                  height={400}
                />
                <p className='exp_txt2'>
                  エアコンクリーニングは
                  <br />
                  <span className='fc_red l'>なんやる</span>にお任せください!
                </p>
              </div>
            </div>
          </section>

          {/* Why Section */}
          <section className='contents_block bg03' id='why'>
            <div className='inner'>
              <h2 className='ttl'>
                なんやるは
                <br />
                バイク<span className='s'>で</span>駆けつけます!
              </h2>
              <div className='why_box'>
                <Image
                  src='/images/fukidashi_yellow.webp'
                  className='fukidashi_yellow'
                  alt=''
                  width={150}
                  height={100}
                />
                <h2 className='ttl_fy'>なぜバイクがいいの？</h2>
                <ul className='why_list'>
                  <li>
                    <Image
                      src='/images/merit1.webp'
                      className='merit'
                      alt=''
                      width={200}
                      height={200}
                    />
                    <p>
                      渋滞にはまらないので
                      <br />
                      遅刻したことがない。
                    </p>
                  </li>
                  <li>
                    <Image
                      src='/images/merit2.webp'
                      className='merit'
                      alt=''
                      width={200}
                      height={200}
                    />
                    <p>
                      駐車場代などの追加料金は原則いただきません。
                      <br />
                      <span className='ss'>
                        ※有料駐輪場を利用する場合のみ、実費をご負担いただくことがあります
                      </span>
                    </p>
                  </li>
                  <li>
                    <Image
                      src='/images/merit3.webp'
                      className='merit'
                      alt=''
                      width={200}
                      height={200}
                    />
                    <p>
                      1日に対応できる件数が
                      <br />
                      車よりも多い。
                    </p>
                  </li>
                </ul>
              </div>
              <div className='why_bottom'>
                <p>
                  だから、
                  <br />
                  <span className='marker_yellow'>他社よりも安く、</span>
                  <br />
                  <span className='marker_yellow'>高品質なサービス</span>が<br />
                  提供できるんです！
                </p>
                <Image
                  src='/images/bike1.webp'
                  className='why_img'
                  alt=''
                  width={400}
                  height={300}
                />
              </div>
            </div>
          </section>

          {/* Area Section */}
          <section className='contents_block bg01 dot' id='area'>
            <div className='inner'>
              <h2 className='ttl'>即日対応可能エリア</h2>
              <ul className='area_list'>
                <li>東京</li>
                <li>神奈川</li>
                <li>埼玉</li>
                <li>千葉</li>
              </ul>
              <p>
                なんやるは､<span className='marker_yellow b'>お客様に丁寧かつ迅速なサービス</span>
                を提供するため､関東地方に絞って対応しております｡
              </p>
              <p>
                エリアによっては対応が難しい地域も御座いますので､
                <span className='marker_yellow b'>まずはお気軽にお問い合わせください｡</span>
              </p>
              <Image
                src='/images/map.webp'
                className='map'
                alt='東京･神奈川･埼玉･千葉'
                width={600}
                height={400}
              />
              <Image
                src='/images/bike2.webp'
                className='area_img'
                alt=''
                width={400}
                height={300}
              />
            </div>
          </section>

          {/* CTA Section */}
          <section className='cta bg05' id='cta'>
            <div className='inner'>
              <div className='cta_box'>
                <Image
                  src='/images/cta_cha.webp'
                  className='cta_cha'
                  alt=''
                  width={200}
                  height={200}
                />
                <p className='cta_ttl'>LINEで24時間 即日対応!</p>
                {/* <p className='cta_txt'>
                  <span className='slash'>500円クーポン配布中！</span>
                </p> */}
                <div className='cta_btn'>
                  <a
                    href={lineUrl}
                    className='GTM_cv_click'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
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
          </section>

          {/* Select Section */}
          <section className='contents_block bg07' id='select'>
            <div className='inner'>
              <h2 className='ttl'>
                なんとなくで
                <br />
                選んでいませんか？
              </h2>
              <h3 className='sel_ttl fc_red'>
                <span className='slash slash_red'>こんなトラブル増えてます</span>
              </h3>
              <div className='sel_box'>
                <ul className='check_list'>
                  <li>見積りよりも多い金額を請求される</li>
                  <li>作業後にエアコンが壊れている</li>
                  <li>室内が濡れる､養生が甘く周りが汚れる</li>
                  <li>強い薬剤のにおいが残り､子どもやペットが心配</li>
                </ul>
              </div>
              <div className='sel_bottom'>
                <p className='sel_txt1'>
                  ホームクリーニングの達人
                  <br />
                  すべて､<span className='fc_red l'>なんやる</span>に<br />
                  お任せください！
                </p>
                <p className='sel_txt2'>
                  エアコンクリーニング以外
                  <br />
                  にもなんでもやります!
                  <br />
                  まずはご相談ください。
                </p>
                <Image src='/images/cha_2.webp' className='cha_2' alt='' width={200} height={200} />
                <Image src='/images/cha_3.webp' className='cha_3' alt='' width={200} height={200} />
              </div>
            </div>
          </section>

          {/* Reason Section */}
          <section className='contents_block bg03' id='reason'>
            <div className='inner'>
              <h2 className='ttl'>
                <span className='s'>なんやるが選ばれる</span>
                <br />
                <span className='fc_green ll'>8</span>つの理由
              </h2>
              <ul className='reason'>
                <li>
                  <p className='wt_l rea_lb'>
                    <span>1</span>
                  </p>
                  <h3>圧倒的な低価格</h3>
                  <p>中間マージンが無いので最安値で提供しています｡</p>
                </li>
                <li>
                  <p className='wt_l rea_lb'>
                    <span>2</span>
                  </p>
                  <h3>見積り=確定金額</h3>
                  <p>追加料金､物品の販売､押し売りは一切いたしません｡</p>
                </li>
                <li>
                  <p className='wt_l rea_lb'>
                    <span>3</span>
                  </p>
                  <h3>保険加入済み</h3>
                  <p>10年未満のエアコンであれば､保証対象となります。</p>
                </li>
                <li>
                  <p className='wt_l rea_lb'>
                    <span>4</span>
                  </p>
                  <h3>徹底的な養生</h3>
                  <p>原状回復まで責任もって対応します。</p>
                </li>
                <li>
                  <p className='wt_l rea_lb'>
                    <span>5</span>
                  </p>
                  <h3>
                    自然由来の
                    <br />
                    石鹸成分洗剤を利用
                  </h3>
                  <p>赤ちゃん､ペットがいるご家庭でも安心です。</p>
                </li>
                <li>
                  <p className='wt_l rea_lb'>
                    <span>6</span>
                  </p>
                  <h3>バイクで完結､時間に遅れるリスクなし</h3>
                  <p>
                    バイクで完結が売りの為､渋滞による遅刻リスクが少なく､駐車場代などの追加料金は原則いただきません｡
                  </p>
                </li>
                <li>
                  <p className='wt_l rea_lb'>
                    <span>7</span>
                  </p>
                  <h3>夜間でも対応可能</h3>
                  <p>土日祝日はもちろん、夜間も対応いたします。</p>
                </li>
                <li>
                  <p className='wt_l rea_lb'>
                    <span>8</span>
                  </p>
                  <h3>専門スタッフ多数</h3>
                  <p>10年以上の経験があるエアコン専門のプロだからこその技術で､内部まで徹底洗浄。</p>
                </li>
              </ul>
            </div>
          </section>

          {/* CTA Section 2 */}
          <section className='cta bg05' id='cta'>
            <div className='inner'>
              <div className='cta_box'>
                <Image
                  src='/images/cta_cha.webp'
                  className='cta_cha'
                  alt=''
                  width={200}
                  height={200}
                />
                <p className='cta_ttl'>LINEで24時間 即日対応!</p>
                {/* <p className='cta_txt'>
                  <span className='slash'>500円クーポン配布中！</span>
                </p> */}
                <div className='cta_btn'>
                  <a
                    href={lineUrl}
                    className='GTM_cv_click'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
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
          </section>

          {/* Works Section */}
          <section className='contents_block bg01' id='works'>
            <div className='inner'>
              <h2 className='ttl'>
                <span className='s'>エアコンクリーニングの</span>
                <br />
                作業工程
              </h2>

              <div className='works_box'>
                <h3 className='works_ttl'>
                  <p className='wt_l'>
                    <span>1</span>
                  </p>
                  作業前の動作確認と流れのご説明
                </h3>
                <div className='works_l'>
                  <Image
                    src='/images/flow1.webp'
                    className='worksimg'
                    alt=''
                    width={400}
                    height={300}
                  />
                </div>
                <div className='works_r'>
                  <p>
                    現在の運転･異音･においをお客さま立ち会いで確認し､本日の工程･所要時間･注意点をわかりやすくお伝えします｡
                  </p>
                </div>
              </div>

              <div className='works_box'>
                <h3 className='works_ttl'>
                  <p className='wt_l'>
                    <span>2</span>
                  </p>
                  床･壁の養生／室内保護 → 本体の分解
                </h3>
                <div className='works_l'>
                  <Image
                    src='/images/flow2.webp'
                    className='worksimg'
                    alt=''
                    width={400}
                    height={300}
                  />
                </div>
                <div className='works_r'>
                  <p>
                    床･壁･家具を防水シート等でしっかり養生し､前面パネル･フィルターなどを丁寧に取り外します｡
                  </p>
                </div>
              </div>

              <div className='works_box'>
                <h3 className='works_ttl'>
                  <p className='wt_l'>
                    <span>3</span>
                  </p>
                  本体(熱交換器･送風ファン)の洗浄
                </h3>
                <div className='works_l'>
                  <Image
                    src='/images/flow3.webp'
                    className='worksimg'
                    alt=''
                    width={400}
                    height={300}
                  />
                </div>
                <div className='works_r'>
                  <p>
                    低刺激･低臭の洗剤を塗布し､専用カバーで飛散を防ぎながら高圧洗浄カビ･ホコリ･ヤニ汚れを内部から落とします｡
                  </p>
                </div>
              </div>

              <div className='works_box'>
                <h3 className='works_ttl'>
                  <p className='wt_l'>
                    <span>4</span>
                  </p>
                  取り外したパーツの洗浄
                </h3>
                <div className='works_l'>
                  <Image
                    src='/images/flow4.webp'
                    className='worksimg'
                    alt=''
                    width={400}
                    height={300}
                  />
                </div>
                <div className='works_r'>
                  <p>
                    外したフィルター・前面パネルなどを丁寧に洗浄・乾燥。におい戻りの原因を残さないよう細部まで仕上げます｡
                  </p>
                </div>
              </div>

              <div className='works_box'>
                <h3 className='works_ttl'>
                  <p className='wt_l'>
                    <span>5</span>
                  </p>
                  乾燥・組み立て・仕上げ確認
                </h3>
                <div className='works_l'>
                  <Image
                    src='/images/flow5.webp'
                    className='worksimg'
                    alt=''
                    width={400}
                    height={300}
                  />
                </div>
                <div className='works_r'>
                  <p>
                    各部を十分に乾燥させた後､元通りに組み付け。外観・ネジの締め付けまで最終チェックします｡
                  </p>
                </div>
              </div>

              <div className='works_box'>
                <h3 className='works_ttl'>
                  <p className='wt_l'>
                    <span>6</span>
                  </p>
                  作業後の動作確認・ご報告
                </h3>
                <div className='works_l'>
                  <Image
                    src='/images/flow6.webp'
                    className='worksimg'
                    alt=''
                    width={400}
                    height={300}
                  />
                </div>
                <div className='works_r'>
                  <p>
                    動作・においなどを再確認。
                    <br />
                    今後のメンテ時期や使い方のアドバイスをお伝えします｡
                  </p>
                </div>
              </div>

              <h2 className='ba_ttl fc_red'>
                <span className='slash'>こんなに綺麗に仕上がります！</span>
              </h2>
              <div className='ba_box'>
                <div className='ba_l'>
                  <Image
                    src='/images/before.webp'
                    className='ba_img'
                    alt='BEFORE'
                    width={300}
                    height={300}
                  />
                </div>
                <div className='ba_r'>
                  <h3 className='ba_h3'>BEFORE</h3>
                  <p>
                    ・ホコリ、カビが繁殖
                    <br />
                    ・独特な嫌な匂い
                    <br />
                    ・エアコンが効かない
                  </p>
                </div>
              </div>
              <Image
                src='/images/arrow_red.webp'
                className='arrow_red'
                alt=''
                width={100}
                height={100}
              />
              <div className='ba_box'>
                <div className='ba_l'>
                  <Image
                    src='/images/after.webp'
                    className='ba_img'
                    alt='AFTER'
                    width={300}
                    height={300}
                  />
                </div>
                <div className='ba_r'>
                  <h3 className='ba_h3 fc_red'>AFTER</h3>
                  <p>
                    ・洗剤の嫌な匂いもない
                    <br />
                    ・清々しいきれいな風
                    <br />
                    ・エアコンの効きも抜群
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Warning Section */}
          <section className='warning' id='warning'>
            <span className='war_line_top war_line'></span>
            <span className='war_line_bottom war_line'></span>
            <div className='inner'>
              <h2 className='ttl'>WARNING</h2>
              <p>
                <span className='b l'>人体に有害な強力な洗剤を使う</span>業者が増えてます。
                <br />
                エアコンはきれいになるけど、クリーニング後に匂いが残ったり…
                <br />
                ｢なんやる｣は､
                <br />
                自社開発の無香料･無添加洗剤「U/(ユー)」
                <br />
                を使用しているから､赤ちゃんやペットがいるご家庭でも安心です！
              </p>
            </div>
          </section>

          {/* Review Section */}
          <section className='contents_block bg03' id='review'>
            <div className='inner'>
              <Image
                src='/images/fukidashi_yellow.webp'
                className='fukidashi_yellow'
                alt=''
                width={150}
                height={100}
              />
              <h2 className='ttl_fy'>お客様の声</h2>
              <ul className='review'>
                <li>
                  <div className='rev_l'>
                    <Image
                      src='/images/user1.webp'
                      className='ico_user'
                      alt=''
                      width={80}
                      height={80}
                    />
                    <p>
                      S.Y様
                      <br />
                      20代 女性
                      <br />
                      神奈川県横浜市
                    </p>
                  </div>
                  <div className='rev_r'>
                    <h3>スタッフの方がとても丁寧です</h3>
                    <p className='rev_txt'>
                      一人暮らしなので､最初は少し不安でしたが､作業前の説明から､作業終了までとても親切にご対応いただけました。クーラーの匂いもなくなり､とても満足です。
                    </p>
                  </div>
                </li>
                <li>
                  <div className='rev_l'>
                    <Image
                      src='/images/user2.webp'
                      className='ico_user'
                      alt=''
                      width={80}
                      height={80}
                    />
                    <p>
                      S.S様
                      <br />
                      30代 女性
                      <br />
                      東京都杉並区
                    </p>
                  </div>
                  <div className='rev_r'>
                    <h3>クーラーを3台お願いしました</h3>
                    <p className='rev_txt'>
                      LINEから申し込みました。子どもを寝かせた後に写真を送るだけで見積が確定､当日の追加もなしでした。
                    </p>
                  </div>
                </li>
                <li>
                  <div className='rev_l'>
                    <Image
                      src='/images/user3.webp'
                      className='ico_user'
                      alt=''
                      width={80}
                      height={80}
                    />
                    <p>
                      M.I様
                      <br />
                      30代 男性
                      <br />
                      東京都品川区
                    </p>
                  </div>
                  <div className='rev_r'>
                    <h3>とにかく安くて、丁寧</h3>
                    <p className='rev_txt'>
                      料金が最初から明確で､相場よりも納得の価格。到着前の連絡がきちんとしていて､作業は手早いのに丁寧。におい残りもなく､また次回もお願いしたいです。
                    </p>
                  </div>
                </li>
                <li>
                  <div className='rev_l'>
                    <Image
                      src='/images/user4.webp'
                      className='ico_user'
                      alt=''
                      width={80}
                      height={80}
                    />
                    <p>
                      Y.S様
                      <br />
                      40代 男性
                      <br />
                      埼玉県草加市
                    </p>
                  </div>
                  <div className='rev_r'>
                    <h3>エアコンとお風呂掃除を頼みました</h3>
                    <p className='rev_txt'>
                      エアコンの分解洗浄に加えて､お風呂の掃除もお願いしました。どちらも丁寧で仕上がりが良く､養生や片付けまで行き届いて安心。複数依頼でもスムーズで助かりました。
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Price Menu Section */}
          <section className='contents_block bg06' id='pr_menu'>
            <div className='inner'>
              <h2 className='ttl'>
                なんやるの
                <br />
                お掃除メニュー
              </h2>
              <ul className='pr_menu_list'>
                <li>
                  <Image
                    src='/images/price1.webp'
                    className='pr_menu_img'
                    alt=''
                    width={300}
                    height={200}
                  />
                  <h3>エアコン室外機</h3>
                  <p>
                    時間：30分
                    <br />
                    料金：8,000円~
                  </p>
                </li>
                <li>
                  <Image
                    src='/images/price2.webp'
                    className='pr_menu_img'
                    alt=''
                    width={300}
                    height={200}
                  />
                  <h3>バスルーム(換気扇込)</h3>
                  <p>
                    時間：120分
                    <br />
                    料金：18,000円~
                  </p>
                </li>
                <li>
                  <Image
                    src='/images/price3.webp'
                    className='pr_menu_img'
                    alt=''
                    width={300}
                    height={200}
                  />
                  <h3>浴室エプロン内部</h3>
                  <p>
                    時間：45分
                    <br />
                    料金：18,000円~
                  </p>
                </li>
                <li>
                  <Image
                    src='/images/price4.webp'
                    className='pr_menu_img'
                    alt=''
                    width={300}
                    height={200}
                  />
                  <h3>キッチン</h3>
                  <p>
                    時間：120分
                    <br />
                    料金：18,000円~
                  </p>
                </li>
                <li>
                  <Image
                    src='/images/price5.webp'
                    className='pr_menu_img'
                    alt=''
                    width={300}
                    height={200}
                  />
                  <h3>レンジフード(換気扇)</h3>
                  <p>
                    時間：120分
                    <br />
                    料金：18,000円~
                  </p>
                </li>
                <li>
                  <Image
                    src='/images/price6.webp'
                    className='pr_menu_img'
                    alt=''
                    width={300}
                    height={200}
                  />
                  <h3>洗面台</h3>
                  <p>
                    時間：90分
                    <br />
                    料金：9,000円~
                  </p>
                </li>
                <li>
                  <Image
                    src='/images/price7.webp'
                    className='pr_menu_img'
                    alt=''
                    width={300}
                    height={200}
                  />
                  <h3>トイレ</h3>
                  <p>
                    時間：90分
                    <br />
                    料金：9,000円~
                  </p>
                </li>
                <li>
                  <Image
                    src='/images/price8.webp'
                    className='pr_menu_img'
                    alt=''
                    width={300}
                    height={200}
                  />
                  <h3>鏡の鱗落とし</h3>
                  <p>
                    時間：30分
                    <br />
                    料金：4,000円~
                  </p>
                </li>
              </ul>
            </div>
          </section>

          {/* Secret/Coupon Section */}
          {/* <section className='contents_block' id='secret'>
            <div className='inner'>
              <h2 className='ttl_coupon'>
                <Image
                  src='/images/coupon_ttl.webp'
                  className='coupon_ttl'
                  alt='LINE限定クーポン'
                  width={600}
                  height={100}
                />
              </h2>
              <h3 className='coupon_h3'>LINE経由でお申し込みいただいた方限定</h3>
              <Image
                src='/images/coupon.webp'
                className='coupon'
                alt='LINE限定割引500円OFF'
                width={500}
                height={300}
              />
            </div>
          </section> */}

          {/* CTA Section 3 */}
          <section className='cta bg05' id='cta1'>
            <div className='inner'>
              <div className='cta_box'>
                <Image
                  src='/images/cta_cha.webp'
                  className='cta_cha'
                  alt=''
                  width={200}
                  height={200}
                />
                <p className='cta_ttl'>LINEで24時間 即日対応!</p>
                {/* <p className='cta_txt'>
                  <span className='slash'>500円クーポン配布中！</span>
                </p> */}
                <div className='cta_btn'>
                  <a
                    href={lineUrl}
                    className='GTM_cv_click'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
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
          </section>

          {/* Flow Section */}
          <section className='contents_block bg01 dot' id='flow'>
            <div className='inner'>
              <h2 className='ttl'>ご利用までの流れ</h2>
              <div className='flow_top'>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <Image
                    src='/images/fukidashi_yellow2.webp'
                    className='fukidashi_yellow2'
                    alt=''
                    width={580}
                    height={200}
                  />
                  <h3
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '90%',
                      textAlign: 'center',
                      margin: 0,
                    }}
                  >
                    当日のご依頼も<span className='l'>OK!</span>
                    <br />
                    <span className='fc_red'>最短</span>
                    <span className='fc_red l'>30</span>
                    <span className='fc_red'>分</span>
                    でご自宅まで伺います!
                  </h3>
                </div>
              </div>
              <ul className='flow'>
                <li>
                  <div className='flow_img'>
                    <span className='step'>STEP.1</span>
                    <Image
                      src='/images/ico_f1.webp'
                      className='icon_flow'
                      alt=''
                      width={150}
                      height={150}
                    />
                  </div>
                  <div className='flow_content'>
                    <h4>LINE友だち追加</h4>
                    <p>
                      本ページから簡単登録！
                      <br />
                      すぐにやり取りが始められます｡
                    </p>
                  </div>
                </li>
                <li>
                  <div className='flow_img'>
                    <span className='step'>STEP.2</span>
                    <Image
                      src='/images/ico_f2.webp'
                      className='icon_flow'
                      alt=''
                      width={150}
                      height={150}
                    />
                  </div>
                  <div className='flow_content'>
                    <h4>お見積り(24時間受付け)</h4>
                    <p>
                      日程､エアコンの写真を送るだけでOK。
                      <br />
                      事前に金額が確定します｡
                    </p>
                  </div>
                </li>
                <li>
                  <div className='flow_img'>
                    <span className='step'>STEP.3</span>
                    <Image
                      src='/images/ico_f3.webp'
                      className='icon_flow'
                      alt=''
                      width={150}
                      height={150}
                    />
                  </div>
                  <div className='flow_content'>
                    <h4>作業日の決定</h4>
                    <p>
                      ご希望日をもとに日程を確定。当日は専門スタッフがお伺いし、しっかり作業いたします｡
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* FAQ Section */}
          <FAQ />

          {/* CTA Last Section */}
          <section className='cta bg05' id='cta_last'>
            <div className='inner'>
              <div className='cta_box'>
                <Image
                  src='/images/cta_cha.webp'
                  className='cta_cha'
                  alt=''
                  width={200}
                  height={200}
                />
                <p className='cta_ttl'>LINEで24時間 即日対応!</p>
                {/* <p className='cta_txt'>
                  <span className='slash'>500円クーポン配布中！</span>
                </p> */}
                <div className='cta_btn'>
                  <a
                    href={lineUrl}
                    className='GTM_cv_click'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
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
          </section>
        </div>

        {/* Footer */}
        <footer id='footer'>
          <p className='copy'>Copyright © 2024 リバEXP All Right Reserved.</p>
        </footer>

        {/* Floating CTA */}
        <FloatingCTA />
      </div>
    </>
  )
}
