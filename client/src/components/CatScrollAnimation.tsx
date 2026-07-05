/**
 * CatScrollAnimation
 * ─────────────────────────────────────────────────────────────────────────────
 * Design: Warm / Family / Love — subtle playful delight, never distracting.
 *
 * Mobile-first: uses env(safe-area-inset-bottom) + fixed offset so the cat
 * never hides behind iPhone home bars or Android nav bars.
 *
 * Phases (by scroll progress 0→1):
 *   0.00–0.08  ① Waiting   – cat_looking  (gentle float)
 *   0.08–0.18  ② Noticing  – cat_tilt     (yarn appears)
 *   0.18–0.33  ③ Approach  – cat_walk → cat_crouch
 *   0.33–0.52  ④ Playing   – cat_play     (yarn spins)
 *   0.52–0.78  ⑤ Chasing   – cat_walk     (bouncy walk, yarn rolls)
 *   0.78–0.95  ⑥ Ending    – cat_looking  (fade out)
 */

import { useEffect, useRef, useState, useCallback } from "react";

// ── New SVG URLs (v2) ─────────────────────────────────────────────────────────
const SVG = {
  looking: "/manus-storage/cat_looking_03800335.svg",
  tilt:    "/manus-storage/cat_tilt_18822e17.svg",
  crouch:  "/manus-storage/cat_crouch_7e3092f1.svg",
  play:    "/manus-storage/cat_play_602c5a8d.svg",
  walk:    "/manus-storage/cat_walk_edd506d5.svg",
  yarn:    "/manus-storage/yarn_ball_123e9577.svg",
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * clamp01(t);
const invLerp = (lo: number, hi: number, v: number) =>
  lo === hi ? 0 : clamp01((v - lo) / (hi - lo));

// ── Breakpoints ───────────────────────────────────────────────────────────────
const BP = {
  noticeStart:   0.08,
  approachStart: 0.18,
  playStart:     0.33,
  chaseStart:    0.52,
  endStart:      0.78,
  endFull:       0.95,
};

// ── Layout constants per device ───────────────────────────────────────────────
interface Layout {
  catSize: number;      // px
  yarnSize: number;     // px
  barHeight: number;    // fixed bar height px
  safeBottom: number;   // extra bottom offset (px) on top of safe-area
  startX: number;       // % — cat start position
  yarnInitX: number;    // % — yarn initial position
  catEndX: number;      // % — cat final position
  yarnEndX: number;     // % — yarn final position
}

const MOBILE_LAYOUT: Layout = {
  catSize: 60,
  yarnSize: 38,
  barHeight: 80,
  safeBottom: 16,   // extra 16px above safe area
  startX: 10,
  yarnInitX: 28,
  catEndX: 80,
  yarnEndX: 90,
};

const DESKTOP_LAYOUT: Layout = {
  catSize: 90,
  yarnSize: 56,
  barHeight: 100,
  safeBottom: 0,
  startX: 7,
  yarnInitX: 20,
  catEndX: 76,
  yarnEndX: 88,
};

// ── Animation state ───────────────────────────────────────────────────────────
type Phase = "waiting" | "noticing" | "approaching" | "playing" | "chasing" | "ending";

interface AnimState {
  phase: Phase;
  catImg: string;
  catX: number;
  catFloatY: number;
  yarnX: number;
  yarnRot: number;
  yarnVisible: boolean;
  opacity: number;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function CatScrollAnimation() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef<number | null>(null);
  const lastScrollRef = useRef(0);

  // Detect mobile (≤ 640px)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll listener (RAF-throttled)
  const handleScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const top = window.scrollY || document.documentElement.scrollTop;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const p = docH > 0 ? clamp01(top / docH) : 0;
      if (Math.abs(p - lastScrollRef.current) > 0.001) {
        lastScrollRef.current = p;
        setScrollProgress(p);
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const layout = isMobile ? MOBILE_LAYOUT : DESKTOP_LAYOUT;
  const state = deriveState(scrollProgress, layout);

  // Bouncy Y offset during chase phase
  const bounceY = state.phase === "chasing"
    ? Math.sin(scrollProgress * 80) * (isMobile ? 3 : 5)
    : 0;

  // Bottom offset: safe-area + extra padding
  // On mobile we sit above the home bar using env(safe-area-inset-bottom)
  const bottomStyle = isMobile
    ? `calc(env(safe-area-inset-bottom, 0px) + ${layout.safeBottom}px)`
    : `${layout.safeBottom}px`;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        // The bar height accounts for safe area on mobile
        height: isMobile
          ? `calc(${layout.barHeight}px + env(safe-area-inset-bottom, 0px))`
          : `${layout.barHeight}px`,
        pointerEvents: "none",
        zIndex: 40,
        opacity: state.opacity,
        transition: "opacity 0.8s ease",
        // Warm gradient so cat is always readable against any page bg
        background:
          "linear-gradient(to top, rgba(255,248,240,0.90) 55%, transparent 100%)",
      }}
    >
      {/* Yarn ball */}
      {state.yarnVisible && (
        <img
          src={SVG.yarn}
          alt=""
          style={{
            position: "absolute",
            bottom: bottomStyle,
            left: `${state.yarnX}%`,
            width: layout.yarnSize,
            height: layout.yarnSize,
            transform: `translateX(-50%) rotate(${state.yarnRot}deg)`,
            transition: "left 0.4s cubic-bezier(0.23,1,0.32,1)",
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
          bottom: bottomStyle,
          left: `${state.catX}%`,
          width: layout.catSize,
          height: layout.catSize,
          objectFit: "contain",
          transform: `translateX(-50%) translateY(${-(state.catFloatY + bounceY)}px)`,
          transition: "left 0.5s cubic-bezier(0.23,1,0.32,1)",
          willChange: "transform, left",
          filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.10))",
        }}
      />
    </div>
  );
}

// ── State derivation ──────────────────────────────────────────────────────────
function deriveState(p: number, layout: Layout): AnimState {
  const { noticeStart, approachStart, playStart, chaseStart, endStart, endFull } = BP;
  const { startX, yarnInitX, catEndX, yarnEndX } = layout;

  // ① Waiting
  if (p < noticeStart) {
    const t = invLerp(0, noticeStart, p);
    return {
      phase: "waiting",
      catImg: SVG.looking,
      catX: startX,
      catFloatY: Math.sin(t * Math.PI * 4) * 2,
      yarnX: yarnInitX,
      yarnRot: 0,
      yarnVisible: false,
      opacity: 1,
    };
  }

  // ② Noticing
  if (p < approachStart) {
    return {
      phase: "noticing",
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
  if (p < playStart) {
    const t = invLerp(approachStart, playStart, p);
    const catImg = t < 0.5 ? SVG.walk : SVG.crouch;
    return {
      phase: "approaching",
      catImg,
      catX: lerp(startX, yarnInitX - 6, t),
      catFloatY: 0,
      yarnX: yarnInitX,
      yarnRot: lerp(15, 30, t),
      yarnVisible: true,
      opacity: 1,
    };
  }

  // ④ Playing
  if (p < chaseStart) {
    const t = invLerp(playStart, chaseStart, p);
    const yarnShift = (yarnEndX - yarnInitX) * 0.25; // yarn moves a bit right
    return {
      phase: "playing",
      catImg: SVG.play,
      catX: lerp(yarnInitX - 6, yarnInitX - 4, t),
      catFloatY: 0,
      yarnX: lerp(yarnInitX, yarnInitX + yarnShift, t),
      yarnRot: t * 360 * 1.5,
      yarnVisible: true,
      opacity: 1,
    };
  }

  // ⑤ Chasing
  if (p < endStart) {
    const t = invLerp(chaseStart, endStart, p);
    const yarnShift = (yarnEndX - yarnInitX) * 0.25;
    return {
      phase: "chasing",
      catImg: SVG.walk,
      catX: lerp(yarnInitX - 4, catEndX, t),
      catFloatY: 0,
      yarnX: lerp(yarnInitX + yarnShift, yarnEndX, t),
      yarnRot: 360 * 1.5 + t * 360 * 2,
      yarnVisible: true,
      opacity: 1,
    };
  }

  // ⑥ Ending
  {
    const t = invLerp(endStart, endFull, p);
    return {
      phase: "ending",
      catImg: SVG.looking,
      catX: catEndX,
      catFloatY: 0,
      yarnX: yarnEndX,
      yarnRot: 360 * 3.5,
      yarnVisible: t < 0.5,
      opacity: lerp(1, 0, t),
    };
  }
}
