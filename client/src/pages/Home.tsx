/**
 * のずえんち 保護猫支援ページ — Home
 * Theme: "やさしい陽だまり" — Organic Warmth / Japanese Zine
 * Layout: Single-page scroll, scrapbook-style with paper texture, hand-drawn motifs
 * Colors: Terracotta #C2522A primary, sage green, creamy off-white bg
 * Fonts: Klee One (headings), Noto Sans JP (body)
 * Icons: SVG hand-drawn line illustrations in brand colors — NO emoji icons
 * Brand: のずえんち wordmark always with seated cat + heart-tail silhouette
 */

import { useEffect, useRef } from "react";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663786704229/LNrDcQhMB6DebqMoECxQSy/hero-cats-8aPW4gn4vaAXrCGZUqLrCb.webp";
const LOGO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663786704229/LNrDcQhMB6DebqMoECxQSy/logo-cat-68vFAzdm4iGge5t42quVHf.webp";
const PAYPAY_ID = "nozuenchi";
const AMAZON_URL = "https://www.amazon.co.jp/hz/wishlist/ls/232W7EZA4";
const INSTAGRAM_URL = "https://www.instagram.com/nozue.tnr";
const PAYPAY_QR = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=https://qr.paypay.ne.jp/p2p01_${PAYPAY_ID}&bgcolor=FDF8F2&color=3D2B1F&margin=12`;

// ── Intersection Observer hook for fade-in ──
function useFadeInUp() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function FadeSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useFadeInUp();
  return (
    <div ref={ref} className={`fade-in-up ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ── Hand-drawn style SVG icons ──

function IconShelter({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 22L24 8l16 14" />
      <path d="M12 22v16h24V22" />
      <path d="M19 38V28h10v10" />
      <path d="M24 8v-3" />
    </svg>
  );
}

function IconScissors({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14" cy="14" r="5" />
      <circle cx="14" cy="34" r="5" />
      <line x1="18" y1="17" x2="38" y2="37" />
      <line x1="18" y1="31" x2="38" y2="11" />
    </svg>
  );
}

function IconHeart({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 40s-16-10-16-22a8 8 0 0116 0 8 8 0 0116 0c0 12-16 22-16 22z" />
    </svg>
  );
}

function IconPaw({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 48 48" fill="currentColor">
      <ellipse cx="24" cy="30" rx="9" ry="8" />
      <ellipse cx="11" cy="21" rx="4.5" ry="4" />
      <ellipse cx="37" cy="21" rx="4.5" ry="4" />
      <ellipse cx="16" cy="13" rx="4" ry="3.5" />
      <ellipse cx="32" cy="13" rx="4" ry="3.5" />
    </svg>
  );
}

function IconCamera({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="16" width="36" height="26" rx="4" />
      <circle cx="24" cy="29" r="7" />
      <path d="M16 16l3-6h10l3 6" />
      <circle cx="38" cy="22" r="1.5" fill="currentColor" />
    </svg>
  );
}

function IconFood({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 20c0-6 4-12 14-12s14 6 14 12" />
      <path d="M8 20h32" />
      <path d="M12 20v16" />
      <path d="M36 20v16" />
      <path d="M10 36h28" />
    </svg>
  );
}

function IconMedical({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="10" y="10" width="28" height="28" rx="4" />
      <line x1="24" y1="18" x2="24" y2="30" />
      <line x1="18" y1="24" x2="30" y2="24" />
    </svg>
  );
}

function IconBox({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 16l16-8 16 8v20l-16 8-16-8V16z" />
      <path d="M8 16l16 8 16-8" />
      <line x1="24" y1="24" x2="24" y2="44" />
      <path d="M16 12l16 8" />
    </svg>
  );
}

// ── Hand-drawn divider ──
function WaveDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div style={{ lineHeight: 0, transform: flip ? "scaleY(-1)" : "none" }}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "48px" }}>
        <path
          d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z"
          fill="oklch(0.975 0.012 80)"
        />
      </svg>
    </div>
  );
}

// ── Paper texture overlay ──
function PaperTexture() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        opacity: 0.6,
      }}
    />
  );
}

// ── Hand-drawn underline ──
function HandUnderline({ color = "oklch(0.62 0.13 48)" }: { color?: string }) {
  return (
    <svg viewBox="0 0 200 12" style={{ display: "block", width: "100%", maxWidth: "200px", height: "10px", marginTop: "4px" }}>
      <path
        d="M4,8 C40,3 80,10 120,6 C160,2 180,9 196,7"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.975 0.012 80)" }}>

      {/* ── HEADER ── */}
      <header className="fixed top-0 left-0 right-0 z-50" id="site-header">
        <div className="container flex items-center justify-between py-3">
          {/* Wordmark: logo + name */}
          <div className="flex items-center gap-2">
            <img src={LOGO_IMAGE} alt="のずえんちロゴ" className="w-9 h-9 object-contain drop-shadow-sm" />
            <div>
              <span
                className="font-bold text-lg leading-none block"
                style={{ fontFamily: "'Klee One', serif", color: "oklch(0.22 0.03 55)" }}
              >
                のずえんち
              </span>
              <span className="text-[10px] tracking-widest block" style={{ color: "oklch(0.62 0.13 48)" }}>
                TNR保護猫活動
              </span>
            </div>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full btn-press transition-colors"
            style={{ background: "oklch(0.62 0.13 48 / 0.1)", color: "oklch(0.50 0.13 48)" }}
          >
            <InstagramIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Instagram</span>
          </a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-[95vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="保護猫たち" className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, oklch(0 0 0 / 0.05) 0%, oklch(0 0 0 / 0.1) 35%, oklch(0 0 0 / 0.75) 100%)"
            }}
          />
        </div>

        <div className="relative container pb-20 pt-32">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <IconPaw className="w-5 h-5" style={{ color: "oklch(0.82 0.08 55)" } as React.CSSProperties} />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "oklch(0.88 0.06 60)" }}>
                TNR保護猫活動
              </span>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-bold leading-snug mb-5"
              style={{ fontFamily: "'Klee One', serif", color: "white", textShadow: "0 2px 16px oklch(0 0 0 / 0.5)" }}
            >
              あなたの支援が、<br />猫の命を救います
            </h1>
            <p className="text-base sm:text-lg mb-8 leading-relaxed" style={{ color: "oklch(0.93 0.01 80)" }}>
              人間(4) 犬(1) 猫(10) の大家族母ちゃんが<br />
              TNR活動（猫保護 → 去勢 → 譲渡）をしています。<br />
              一緒に猫の命を救いませんか？
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#paypay"
                className="btn-press inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-base transition-all"
                style={{
                  background: "oklch(0.62 0.13 48)",
                  color: "white",
                  boxShadow: "0 4px 20px oklch(0.62 0.13 48 / 0.45)"
                }}
              >
                <PayPayWordmark className="h-5" />
                PayPayで支援する
              </a>
              <a
                href="#amazon"
                className="btn-press inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-base transition-all"
                style={{
                  background: "oklch(1 0 0 / 0.92)",
                  color: "oklch(0.22 0.03 55)",
                  boxShadow: "0 4px 20px oklch(0 0 0 / 0.18)"
                }}
              >
                <IconBox className="w-5 h-5" style={{ color: "oklch(0.55 0.12 70)" } as React.CSSProperties} />
                物資を支援する
              </a>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60">
          <span className="text-xs text-white tracking-wider">スクロール</span>
          <div className="w-px h-8 overflow-hidden rounded-full" style={{ background: "oklch(1 0 0 / 0.25)" }}>
            <div className="w-full rounded-full" style={{ height: "50%", background: "white", animation: "scrollDot 1.6s ease-in-out infinite" }} />
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="relative py-20 overflow-hidden" style={{ background: "oklch(0.975 0.012 80)" }}>
        <PaperTexture />
        {/* Decorative paw marks */}
        <div className="absolute top-8 right-12 opacity-5">
          <IconPaw className="w-32 h-32" style={{ color: "oklch(0.62 0.13 48)" } as React.CSSProperties} />
        </div>
        <div className="absolute bottom-8 left-8 opacity-5">
          <IconPaw className="w-20 h-20" style={{ color: "oklch(0.62 0.13 48)" } as React.CSSProperties} />
        </div>

        <div className="container relative">
          <FadeSection>
            <div className="flex items-center gap-3 mb-2">
              <img src={LOGO_IMAGE} alt="" className="w-10 h-10 object-contain" />
              <div>
                <h2 className="text-3xl font-bold" style={{ fontFamily: "'Klee One', serif", color: "oklch(0.22 0.03 55)" }}>
                  のずえんちについて
                </h2>
                <HandUnderline />
              </div>
            </div>
            <p className="mt-4 mb-10 text-sm leading-relaxed max-w-xl" style={{ color: "oklch(0.48 0.025 60)" }}>
              大阪で保護猫活動を続けて数年。猫の命を一つでも多く救うために、
              毎日奮闘しています。
            </p>
          </FadeSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <IconShelter className="w-10 h-10" />,
                title: "保護",
                desc: "外で暮らす猫を保護し、安全な環境で一時的に預かります。",
                color: "oklch(0.62 0.13 48)",
                delay: 0,
              },
              {
                icon: <IconScissors className="w-10 h-10" />,
                title: "去勢・不妊手術",
                desc: "TNR活動の核心。手術により猫の数を適切に管理します。",
                color: "oklch(0.55 0.08 145)",
                delay: 100,
              },
              {
                icon: <IconHeart className="w-10 h-10" />,
                title: "譲渡",
                desc: "里親さんを探し、猫たちに新しい家族と幸せな生活を。",
                color: "oklch(0.62 0.13 48)",
                delay: 200,
              },
            ].map((item) => (
              <FadeSection key={item.title} delay={item.delay}>
                <div
                  className="support-card p-7 rounded-3xl relative overflow-hidden"
                  style={{
                    background: "oklch(0.995 0.006 75)",
                    border: "1.5px solid oklch(0.90 0.02 70)",
                    boxShadow: "0 2px 16px oklch(0.62 0.13 48 / 0.07)"
                  }}
                >
                  <div style={{ color: item.color }} className="mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Klee One', serif", color: "oklch(0.22 0.03 55)" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "oklch(0.48 0.025 60)" }}>
                    {item.desc}
                  </p>
                  {/* Corner decoration */}
                  <div className="absolute bottom-3 right-3 opacity-10" style={{ color: item.color }}>
                    <IconPaw className="w-8 h-8" />
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUPPORT BANNER ── */}
      <div style={{ background: "oklch(0.975 0.012 80)" }}>
        <div style={{ background: "oklch(0.88 0.05 145 / 0.3)", padding: "0" }}>
          <WaveDivider flip />
          <div className="py-14 relative overflow-hidden" style={{ background: "oklch(0.88 0.05 145 / 0.3)" }}>
            <PaperTexture />
            <div className="container text-center relative">
              <FadeSection>
                <div className="flex justify-center mb-3">
                  <IconPaw className="w-9 h-9" style={{ color: "oklch(0.62 0.13 48)" } as React.CSSProperties} />
                </div>
                <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Klee One', serif", color: "oklch(0.22 0.03 55)" }}>
                  保護猫たちを応援する
                </h2>
                <HandUnderline color="oklch(0.55 0.08 145)" />
                <p className="mt-4 text-base" style={{ color: "oklch(0.42 0.04 100)" }}>
                  金銭的な支援も、物資の支援も、どちらも猫たちの命につながります
                </p>
              </FadeSection>
            </div>
          </div>
          <WaveDivider />
        </div>
      </div>

      {/* ── PAYPAY ── */}
      <section id="paypay" className="relative py-20 overflow-hidden" style={{ background: "oklch(0.975 0.012 80)" }}>
        <PaperTexture />
        <div className="container relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <FadeSection>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-6 rounded-full" style={{ background: "oklch(0.62 0.13 48)" }} />
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "oklch(0.62 0.13 48)" }}>
                    金銭的な支援
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-1" style={{ fontFamily: "'Klee One', serif", color: "oklch(0.22 0.03 55)" }}>
                  PayPayで送金支援
                </h2>
                <HandUnderline />
                <p className="mt-5 text-base leading-relaxed mb-7" style={{ color: "oklch(0.45 0.025 60)" }}>
                  いただいたご支援は、保護猫たちの医療費・フード代・
                  去勢手術費用などに大切に使わせていただきます。
                  100円からでも大変助かります。
                </p>

                {/* PayPay ID badge */}
                <div
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl mb-6"
                  style={{
                    background: "oklch(0.62 0.13 48 / 0.08)",
                    border: "1.5px dashed oklch(0.62 0.13 48 / 0.4)"
                  }}
                >
                  <span className="text-xs font-medium" style={{ color: "oklch(0.55 0.025 60)" }}>PayPay ID</span>
                  <span className="text-2xl font-bold tracking-wide" style={{ fontFamily: "'Klee One', serif", color: "oklch(0.50 0.13 48)" }}>
                    {PAYPAY_ID}
                  </span>
                </div>

                {/* What support covers */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: <IconMedical className="w-5 h-5" />, label: "医療費・手術費" },
                    { icon: <IconFood className="w-5 h-5" />, label: "フード・おやつ" },
                    { icon: <IconShelter className="w-5 h-5" />, label: "保護環境整備" },
                    { icon: <IconHeart className="w-5 h-5" />, label: "譲渡活動費" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2 text-sm" style={{ color: "oklch(0.48 0.025 60)" }}>
                      <span style={{ color: "oklch(0.62 0.13 48)" }}>{item.icon}</span>
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </FadeSection>

            <FadeSection delay={150}>
              <div className="flex flex-col items-center gap-5">
                {/* QR card — scrapbook style */}
                <div
                  className="relative p-5 rounded-3xl support-card"
                  style={{
                    background: "oklch(0.995 0.006 75)",
                    border: "1.5px solid oklch(0.90 0.02 70)",
                    boxShadow: "0 6px 28px oklch(0.62 0.13 48 / 0.1), 0 2px 8px oklch(0 0 0 / 0.05)"
                  }}
                >
                  {/* Corner tape decoration */}
                  <div className="absolute -top-2 -left-2 w-8 h-8 rounded-sm rotate-12 opacity-60" style={{ background: "oklch(0.62 0.13 48 / 0.25)" }} />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-sm -rotate-12 opacity-60" style={{ background: "oklch(0.62 0.13 48 / 0.25)" }} />
                  <img
                    src={PAYPAY_QR}
                    alt="PayPay QRコード"
                    className="w-52 h-52 rounded-2xl"
                  />
                  <p className="text-xs text-center mt-3" style={{ color: "oklch(0.55 0.02 60)", fontFamily: "'Klee One', serif" }}>
                    QRコードをスキャン
                  </p>
                </div>
                <p className="text-sm text-center" style={{ color: "oklch(0.55 0.02 60)" }}>
                  またはPayPay IDで検索してください
                </p>
                <a
                  href={`https://qr.paypay.ne.jp/p2p01_${PAYPAY_ID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-base transition-all w-full max-w-xs justify-center"
                  style={{
                    background: "oklch(0.62 0.13 48)",
                    color: "white",
                    boxShadow: "0 4px 18px oklch(0.62 0.13 48 / 0.38)"
                  }}
                >
                  <PayPayWordmark className="h-5" />
                  PayPayアプリで開く
                </a>
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ── DIVIDER LINE ── */}
      <div className="container">
        <div style={{ height: "1px", background: "oklch(0.88 0.02 70)" }} />
      </div>

      {/* ── AMAZON ── */}
      <section id="amazon" className="relative py-20 overflow-hidden" style={{ background: "oklch(0.975 0.012 80)" }}>
        <PaperTexture />
        {/* Decorative paw */}
        <div className="absolute top-10 right-8 opacity-5">
          <IconPaw className="w-24 h-24" style={{ color: "oklch(0.55 0.08 145)" } as React.CSSProperties} />
        </div>
        <div className="container relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Card side */}
            <FadeSection delay={100} className="order-2 md:order-1">
              <div className="flex flex-col items-center gap-5">
                <div
                  className="support-card w-full max-w-sm p-8 rounded-3xl flex flex-col items-center gap-5 relative"
                  style={{
                    background: "oklch(0.995 0.006 75)",
                    border: "1.5px solid oklch(0.90 0.02 70)",
                    boxShadow: "0 6px 28px oklch(0 0 0 / 0.07)"
                  }}
                >
                  {/* Scrapbook corner */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 rounded-sm opacity-50" style={{ background: "oklch(0.55 0.08 145 / 0.4)" }} />
                  <IconBox className="w-14 h-14" style={{ color: "oklch(0.55 0.08 145)" } as React.CSSProperties} />
                  <div className="text-center">
                    <p className="font-bold text-lg mb-1" style={{ fontFamily: "'Klee One', serif", color: "oklch(0.22 0.03 55)" }}>
                      Amazonほしいものリスト
                    </p>
                    <p className="text-xs" style={{ color: "oklch(0.55 0.02 60)" }}>猫砂・フード・医療用品など</p>
                  </div>
                  <a
                    href={AMAZON_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-press inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-base transition-all w-full justify-center"
                    style={{
                      background: "oklch(0.55 0.08 145)",
                      color: "white",
                      boxShadow: "0 4px 16px oklch(0.55 0.08 145 / 0.35)"
                    }}
                  >
                    ほしいものリストを見る →
                  </a>
                </div>
              </div>
            </FadeSection>

            {/* Text side */}
            <FadeSection className="order-1 md:order-2">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-6 rounded-full" style={{ background: "oklch(0.55 0.08 145)" }} />
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "oklch(0.45 0.08 145)" }}>
                    物資の支援
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-1" style={{ fontFamily: "'Klee One', serif", color: "oklch(0.22 0.03 55)" }}>
                  Amazonほしいものリスト<br />から物資を支援
                </h2>
                <HandUnderline color="oklch(0.55 0.08 145)" />
                <p className="mt-5 text-base leading-relaxed mb-7" style={{ color: "oklch(0.45 0.025 60)" }}>
                  猫砂・フード・ウェットフード・医療用品など、
                  日々の活動に必要なものをリストにまとめています。
                  直接自宅に届けていただける物資支援も大変助かります。
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    { icon: <IconFood className="w-5 h-5" />, label: "キャットフード・おやつ" },
                    { icon: <IconBox className="w-5 h-5" />, label: "猫砂・トイレ用品" },
                    { icon: <IconMedical className="w-5 h-5" />, label: "医療用品・サプリメント" },
                    { icon: <IconShelter className="w-5 h-5" />, label: "ケージ・キャリーバッグ" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3 text-sm" style={{ color: "oklch(0.45 0.025 60)" }}>
                      <span style={{ color: "oklch(0.55 0.08 145)" }}>{item.icon}</span>
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM ── */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ background: "oklch(0.88 0.05 145 / 0.25)" }}
      >
        <PaperTexture />
        {/* Decorative large paw */}
        <div className="absolute -bottom-4 -right-4 opacity-[0.04]">
          <IconPaw className="w-64 h-64" style={{ color: "oklch(0.62 0.13 48)" } as React.CSSProperties} />
        </div>
        <div className="container relative text-center">
          <FadeSection>
            <div className="max-w-lg mx-auto">
              <div className="flex justify-center mb-4">
                <IconCamera className="w-12 h-12" style={{ color: "oklch(0.62 0.13 48)" } as React.CSSProperties} />
              </div>
              <h2 className="text-3xl font-bold mb-1" style={{ fontFamily: "'Klee One', serif", color: "oklch(0.22 0.03 55)" }}>
                日々の活動はInstagramで
              </h2>
              <HandUnderline />
              <p className="mt-5 text-base leading-relaxed mb-8" style={{ color: "oklch(0.42 0.04 100)" }}>
                保護猫たちの成長記録、活動の様子、里親募集情報など
                日々更新しています。フォローして応援してください！
              </p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all"
                style={{
                  background: "linear-gradient(135deg, oklch(0.55 0.18 20), oklch(0.52 0.18 320), oklch(0.68 0.15 60))",
                  color: "white",
                  boxShadow: "0 6px 24px oklch(0.52 0.18 320 / 0.3)"
                }}
              >
                <InstagramIcon className="w-6 h-6" />
                @nozue.tnr をフォロー
              </a>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="relative py-12 overflow-hidden"
        style={{ background: "oklch(0.20 0.03 55)" }}
      >
        <div className="absolute inset-0 opacity-5">
          <IconPaw className="absolute bottom-4 right-8 w-32 h-32" style={{ color: "white" } as React.CSSProperties} />
        </div>
        <div className="container relative">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Wordmark */}
            <div className="flex items-center gap-2">
              <img src={LOGO_IMAGE} alt="のずえんちロゴ" className="w-9 h-9 object-contain" style={{ filter: "brightness(0) invert(1) opacity(0.75)" }} />
              <div>
                <span className="font-bold text-base block leading-none" style={{ fontFamily: "'Klee One', serif", color: "oklch(0.90 0.01 80)" }}>
                  のずえんち
                </span>
                <span className="text-[10px] tracking-widest block" style={{ color: "oklch(0.62 0.13 48)" }}>
                  TNR保護猫活動
                </span>
              </div>
            </div>
            <div className="flex items-center gap-5 text-sm" style={{ color: "oklch(0.65 0.01 80)" }}>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                <InstagramIcon className="w-4 h-4" />
                Instagram
              </a>
              <a href="#paypay" className="hover:opacity-80 transition-opacity">PayPay支援</a>
              <a href="#amazon" className="hover:opacity-80 transition-opacity">物資支援</a>
            </div>
          </div>
          <div
            className="mt-8 pt-6 text-center text-xs"
            style={{ borderTop: "1px solid oklch(1 0 0 / 0.08)", color: "oklch(0.50 0.01 80)" }}
          >
            TNR活動（猫保護 → 去勢 → 譲渡）で猫の命をつないでいます
          </div>
        </div>
      </footer>

      {/* ── Global animation styles ── */}
      <style>{`
        @keyframes scrollDot {
          0%   { transform: translateY(-100%); opacity: 0; }
          30%  { opacity: 1; }
          70%  { opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
        #site-header {
          background: oklch(0.975 0.012 80 / 0);
          backdrop-filter: blur(0px);
          transition: background 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease;
        }
        #site-header.scrolled {
          background: oklch(0.975 0.012 80 / 0.93);
          backdrop-filter: blur(14px);
          box-shadow: 0 1px 20px oklch(0 0 0 / 0.07);
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
    const onScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return null;
}

// ── Brand icon components ──

function PayPayWordmark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 24" fill="currentColor">
      <text x="0" y="18" fontSize="16" fontWeight="bold" fontFamily="sans-serif">Pay</text>
      <text x="30" y="18" fontSize="16" fontWeight="bold" fontFamily="sans-serif" fill="currentColor" opacity="0.75">Pay</text>
    </svg>
  );
}

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}
