// なんやる オフィスエアコンクリーニングLP 本コーディング用スクリプト
// オープニング / FV順次登場 / SPメニュー / FAQアコーディオン / リビール / パララックス

document.documentElement.classList.add('js');

// next/script (afterInteractive) nạp file này SAU khi DOMContentLoaded đã bắn,
// nên phải chạy ngay nếu DOM đã sẵn sàng, thay vì chờ event không bao giờ đến.
function initOfficeCleaningLp() {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- オープニング（泡→ロゴ→ページ表示） ----
  var opening = document.getElementById('opening');
  function finishOpening() {
    if (document.body.classList.contains('is-loaded')) return;
    document.body.classList.add('is-loaded');
    if (opening) opening.classList.add('is-done');
  }
  if (reduced || !opening) {
    finishOpening();
  } else {
    // 演出完了（約2.8s）で表示。保険として最大4.3sで必ず表示（RUNBOOK §5.5の無条件フォールバック）
    setTimeout(finishOpening, 2800);
    setTimeout(finishOpening, 4300);
    opening.addEventListener('click', finishOpening); // クリックでスキップ
  }

  // ---- 写真バンドのJSパララックス（PC/SP共通・iOSでも動く） ----
  // 他機能のエラーで登録が飛ばないよう、オープニングの直後（先頭側）で登録する。
  // rAFに依存せずscrollハンドラ内で直接更新する（オフスクリーン時などrAFが止まる環境でも効く）。
  // 画像は .band の1.9倍高さ。基準位置で写真の下側（人物）を映しつつ、
  // バンドは画面に入ってくる時ほぼ progress 0.5→0 しか使わないため、
  // クランプを非対称（-0.28〜+0.57）にして可動範囲（限界-73.7%〜-26.3%）を広く使う。
  // SPは人物が写真の下寄りに来るよう基準を深め・可動幅は控えめにする
  // （横位置はCSSの object-position で右寄せ済み）。
  try {
    var band = document.querySelector('.band');
    var bandImg = document.querySelector('.band__img');
    if (reduced) {
      console.info('[parallax] prefers-reduced-motion が有効のため停止中（OSのアニメーション効果設定）');
    } else if (!band || !bandImg) {
      console.warn('[parallax] .band / .band__img が見つかりません');
    } else {
      var spMQ = window.matchMedia('(max-width: 767px)');
      var parallax = function () {
        var r = band.getBoundingClientRect();
        var vh = window.innerHeight;
        // 画面外でも計算する（早期returnすると画面に入る瞬間に値が飛んでカクつく）。
        // バンド中心が画面中心にある時0、上下に離れるほど±0.5に近づく
        var progress = (r.top + r.height / 2 - vh / 2) / (vh + r.height);
        // 非対称クランプ（これ以上動かすと画像の端がバンドから外れて隙間が出る）
        progress = Math.max(-0.28, Math.min(0.57, progress));
        var base = spMQ.matches ? -70 : -58;
        var amp  = spMQ.matches ? 12 : 55;
        bandImg.style.transform = 'translateY(' + (base + progress * amp).toFixed(2) + '%)';
      };
      window.addEventListener('scroll', parallax, { passive: true });
      // 内側のコンテナがスクロールする環境でも拾えるよう、キャプチャでも監視
      document.addEventListener('scroll', parallax, true);
      window.addEventListener('resize', parallax);
      window.addEventListener('load', parallax);
      parallax();
    }
  } catch (e) { console.error('[parallax]', e); }

  // ---- SPメニュー開閉 ----
  try {
    var menuBtn = document.querySelector('.fv__menu');
    var spmenu = document.querySelector('.spmenu');
    if (menuBtn && spmenu) {
      var closeMenu = function () {
        spmenu.classList.remove('is-open');
        spmenu.setAttribute('aria-hidden', 'true');
      };
      menuBtn.addEventListener('click', function () {
        spmenu.classList.add('is-open');
        spmenu.setAttribute('aria-hidden', 'false');
      });
      var closeBtn = spmenu.querySelector('.spmenu__close');
      if (closeBtn) closeBtn.addEventListener('click', closeMenu);
      spmenu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
    }
  } catch (e) { console.error('[spmenu]', e); }

  // ---- FAQアコーディオン（＋/−自動切替） ----
  try {
    document.querySelectorAll('.faq__item').forEach(function (item) {
      var dt = item.querySelector('dt');
      var toggle = item.querySelector('.faq__toggle');
      function sync() { if (toggle) toggle.textContent = item.classList.contains('is-open') ? '−' : '＋'; }
      sync();
      if (dt) {
        dt.addEventListener('click', function () {
          item.classList.toggle('is-open');
          sync();
        });
      }
    });
  } catch (e) { console.error('[faq]', e); }

  // ---- スクロールリビール ----
  try {
    var targets = document.querySelectorAll(
      '.nayami__panel, .whyline__card, .story__wrap, .price__card, .hikaku__table, .flow__step, .option__table, .igai__card, .voice__card'
    );
    if (!reduced && 'IntersectionObserver' in window) {
      targets.forEach(function (el) { el.classList.add('js-reveal'); });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.15 });
      targets.forEach(function (el) { io.observe(el); });
    }
  } catch (e) { console.error('[reveal]', e); }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initOfficeCleaningLp);
} else {
  initOfficeCleaningLp();
}
