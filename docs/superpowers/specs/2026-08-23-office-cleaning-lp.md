# Spec: LP 業務用エアコンクリーニング (toB lead gen)

**Ngày:** 2026-08-23
**Nguồn yêu cầu:** mail bàn giao của 制作会社 + chỉ thị của 大沢さん (11:48)
**Bộ file bàn giao:** `オフィスクリーニングLP/` (untracked, ở root repo `nanyaru`)

---

## 1. Bối cảnh

制作会社 đã bàn giao LP tĩnh "企業向けオフィスメンテナンス_リード獲得LP" và chờ 検収.
大沢さん yêu cầu đưa lên server, và vì đối tượng là **toB** nên CTA **không đi qua LINE公式**
mà trỏ thẳng vào form đã dựng trước đó, đồng thời phải **gắn được 広告コード**.

## 2. Yêu cầu

### R1 — Điền URL vào 6 CTA đang để `href="#"`
Vị trí trong `オフィスクリーニングLP/index.html`:

| Dòng | Phần tử | Ghi chú |
|---|---|---|
| 92  | `a.fv__nav-btn` | nav PC |
| 111 | `a.spmenu__btn` | menu SP |
| 134 | `a.fv__cta-imgbtn` | CTA ảnh trong FV |
| 215 | `a.cta-pill__btn` | CTA band giữa trang |
| 495 | `a.cta-pill__btn` | CTA band cuối trang |
| 525 | `a.fixedcta__btn` | thanh cố định đáy màn hình (SP) |

Đích: `https://cleaning.nanyaru.com/register-business`

> Dòng 19 cũng chứa chuỗi `href="#"` nhưng nằm trong comment TODO — xoá comment, không tính là CTA.
> Các link `href="#reason|#price|#flow|#faq"` là anchor nội trang — **giữ nguyên**.

### R2 — 広告コード (ad code)
- LP nhận `?ecaiad=<code>` trên URL → forward nguyên vẹn sang link form.
- Form `register-business` **đã đọc sẵn** `ecaiad` (`frontend/src/app/register-business/page.tsx:107`)
  và đã forward tiếp sang trang hoàn tất (`:166-167`). **Không phải sửa form.**
- **Không có** mã mặc định: URL không kèm `ecaiad` → link form **không gắn param**.
  Chừa sẵn hằng số `DEFAULT_ECAIAD = ''` để điền khi 大沢さん cấp code.
  (Khác LP toC `/cleaning/lp` đang hardcode `itZfluaz` ở `components/LineCtaButton.tsx:6`.)

### R3 — OGP + canonical
- URL chính thức: `https://nanyaru.com/office-cleaning/lp`
- `og:url` hiện là `●●●` → điền URL trên.
- `og:image` hiện là đường dẫn tương đối `img/ogp.png` → **phải là URL tuyệt đối**.
- Thêm `canonical` (bộ file bàn giao không có thẻ nào).

### R4 — GTM
- LP: đã có sẵn `GTM-PVRH5BH9` ở `<head>` và `<body>` trong file bàn giao → giữ nguyên khi convert.
- Trang hoàn tất liên hệ: **chưa có GTM nào** → phải gắn `GTM-PVRH5BH9`.

### R5 — SEO
- Trang **được index** (đã chốt).
- Phân biệt từ khoá với `/cleaning/lp` (toC): LP mới nhắm cụm **業務用 / オフィス / 法人**,
  LP cũ giữ cụm cá nhân/家庭用 → tránh tự cạnh tranh.

## 3. Quyết định đã chốt

| # | Quyết định | Lý do |
|---|---|---|
| D1 | Convert sang **Next.js route**, không để static trong `public/` | Thừa hưởng `metadataBase` (`app/layout.tsx:16`) → OGP tuyệt đối tự động; có canonical; một URL duy nhất (static + rewrite sinh ra cả `/office-cleaning` lẫn `/office-cleaning/index.html` → duplicate content); nhất quán với `/cleaning/lp` vốn cũng convert từ HTML tĩnh |
| D2 | Path `/office-cleaning/lp` | Đã chốt |
| D3 | Index (không noindex) | Đã chốt |
| D4 | Form đích `cleaning.nanyaru.com/register-business` | Đã chốt |
| D5 | Trang hoàn tất **riêng** `/business-thankyou` cho luồng toB | `register-business` đang redirect về `/cleaning-thankyou` dùng chung với form toC; gắn GTM-PVRH5BH9 vào đó sẽ khiến đơn toC bắn CV vào container quảng cáo toB |
| D6 | Không dùng `next/image`, dùng `<img>` + `width`/`height` thật | Ảnh dùng thật chỉ **2.9 MB / 34 file**, lớn nhất 136 KB, đã là `.webp` → lợi ích resize không đáng kể; CSS của LP dùng nhiều `transform`/`object-position`/parallax nên wrapper của `next/image` dễ vỡ layout. Vấn đề Core Web Vitals thật ở đây là **CLS** (28/28 `<img>` thiếu `width`/`height`) — thêm attr thật là đủ |
| D7 | Không gắn ad code mặc định | Chưa có code từ 大沢さん |

## 4. Lỗi trong bộ file bàn giao (cần báo 制作会社)

| Lỗi | Chi tiết |
|---|---|
| Favicon 404 | `index.html` trỏ `img/favicon16x16.png`, `favicon32x32.png`, `favicon48x48.png` — file thật tên `favicon_16x16.png` (có gạch dưới) |
| Tên file có dấu cách | `twitter:image` trỏ `img/OGP _X.png` — cần đổi tên hoặc encode `%20` |
| OGP tương đối | `og:image` / `twitter:image` là đường dẫn tương đối → crawler không hiện thumbnail |
| Ảnh thừa | Thư mục `img` 26.7 MB nhưng chỉ **34 file (2.9 MB)** được dùng thật — phần lớn là bản `.png` trùng với `.webp` |
| OGP nặng | `ogp.png` 849 KB, `OGP _X.png` 953 KB cho ảnh 1200×630 / 1200×675 |
| Thiếu width/height | 28/28 `<img>` không có → CLS |

## 5. Ngoài scope (đề xuất riêng, chưa làm)

- `app/sitemap.ts` / `app/robots.ts` — repo chưa có, ảnh hưởng toàn site.
- Dọn ảnh thừa trong bộ bàn giao gốc (chỉ copy 34 file cần dùng là đủ).
