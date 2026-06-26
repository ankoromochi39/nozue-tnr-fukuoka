/*
 * のずえんち 保護猫支援ページ v3
 * Theme: "ポップかわいい猫ラブ" — Mobile-First Kawaii Pop
 * 場所: 福岡県
 * Colors: Orange primary, Sunny Yellow, Mint Green, warm white bg
 * Fonts: M PLUS Rounded 1c (all text) — rounded & cute gothic
 * Layout: Mobile-first, single column, photo-heavy
 */

import { useEffect, useRef, useState } from "react";

// ── Asset URLs ──
const PROFILE_ICON  = "/manus-storage/cat-icon-cropped_71823e1a.jpg";   // 黒白猫アイコン
const CAT_TABBY     = "/manus-storage/cat1-tabby_e53711c8.jpg";          // キジトラ子猫（バスタブ）
const CAT_WHITE     = "/manus-storage/cat2-white-blue_7d2edb32.jpg";     // 白猫（青い目・外）
const CAT_FLUFFY    = "/manus-storage/cat3-fluffy_485f2c8f.jpg";         // もふもふ子猫（ケージ）
const CAT_KITTENS   = "/manus-storage/cat4-kittens_4f3810ed.jpg";        // 子猫たち（段ボール）
const CAT_NEW1      = "/manus-storage/cat-new1_9f17cbd4.jpg";            // キジトラ立ち姿
const CAT_NEW2      = "/manus-storage/cat-new2_a19b2be6.jpg";            // 子猫4匹トイレ
const CAT_NEW4      = "/manus-storage/cat-new4_ac10b6c2.jpg";            // キジトラ丸まり
const CAT_NEW5      = "/manus-storage/cat-new5_93c2636e.jpg";            // グレー白猫立ち
const CAT_NEW6      = "/manus-storage/cat-new6_a0ce4585.jpg";            // グレー白猫2
const CAT_SLEEPING  = "/manus-storage/cat-sleeping_59a8ed07.jpg";        // 幸せそうに寝てる
const CAT_RESCUE1   = "/manus-storage/cat-rescue1_14edf6f2.jpg";         // 白猫（保護前）
const CAT_RESCUE2   = "/manus-storage/cat-rescue2_1d7c4153.jpg";         // 白猫（日向ぼっこ）
const CAT_VIDEO     = "/manus-storage/cats-video_dcfef93a.mp4";
const CAT_VIDEO2    = "/manus-storage/cat-video2_a5a3194e.mp4";

const PAYPAY_ID  = "nozuenchi";
const PAYPAY_URL = "https://qr.paypay.ne.jp/p2p01_LiCyVOXNFDY4HhDR";
const AMAZON_URL = "https://www.amazon.jp/hz/wishlist/ls/232W7EZA4H3Q1?ref_=wl_share";
const INSTAGRAM_URL = "https://www.instagram.com/nozue.tnr";
const PAYPAY_QR  = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(PAYPAY_URL)}&bgcolor=FFF8F0&color=C2522A&margin=14`;

// ── Intersection Observer hook ──
function useFadeInUp() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Fade({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useFadeInUp();
  return <div ref={ref} className={`fade-in-up ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

// ── Paw print SVG ──
function Paw({ className = "", color = "currentColor", style }: { className?: string; color?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill={color} style={style}>
      <ellipse cx="20" cy="26" rx="8" ry="7" />
      <ellipse cx="10" cy="18" rx="4" ry="3.5" />
      <ellipse cx="30" cy="18" rx="4" ry="3.5" />
      <ellipse cx="14" cy="11" rx="3.5" ry="3" />
      <ellipse cx="26" cy="11" rx="3.5" ry="3" />
    </svg>
  );
}

// ── Heart SVG ──
function Heart({ className = "", color = "currentColor", style }: { className?: string; color?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={color} style={style}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  );
}

// ── Photo Collage Hero ──
function HeroCollage() {
  return (
    <div className="relative w-full" style={{ height: "72vw", maxHeight: 340, minHeight: 220 }}>
      {/* 大きめメイン写真（左上） */}
      <div className="absolute rounded-2xl overflow-hidden border-4 border-white shadow-lg"
        style={{ top: 0, left: 0, width: "58%", height: "62%", zIndex: 3 }}>
        <img src={CAT_NEW1} alt="保護猫" className="w-full h-full object-cover" />
      </div>
      {/* 右上 */}
      <div className="absolute rounded-2xl overflow-hidden border-4 border-white shadow-lg"
        style={{ top: 0, right: 0, width: "40%", height: "48%", zIndex: 3 }}>
        <img src={CAT_SLEEPING} alt="保護猫" className="w-full h-full object-cover" />
      </div>
      {/* 左下 */}
      <div className="absolute rounded-2xl overflow-hidden border-4 border-white shadow-lg"
        style={{ bottom: 0, left: 0, width: "36%", height: "46%", zIndex: 3 }}>
        <img src={CAT_NEW5} alt="保護猫" className="w-full h-full object-cover" />
      </div>
      {/* 中央下 */}
      <div className="absolute rounded-2xl overflow-hidden border-4 border-white shadow-lg"
        style={{ bottom: 0, left: "38%", width: "34%", height: "46%", zIndex: 3 }}>
        <img src={CAT_NEW2} alt="保護猫" className="w-full h-full object-cover" />
      </div>
      {/* 右下 */}
      <div className="absolute rounded-2xl overflow-hidden border-4 border-white shadow-lg"
        style={{ bottom: 0, right: 0, width: "26%", height: "54%", zIndex: 3 }}>
        <img src={CAT_FLUFFY} alt="保護猫" className="w-full h-full object-cover" />
      </div>
      {/* 肉球デコ */}
      <Paw className="absolute w-8 h-8 opacity-40" style={{ top: "30%", left: "60%", zIndex: 4, color: "oklch(0.68 0.17 42)" }} />
      <Heart className="absolute w-6 h-6" style={{ top: "50%", right: "42%", zIndex: 4, color: "oklch(0.75 0.14 80)", opacity: 0.7 }} />
    </div>
  );
}

// ── Photo Grid ──
const ALL_PHOTOS = [
  { src: CAT_NEW1,     label: "キジトラちゃん" },
  { src: CAT_NEW2,     label: "子猫たち" },
  { src: CAT_NEW4,     label: "まるまりちゃん" },
  { src: CAT_NEW5,     label: "グレーちゃん" },
  { src: CAT_NEW6,     label: "グレー白ちゃん" },
  { src: CAT_SLEEPING, label: "仲良しねんね" },
  { src: CAT_FLUFFY,   label: "もふもふちゃん" },
  { src: CAT_WHITE,    label: "白猫ちゃん" },
  { src: CAT_TABBY,    label: "キジトラ子猫" },
  { src: CAT_KITTENS,  label: "子猫兄弟" },
  { src: CAT_RESCUE1,  label: "保護前の白猫" },
  { src: CAT_RESCUE2,  label: "日向ぼっこ" },
];

export default function Home() {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const visiblePhotos = showAllPhotos ? ALL_PHOTOS : ALL_PHOTOS.slice(0, 6);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "oklch(0.985 0.010 60)", fontFamily: "'M PLUS Rounded 1c', 'Noto Sans JP', sans-serif" }}>

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3"
        style={{ background: "oklch(0.985 0.010 60 / 0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid oklch(0.68 0.17 42 / 0.12)" }}>
        <div className="flex items-center gap-2">
          <img src={PROFILE_ICON} alt="のずえんち" className="w-9 h-9 rounded-full object-cover border-2"
            style={{ borderColor: "oklch(0.68 0.17 42)" }} />
          <div>
            <div className="font-bold text-sm leading-none" style={{ color: "oklch(0.22 0.03 55)" }}>のずえんち</div>
            <div className="text-xs" style={{ color: "oklch(0.68 0.17 42)" }}>🐾 福岡県 TNR保護猫活動</div>
          </div>
        </div>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-xs"
          style={{ background: "oklch(0.68 0.17 42)", color: "white" }}>
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          フォロー
        </a>
      </header>

      {/* ── HERO ── */}
      <section className="px-4 pt-6 pb-4">
        <Fade>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-3"
            style={{ background: "oklch(0.68 0.17 42 / 0.12)", color: "oklch(0.52 0.17 42)" }}>
            <Paw className="w-3.5 h-3.5" color="oklch(0.68 0.17 42)" />
            福岡県 保護猫活動
          </div>
          <h1 className="text-3xl font-black leading-tight mb-2" style={{ color: "oklch(0.22 0.03 55)" }}>
            保護猫たちに、<br />
            <span style={{ color: "oklch(0.68 0.17 42)" }}>あたたかい</span><br />
            家族を 🐾
          </h1>
          <p className="text-sm leading-relaxed mb-5" style={{ color: "oklch(0.45 0.025 60)" }}>
            人間(4) 犬(1) 猫(10) の大家族母ちゃんが<br />
            TNR活動（猫保護 → 去勢 → 譲渡）をしています。<br />
            一緒に猫の命を救いませんか？
          </p>
        </Fade>

        {/* コラージュ写真 */}
        <Fade delay={100}>
          <HeroCollage />
        </Fade>

        {/* CTAボタン */}
        <Fade delay={200}>
          <div className="flex flex-col gap-3 mt-5">
            <a href="#paypay" className="btn-support-paypay flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-lg"
              style={{ background: "oklch(0.68 0.17 42)", color: "white" }}>
              💝 PayPayで支援する <span className="arrow-bounce">→</span>
            </a>
            <a href="#amazon" className="btn-support-amazon flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-lg"
              style={{ background: "oklch(0.80 0.14 80)", color: "white" }}>
              📦 物資を支援する <span className="arrow-bounce">→</span>
            </a>
            <a href="#bank" className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-base border-2"
              style={{ borderColor: "oklch(0.68 0.17 42)", color: "oklch(0.68 0.17 42)", background: "white" }}>
              🏦 銀行振込で支援する
            </a>
          </div>
        </Fade>
      </section>

      {/* ── PHOTO GALLERY ── */}
      <section className="px-4 py-6">
        <Fade>
          <div className="flex items-center gap-2 mb-4">
            <Paw className="w-5 h-5" color="oklch(0.68 0.17 42)" />
            <h2 className="text-xl font-black" style={{ color: "oklch(0.22 0.03 55)" }}>保護猫たちを紹介するにゃ🐱</h2>
          </div>
          <p className="text-sm mb-4" style={{ color: "oklch(0.55 0.02 60)" }}>福岡県で保護した子たちです。みんな里親を待っています！</p>
        </Fade>
        <div className="grid grid-cols-2 gap-2.5">
          {visiblePhotos.map((photo, i) => (
            <Fade key={photo.src} delay={i * 40}>
              <div className="relative rounded-2xl overflow-hidden aspect-square shadow-sm border-2 border-white">
                <img src={photo.src} alt={photo.label} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 text-xs font-bold text-white text-center"
                  style={{ background: "linear-gradient(to top, oklch(0.22 0.03 55 / 0.7), transparent)" }}>
                  {photo.label}
                </div>
              </div>
            </Fade>
          ))}
        </div>
        {!showAllPhotos && (
          <Fade delay={300}>
            <button onClick={() => setShowAllPhotos(true)}
              className="w-full mt-4 py-3 rounded-2xl font-bold text-sm border-2"
              style={{ borderColor: "oklch(0.68 0.17 42 / 0.4)", color: "oklch(0.68 0.17 42)", background: "oklch(0.68 0.17 42 / 0.06)" }}>
              もっと見る 🐾 ({ALL_PHOTOS.length - 6}匹)
            </button>
          </Fade>
        )}
      </section>

      {/* ── VIDEOS ── */}
      <section className="px-4 py-4">
        <Fade>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🎥</span>
            <h2 className="text-xl font-black" style={{ color: "oklch(0.22 0.03 55)" }}>活動の様子</h2>
          </div>
        </Fade>
        <div className="flex flex-col gap-4">
          <Fade delay={50}>
            <div className="rounded-2xl overflow-hidden shadow-sm border-2 border-white">
              <video src={CAT_VIDEO2} controls playsInline className="w-full" style={{ maxHeight: 320, objectFit: "cover" }} />
              <div className="px-3 py-2 text-sm font-bold" style={{ background: "oklch(0.68 0.17 42 / 0.08)", color: "oklch(0.42 0.03 55)" }}>
                なでなで気持ちよさそう🐾
              </div>
            </div>
          </Fade>
          <Fade delay={100}>
            <div className="rounded-2xl overflow-hidden shadow-sm border-2 border-white">
              <video src={CAT_VIDEO} controls playsInline className="w-full" style={{ maxHeight: 320, objectFit: "cover" }} />
              <div className="px-3 py-2 text-sm font-bold" style={{ background: "oklch(0.68 0.17 42 / 0.08)", color: "oklch(0.42 0.03 55)" }}>
                保護した子たちの記録🐱
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── TNR説明 ── */}
      <section className="mx-4 my-4 p-5 rounded-3xl" style={{ background: "oklch(0.68 0.17 42 / 0.08)", border: "2px solid oklch(0.68 0.17 42 / 0.15)" }}>
        <Fade>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🐾</span>
            <h2 className="text-lg font-black" style={{ color: "oklch(0.22 0.03 55)" }}>TNR活動ってなに？</h2>
          </div>
          <div className="flex gap-3">
            {[
              { icon: "🏠", title: "Trap（保護）", desc: "外で暮らす猫を安全に保護" },
              { icon: "✂️", title: "Neuter（去勢）", desc: "手術で猫の数を適正に" },
              { icon: "💕", title: "Return（譲渡）", desc: "新しい家族のもとへ" },
            ].map((item) => (
              <div key={item.title} className="flex-1 text-center">
                <div className="text-2xl mb-1">{item.icon}</div>
                <div className="text-xs font-black mb-0.5" style={{ color: "oklch(0.52 0.17 42)" }}>{item.title}</div>
                <div className="text-xs" style={{ color: "oklch(0.50 0.02 60)" }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </Fade>
      </section>

      {/* ── PAYPAY ── */}
      <section id="paypay" className="px-4 py-6">
        <Fade>
          <div className="p-5 rounded-3xl" style={{ background: "white", border: "3px solid oklch(0.68 0.17 42 / 0.25)", boxShadow: "0 4px 24px oklch(0.68 0.17 42 / 0.12)" }}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-3"
              style={{ background: "oklch(0.68 0.17 42 / 0.12)", color: "oklch(0.52 0.17 42)" }}>
              💝 金銭的な支援
            </div>
            <h2 className="text-2xl font-black mb-2" style={{ color: "oklch(0.22 0.03 55)" }}>
              PayPayで<br />送金支援💕
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "oklch(0.45 0.025 60)" }}>
              いただいたご支援は、保護猫たちの医療費・フード代・去勢手術費用などに大切に使わせていただきます。
              <strong style={{ color: "oklch(0.68 0.17 42)" }}>100円からでも大変助かります！</strong>
            </p>
            {/* QRコード */}
            <div className="flex flex-col items-center gap-3 mb-4 p-4 rounded-2xl" style={{ background: "oklch(0.985 0.010 60)" }}>
              <img src={PAYPAY_QR} alt="PayPay QRコード" className="w-44 h-44 rounded-xl" />
              <p className="text-xs font-bold" style={{ color: "oklch(0.55 0.02 60)" }}>QRコードをスキャン📱</p>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: "oklch(0.68 0.17 42 / 0.08)" }}>
                <span className="text-xs font-bold" style={{ color: "oklch(0.55 0.025 60)" }}>PayPay ID</span>
                <span className="text-lg font-black" style={{ color: "oklch(0.50 0.17 42)" }}>{PAYPAY_ID}</span>
              </div>
            </div>
            <a href={PAYPAY_URL} target="_blank" rel="noopener noreferrer"
              className="btn-support-paypay flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-lg w-full"
              style={{ background: "oklch(0.68 0.17 42)", color: "white" }}>
              💝 PayPayアプリで開く <span className="arrow-bounce">→</span>
            </a>
            <div className="grid grid-cols-2 gap-2 mt-3">
              {["🏥 医療費・手術費", "🍚 フード・おやつ", "🏠 保護環境整備", "💕 譲渡活動費"].map(item => (
                <div key={item} className="text-xs px-3 py-2 rounded-xl text-center"
                  style={{ background: "oklch(0.68 0.17 42 / 0.07)", color: "oklch(0.42 0.025 60)" }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Fade>
      </section>

      {/* ── AMAZON ── */}
      <section id="amazon" className="px-4 pb-6">
        <Fade>
          <div className="p-5 rounded-3xl" style={{ background: "white", border: "3px solid oklch(0.80 0.14 80 / 0.35)", boxShadow: "0 4px 24px oklch(0.80 0.14 80 / 0.12)" }}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-3"
              style={{ background: "oklch(0.80 0.14 80 / 0.15)", color: "oklch(0.50 0.14 80)" }}>
              📦 物資の支援
            </div>
            <h2 className="text-2xl font-black mb-2" style={{ color: "oklch(0.22 0.03 55)" }}>
              Amazonから<br />物資を支援📦
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "oklch(0.45 0.025 60)" }}>
              猫砂・フード・ウェットフード・医療用品など、日々の活動に必要なものをリストにまとめています。
              <strong style={{ color: "oklch(0.55 0.14 80)" }}>直接自宅に届けていただける</strong>物資支援も大変助かります！
            </p>
            {/* 猫写真 */}
            <div className="grid grid-cols-3 gap-1.5 mb-4 rounded-2xl overflow-hidden">
              <img src={CAT_NEW4} alt="保護猫" className="w-full aspect-square object-cover" />
              <img src={CAT_NEW6} alt="保護猫" className="w-full aspect-square object-cover" />
              <img src={CAT_RESCUE2} alt="保護猫" className="w-full aspect-square object-cover" />
            </div>
            <a href={AMAZON_URL} target="_blank" rel="noopener noreferrer"
              className="btn-support-amazon flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-lg w-full mb-3"
              style={{ background: "oklch(0.80 0.14 80)", color: "white" }}>
              📦 ほしいものリストを見る <span className="arrow-bounce">→</span>
            </a>
            <div className="flex flex-col gap-1.5">
              {["🍚 キャットフード・おやつ", "🧹 猫砂・トイレ用品", "💊 医療用品・サプリメント", "🏠 ケージ・キャリーバッグ"].map(item => (
                <div key={item} className="text-xs px-3 py-2 rounded-xl"
                  style={{ background: "oklch(0.80 0.14 80 / 0.08)", color: "oklch(0.42 0.025 60)" }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Fade>
      </section>

      {/* ── 銀行振込 ── */}
      <section id="bank" className="px-4 pb-6">
        <Fade>
          <div className="p-5 rounded-3xl" style={{ background: "white", border: "3px solid oklch(0.55 0.10 240 / 0.25)", boxShadow: "0 4px 24px oklch(0.55 0.10 240 / 0.10)" }}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-3"
              style={{ background: "oklch(0.55 0.10 240 / 0.10)", color: "oklch(0.40 0.10 240)" }}>
              🏦 銀行振込
            </div>
            <h2 className="text-2xl font-black mb-2" style={{ color: "oklch(0.22 0.03 55)" }}>
              銀行振込で<br />支援する🏦
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "oklch(0.45 0.025 60)" }}>
              銀行振込でのご支援も大歓迎です。いただいたご支援は保護猫たちのために大切に使わせていただきます。
            </p>
            <div className="rounded-2xl p-4 space-y-2.5" style={{ background: "oklch(0.55 0.10 240 / 0.06)", border: "1.5px solid oklch(0.55 0.10 240 / 0.18)" }}>
              {[
                { label: "銀行名", value: "西日本シティ銀行" },
                { label: "支店名", value: "東久留米支店" },
                { label: "口座種別", value: "普通" },
                { label: "口座番号", value: "3167305" },
                { label: "口座名義", value: "ｲｳﾗ ﾕｲ" },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-xs font-bold" style={{ color: "oklch(0.55 0.025 60)" }}>{item.label}</span>
                  <span className="text-sm font-black" style={{ color: "oklch(0.22 0.03 55)" }}>{item.value}</span>
                </div>
              ))}
            </div>
            <p className="text-xs mt-3 text-center" style={{ color: "oklch(0.60 0.025 60)" }}>
              ※ 振込手数料はご負担をお願いしております
            </p>
          </div>
        </Fade>
      </section>

      {/* ── INSTAGRAM ── */}
      <section className="px-4 pb-6">
        <Fade>
          <div className="p-5 rounded-3xl text-center"
            style={{ background: "linear-gradient(135deg, oklch(0.75 0.12 30), oklch(0.65 0.18 340), oklch(0.55 0.18 280))", color: "white" }}>
            <div className="text-3xl mb-2">📸</div>
            <h2 className="text-xl font-black mb-2">日々の活動はInstagramで！</h2>
            <p className="text-sm mb-4 opacity-90">
              保護猫たちの成長記録、活動の様子、里親募集情報など毎日更新しています。フォローして応援してください！
            </p>
            {/* 写真グリッド */}
            <div className="grid grid-cols-4 gap-1.5 mb-4 rounded-xl overflow-hidden">
              {[CAT_TABBY, CAT_WHITE, CAT_NEW1, CAT_SLEEPING].map((src, i) => (
                <img key={i} src={src} alt="Instagram" className="w-full aspect-square object-cover" />
              ))}
            </div>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-black text-base"
              style={{ background: "white", color: "oklch(0.45 0.15 330)" }}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @nozue.tnr をフォロー
            </a>
          </div>
        </Fade>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-4 py-8 text-center" style={{ background: "oklch(0.22 0.03 55)", color: "white" }}>
        <div className="flex justify-center gap-1 mb-2">
          {[0,1,2].map(i => <Paw key={i} className="w-5 h-5 opacity-60" color="oklch(0.68 0.17 42)" />)}
        </div>
        <div className="font-black text-base mb-1">のずえんち</div>
        <div className="text-xs opacity-60 mb-4">福岡県 TNR保護猫活動</div>
        <div className="flex justify-center gap-4 text-xs opacity-70">
          <a href="#paypay" style={{ color: "oklch(0.88 0.12 90)" }}>PayPay支援</a>
          <a href="#amazon" style={{ color: "oklch(0.88 0.12 90)" }}>物資支援</a>
          <a href="#bank" style={{ color: "oklch(0.88 0.12 90)" }}>銀行振込</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" style={{ color: "oklch(0.88 0.12 90)" }}>Instagram</a>
        </div>
        <div className="text-xs opacity-40 mt-4">© 2025 のずえんち All rights reserved.</div>
      </footer>

    </div>
  );
}
