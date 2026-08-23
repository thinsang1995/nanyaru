# Trang hoàn tất toB + GTM (repo `cleaning-cms`) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tách trang hoàn tất của form 業務用 ra khỏi trang dùng chung với form cá nhân, rồi gắn `GTM-PVRH5BH9` vào trang mới, để CV của quảng cáo toB không bị lẫn với đơn toC.

**Architecture:** Thêm route `/business-thankyou` vào Next frontend của `cleaning-cms`, đổi đích redirect sau khi submit của `register-business` sang route mới (giữ nguyên việc forward `ecaiad`). `/cleaning-thankyou` của luồng toC **giữ nguyên, không đụng đến**.

**Tech Stack:** Next.js 16.2.2 (App Router), React, TypeScript, yarn (monorepo `backend/` + `frontend/`)

**Spec:** `docs/superpowers/specs/2026-08-23-office-cleaning-lp.md` (repo `nanyaru`) — mục R4 và D5

**Repo:** `/Users/sang/Desktop/liberty/cleaning-cms`, deploy qua `.github/workflows/deploy-production.yml` khi push `main`

## Global Constraints

- GTM container: `GTM-PVRH5BH9` — **chỉ** đặt trên `/business-thankyou`, tuyệt đối không đặt lên `/cleaning-thankyou`.
- Không sửa `frontend/src/app/cleaning-thankyou/page.tsx` và không sửa `frontend/src/app/register/page.tsx` (luồng toC).
- Không sửa backend, không sửa Prisma schema. Task này thuần frontend.
- Giữ nguyên hành vi forward `ecaiad` đang có ở `register-business/page.tsx:166-167`.
- Commit message tiếng Anh, không thêm dòng Co-Authored-By.
- Repo không có test runner cho frontend (`frontend/package.json` chỉ có `dev/build/start/lint`). Verify bằng `yarn lint`, `yarn build` và `curl` + `grep` trên HTML đã render.

## File Structure

| File | Trách nhiệm |
|---|---|
| `frontend/src/app/business-thankyou/page.tsx` | Trang hoàn tất riêng cho luồng 業務用, chứa GTM-PVRH5BH9 |
| `frontend/src/app/register-business/page.tsx:166-167` | Đổi đích redirect sau submit |

---

### Task 1: Trang `/business-thankyou`

**Files:**
- Create: `frontend/src/app/business-thankyou/page.tsx`

**Interfaces:**
- Consumes: không
- Produces: route `/business-thankyou`, nhận query `?ecaiad=<code>` (không đọc, chỉ để nguyên trên URL cho GTM/GA4 lấy)

- [ ] **Step 1: Tạo trang**

Lấy `frontend/src/app/cleaning-thankyou/page.tsx` làm khuôn, sửa 3 điểm: câu chữ hợp toB,
bỏ nút "公式ラインに戻る" (đối tượng toB không đi qua LINE公式), và thêm GTM.

Tạo `frontend/src/app/business-thankyou/page.tsx`:

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";

export const metadata: Metadata = {
  title: "お問い合わせ完了 - NANYARU 業務用クリーニング",
  // Trang hoàn tất không nên vào index: lọt vào kết quả tìm kiếm sẽ sinh CV giả từ organic.
  robots: { index: false, follow: false },
};

export default function BusinessThankYouPage() {
  return (
    <>
      <Script id="gtm-business-thankyou" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-PVRH5BH9');`}
      </Script>

      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-PVRH5BH9"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>

      <div className="min-h-screen w-screen bg-gray-50 flex flex-col items-center justify-center p-2">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center">
              <Image
                src="/images/cleaning/register_bot1.png"
                alt="あらいぐま"
                width={96}
                height={96}
                className="object-contain"
              />
            </div>
            <h1 className="text-xl font-bold text-gray-800 mb-2">
              お問い合わせありがとうございます
            </h1>
            <p className="text-gray-600">
              担当者より折り返しご連絡いたします。
            </p>
          </div>

          <div className="text-sm text-gray-500">
            <p>お急ぎの場合は</p>
            <p>
              <a href="tel:0424542350" className="text-sky-600 underline">
                042-454-2350
              </a>
              までお電話ください。
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
```

> Số điện thoại `042-454-2350` lấy từ chính LP (`オフィスクリーニングLP/index.html`, 4 chỗ `href="tel:0424542350"`).

- [ ] **Step 2: Kiểm tra ảnh tồn tại**

Trang dùng lại ảnh của trang toC. Xác nhận file có thật:

Run: `ls frontend/public/images/cleaning/register_bot1.png`
Expected: in ra đường dẫn. Nếu không có → xem `cleaning-thankyou/page.tsx` đang trỏ ảnh nào và dùng đúng ảnh đó.

- [ ] **Step 3: Lint + build**

```bash
cd frontend
yarn lint
yarn build
```

Expected: cả hai pass, `/business-thankyou` xuất hiện trong bảng route.

- [ ] **Step 4: Kiểm tra HTML đã render**

```bash
cd frontend
yarn dev &
sleep 12
curl -s http://localhost:3000/business-thankyou > /tmp/bt.html
echo "GTM đúng:   $(grep -o 'GTM-PVRH5BH9' /tmp/bt.html | wc -l)  (kỳ vọng >= 2)"
echo "GTM nhầm:   $(grep -o 'GTM-W873ZVN4' /tmp/bt.html | wc -l)  (kỳ vọng 0)"
echo "noindex:    $(grep -c 'noindex' /tmp/bt.html)  (kỳ vọng 1)"
```

Expected: đúng các con số trong ngoặc.

- [ ] **Step 5: Xác nhận trang toC vẫn sạch GTM**

```bash
curl -s http://localhost:3000/cleaning-thankyou | grep -c 'GTM-'
```

Expected: `0`. Nếu > 0 → đã lỡ gắn GTM vào trang dùng chung, quay lại sửa.

- [ ] **Step 6: Commit**

```bash
git add frontend/src/app/business-thankyou
git commit -m "add business thankyou page with GTM container"
```

---

### Task 2: Đổi đích redirect của form 業務用

**Files:**
- Modify: `frontend/src/app/register-business/page.tsx:166-167`

**Interfaces:**
- Consumes: route `/business-thankyou` (Task 1)
- Produces: sau khi submit thành công, form 業務用 đi tới `/business-thankyou?ecaiad=<code>`

- [ ] **Step 1: Sửa đích redirect**

Trong `frontend/src/app/register-business/page.tsx`, tìm trong `onSubmit`:

```tsx
      const query = adsCode ? `?ecaiad=${encodeURIComponent(adsCode)}` : "";
      router.push(`/cleaning-thankyou${query}`);
```

Đổi thành:

```tsx
      const query = adsCode ? `?ecaiad=${encodeURIComponent(adsCode)}` : "";
      router.push(`/business-thankyou${query}`);
```

Chỉ đổi **một** dòng. Không đụng vào `submitBooking(...)` phía trên, không đụng `adsCode` — phần lưu
`adsCode` vào booking đã chạy đúng từ trước.

- [ ] **Step 2: Xác nhận form toC không bị đổi theo**

Run: `grep -n 'thankyou' frontend/src/app/register/page.tsx frontend/src/app/register-business/page.tsx`
Expected:
- `register/page.tsx` → `/cleaning-thankyou` (giữ nguyên)
- `register-business/page.tsx` → `/business-thankyou` (đã đổi)

- [ ] **Step 3: Lint + build**

```bash
cd frontend
yarn lint
yarn build
```

Expected: pass.

- [ ] **Step 4: Chạy thử end-to-end trên local**

1. Mở `http://localhost:3000/register-business?ecaiad=TEST123`
2. Điền các trường bắt buộc, submit.
3. Xác nhận URL sau khi chuyển là `/business-thankyou?ecaiad=TEST123`.
4. Mở tab Network trong DevTools, xác nhận có request tới `googletagmanager.com/gtm.js?id=GTM-PVRH5BH9`.
5. Trong console chạy `dataLayer` — phải thấy mảng có `gtm.start`.
6. Kiểm tra bên admin: booking mới có `広告コード = TEST123` (danh sách booking đã hiển thị cột này từ commit `bdcad22`).

- [ ] **Step 5: Commit**

```bash
git add frontend/src/app/register-business/page.tsx
git commit -m "redirect business form to dedicated thankyou page"
```

---

### Task 3: Deploy và xác nhận production

**Files:** không sửa file nào

- [ ] **Step 1: Push**

```bash
git checkout main
git merge --no-ff <branch>
git push origin main
```

CI `.github/workflows/deploy-production.yml` build cả backend lẫn frontend rồi deploy.

- [ ] **Step 2: Xác nhận trên production**

```bash
curl -s https://cleaning.nanyaru.com/business-thankyou > /tmp/prod-bt.html
echo "GTM đúng: $(grep -o 'GTM-PVRH5BH9' /tmp/prod-bt.html | wc -l)  (kỳ vọng >= 2)"
echo "noindex:  $(grep -c 'noindex' /tmp/prod-bt.html)  (kỳ vọng 1)"
echo "toC sạch: $(curl -s https://cleaning.nanyaru.com/cleaning-thankyou | grep -c 'GTM-')  (kỳ vọng 0)"
```

- [ ] **Step 3: Chạy thử toàn chuỗi trên production**

Đi hết luồng thật: `https://nanyaru.com/office-cleaning/lp?ecaiad=TEST123` → bấm CTA →
`https://cleaning.nanyaru.com/register-business?ecaiad=TEST123` → submit →
`https://cleaning.nanyaru.com/business-thankyou?ecaiad=TEST123`.

Kiểm tra:
1. `ecaiad` sống sót qua cả 3 chặng.
2. GTM Preview (Tag Assistant) bắt được pageview trên trang hoàn tất.
3. Booking test hiện trong admin với `区分 = 業務用` và `広告コード = TEST123`.
4. Xoá booking test sau khi xong.

---

## Self-Review

**Spec coverage:**
- R4 (GTM trên trang hoàn tất) → Task 1
- D5 (trang hoàn tất riêng cho toB) → Task 1 + Task 2
- R2 (forward `ecaiad`) → giữ nguyên logic sẵn có, verify ở Task 2 Step 4 và Task 3 Step 3

**Điểm cần người quyết, đã chọn mặc định trong plan:**
- Bỏ nút "公式ラインに戻る" và thay bằng số điện thoại — vì đối tượng toB không đi qua LINE公式.
  Nếu 大沢さん muốn giữ nút LINE thì sửa lại ở Task 1 Step 1.
- Thêm `robots: { index: false }` cho trang hoàn tất — chuẩn chung, tránh CV giả từ organic.
  Không nằm trong yêu cầu gốc; nếu không muốn thì bỏ dòng đó.
