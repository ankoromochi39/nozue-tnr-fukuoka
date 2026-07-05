/**
 * CatScrollAnimation v3
 * ─────────────────────────────────────────────────────────────────────────────
 * Design: Warm / Family / Love — subtle playful delight, never distracting.
 *
 * Trigger: IntersectionObserver — plays once when the component enters the
 * viewport. Does NOT sync with scroll position. Does NOT reverse on scroll-up.
 * Re-plays from the beginning if the component leaves and re-enters the viewport.
 *
 * Timeline (total ~6 seconds):
 *   0.0–0.8s  ① Waiting   – cat_looking  (gentle float)
 *   0.8–1.6s  ② Noticing  – cat_tilt     (yarn fades in)
 *   1.6–2.8s  ③ Approach  – cat_walk → cat_crouch
 *   2.8–4.0s  ④ Playing   – cat_play     (yarn spins)
 *   4.0–5.4s  ⑤ Chasing   – cat_walk     (bouncy walk, yarn rolls)
 *   5.4–6.0s  ⑥ Ending    – cat_looking  (fade out)
 *
 * Mobile: env(safe-area-inset-bottom) keeps cat above home bar.
 */

import { useEffect, useRef, useState, useCallback } from "react";

// ── SVG URLs (v2) ─────────────────────────────────────────────────────────────
const SVG = {
  looking: "/manus-storage/cat_looking_03800335.svg",
  tilt:    "/manus-storage/cat_tilt_18822e17.svg",
  crouch:  "/manus-storage/cat_crouch_7e3092f1.svg",
  play:    "/manus-storage/cat_play_602c5a8d.svg",
  walk:    "/manus-storage/cat_walk_edd506d5.svg",
  yarn:    "/manus-storage/yarn_new_a2bf70cb.png",
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * clamp01(t);
const invLerp = (lo: number, hi: number, v: number) =>
  lo === hi ? 0 : clamp01((v - lo) / (hi - lo));

// ── Timeline breakpoints (seconds) ───────────────────────────────────────────
const TOTAL_DURATION = 6.0; // seconds
const T = {
  noticeStart:   0.8,
  approachStart: 1.6,
  playStart:     2.8,
  chaseStart:    4.0,
  endStart:      5.4,
  endFull:       6.0,
};

// ── Layout per device ─────────────────────────────────────────────────────────
interface Layout {
  catSize: number;
  yarnSize: number;
  barHeight: number;
  safeBottom: number;
  startX: number;
  yarnInitX: number;
  catEndX: number;
  yarnEndX: number;
}

const MOBILE_LAYOUT: Layout = {
  catSize: 64,
  yarnSize: 40,
  barHeight: 0,   // unused — we use direct bottom positioning
  safeBottom: 0,  // unused — calculated inline with CSS
  startX: 10,
  yarnInitX: 30,
  catEndX: 78,
  yarnEndX: 88,
};

const DESKTOP_LAYOUT: Layout = {
  catSize: 90,
  yarnSize: 56,
  barHeight: 0,   // unused
  safeBottom: 0,  // unused
  startX: 7,
  yarnInitX: 20,
  catEndX: 76,
  yarnEndX: 88,
};

// ── Animation state ───────────────────────────────────────────────────────────
interface AnimState {
  catImg: string;
  catX: number;
  catFloatY: number;
  yarnX: number;
  yarnRot: number;
  yarnVisible: boolean;
  opacity: number;
}

function deriveState(t: number, layout: Layout): AnimState {
  const { startX, yarnInitX, catEndX, yarnEndX } = layout;
  const yarnShift = (yarnEndX - yarnInitX) * 0.25;

  // ① Waiting
  if (t < T.noticeStart) {
    const p = invLerp(0, T.noticeStart, t);
    return {
      catImg: SVG.looking,
      catX: startX,
      catFloatY: Math.sin(p * Math.PI * 4) * 2,
      yarnX: yarnInitX,
      yarnRot: 0,
      yarnVisible: false,
      opacity: 1,
    };
  }

  // ② Noticing
  if (t < T.approachStart) {
    return {
      catImg: SVG.tilt,
      catX: startX,
      catFloatY: 0,
      yarnX: yarnInitX,
      yarnRot: 15,
      yarnVisible: true,
      opacity: 1,
    };
  }

  // ③ Approaching
  if (t < T.playStart) {
    const p = invLerp(T.approachStart, T.playStart, t);
    const catImg = p < 0.5 ? SVG.walk : SVG.crouch;
    return {
      catImg,
      catX: lerp(startX, yarnInitX - 6, p),
      catFloatY: 0,
      yarnX: yarnInitX,
      yarnRot: lerp(15, 30, p),
      yarnVisible: true,
      opacity: 1,
    };
  }

  // ④ Playing
  if (t < T.chaseStart) {
    const p = invLerp(T.playStart, T.chaseStart, t);
    return {
      catImg: SVG.play,
      catX: lerp(yarnInitX - 6, yarnInitX - 4, p),
      catFloatY: 0,
      yarnX: lerp(yarnInitX, yarnInitX + yarnShift, p),
      yarnRot: p * 360 * 1.5,
      yarnVisible: true,
      opacity: 1,
    };
  }

  // ⑤ Chasing
  if (t < T.endStart) {
    const p = invLerp(T.chaseStart, T.endStart, t);
    const bounceY = Math.sin(p * Math.PI * 6) * 4;
    return {
      catImg: SVG.walk,
      catX: lerp(yarnInitX - 4, catEndX, p),
      catFloatY: bounceY,
      yarnX: lerp(yarnInitX + yarnShift, yarnEndX, p),
      yarnRot: 360 * 1.5 + p * 360 * 2,
      yarnVisible: true,
      opacity: 1,
    };
  }

  // ⑥ Ending
  {
    const p = invLerp(T.endStart, T.endFull, t);
    return {
      catImg: SVG.looking,
      catX: catEndX,
      catFloatY: 0,
      yarnX: yarnEndX,
      yarnRot: 360 * 3.5,
      yarnVisible: p < 0.5,
      opacity: lerp(1, 0, p),
    };
  }
}

// ── Component ─────────────────────────────────────────────────────────────────
interface CatScrollAnimationProps {
  externalTrigger?: number; // increment to force replay
}

export default function CatScrollAnimation({ externalTrigger }: CatScrollAnimationProps = {}) {
  const [isMobile, setIsMobile] = useState(false);
  const [elapsed, setElapsed] = useState(0);       // seconds into animation
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Animation loop (time-based, not scroll-based)
  const startAnimation = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startTimeRef.current = null;
    setElapsed(0);
    setIsPlaying(true);

    const tick = (now: number) => {
      if (startTimeRef.current === null) startTimeRef.current = now;
      const t = (now - startTimeRef.current) / 1000; // seconds
      setElapsed(Math.min(t, TOTAL_DURATION));

      if (t < TOTAL_DURATION) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setIsPlaying(false);
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  // External trigger (e.g. from parent when a section enters view)
  useEffect(() => {
    if (externalTrigger && externalTrigger > 0) {
      startAnimation();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalTrigger]);

  // IntersectionObserver — trigger when component enters viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          startAnimation();
        } else {
          setIsVisible(false);
          // Stop animation when out of view (don't reverse)
          if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [startAnimation]);

  const layout = isMobile ? MOBILE_LAYOUT : DESKTOP_LAYOUT;
  const state = deriveState(elapsed, layout);

  // Only show when visible or still playing
  const shouldShow = isVisible || isPlaying;

  // Mobile: cat sits just above the home bar + offset to avoid Manus credit
  // catBottom = safe-area-inset-bottom + 80px
  // This keeps the cat fully visible and clear of the home bar and Manus credit
  const catBottom = isMobile
    ? `calc(env(safe-area-inset-bottom, 20px) + 80px)`
    : `80px`;
  const yarnBottom = catBottom;

  // Overlay height = safe-area + 80px offset + catSize + a little extra for float
  const overlayHeight = isMobile
    ? `calc(env(safe-area-inset-bottom, 20px) + ${layout.catSize + 96}px)`
    : `${layout.catSize + 104}px`;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: overlayHeight,
        pointerEvents: "none",
        zIndex: 40,
        opacity: shouldShow ? state.opacity : 0,
        transition: "opacity 0.6s ease",
        background:
          "linear-gradient(to top, rgba(255,248,240,0.92) 55%, transparent 100%)",
      }}
    >
      {/* Yarn ball */}
      {state.yarnVisible && (
        <img
          src={SVG.yarn}
          alt=""
          style={{
            position: "absolute",
            bottom: yarnBottom,
            left: `${state.yarnX}%`,
            width: layout.yarnSize,
            height: layout.yarnSize,
            transform: `translateX(-50%) rotate(${state.yarnRot}deg)`,
            willChange: "transform, left",
          }}
        />
      )}

      {/* Cat */}
      <img
        src={state.catImg}
        alt=""
        style={{
          position: "absolute",
          bottom: catBottom,
          left: `${state.catX}%`,
          width: layout.catSize,
          height: layout.catSize,
          objectFit: "contain",
          transform: `translateX(-50%) translateY(${-state.catFloatY}px)`,
          willChange: "transform, left",
          filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.10))",
        }}
      />
    </div>
  );
}
