/*
 * のずえんち 保護猫支援ページ v5
 * Theme: "ポップかわいい猫ラブ" — Mobile-First Kawaii Pop
 * 場所: 福岡県
 * Colors: Orange primary, Sunny Yellow, Mint Green, warm white bg
 * Fonts: M PLUS Rounded 1c — rounded & cute gothic
 * Layout: Mobile-first, single column, photo-heavy
 */

import { useEffect, useRef, useState, useCallback } from "react";
import CatScrollAnimation from "@/components/CatScrollAnimation";

// ── カードセクション用の新背景写真 ──
const CARD_BG1 = "/manus-storage/card_bg1_c1d362a6.svg"; // 一緒に保護猫活動セクション
const CARD_BG2 = "/manus-storage/card_bg2_new_513b026e.svg"; // 物資カード
const CARD_BG3 = "/manus-storage/card_bg3_new_367b8d5c.svg"; // 銀行振込カード

// ── Asset URLs ──
const PROFILE_ICON  = "/manus-storage/icon_cat_correct_487e5edc.jpg";
const CAT_TABBY     = "/manus-storage/cat1-tabby_e53711c8.jpg";
const CAT_WHITE     = "/manus-storage/cat2-white-blue_7d2edb32.jpg";
const CAT_FLUFFY    = "/manus-storage/cat3-fluffy_485f2c8f.jpg";
const CAT_KITTENS   = "/manus-storage/cat4-kittens_4f3810ed.jpg";
const CAT_NEW1      = "/manus-storage/cat-new1_9f17cbd4.jpg";
const CAT_NEW2      = "/manus-storage/cat-new2_a19b2be6.jpg";
const CAT_NEW4      = "/manus-storage/cat-new4_ac10b6c2.jpg";
const CAT_NEW5      = "/manus-storage/cat-new5_93c2636e.jpg";
const CAT_NEW6      = "/manus-storage/cat-new6_a0ce4585.jpg";
const CAT_SLEEPING  = "/manus-storage/cat-sleeping_59a8ed07.jpg";
const CAT_RESCUE1   = "/manus-storage/cat-rescue1_14edf6f2.jpg";
const CAT_RESCUE2   = "/manus-storage/cat-rescue2_1d7c4153.jpg";
const CAT_VIDEO     = "/manus-storage/cats-video_dcfef93a.mp4";
const CAT_VIDEO2    = "/manus-storage/cat-video2_a5a3194e.mp4";

const PAYPAY_ID  = "nozuenchi";
const PAYPAY_URL = "https://qr.paypay.ne.jp/p2p01_LiCyVOXNFDY4HhDR";
const AMAZON_URL = "https://www.amazon.jp/hz/wishlist/ls/232W7EZA4H3Q1?ref_=wl_share";
const INSTAGRAM_URL = "https://www.instagram.com/nozue.tnr";
const PAYPAY_QR  = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(PAYPAY_URL)}&bgcolor=FFF8F0&color=C2522A&margin=14`;

// ── 写真データ（前半10枚=里親募集中、後半6枚=トライアル〜譲渡済み） ──
const CATS_LOOKING: { src: string }[] = [
  { src: "/manus-storage/looking_new1_11cf2d6d.jpg" },
  { src: "/manus-storage/looking_new2_d08effe8.jpg" },
  { src: "/manus-storage/looking_new3_4c40830f.jpg" },
  { src: "/manus-storage/looking_new4_e45802e3.jpg" },
  { src: "/manus-storage/looking_07_f91f473c.jpg" },
  { src: "/manus-storage/looking_08_415946c6.webp" },
  { src: "/manus-storage/looking_01_400c8400.jpg" },
  { src: "/manus-storage/looking_04_da3ca09d.jpg" },
  { src: "/manus-storage/looking_05_cb7df4d7.jpg" },
  { src: "/manus-storage/looking_06_45db4e76.jpg" },
];
const CATS_ADOPTED: { src: string }[] = [
  { src: CAT_SLEEPING },
  { src: CAT_KITTENS },
  { src: CAT_RESCUE1 },
  { src: CAT_RESCUE2 },
  { src: "/manus-storage/adopted_01_bcb36104.jpg" },
  { src: "/manus-storage/adopted_04_958f5047.jpg" },
  { src: "/manus-storage/adopted_05_65b580d8.jpg" },
  { src: "/manus-storage/adopted_06_a4baa389.jpg" },
  { src: "/manus-storage/adopted_07_25a8efde.jpg" },
  { src: "/manus-storage/adopted_08_ceef2aaa.jpg" },
  { src: "/manus-storage/adopted_09_c51fd1b2.jpg" },
  { src: "/manus-storage/adopted_10_543bc9b4.jpg" },
  { src: "/manus-storage/adopted_11_7132b815.jpg" },
  { src: "/manus-storage/adopted_12_fc5db094.jpg" },
  { src: "/manus-storage/adopted_13_fffd4517.jpg" },
  { src: "/manus-storage/adopted_14_509b10bf.jpg" },
  { src: "/manus-storage/adopted_15_5bdf4ad1.jpg" },
];

// ── 肉球ポップアニメーション ──
function usePawPop() {
  return (e: React.MouseEvent<HTMLElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const count = 6;
    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      el.className = 'paw-particle';
      el.style.backgroundImage = `url(${PAW_ICON})`;
      el.style.backgroundSize = 'contain';
      el.style.backgroundRepeat = 'no-repeat';
      el.style.width = '1.4rem';
      el.style.height = '1.4rem';
      el.textContent = '';
      const angle = (360 / count) * i + Math.random() * 30 - 15;
      const dist = 40 + Math.random() * 30;
      const tx = Math.cos((angle * Math.PI) / 180) * dist;
      const ty = Math.sin((angle * Math.PI) / 180) * dist;
      const rot = (Math.random() - 0.5) * 60;
      el.style.setProperty('--tx', `${tx}px`);
      el.style.setProperty('--ty', `${ty}px`);
      el.style.setProperty('--rot', `${rot}deg`);
      el.style.left = `${cx}px`;
      el.style.top = `${cy}px`;
      el.style.marginLeft = '-0.6rem';
      el.style.marginTop = '-0.6rem';
      btn.appendChild(el);
      setTimeout(() => el.remove(), 750);
    }
  };
}

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

// ── Paw print ──
const PAW_ICON = "/manus-storage/paw_icon_eb761072.png";
function Paw({ className = "", style }: { className?: string; color?: string; style?: React.CSSProperties }) {
  return <img src={PAW_ICON} alt="🐾" className={className} style={{ display: "inline-block", ...style }} />;
}

// ── 横スクロールギャラリー ──
function HorizontalCatScroll({ cats }: {
  cats: { src: string }[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'right' ? 160 : -160, behavior: 'smooth' });
  };
  return (
    <div className="relative">
      {/* 左矢印 */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shadow-md"
        style={{ background: "rgba(255,255,255,0.92)", color: "oklch(0.68 0.17 42)", border: "1.5px solid oklch(0.68 0.17 42 / 0.25)" }}
        aria-label="前に戻る"
      >‹</button>
      {/* 右矢印 */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shadow-md"
        style={{ background: "rgba(255,255,255,0.92)", color: "oklch(0.68 0.17 42)", border: "1.5px solid oklch(0.68 0.17 42 / 0.25)" }}
        aria-label="次へ進む"
      >›</button>
      <div
        ref={scrollRef}
        className="overflow-x-auto"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>{`.cat-scroll::-webkit-scrollbar { display: none; }`}</style>
        <div className="cat-scroll flex gap-3 px-4" style={{ width: "max-content" }}>
          {cats.map((cat, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border-2 border-white shadow-sm flex-shrink-0"
              style={{ width: 140, height: 160, scrollSnapAlign: "start" }}>
              <img src={cat.src} alt="保護猫" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Photo Collage Hero ──
function HeroCollage() {
  return (
    <div className="grid gap-1.5" style={{ gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "auto auto" }}>
      {/* 左大 */}
      <div className="rounded-2xl overflow-hidden border-2 border-white shadow-sm" style={{ gridRow: "1 / 3", gridColumn: "1 / 2", aspectRatio: "3/4" }}>
        <img src={CAT_NEW1} alt="保護猫" className="w-full h-full object-cover" />
      </div>
      {/* 右上 */}
      <div className="rounded-2xl overflow-hidden border-2 border-white shadow-sm" style={{ gridColumn: "2 / 4", aspectRatio: "2/1" }}>
        <img src={CAT_SLEEPING} alt="保護猫" className="w-full h-full object-cover object-top" />
      </div>
      {/* 右中 */}
      <div className="rounded-2xl overflow-hidden border-2 border-white shadow-sm" style={{ aspectRatio: "1/1" }}>
        <img src={CAT_NEW5} alt="保護猫" className="w-full h-full object-cover" />
      </div>
      {/* 右下 */}
      <div className="rounded-2xl overflow-hidden border-2 border-white shadow-sm" style={{ aspectRatio: "1/1" }}>
        <img src={CAT_FLUFFY} alt="保護猫" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

export default function Home() {
  const pawPop = usePawPop();

  // ── 猫アニメーション再生トリガー ──
  const [catAnimTrigger, setCatAnimTrigger] = useState(0);
  const joinSectionRef = useRef<HTMLElement>(null);
  const triggerCatAnim = useCallback(() => {
    setCatAnimTrigger(prev => prev + 1);
  }, []);
  useEffect(() => {
    const el = joinSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) triggerCatAnim(); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerCatAnim]);
  return (
    <>
    <div className="min-h-screen overflow-x-hidden" style={{ background: "oklch(0.985 0.010 60)", fontFamily: "'M PLUS Rounded 1c', 'Noto Sans JP', sans-serif" }}>

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3"
        style={{ background: "oklch(0.985 0.010 60 / 0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid oklch(0.68 0.17 42 / 0.12)" }}>
        <div className="flex items-center gap-2">
          <img src={PROFILE_ICON} alt="のずえんち" className="w-9 h-9 rounded-full object-cover border-2"
            style={{ borderColor: "oklch(0.68 0.17 42)" }} />
          <div>
            <div className="font-bold text-sm leading-none" style={{ color: "oklch(0.22 0.03 55)" }}>のずえんち</div>
            <div className="text-xs" style={{ color: "oklch(0.68 0.17 42)" }}>福岡県 TNR保護猫活動 🐾</div>
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
      <section className="relative overflow-hidden" style={{ minHeight: "88vw", maxHeight: "520px" }}>
        {/* 背景画像 */}
        <img
          src="/manus-storage/hero_bg_b6ee0c87.jpg"
          alt="保護猫たち"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center top" }}
        />
        {/* グラデーションオーバーレイ：オレンジ暖色系で明るい乱れ感 */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(255,180,80,0.10) 0%, rgba(255,120,30,0.30) 50%, rgba(200,80,10,0.65) 80%, rgba(160,50,0,0.80) 100%)" }} />

        {/* テキスト */}
        <div className="relative z-10 flex flex-col justify-end h-full px-5 pt-6 pb-6" style={{ minHeight: "88vw", maxHeight: "520px" }}>
          <Fade>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-3 w-fit"
              style={{ background: "rgba(255,255,255,0.25)", color: "white", backdropFilter: "blur(6px)" }}>
              <Paw className="w-3.5 h-3.5" color="white" />
              福岡県 保護猫活動
            </div>
            <h1 className="text-3xl font-black leading-tight mb-2" style={{ color: "white", textShadow: "0 2px 10px rgba(120,40,0,0.5)" }}>
              保護猫たちに、<br />
              <span style={{ color: "oklch(0.96 0.10 80)" }}>あたたかい</span><br />
              家族を 🐾
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.92)", textShadow: "0 1px 4px rgba(100,30,0,0.5)" }}>
              人間(4人) 犬(1匹) 猫(10匹)の大家族母ちゃんが<br />
              TNR活動(猫保護 → 去勢→返す)をしています。<br />
              一緒に猫の命を救いませんか？
            </p>
          </Fade>
        </div>
      </section>

      {/* ── ヒーロー直下 CTAボタン ── */}
      <section className="px-5 pt-5 pb-2">
        <Fade delay={100}>
          <div className="flex flex-col gap-3">
            <a href="#paypay" className="btn-paw btn-support-paypay flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-lg"
              style={{ background: "oklch(0.68 0.17 42)", color: "white" }} onClick={pawPop}>
              💝 PayPayで参加する <span className="arrow-bounce">→</span>
            </a>
            <a href="#amazon" className="btn-paw btn-support-amazon flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-lg"
              style={{ background: "oklch(0.80 0.14 80)", color: "white" }} onClick={pawPop}>
              📦 物資で参加する <span className="arrow-bounce">→</span>
            </a>
            <a href="#bank" className="btn-paw flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-lg"
              style={{ background: "oklch(0.55 0.10 200)", color: "white" }} onClick={pawPop}>
              🏦 銀行振込で参加する <span className="arrow-bounce">→</span>
            </a>
          </div>
        </Fade>
      </section>

      {/* ── TNR説明 ── */}
      <section className="mx-4 my-4 p-5 rounded-3xl" style={{ background: "oklch(0.68 0.17 42 / 0.08)", border: "2px solid oklch(0.68 0.17 42 / 0.15)" }}>
        <Fade>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🐾</span>
            <h2 className="text-lg font-black" style={{ color: "oklch(0.22 0.03 55)" }}>TNR活動ってなに？</h2>
          </div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "oklch(0.45 0.025 60)" }}>
            地域で暮らす猫や多頭飼育崩壊などで<br />困窮している猫を保護し、不妊・去勢手術を行い<br />            元の環境に戻す活動です<br /><span style={{ color: "oklch(0.5 0.14 80)", fontSize: "12px" }}>※新しい家族のもとへと譲渡する場合もあります</span>
          </p>
          <div className="flex items-center gap-1">
            {[
              { step: "01", iconSrc: "/manus-storage/icon_01_new_38185f60.png", title: "Trap", sub: "保護", desc: "安全に保護" },
              { step: "02", iconSrc: "/manus-storage/icon_02_new_bd6cdfe4.png", title: "Neuter", sub: "去勢", desc: "不妊・去勢手術を行う" },
              { step: "03", iconSrc: "/manus-storage/icon_03_new_dcfb6832.png", title: "Return", sub: "返す", desc: "元の環境に戻す" },
            ].map((item, i) => (
              <>
                {i > 0 && (
                  <div className="flex-shrink-0 flex items-center justify-center" style={{ width: "16px" }}>
                    <span style={{ color: "oklch(0.68 0.17 42)", fontSize: "12px" }}>&#9654;</span>
                  </div>
                )}
                <div key={item.step} className="flex-1 rounded-2xl text-center relative overflow-hidden flex flex-col items-center"
                  style={{ background: "white", border: "1.5px solid oklch(0.68 0.17 42 / 0.15)", padding: "10px 6px", height: '124px' }}>
                  <div className="absolute top-1.5 right-2 text-xs font-black opacity-20" style={{ color: "oklch(0.68 0.17 42)" }}>{item.step}</div>
                  <img src={item.iconSrc} alt={item.sub} style={{ width: "2rem", height: "2rem", objectFit: "contain", flexShrink: 0 }} />
                  <div className="text-xs font-black" style={{ color: "oklch(0.52 0.17 42)", lineHeight: "1.2rem", height: "1.2rem" }}>{item.title}</div>
                  <div className="text-xs font-bold" style={{ color: "oklch(0.52 0.17 42)", lineHeight: "1.2rem", height: "1.2rem" }}>（{item.sub}）</div>
                  <div className="text-xs leading-tight mt-1" style={{ color: "oklch(0.50 0.02 60)" }}>{item.desc}</div>
                </div>
              </>
            ))}
          </div>
        </Fade>
      </section>

      {/* ── 保護猫ギャラリー ── */}
      <section className="py-6">
        <Fade>
          <div className="flex items-center gap-2 mb-1 px-4">
            <Paw className="w-5 h-5" color="oklch(0.68 0.17 42)" />
            <h2 className="text-xl font-black" style={{ color: "oklch(0.22 0.03 55)" }}>今までに保護した猫たち</h2>
          </div>
          <p className="text-sm mb-5 px-4" style={{ color: "oklch(0.55 0.02 60)" }}>福岡県で保護した子たちです</p>
        </Fade>

        {/* 里親募集中 */}
        <Fade delay={50}>
          <div className="flex items-center gap-2 mb-3 px-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-black"
              style={{ background: "oklch(0.68 0.17 42)", color: "white" }}>
              里親募集中
            </span>
          </div>
          <HorizontalCatScroll cats={CATS_LOOKING} />
        </Fade>

        {/* 譲渡済み */}
        <Fade delay={100}>
          <div className="flex items-center gap-2 mt-6 mb-3 px-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-black"
              style={{ background: "oklch(0.55 0.14 145)", color: "white" }}>
              譲渡完了
            </span>
          </div>
          <HorizontalCatScroll cats={CATS_ADOPTED} />
        </Fade>
      </section>

      {/* ── VIDEOS ── */}
      <section className="px-4 py-4">
        <Fade>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🎥</span>
            <h2 className="text-xl font-black" style={{ color: "oklch(0.22 0.03 55)" }}>保護後の様子</h2>
          </div>
        </Fade>
        <div className="flex flex-col gap-4">
          <Fade delay={50}>
            <div className="rounded-2xl overflow-hidden shadow-sm border-2 border-white">
              <video src={CAT_VIDEO2} autoPlay controls playsInline muted loop className="w-full" style={{ maxHeight: 320, objectFit: "cover" }} />
              <div className="px-3 py-2 text-sm font-bold" style={{ background: "oklch(0.68 0.17 42 / 0.08)", color: "oklch(0.42 0.03 55)" }}>
                なでなで気持ちよさそう🐾
              </div>
            </div>
          </Fade>
          <Fade delay={100}>
            <div className="rounded-2xl overflow-hidden shadow-sm border-2 border-white">
              <video src={CAT_VIDEO} autoPlay controls playsInline muted loop className="w-full" style={{ maxHeight: 320, objectFit: "cover" }} />
              <div className="px-3 py-2 text-sm font-bold" style={{ background: "oklch(0.68 0.17 42 / 0.08)", color: "oklch(0.42 0.03 55)" }}>
                一生懸命ご飯を食べている姿が愛おしい💕
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── 支援セクション導入 — web2画像背景 ── */}
      <section ref={joinSectionRef} className="relative overflow-hidden" style={{ minHeight: "220px" }}>
        <img
          src="/manus-storage/support_bg_41c6b576.jpg"
          alt="保護猫たち"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center center" }}
        />
        {/* オレンジ暖色グラデーション — ヒーローと同じスタイル */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(255,180,80,0.10) 0%, rgba(255,120,30,0.30) 50%, rgba(200,80,10,0.65) 80%, rgba(160,50,0,0.80) 100%)" }} />
        <div className="relative z-10 flex flex-col justify-end px-5 py-8" style={{ minHeight: "220px" }}>
          <Fade>
            <h2 className="text-3xl font-black leading-tight mb-2" style={{ color: "white", textShadow: "0 2px 10px rgba(120,40,0,0.5)" }}>
              一緒に保護猫活動<br />
              <span style={{ color: "oklch(0.96 0.10 80)" }}>しませんか？🐾</span>
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.92)", textShadow: "0 1px 4px rgba(100,30,0,0.5)" }}>
              １匹でも多く猫の命を救うことができます
            </p>
          </Fade>
        </div>
      </section>

      {/* ── PAYPAY ── */}
      <section id="paypay" className="px-4 py-6">
        <Fade>
          <div className="rounded-3xl overflow-hidden" style={{ boxShadow: "0 4px 24px oklch(0.68 0.17 42 / 0.18)" }}>
            {/* 背景写真エリア */}
            <div className="relative h-48">
              <img src={CARD_BG1} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, oklch(0.68 0.17 42 / 0.25), oklch(0.68 0.17 42 / 0.55))" }} />
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-2 self-start"
                  style={{ background: "rgba(255,255,255,0.25)", backdropFilter: "blur(8px)", color: "white" }}>
                  1
                </div>
                <h2 className="text-2xl font-black text-white drop-shadow">
                  PayPayで<br />参加する
                </h2>
              </div>
            </div>
            {/* コンテンツエリア */}
            <div className="p-5" style={{ background: "white", border: "3px solid oklch(0.68 0.17 42 / 0.25)", borderTop: "none", borderRadius: "0 0 1.5rem 1.5rem" }}>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "oklch(0.45 0.025 60)" }}>
              保護猫たちの医療費など毎月かかる費用に<br />大切に使わせていただきます<br />100円からでも本当にありがたいです！
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
              className="btn-paw btn-support-paypay flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-lg w-full"
              style={{ background: "oklch(0.68 0.17 42)", color: "white" }} onClick={pawPop}>
              💝 PayPayアプリに移動 <span className="arrow-bounce">→</span>
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
          </div>
        </Fade>
      </section>

      {/* ── AMAZON ── */}
      <section id="amazon" className="px-4 pb-6">
        <Fade>
          <div className="rounded-3xl overflow-hidden" style={{ boxShadow: "0 4px 24px oklch(0.80 0.14 80 / 0.18)" }}>
            {/* 背景写真エリア */}
            <div className="relative h-48">
              <img src={CARD_BG2} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, oklch(0.80 0.14 80 / 0.20), oklch(0.65 0.14 80 / 0.60))" }} />
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-2 self-start"
                  style={{ background: "rgba(255,255,255,0.25)", backdropFilter: "blur(8px)", color: "white" }}>
                  2
                </div>
                <h2 className="text-2xl font-black text-white drop-shadow">
                  物資で<br />参加する
                </h2>
              </div>
            </div>
            {/* コンテンツエリア */}
            <div className="p-5" style={{ background: "white", border: "3px solid oklch(0.80 0.14 80 / 0.35)", borderTop: "none", borderRadius: "0 0 1.5rem 1.5rem" }}>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "oklch(0.45 0.025 60)" }}>
              保護した猫たちが生きていくのに必要なフードや猫砂などの物資を<br />Amazonのほしいものリストにまとめています<br />1つからでも大変助かります！<br />
              <span className="text-xs" style={{ color: "oklch(0.50 0.14 80)" }}>※ お互いの個人情報は分からないようになっています</span>
            </p>

            <a href={AMAZON_URL} target="_blank" rel="noopener noreferrer"
              className="btn-paw btn-support-amazon flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-lg w-full mb-3"
              style={{ background: "oklch(0.80 0.14 80)", color: "white" }} onClick={pawPop}>
              📦 ほしいものリストはこちら <span className="arrow-bounce">→</span>
            </a>
            <div className="flex flex-col gap-1.5">
              {["🍚 キャットフード・おやつ", "🧹 猫砂・トイレ用品"].map(item => (
                <div key={item} className="text-xs px-3 py-2 rounded-xl"
                  style={{ background: "oklch(0.80 0.14 80 / 0.08)", color: "oklch(0.42 0.025 60)" }}>
                  {item}
                </div>
              ))}
            </div>
            </div>
          </div>
        </Fade>
      </section>

      {/* ── 銀行振込 ── */}
      <section id="bank" className="px-4 pb-6">
        <Fade>
          <div className="rounded-3xl overflow-hidden" style={{ boxShadow: "0 4px 24px oklch(0.55 0.10 240 / 0.15)" }}>
            {/* 背景写真エリア */}
            <div className="relative h-48">
              <img src={CARD_BG3} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, oklch(0.55 0.10 240 / 0.20), oklch(0.40 0.10 240 / 0.65))" }} />
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-2 self-start"
                  style={{ background: "rgba(255,255,255,0.25)", backdropFilter: "blur(8px)", color: "white" }}>
                  3
                </div>
                <h2 className="text-2xl font-black text-white drop-shadow">
                  銀行振込で<br />参加する
                </h2>
              </div>
            </div>
            {/* コンテンツエリア */}
            <div className="p-5" style={{ background: "white", border: "3px solid oklch(0.55 0.10 240 / 0.25)", borderTop: "none", borderRadius: "0 0 1.5rem 1.5rem" }}>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "oklch(0.45 0.025 60)" }}>
              PayPayでのご支援と同様<br />保護猫活動の費用として<br />全額使用させていただきます<br />100円からでも大変ありがたいです！
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
            </div>
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
      <footer className="px-4 py-8 text-center" style={{ background: "oklch(0.68 0.17 42)", color: "white" }}>
        <div className="flex justify-center gap-1 mb-2">
          {[0,1,2].map(i => <Paw key={i} className="w-5 h-5 opacity-60" color="white" />)}
        </div>
        <div className="font-black text-base mb-1">のずえんち</div>
        <div className="text-xs opacity-60 mb-4">福岡県 TNR保護猫活動</div>
        <div className="flex justify-center gap-4 text-xs opacity-70">
          <a href="#paypay" style={{ color: "oklch(0.88 0.12 90)" }}>PayPay</a>
          <a href="#amazon" style={{ color: "oklch(0.88 0.12 90)" }}>物資支援</a>
          <a href="#bank" style={{ color: "oklch(0.88 0.12 90)" }}>銀行振込</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" style={{ color: "oklch(0.88 0.12 90)" }}>Instagram</a>
        </div>
        <div className="text-xs opacity-40 mt-4">© 2025 のずえんち All rights reserved.</div>
      </footer>
    </div>
    {/* 猫スクロールアニメーション */}
    <CatScrollAnimation externalTrigger={catAnimTrigger} />
    </>
  );
}
