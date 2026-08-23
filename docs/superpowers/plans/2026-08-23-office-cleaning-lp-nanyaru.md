# LP 業務用エアコンクリーニング (repo `nanyaru`) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Đưa LP toB 業務用エアコンクリーニング lên `https://nanyaru.com/office-cleaning/lp` dưới dạng Next.js route, 6 CTA trỏ vào form `register-business` kèm 広告コード, OGP/canonical đầy đủ và cho index.

**Architecture:** Convert bộ HTML tĩnh bàn giao thành một route Next App Router. CSS (`style.css`) và JS (`script.js`) giữ nguyên gần như nguyên vẹn — CSS import vào route layout, JS nạp qua `next/script` từ `public/`. Chỉ phần markup được convert sang TSX. 6 CTA dùng chung một Client Component đọc `?ecaiad=` từ URL, giữ `page.tsx` là Server Component để export `metadata`.

**Tech Stack:** Next.js 16.0.7 (App Router), React 19.2, TypeScript 5, yarn 4.5.3 (Berry/corepack)

**Spec:** `docs/superpowers/specs/2026-08-23-office-cleaning-lp.md`

## Global Constraints

- URL chính thức: `https://nanyaru.com/office-cleaning/lp` — dùng đúng chuỗi này cho `canonical` và `og:url`.
- Form đích: `https://cleaning.nanyaru.com/register-business` — đúng 6 chỗ, không hơn không kém.
- GTM container của LP này: `GTM-PVRH5BH9` (khác `GTM-W873ZVN4` của `/cleaning/lp` — không nhầm).
- `DEFAULT_ECAIAD = ''` — không gắn param khi URL không có `ecaiad`.
- Trang này **được index**: không thêm `noindex` ở bất kỳ đâu.
- **Không dùng `next/image`** cho LP này (xem D6 trong spec). Dùng `<img>` kèm `width`/`height` thật.
- Không sửa `app/globals.css`, không sửa `styles/style.css` (của LP toC), không sửa `components/LineCtaButton.tsx`.
- Repo **không có test runner** (`package.json` chỉ có `dev/build/start/lint/deploy`). Verify bằng `yarn build`, `curl` + `grep` trên HTML đã render, và kiểm tra bằng mắt trên trình duyệt. Không dựng test framework mới cho task này.
- Commit message tiếng Anh, không thêm dòng Co-Authored-By.

## File Structure

| File | Trách nhiệm |
|---|---|
| `public/images/office-cleaning/*` (34 file) | Ảnh LP. Chỉ copy file thật sự được dùng (2.9 MB), không copy cả thư mục 26.7 MB |
| `public/office-cleaning/script.js` | JS của LP (opening, parallax, SP menu, FAQ accordion, reveal), giữ nguyên logic gốc |
| `styles/office-cleaning.css` | CSS của LP, giữ nguyên trừ 8 chỗ `url("img/...")` phải đổi path |
| `app/office-cleaning/lp/layout.tsx` | Import CSS + `viewport`. Đối xứng với `app/cleaning/lp/layout.tsx` |
| `app/office-cleaning/lp/page.tsx` | Server Component: `metadata`, GTM, JSON-LD, toàn bộ markup LP |
| `components/OfficeCtaLink.tsx` | Client Component: link CTA + logic `ecaiad` |

---

### Task 1: Đưa assets vào repo

**Files:**
- Create: `public/images/office-cleaning/` (34 ảnh)
- Create: `public/office-cleaning/script.js`

**Interfaces:**
- Consumes: bộ bàn giao `オフィスクリーニングLP/` ở root repo (untracked)
- Produces: đường dẫn `/images/office-cleaning/<tên file>` và `/office-cleaning/script.js` cho các task sau

- [ ] **Step 1: Copy đúng 34 ảnh được dùng thật**

```bash
cd /Users/sang/Desktop/liberty/nanyaru
SRC="オフィスクリーニングLP"
mkdir -p public/images/office-cleaning
used=$(cat \
  <(grep -oE 'src="img/[^"]+"' "$SRC/index.html" | sed 's/src="//;s/"$//') \
  <(grep -oE 'content="img/[^"]+"' "$SRC/index.html" | sed 's/content="//;s/"$//') \
  <(grep -oE 'href="img/[^"]+"' "$SRC/index.html" | sed 's/href="//;s/"$//') \
  <(grep -oE 'url\("?img/[^")]+' "$SRC/style.css" | sed -E 's/url\("?//') \
  | sort -u)
while IFS= read -r f; do
  [ -f "$SRC/$f" ] && cp "$SRC/$f" public/images/office-cleaning/
done <<< "$used"
ls public/images/office-cleaning | wc -l
```

Kết quả mong đợi: **31** file (3 file favicon trong danh sách không tồn tại — xử lý ở Step 2).

- [ ] **Step 2: Sửa 2 lỗi tên file của bộ bàn giao**

Bộ bàn giao trỏ sai tên favicon và dùng tên file có dấu cách. Copy bản đúng tên:

```bash
cd /Users/sang/Desktop/liberty/nanyaru
SRC="オフィスクリーニングLP"
# favicon: file thật có gạch dưới, HTML trỏ tên không gạch dưới
cp "$SRC/img/favicon_16x16.png" public/images/office-cleaning/favicon16x16.png
cp "$SRC/img/favicon_32x32.png" public/images/office-cleaning/favicon32x32.png
cp "$SRC/img/favicon_48x48.png" public/images/office-cleaning/favicon48x48.png
# OGP cho X: bỏ dấu cách trong tên file
cp "$SRC/img/OGP _X.png" public/images/office-cleaning/ogp_x.png
ls public/images/office-cleaning | wc -l
```

Kết quả mong đợi: **35** file.

- [ ] **Step 3: Copy script.js và vá chỗ khởi động**

`script.js` gốc bọc toàn bộ trong `document.addEventListener('DOMContentLoaded', ...)` (dòng 6).
`next/script` với `strategy="afterInteractive"` nạp **sau** khi DOM đã sẵn sàng → `DOMContentLoaded`
đã bắn xong, handler sẽ **không bao giờ chạy** và cả LP đứng im (opening không tắt → trang trắng).
`strategy="beforeInteractive"` chỉ dùng được ở root layout nên không phải lựa chọn.

```bash
cd /Users/sang/Desktop/liberty/nanyaru
mkdir -p public/office-cleaning
cp "オフィスクリーニングLP/script.js" public/office-cleaning/script.js
```

Sửa dòng 6 của `public/office-cleaning/script.js`, từ:

```js
document.addEventListener('DOMContentLoaded', function () {
```

thành:

```js
// next/script (afterInteractive) nạp file này SAU khi DOMContentLoaded đã bắn,
// nên phải chạy ngay nếu DOM đã sẵn sàng, thay vì chờ event không bao giờ đến.
function initOfficeCleaningLp() {
```

và ở **cuối file**, thay dòng đóng:

```js
});
```

thành:

```js
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initOfficeCleaningLp);
} else {
  initOfficeCleaningLp();
}
```

- [ ] **Step 4: Kiểm tra script còn hợp lệ về cú pháp**

Run: `node --check public/office-cleaning/script.js`
Expected: không in ra gì (exit 0). Nếu báo `SyntaxError` → dấu ngoặc đóng cuối file chưa khớp, xem lại Step 3.

- [ ] **Step 5: Commit**

```bash
git add public/images/office-cleaning public/office-cleaning
git commit -m "add office cleaning LP assets and bootstrap-safe script"
```

---

### Task 2: CSS của LP

**Files:**
- Create: `styles/office-cleaning.css` (từ `オフィスクリーニングLP/style.css`, 2975 dòng)

**Interfaces:**
- Consumes: `/images/office-cleaning/*` từ Task 1
- Produces: file CSS để `app/office-cleaning/lp/layout.tsx` import ở Task 3

- [ ] **Step 1: Copy CSS và đổi 8 đường dẫn ảnh**

CSS gốc tham chiếu ảnh theo đường dẫn tương đối `url("img/...")` ở 8 chỗ
(dòng 1863, 2073, 2256, 2311, 2319, 2324, 2330, 2827). Trong Next, CSS được serve từ
`/_next/static/css/...` nên đường dẫn tương đối sẽ trỏ sai → phải đổi sang tuyệt đối.

```bash
cd /Users/sang/Desktop/liberty/nanyaru
cp "オフィスクリーニングLP/style.css" styles/office-cleaning.css
sed -i '' 's|url("img/|url("/images/office-cleaning/|g' styles/office-cleaning.css
grep -c 'url("/images/office-cleaning/' styles/office-cleaning.css
```

Expected: `8`

- [ ] **Step 2: Xác nhận không còn đường dẫn tương đối sót lại**

Run: `grep -n 'url("img/' styles/office-cleaning.css`
Expected: không có dòng nào (exit code 1).

- [ ] **Step 3: Xác nhận CSS không đụng độ với `app/globals.css`**

`app/globals.css` được import ở root layout nên áp cho **mọi** route, gồm cả LP này. Nó đặt
`html { font-size: 120% }` và `body { font-family: Arial; font-size: 18px }`, cộng Tailwind v4 preflight.

Đã kiểm tra trước: `styles/office-cleaning.css` có reset riêng (`* { margin:0; padding:0; box-sizing:border-box }`)
và **dùng 0 chỗ `rem`** → miễn nhiễm với `font-size: 120%`. Xác nhận lại điều này chưa đổi:

Run: `grep -c 'rem' styles/office-cleaning.css`
Expected: `0`. Nếu > 0 → dừng lại, phải bọc LP trong scope riêng trước khi đi tiếp.

- [ ] **Step 4: Commit**

```bash
git add styles/office-cleaning.css
git commit -m "add office cleaning LP stylesheet with absolute asset paths"
```

---

### Task 3: Route skeleton, metadata, GTM

**Files:**
- Create: `app/office-cleaning/lp/layout.tsx`
- Create: `app/office-cleaning/lp/page.tsx` (chỉ khung, markup thân trang làm ở Task 5)

**Interfaces:**
- Consumes: `styles/office-cleaning.css` (Task 2), `/office-cleaning/script.js` (Task 1)
- Produces: route `/office-cleaning/lp` render được, `metadata` export từ `page.tsx`

- [ ] **Step 1: Tạo layout**

Đối xứng với `app/cleaning/lp/layout.tsx`. Tạo `app/office-cleaning/lp/layout.tsx`:

```tsx
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
```

> Khác `/cleaning/lp` ở chỗ **không** đặt `maximumScale: 1, userScalable: false` — khoá zoom là lỗi
> accessibility và Lighthouse trừ điểm. LP này cho index nên không nên mang theo.

- [ ] **Step 2: Tạo page skeleton với metadata + GTM**

Tạo `app/office-cleaning/lp/page.tsx`. `title`/`description` lấy nguyên văn từ bộ bàn giao
(`index.html` dòng 13-14). Dùng `absolute` cho title để không bị root template `%s｜合同会社なんやる` nối thêm
(bản bàn giao đã tự có brand trong title):

```tsx
import type { Metadata } from 'next'
import Script from 'next/script'

const TITLE = '【大手と同品質で格安】元ダスキン仕込みのオフィスエアコンクリーニング'
const DESCRIPTION =
  '大手の見積もりが高いとお悩みの総務担当者様へ。ダスキンで修行した元プロが直伝の技術で一から育てたスタッフが伺います！中間マージンを徹底排除した自社一貫体制だから、大手と同等の徹底洗浄が驚きの価格で実現。業務に影響のない夜間・休日施工も対応可能です。まずは無料見積もりから！'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
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

      {/* Markup LP đặt ở đây — Task 5 */}

      <Script src='/office-cleaning/script.js' strategy='afterInteractive' />
    </>
  )
}
```

> `metadataBase` đã khai ở `app/layout.tsx:16` nên `/images/...` tự được Next resolve thành
> `https://nanyaru.com/images/...` trong thẻ `og:image` — đây chính là lý do chọn Next route thay vì file tĩnh.

- [ ] **Step 3: Build thử**

Run: `yarn build`
Expected: build pass, trong danh sách route có `/office-cleaning/lp` và được đánh dấu static (`○`).

- [ ] **Step 4: Kiểm tra metadata đã render đúng**

```bash
yarn dev &
sleep 12
curl -s http://localhost:3000/office-cleaning/lp > /tmp/lp.html
grep -o '<link rel="canonical"[^>]*>' /tmp/lp.html
grep -o '<meta property="og:url"[^>]*>' /tmp/lp.html
grep -o '<meta property="og:image"[^>]*>' /tmp/lp.html
grep -c 'GTM-PVRH5BH9' /tmp/lp.html
```

Expected:
- canonical = `https://nanyaru.com/office-cleaning/lp`
- `og:url` = `https://nanyaru.com/office-cleaning/lp`
- `og:image` = `https://nanyaru.com/images/office-cleaning/ogp.png` (**tuyệt đối** — nếu vẫn tương đối thì `metadataBase` chưa ăn)
- GTM đếm được ≥ 1 (script inline nằm trong HTML, noscript iframe cũng có)

- [ ] **Step 5: Commit**

```bash
git add app/office-cleaning
git commit -m "add office cleaning LP route with metadata and GTM"
```

---

### Task 4: CTA component + 広告コード

**Files:**
- Create: `components/OfficeCtaLink.tsx`

**Interfaces:**
- Consumes: không
- Produces:
  - `export function useOfficeFormUrl(): string` — URL form đã gắn `ecaiad` nếu có
  - `export default function OfficeCtaLink({ className, children }: { className: string; children: React.ReactNode })`

- [ ] **Step 1: Viết component**

Bám đúng pattern của `components/LineCtaButton.tsx` (đọc query string bằng `useSyncExternalStore`
để trang vẫn được render tĩnh; server render ra URL gốc, client gắn thêm param sau khi hydrate).

Tạo `components/OfficeCtaLink.tsx`:

```tsx
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
```

> Không đặt `target='_blank'`: bản HTML bàn giao không có, và form nằm cùng registrable domain
> (`nanyaru.com`) nên cookie GA4 vẫn dùng chung, không cần cross-domain linker.

- [ ] **Step 2: Kiểm tra type**

Run: `npx tsc --noEmit`
Expected: không lỗi. (Nếu có lỗi `tsconfig.tsbuildinfo` cũ, xoá file đó rồi chạy lại.)

- [ ] **Step 3: Commit**

```bash
git add components/OfficeCtaLink.tsx
git commit -m "add office cleaning CTA link with ad code forwarding"
```

---

### Task 5: Convert markup HTML sang TSX

**Files:**
- Modify: `app/office-cleaning/lp/page.tsx` (thay chỗ `{/* Markup LP đặt ở đây */}`)

**Interfaces:**
- Consumes: `OfficeCtaLink` (Task 4), ảnh `/images/office-cleaning/*` (Task 1)
- Produces: trang LP render đầy đủ

**Nguồn:** `オフィスクリーニングLP/index.html` dòng **46-527** (từ `<!-- ===== オープニング` đến hết `.fixedcta`).
Bỏ qua dòng 1-45 (`<head>` + GTM — đã xử lý ở Task 3) và dòng 528-530 (`<script>`, `</body>`, `</html>`).

**Quy tắc convert** (áp cho toàn bộ, không ngoại lệ):

| HTML | TSX | Số chỗ |
|---|---|---|
| `class="x"` | `className="x"` | toàn bộ |
| `<br>` | `<br />` | 24 |
| `<img ...>` | `<img ... />` | 28 |
| `<!-- ... -->` | `{/* ... */}` hoặc xoá hẳn | ~30 |
| `src="img/x.webp"` | `src="/images/office-cleaning/x.webp"` | 28 |
| `style="--x:4%; --sz:118px"` | `style={{ '--x': '4%', '--sz': '118px' } as React.CSSProperties}` | 77 |
| `href="#"` (6 CTA) | thay bằng `<OfficeCtaLink>` | 6 |
| `href="#reason"` v.v. | giữ nguyên | 12 |

- [ ] **Step 1: Chạy codemod cơ học cho phần dễ sai nhất**

77 thuộc tính `style` chứa CSS custom property, convert tay chắc chắn sai. Dùng script một lần
trong scratchpad (không commit vào repo):

```bash
mkdir -p /private/tmp/claude-501/-Users-sang-Desktop-liberty-nanyaru/57b8055d-d7f6-45fc-92de-8339c855e6c7/scratchpad
cat > /private/tmp/claude-501/-Users-sang-Desktop-liberty-nanyaru/57b8055d-d7f6-45fc-92de-8339c855e6c7/scratchpad/codemod.mjs <<'EOF'
import { readFileSync, writeFileSync } from 'node:fs'

const src = readFileSync(process.argv[2], 'utf8')
const body = src.split('\n').slice(46, 527).join('\n')

const out = body
  // style="--x:4%; --sz:118px" -> style={{ '--x': '4%', '--sz': '118px' } as React.CSSProperties}
  .replace(/style="([^"]*)"/g, (_, decls) => {
    const pairs = decls
      .split(';')
      .map((d) => d.trim())
      .filter(Boolean)
      .map((d) => {
        const i = d.indexOf(':')
        const prop = d.slice(0, i).trim()
        const val = d.slice(i + 1).trim()
        const key = prop.startsWith('--')
          ? `'${prop}'`
          : prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
        return `${key}: '${val}'`
      })
      .join(', ')
    return `style={{ ${pairs} } as React.CSSProperties}`
  })
  .replace(/\bclass=/g, 'className=')
  .replace(/src="img\//g, 'src="/images/office-cleaning/')
  // Void tag: PHẢI bắt cả biến thể có attribute. File này có 24 chỗ `<br>` và
  // 28 chỗ `<br class="sp">` — rule chỉ khớp `<br>` sẽ bỏ sót hơn nửa và JSX không parse được.
  .replace(/<(br|img|hr|input|source|wbr)\b((?:[^>"']|"[^"]*"|'[^']*')*?)\s*\/?>/g, '<$1$2 />')
  .replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}')

writeFileSync(process.argv[3], out)
EOF
SP=/private/tmp/claude-501/-Users-sang-Desktop-liberty-nanyaru/57b8055d-d7f6-45fc-92de-8339c855e6c7/scratchpad
node $SP/codemod.mjs "オフィスクリーニングLP/index.html" $SP/body.tsx
# grep -o + wc -l, KHÔNG dùng grep -c: nhiều thẻ <i style=...> nằm chung một dòng,
# grep -c đếm dòng nên sẽ ra 23 và làm bạn tưởng codemod hỏng.
echo "styles:        $(grep -o 'as React.CSSProperties' $SP/body.tsx | wc -l)   # kỳ vọng 77"
echo "br chưa đóng:  $(grep -o '<br[^>]*>' $SP/body.tsx | grep -vc '/>')        # kỳ vọng 0"
echo "img chưa đóng: $(grep -o '<img[^>]*>' $SP/body.tsx | grep -vc '/>')       # kỳ vọng 0"
```

Expected: đúng các con số ghi trong comment.

Controller đã chạy thử codemod này trên file thật và cho toàn bộ output đi qua
`tsc --noEmit --jsx react-jsx` — **0 lỗi**. Nếu bạn chạy ra khác, đừng tự sửa regex; báo lại.

- [ ] **Step 2: Dán vào page.tsx và rà tay theo section**

Dán nội dung `$SP/body.tsx` vào chỗ `{/* Markup LP đặt ở đây — Task 5 */}` trong
`app/office-cleaning/lp/page.tsx`, rồi rà lần lượt 14 section (codemod không bắt hết mọi trường hợp):

| Section | Dòng gốc |
|---|---|
| `.opening` | 47-76 |
| `.fv` | 77-139 |
| `.nayami` | 140-156 |
| `.whyline#reason` | 157-184 |
| `.story` | 185-207 |
| `.cta-band` | 208-220 |
| `.price#price` | 221-253 |
| `.hikaku` | 254-324 |
| `.flow#flow` | 325-365 |
| `.option` | 366-391 |
| `.igai` | 392-426 |
| `.voice` | 427-450 |
| `.faq#faq` | 451-487 |
| `.cta-band--last` / `.band` / `footer` / `.fixedcta` | 488-527 |

Việc cần làm tay ở bước này:
- Xoá comment TODO ở đầu (đã hết giá trị sau khi điền URL).
- Kiểm tra comment lồng nhau — `{/* ... */}` không được chứa `*/`; nếu có thì xoá comment đó.
- Thêm `width` và `height` thật cho **cả 28** `<img>` (xem Step 3).

- [ ] **Step 3: Thêm width/height thật cho 28 ảnh**

Cả 28 `<img>` trong bản bàn giao đều thiếu `width`/`height` → CLS. Lấy kích thước thật:

```bash
cd /Users/sang/Desktop/liberty/nanyaru/public/images/office-cleaning
for f in *; do
  printf "%-26s " "$f"
  sips -g pixelWidth -g pixelHeight "$f" 2>/dev/null | awk '/pixelWidth|pixelHeight/{printf "%s ", $2}'
  echo
done
```

Với mỗi `<img>`, thêm `width={W} height={H}` đúng theo số đo file. Ví dụ, ảnh FV:

```tsx
<img className='fv__photo' src='/images/office-cleaning/fv_main.webp' alt='' width={1024} height={1024} />
```

Giữ nguyên `loading='lazy'` ở 17 ảnh đã có. Ảnh trong FV (`fv_main.webp`, `logo_t.webp`) **không** thêm
`loading='lazy'` vì nằm trên màn hình đầu.

- [ ] **Step 4: Thay 6 CTA bằng `OfficeCtaLink`**

Thêm import vào đầu `page.tsx`:

```tsx
import OfficeCtaLink from '@/components/OfficeCtaLink'
```

Thay từng chỗ (className giữ **nguyên văn** để CSS không vỡ):

```tsx
{/* dòng gốc 92 — nav PC */}
<OfficeCtaLink className='fv__nav-btn GTM_cv_click'>無料お見積りはこちら</OfficeCtaLink>

{/* dòng gốc 111 — menu SP */}
<OfficeCtaLink className='btn btn--line spmenu__btn GTM_cv_click'>無料お見積りはこちら</OfficeCtaLink>

{/* dòng gốc 134 — CTA ảnh trong FV */}
<OfficeCtaLink className='fv__cta-imgbtn GTM_cv_click'>
  <img
    src='/images/office-cleaning/CTA_BT2.png'
    alt='＼写真を送るだけ！最短当日回答！／無料お見積り'
    width={370}
    height={373}
  />
</OfficeCtaLink>

{/* dòng gốc 215 và 495 — CTA band giữa và cuối trang, giống hệt nhau */}
<OfficeCtaLink className='btn btn--line cta-pill__btn GTM_cv_click'>無料お見積りはこちら</OfficeCtaLink>

{/* dòng gốc 525 — thanh cố định đáy */}
<OfficeCtaLink className='btn btn--line fixedcta__btn GTM_cv_click'>無料お見積りはこちら</OfficeCtaLink>
```

- [ ] **Step 5: Build + type check**

Run: `npx tsc --noEmit && yarn build`
Expected: cả hai pass.

Lỗi hay gặp và cách xử lý:
- `Unexpected token. Did you mean {'>'} or &gt;?` → còn ký tự `>` trần trong text, escape lại.
- `JSX element ... has no corresponding closing tag` → còn thẻ void chưa đóng, tìm bằng `grep -n '<img\|<br' page.tsx | grep -v '/>'`.
- `Type '{ "--x": string; }' is not assignable to type 'Properties<...>'` → thiếu `as React.CSSProperties` ở chỗ nào đó.

- [ ] **Step 6: Kiểm tra HTML đã render**

```bash
yarn dev &
sleep 12
curl -s http://localhost:3000/office-cleaning/lp > /tmp/lp.html
echo "CTA tới form:      $(grep -o 'cleaning.nanyaru.com/register-business' /tmp/lp.html | wc -l)  (kỳ vọng 6)"
echo "href=\"#\" còn sót:  $(grep -o 'href="#"' /tmp/lp.html | wc -l)  (kỳ vọng 0)"
echo "img thiếu width:   $(grep -o '<img[^>]*>' /tmp/lp.html | grep -vc 'width=')  (kỳ vọng 0)"
echo "img thiếu alt:     $(grep -o '<img[^>]*>' /tmp/lp.html | grep -vc 'alt=')  (kỳ vọng 0)"
echo "h1:                $(grep -o '<h1' /tmp/lp.html | wc -l)  (kỳ vọng 1)"
echo "ảnh 404:"
grep -o 'src="/images/office-cleaning/[^"]*"' /tmp/lp.html | sed 's/src="//;s/"//' | sort -u | while read p; do
  code=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3000$p")
  [ "$code" = "200" ] || echo "  $code  $p"
done
```

Expected: đúng các con số ghi trong ngoặc, và không có dòng ảnh 404 nào.

- [ ] **Step 7: Kiểm tra bằng mắt trên trình duyệt**

Mở `http://localhost:3000/office-cleaning/lp`, xác nhận:
1. Opening (bọt + logo) chạy rồi tự tắt sau ~2.8s — nếu trang trắng vĩnh viễn thì Step 3 của Task 1 sai.
2. Parallax của `.band` chạy khi cuộn.
3. Menu SP (thu nhỏ cửa sổ < 767px) mở/đóng được.
4. FAQ accordion đóng mở được.
5. Thanh CTA cố định đáy hiện ở màn hình SP.
6. So sánh cạnh nhau với bản gốc mở bằng `file://` — bố cục phải khớp.

- [ ] **Step 8: Kiểm tra 広告コード chạy đúng**

Mở `http://localhost:3000/office-cleaning/lp?ecaiad=TEST123`, chạy trong console DevTools:

```js
[...document.querySelectorAll('a[href*="register-business"]')].map((a) => a.href)
```

Expected: mảng **6 phần tử**, tất cả là `https://cleaning.nanyaru.com/register-business?ecaiad=TEST123`.

Sau đó mở lại **không** kèm query string, chạy lại lệnh trên.
Expected: 6 phần tử, tất cả là `https://cleaning.nanyaru.com/register-business` (không có `?`).

- [ ] **Step 9: Commit**

```bash
git add app/office-cleaning/lp/page.tsx
git commit -m "convert office cleaning LP markup to JSX with form CTA links"
```

---

### Task 6: FAQPage structured data

**Files:**
- Modify: `app/office-cleaning/lp/page.tsx`

**Interfaces:**
- Consumes: nội dung FAQ trong markup (Task 5)
- Produces: JSON-LD `FAQPage` trong HTML

LP có sẵn khối FAQ dạng `<dl>/<dt>/<dd>` (dòng gốc 452-487). Vì trang được index, khai `FAQPage`
để có cơ hội lên rich result. Đây là phần SEO duy nhất thêm mới so với bản bàn giao.

- [ ] **Step 1: Trích nội dung FAQ từ bản gốc**

```bash
cd /Users/sang/Desktop/liberty/nanyaru
sed -n '455,486p' "オフィスクリーニングLP/index.html" | grep -o '<dt>.*</dt>\|<dd>.*</dd>'
```

Dùng đúng câu hỏi/câu trả lời in ra, **bỏ** phần `<span class="faq__q">Q1.</span>` và `<span class="faq__toggle">−</span>`.

- [ ] **Step 2: Thêm JSON-LD vào page.tsx**

Đặt ngay trước `<Script src='/office-cleaning/script.js' ... />`:

```tsx
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
        // ... các mục còn lại lấy từ Step 1, cùng cấu trúc
      ],
    }),
  }}
/>
```

- [ ] **Step 3: Kiểm tra JSON-LD hợp lệ**

```bash
yarn dev &
sleep 12
curl -s http://localhost:3000/office-cleaning/lp \
  | sed -n 's/.*<script type="application\/ld+json">\(.*\)<\/script>.*/\1/p' \
  | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const j=JSON.parse(s);console.log(j["@type"], j.mainEntity.length)})'
```

Expected: in ra `FAQPage` và số câu hỏi (phải khớp số mục `<dt>` trong markup).

- [ ] **Step 4: Commit**

```bash
git add app/office-cleaning/lp/page.tsx
git commit -m "add FAQPage structured data to office cleaning LP"
```

---

### Task 7: Kiểm tra tổng thể và deploy

**Files:** không sửa file nào

- [ ] **Step 1: Build sạch**

```bash
cd /Users/sang/Desktop/liberty/nanyaru
rm -f tsconfig.tsbuildinfo
yarn build
```

Expected: pass, `/office-cleaning/lp` xuất hiện trong bảng route và là static.

- [ ] **Step 2: Xác nhận không đụng vào LP cũ**

Run: `git diff --stat main...HEAD -- app/cleaning styles/style.css components/LineCtaButton.tsx next.config.ts`
Expected: không có gì. Nếu có → đã sửa nhầm, revert phần đó.

- [ ] **Step 3: Kiểm tra yarn.lock không đổi**

Run: `git diff --stat -- yarn.lock package.json`
Expected: rỗng (task này không thêm dependency nào).

- [ ] **Step 4: Merge và push**

```bash
git checkout main
git merge --no-ff <branch>
git push origin main
```

CI `.github/workflows/deploy.yaml` tự build và deploy lên VPS `167.179.72.25`.

- [ ] **Step 5: Xác nhận trên production**

```bash
curl -s https://nanyaru.com/office-cleaning/lp > /tmp/prod.html
grep -o '<link rel="canonical"[^>]*>' /tmp/prod.html
grep -o '<meta property="og:image"[^>]*>' /tmp/prod.html
echo "CTA: $(grep -o 'cleaning.nanyaru.com/register-business' /tmp/prod.html | wc -l) (kỳ vọng 6)"
curl -s -o /dev/null -w '%{http_code}\n' https://nanyaru.com/images/office-cleaning/ogp.png
```

Expected: canonical và og:image là URL tuyệt đối trỏ `nanyaru.com`, đếm được 6 CTA, ảnh OGP trả `200`.

- [ ] **Step 6: Kiểm tra OGP bằng công cụ ngoài**

Dán `https://nanyaru.com/office-cleaning/lp` vào Facebook Sharing Debugger và X Card Validator,
xác nhận thumbnail hiện. Nếu không hiện → kiểm tra lại `og:image` có phải URL tuyệt đối không.

---

## Self-Review

**Spec coverage:**
- R1 (6 CTA) → Task 5 Step 4, verify Step 6/8
- R2 (広告コード) → Task 4, verify Task 5 Step 8
- R3 (OGP + canonical) → Task 3 Step 2, verify Step 4 và Task 7 Step 5-6
- R4 (GTM trên LP) → Task 3 Step 2. GTM trên trang hoàn tất → **plan riêng** (`2026-08-23-business-thankyou-gtm.md`)
- R5 (index) → không thêm `noindex` ở đâu; root layout đã có `robots: { index: true }`
- D6 (không dùng next/image) → Task 5 Step 3 thêm width/height tay
- Lỗi bàn giao: favicon sai tên → Task 1 Step 2; tên file có dấu cách → Task 1 Step 2; OGP tương đối → Task 3 Step 2; ảnh thừa → Task 1 Step 1 chỉ copy file dùng thật; thiếu width/height → Task 5 Step 3
- **Chưa phủ:** nén ảnh OGP (849 KB / 953 KB). Không chặn phát hành — ghi vào phần bàn giao lại cho 制作会社.

**Type consistency:** `useOfficeFormUrl` và `OfficeCtaLink` chỉ khai ở Task 4 và dùng ở Task 5, tên khớp.
