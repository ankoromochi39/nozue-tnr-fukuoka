/**
 * のずえんち 保護猫支援ページ v2
 * Theme: "ポップかわいい猫ラブ" — Kawaii Pop / Cat Lover Zine
 * 場所: 福岡県
 * Colors: Coral Pink primary, Sunny Yellow, Mint Green, warm white bg
 * Fonts: M PLUS Rounded 1c (all text) — rounded & cute gothic
 * Photos: Real rescue cat photos from user
 */

import { useEffect, useRef } from "react";

// ── Asset URLs ──
const LOGO_CAT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663786704229/LNrDcQhMB6DebqMoECxQSy/logo-cat-68vFAzdm4iGge5t42quVHf.webp";
const PROFILE_ICON = "/manus-storage/cat-icon-cropped_71823e1a.jpg";   // 黒白猫 — プロフィールアイコン（クロップ済み）
const CAT_TABBY    = "/manus-storage/cat1-tabby_e53711c8.jpg";          // キジトラ子猫
const CAT_WHITE    = "/manus-storage/cat2-white-blue_7d2edb32.jpg";     // 白猫（青い目）
const CAT_FLUFFY   = "/manus-storage/cat3-fluffy_485f2c8f.jpg";         // もふもふ子猫
const CAT_KITTENS  = "/manus-storage/cat4-kittens_4f3810ed.jpg";        // 子猫たち
const CAT_VIDEO    = "/manus-storage/cats-video_dcfef93a.mp4";

const PAYPAY_ID  = "nozuenchi";
const AMAZON_URL = "https://www.amazon.co.jp/hz/wishlist/ls/232W7EZA4";
const INSTAGRAM_URL = "https://www.instagram.com/nozue.tnr";
const PAYPAY_QR  = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=https://qr.paypay.ne.jp/p2p01_${PAYPAY_ID}&bgcolor=FFF0F3&color=C2522A&margin=14`;

// ── Intersection Observer hook ──
function useFadeInUp() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Fade({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useFadeInUp();
  return <div ref={ref} className={`fade-in-up ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

// ── Decorative bubble shape ──
function Bubble({ color, size, className = "" }: { color: string; size: number; className?: string }) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{ width: size, height: size, background: color, opacity: 0.18 }}
    />
  );
}

// ── Paw print SVG ──
function Paw({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill={color}>
      <ellipse cx="20" cy="26" rx="8" ry="7" />
      <ellipse cx="10" cy="18" rx="4" ry="3.5" />
      <ellipse cx="30" cy="18" rx="4" ry="3.5" />
      <ellipse cx="14" cy="11" rx="3.5" ry="3" />
      <ellipse cx="26" cy="11" rx="3.5" ry="3" />
    </svg>
  );
}

// ── Heart SVG ──
function Heart({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={color}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  );
}

// ── Star SVG ──
function Star({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "oklch(0.985 0.010 60)" }}>

      {/* ── HEADER ── */}
      <header className="fixed top-0 left-0 right-0 z-50" id="site-header">
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <img src={PROFILE_ICON} alt="のずえんち" className="w-10 h-10 rounded-full object-cover border-2" style={{ borderColor: "oklch(0.68 0.17 42)" }} />
            <div>
              <span className="font-bold text-base leading-none block" style={{ color: "oklch(0.22 0.03 55)" }}>
                のずえんち
              </span>
              <span className="text-[10px] font-medium tracking-wide block" style={{ color: "oklch(0.68 0.17 42)" }}>
                🐾 福岡県 TNR保護猫活動
              </span>
            </div>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-press flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-full"
            style={{ background: "oklch(0.68 0.17 42)", color: "white", boxShadow: "0 3px 12px oklch(0.68 0.16 15 / 0.35)" }}
          >
            <InstagramIcon className="w-4 h-4" />
            <span className="hidden sm:inline">フォローする</span>
          </a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-10">
        {/* Colorful background bubbles */}
        <Bubble color="oklch(0.68 0.17 42)" size={400} className="-top-20 -right-20" />
        <Bubble color="oklch(0.88 0.12 90)" size={300} className="top-1/3 -left-24" />
        <Bubble color="oklch(0.82 0.10 165)" size={250} className="bottom-10 right-10" />

        <div className="container relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left: text */}
          <div className="flex-1 text-center lg:text-left">
            <Fade>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-5"
                style={{ background: "oklch(0.68 0.16 15 / 0.12)", color: "oklch(0.52 0.17 42)" }}>
                <Paw className="w-4 h-4" color="oklch(0.68 0.17 42)" />
                福岡県 保護猫活動
              </div>
            </Fade>
            <Fade delay={80}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5"
                style={{ color: "oklch(0.20 0.04 55)" }}>
                保護猫たちに、<br />
                <span style={{ color: "oklch(0.62 0.17 42)" }}>あたたかい</span><br />
                家族を🐾
              </h1>
            </Fade>
            <Fade delay={160}>
              <p className="text-base sm:text-lg leading-relaxed mb-8" style={{ color: "oklch(0.42 0.025 60)" }}>
                人間(4) 犬(1) 猫(10) の大家族母ちゃんが<br />
                TNR活動（猫保護 → 去勢 → 譲渡）をしています。<br />
                一緒に猫の命を救いませんか？
              </p>
            </Fade>
            <Fade delay={240}>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <a href="#paypay"
                  className="btn-hero-paypay inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg"
                  style={{ background: "oklch(0.68 0.17 42)", color: "white" }}>
                  💝 PayPayで支援する
                  <span className="arrow-bounce">→</span>
                </a>
                <a href="#amazon"
                  className="btn-support-amazon inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg"
                  style={{ background: "oklch(0.80 0.14 80)", color: "white" }}>
                  📦 物資を支援する
                  <span className="arrow-bounce">→</span>
                </a>
              </div>
            </Fade>
          </div>

          {/* Right: profile photo + floating cat photos */}
          <div className="flex-shrink-0 relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96" style={{ isolation: "isolate" }}>
            {/* Main profile circle */}
            <Fade delay={100}>
              <div className="w-full h-full rounded-full overflow-hidden border-4 relative z-10"
                style={{ borderColor: "oklch(0.68 0.17 42)", boxShadow: "0 0 0 8px oklch(0.68 0.16 15 / 0.15), 0 20px 60px oklch(0.68 0.16 15 / 0.25)" }}>
                <img src={PROFILE_ICON} alt="のずえんち 黒白猫" className="w-full h-full object-cover" />
              </div>
            </Fade>
            {/* Floating mini photos */}
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl overflow-hidden border-3 rotate-6 shadow-lg"
              style={{ border: "3px solid white", boxShadow: "0 8px 20px oklch(0 0 0 / 0.15)" }}>
              <img src={CAT_FLUFFY} alt="もふもふ子猫" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-2xl overflow-hidden border-3 -rotate-6 shadow-lg"
              style={{ border: "3px solid white", boxShadow: "0 8px 20px oklch(0 0 0 / 0.15)" }}>
              <img src={CAT_WHITE} alt="白猫" className="w-full h-full object-cover" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-2 left-8 text-2xl animate-bounce" style={{ animationDuration: "2s" }}>🐾</div>
            <div className="absolute bottom-4 -right-6 text-2xl animate-bounce" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}>💕</div>
          </div>
        </div>
      </section>

      {/* ── CATS GALLERY ── */}
      <section className="py-16 relative overflow-hidden" style={{ background: "white" }}>
        <Bubble color="oklch(0.82 0.10 165)" size={200} className="-top-10 -left-10" />
        <div className="container relative z-10">
          <Fade>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-2" style={{ color: "oklch(0.22 0.03 55)" }}>
                保護猫たちを紹介するにゃ🐱
              </h2>
              <p className="text-sm" style={{ color: "oklch(0.55 0.02 60)" }}>
                福岡県で保護した子たちです。みんな里親さんを待っています！
              </p>
            </div>
          </Fade>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: CAT_TABBY,   label: "キジトラちゃん",   emoji: "🐾", color: "oklch(0.68 0.17 42)" },
              { src: CAT_WHITE,   label: "白猫ちゃん",       emoji: "💙", color: "oklch(0.65 0.12 220)" },
              { src: CAT_FLUFFY,  label: "もふもふちゃん",   emoji: "✨", color: "oklch(0.68 0.12 60)" },
              { src: CAT_KITTENS, label: "子猫たち",         emoji: "💕", color: "oklch(0.68 0.17 42)" },
            ].map((cat, i) => (
              <Fade key={cat.label} delay={i * 80}>
                <div className="pop-card rounded-3xl overflow-hidden"
                  style={{ boxShadow: "0 4px 20px oklch(0 0 0 / 0.08)", border: "2px solid oklch(0.92 0.02 15)" }}>
                  <div className="aspect-square overflow-hidden">
                    <img src={cat.src} alt={cat.label} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                  </div>
                  <div className="p-3 text-center" style={{ background: "white" }}>
                    <span className="text-sm font-bold" style={{ color: cat.color }}>
                      {cat.emoji} {cat.label}
                    </span>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEO SECTION ── */}
      <section className="py-16 relative overflow-hidden"
        style={{ background: "oklch(0.92 0.08 165 / 0.25)" }}>
        <Bubble color="oklch(0.68 0.17 42)" size={180} className="-bottom-10 -right-10" />
        <div className="container relative z-10">
          <Fade>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2" style={{ color: "oklch(0.22 0.03 55)" }}>
                活動の様子🎥
              </h2>
              <p className="text-sm" style={{ color: "oklch(0.45 0.04 120)" }}>
                保護した子たちの日常をご覧ください
              </p>
            </div>
          </Fade>
          <Fade delay={100}>
            <div className="max-w-2xl mx-auto rounded-3xl overflow-hidden"
              style={{ boxShadow: "0 12px 40px oklch(0.68 0.16 15 / 0.2)", border: "3px solid white" }}>
              <video
                src={CAT_VIDEO}
                autoPlay
                muted
                loop
                playsInline
                className="w-full"
                style={{ display: "block" }}
              />
            </div>
          </Fade>
        </div>
      </section>

      {/* ── ABOUT TNR ── */}
      <section className="py-16 relative overflow-hidden" style={{ background: "white" }}>
        <div className="container relative z-10">
          <Fade>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-2" style={{ color: "oklch(0.22 0.03 55)" }}>
                TNR活動ってなに？🐱
              </h2>
            </div>
          </Fade>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "T", label: "Trap（保護）", desc: "外で暮らす猫を保護し、安全な環境で一時的に預かります。", color: "oklch(0.68 0.17 42)", bg: "oklch(0.68 0.16 15 / 0.08)", emoji: "🏠" },
              { step: "N", label: "Neuter（去勢）", desc: "不妊・去勢手術を行い、猫の数を適切に管理します。", color: "oklch(0.65 0.12 220)", bg: "oklch(0.65 0.12 220 / 0.08)", emoji: "✂️" },
              { step: "R", label: "Return/里親（譲渡）", desc: "里親さんを探し、猫たちに新しい家族と幸せな生活を。", color: "oklch(0.55 0.10 145)", bg: "oklch(0.55 0.10 145 / 0.08)", emoji: "💕" },
            ].map((item, i) => (
              <Fade key={item.step} delay={i * 100}>
                <div className="pop-card p-7 rounded-3xl text-center"
                  style={{ background: item.bg, border: `2px solid ${item.color}30` }}>
                  <div className="text-4xl mb-3">{item.emoji}</div>
                  <div className="text-5xl font-bold mb-2" style={{ color: item.color }}>
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: "oklch(0.22 0.03 55)" }}>{item.label}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "oklch(0.48 0.025 60)" }}>{item.desc}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUPPORT HEADER ── */}
      <section className="py-12 relative overflow-hidden"
        style={{ background: "oklch(0.68 0.17 42)" }}>
        <Bubble color="white" size={300} className="-top-20 -right-20" />
        <Bubble color="oklch(0.88 0.12 90)" size={200} className="bottom-0 left-10" />
        <div className="container relative z-10 text-center">
          <Fade>
            <div className="flex justify-center gap-2 mb-3">
              {[0,1,2].map(i => <Paw key={i} className="w-7 h-7" color="white" />)}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "white" }}>
              保護猫たちを応援してね！
            </h2>
            <p className="text-base" style={{ color: "oklch(1 0 0 / 0.85)" }}>
              金銭的な支援も、物資の支援も、どちらも猫たちの命につながります💕
            </p>
          </Fade>
        </div>
      </section>

      {/* ── PAYPAY ── */}
      <section id="paypay" className="py-20 relative overflow-hidden" style={{ background: "white" }}>
        <Bubble color="oklch(0.68 0.17 42)" size={250} className="-top-16 -left-16" />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <Fade>
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-4"
                  style={{ background: "oklch(0.68 0.16 15 / 0.1)", color: "oklch(0.52 0.17 42)" }}>
                  💝 金銭的な支援
                </div>
                <h2 className="text-3xl font-bold mb-4" style={{ color: "oklch(0.22 0.03 55)" }}>
                  PayPayで<br />送金支援💕
                </h2>
                <p className="text-base leading-relaxed mb-6" style={{ color: "oklch(0.45 0.025 60)" }}>
                  いただいたご支援は、保護猫たちの医療費・フード代・
                  去勢手術費用などに大切に使わせていただきます。
                  <strong style={{ color: "oklch(0.68 0.17 42)" }}>100円からでも大変助かります！</strong>
                </p>
                {/* PayPay ID */}
                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl mb-6"
                  style={{ background: "oklch(0.68 0.16 15 / 0.08)", border: "2px dashed oklch(0.68 0.16 15 / 0.4)" }}>
                  <span className="text-xs font-bold" style={{ color: "oklch(0.55 0.025 60)" }}>PayPay ID</span>
                  <span className="text-2xl font-bold" style={{ color: "oklch(0.50 0.17 42)" }}>
                    {PAYPAY_ID}
                  </span>
                </div>
                {/* What support covers */}
                <div className="grid grid-cols-2 gap-2">
                  {["🏥 医療費・手術費", "🍚 フード・おやつ", "🏠 保護環境整備", "💕 譲渡活動費"].map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm px-3 py-2 rounded-xl"
                      style={{ background: "oklch(0.68 0.16 15 / 0.06)", color: "oklch(0.42 0.025 60)" }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Fade>

            {/* QR */}
            <Fade delay={150}>
              <div className="flex flex-col items-center gap-5">
                <div className="relative p-5 rounded-3xl"
                  style={{ background: "oklch(0.985 0.010 60)", border: "3px solid oklch(0.68 0.16 15 / 0.2)", boxShadow: "0 8px 32px oklch(0.68 0.16 15 / 0.12)" }}>
                  {/* Cute corner decorations */}
                  <Heart className="absolute -top-3 -left-3 w-7 h-7" color="oklch(0.68 0.17 42)" />
                  <Heart className="absolute -top-3 -right-3 w-7 h-7" color="oklch(0.68 0.17 42)" />
                  <img src={PAYPAY_QR} alt="PayPay QRコード" className="w-52 h-52 rounded-2xl" />
                  <p className="text-xs text-center mt-3 font-bold" style={{ color: "oklch(0.55 0.02 60)" }}>
                    QRコードをスキャン📱
                  </p>
                </div>
                <p className="text-sm text-center" style={{ color: "oklch(0.55 0.02 60)" }}>
                  またはPayPay IDで検索してください
                </p>
                <a
                  href={`https://qr.paypay.ne.jp/p2p01_${PAYPAY_ID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-support-paypay inline-flex items-center gap-3 px-8 py-5 rounded-full font-bold text-xl w-full max-w-xs justify-center"
                  style={{ background: "oklch(0.68 0.17 42)", color: "white" }}>
                  💝 PayPayアプリで開く
                  <span className="arrow-bounce">→</span>
                </a>
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* ── AMAZON ── */}
      <section id="amazon" className="py-20 relative overflow-hidden"
        style={{ background: "oklch(0.92 0.10 90 / 0.2)" }}>
        <Bubble color="oklch(0.88 0.12 90)" size={250} className="-bottom-16 -right-16" />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Card */}
            <Fade delay={100} className="order-2 md:order-1">
              <div className="support-card max-w-sm mx-auto p-8 rounded-3xl flex flex-col items-center gap-5 text-center"
                style={{ background: "white", border: "3px solid oklch(0.80 0.14 80 / 0.5)", boxShadow: "0 8px 32px oklch(0.80 0.14 80 / 0.2)" }}>
                <div className="text-6xl">📦</div>
                <div>
                  <p className="font-bold text-xl mb-1" style={{ color: "oklch(0.22 0.03 55)" }}>
                    Amazonほしいものリスト
                  </p>
                  <p className="text-sm" style={{ color: "oklch(0.55 0.02 60)" }}>猫砂・フード・医療用品など</p>
                </div>
                <a
                  href={AMAZON_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-support-amazon inline-flex items-center gap-3 px-8 py-5 rounded-full font-bold text-xl w-full justify-center"
                  style={{ background: "oklch(0.80 0.14 80)", color: "white" }}>
                  📦 ほしいものリストを見る
                  <span className="arrow-bounce">→</span>
                </a>
              </div>
            </Fade>

            {/* Text */}
            <Fade className="order-1 md:order-2">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-4"
                  style={{ background: "oklch(0.75 0.14 80 / 0.12)", color: "oklch(0.55 0.14 80)" }}>
                  📦 物資の支援
                </div>
                <h2 className="text-3xl font-bold mb-4" style={{ color: "oklch(0.22 0.03 55)" }}>
                  Amazonから<br />物資を支援📦
                </h2>
                <p className="text-base leading-relaxed mb-6" style={{ color: "oklch(0.45 0.025 60)" }}>
                  猫砂・フード・ウェットフード・医療用品など、
                  日々の活動に必要なものをリストにまとめています。
                  <strong style={{ color: "oklch(0.55 0.14 80)" }}>直接自宅に届けていただける</strong>物資支援も大変助かります！
                </p>
                <div className="flex flex-col gap-2">
                  {["🍚 キャットフード・おやつ", "🧹 猫砂・トイレ用品", "💊 医療用品・サプリメント", "🏠 ケージ・キャリーバッグ"].map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm px-3 py-2 rounded-xl"
                      style={{ background: "oklch(0.75 0.14 80 / 0.08)", color: "oklch(0.42 0.025 60)" }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM ── */}
      <section className="py-20 relative overflow-hidden" style={{ background: "white" }}>
        <Bubble color="oklch(0.68 0.17 42)" size={200} className="-top-10 right-20" />
        <Bubble color="oklch(0.82 0.10 165)" size={150} className="bottom-10 -left-10" />
        <div className="container relative z-10 text-center">
          <Fade>
            <div className="max-w-lg mx-auto">
              <div className="text-5xl mb-4">📸</div>
              <h2 className="text-3xl font-bold mb-3" style={{ color: "oklch(0.22 0.03 55)" }}>
                日々の活動はInstagramで！
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "oklch(0.45 0.025 60)" }}>
                保護猫たちの成長記録、活動の様子、里親募集情報など
                毎日更新しています。フォローして応援してください！
              </p>
              {/* Mini cat photo strip */}
              <div className="flex justify-center gap-3 mb-8">
                {[CAT_TABBY, CAT_WHITE, CAT_FLUFFY, CAT_KITTENS].map((src, i) => (
                  <div key={i} className="w-14 h-14 rounded-2xl overflow-hidden border-2"
                    style={{ borderColor: "oklch(0.68 0.17 42)", transform: `rotate(${(i % 2 === 0 ? 1 : -1) * 3}deg)` }}>
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg"
                style={{
                  background: "linear-gradient(135deg, oklch(0.55 0.18 20), oklch(0.52 0.18 320), oklch(0.72 0.15 60))",
                  color: "white",
                  boxShadow: "0 8px 28px oklch(0.52 0.18 320 / 0.35)"
                }}>
                <InstagramIcon className="w-6 h-6" />
                @nozue.tnr をフォロー
              </a>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative py-12 overflow-hidden"
        style={{ background: "oklch(0.22 0.03 55)" }}>
        <Bubble color="oklch(0.68 0.17 42)" size={200} className="-bottom-10 -right-10" />
        <div className="container relative z-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src={PROFILE_ICON} alt="のずえんち" className="w-10 h-10 rounded-full object-cover border-2" style={{ borderColor: "oklch(0.68 0.17 42)" }} />
              <div>
                <span className="font-bold text-base block leading-none" style={{ color: "oklch(0.90 0.01 80)" }}>
                  のずえんち
                </span>
                <span className="text-[10px] tracking-wide block" style={{ color: "oklch(0.75 0.14 42)" }}>
                  🐾 福岡県 TNR保護猫活動
                </span>
              </div>
            </div>
            <div className="flex items-center gap-5 text-sm" style={{ color: "oklch(0.65 0.01 80)" }}>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                <InstagramIcon className="w-4 h-4" /> Instagram
              </a>
              <a href="#paypay" className="hover:opacity-80 transition-opacity">PayPay支援</a>
              <a href="#amazon" className="hover:opacity-80 transition-opacity">物資支援</a>
            </div>
          </div>
          <div className="mt-8 pt-6 text-center text-xs flex items-center justify-center gap-2"
            style={{ borderTop: "1px solid oklch(1 0 0 / 0.08)", color: "oklch(0.50 0.01 80)" }}>
            <Paw className="w-4 h-4" color="oklch(0.68 0.17 42)" />
            TNR活動（猫保護 → 去勢 → 譲渡）で猫の命をつないでいます
            <Paw className="w-4 h-4" color="oklch(0.68 0.17 42)" />
          </div>
        </div>
      </footer>

      {/* ── Styles ── */}
      <style>{`
        #site-header {
          background: oklch(0.985 0.008 15 / 0);
          backdrop-filter: blur(0px);
          transition: background 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease;
        }
        #site-header.scrolled {
          background: oklch(0.985 0.008 15 / 0.93);
          backdrop-filter: blur(14px);
          box-shadow: 0 1px 20px oklch(0 0 0 / 0.07);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      <HeaderScrollEffect />
    </div>
  );
}

function HeaderScrollEffect() {
  useEffect(() => {
    const header = document.getElementById("site-header");
    if (!header) return;
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return null;
}

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}
