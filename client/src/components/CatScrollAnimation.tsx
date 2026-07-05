/**
 * CatScrollAnimation
 * ─────────────────────────────────────────────────────────────────────────────
 * Design: Warm / Family / Love  — subtle playful delight, never distracting.
 * The animation lives in a fixed bottom bar and syncs with scroll progress.
 *
 * Phases (by scroll progress 0→1):
 *   0.00–0.08  ① Waiting   – cat_looking  (idle, gentle float)
 *   0.08–0.18  ② Noticing  – cat_tilt     (head tilt, yarn appears)
 *   0.18–0.33  ③ Approach  – cat_walk → cat_crouch (moves toward yarn)
 *   0.33–0.52  ④ Playing   – cat_play     (paw tap, yarn spins)
 *   0.52–0.78  ⑤ Chasing   – cat_walk     (bouncy walk, yarn rolls right)
 *   0.78–0.95  ⑥ End       – cat_looking  (stop at right, fade out)
 */

import { useEffect, useRef, useState, useCallback } from "react";

// ── SVG URLs ─────────────────────────────────────────────────────────────────
const SVG = {
  looking: "/manus-storage/cat_looking_fb4122c1.svg",
  tilt:    "/manus-storage/cat_tilt_3c488fbf.svg",
  crouch:  "/manus-storage/cat_crouch_f0966e6a.svg",
  play:    "/manus-storage/cat_play_0325d088.svg",
  walk:    "/manus-storage/cat_walk_e6491b71.svg",
  yarn:    "/manus-storage/yarn_ball_ead1f937.svg",
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * clamp01(t);
const invLerp = (inMin: number, inMax: number, v: number) =>
  inMax === inMin ? 0 : clamp01((v - inMin) / (inMax - inMin));

// ── Types ─────────────────────────────────────────────────────────────────────
type Phase = "waiting" | "noticing" | "approaching" | "playing" | "chasing" | "ending";

interface AnimState {
  phase: Phase;
  catImg: string;
  catX: number;        // % of container width
  catY: number;        // px offset upward from baseline
  yarnX: number;       // % of container width
  yarnRot: number;     // degrees
  yarnVisible: boolean;
  opacity: number;
}

// ── Breakpoints ───────────────────────────────────────────────────────────────
const BP = {
  noticeStart:   0.08,
  approachStart: 0.18,
  playStart:     0.33,
  chaseStart:    0.52,
  endStart:      0.78,
  endFull:       0.95,
};

// ── Main Component ────────────────────────────────────────────────────────────
export default function CatScrollAnimation() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef<number | null>(null);
  const lastScrollRef = useRef(0);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll listener with RAF throttle
  const handleScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? clamp01(scrollTop / docHeight) : 0;
      if (Math.abs(progress - lastScrollRef.current) > 0.001) {
        lastScrollRef.current = progress;
        setScrollProgress(progress);
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Derive animation state
  const state = deriveState(scrollProgress, isMobile);

  const catSize  = isMobile ? 64  : 90;
  const yarnSize = isMobile ? 40  : 56;

  // Bounce Y for chasing phase
  const bounceY = state.phase === "chasing"
    ? Math.sin(scrollProgress * 80) * 4
    : 0;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: isMobile ? 72 : 96,
        pointerEvents: "none",
        zIndex: 40,
        opacity: state.opacity,
        transition: "opacity 0.8s ease",
        background: "linear-gradient(to top, rgba(255,248,240,0.85) 60%, transparent 100%)",
        backdropFilter: "blur(2px)",
      }}
    >
      {/* Yarn ball */}
      {state.yarnVisible && (
        <img
          src={SVG.yarn}
          alt=""
          style={{
            position: "absolute",
            bottom: isMobile ? 8 : 12,
            left: `${state.yarnX}%`,
            width: yarnSize,
            height: yarnSize,
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
          bottom: isMobile ? 4 : 8,
          left: `${state.catX}%`,
          width: catSize,
          height: catSize,
          objectFit: "contain",
          transform: `translateX(-50%) translateY(${-(state.catY + bounceY)}px)`,
          transition: "left 0.5s cubic-bezier(0.23,1,0.32,1)",
          willChange: "transform, left",
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.12))",
        }}
      />
    </div>
  );
}

// ── State derivation (pure function) ─────────────────────────────────────────
function deriveState(p: number, isMobile: boolean): AnimState {
  const {
    noticeStart, approachStart, playStart, chaseStart, endStart, endFull,
  } = BP;

  const startX    = isMobile ? 10 : 7;
  const yarnInitX = isMobile ? 26 : 20;
  const catEndX   = isMobile ? 78 : 76;
  const yarnEndX  = isMobile ? 90 : 88;

  // ① Waiting
  if (p < noticeStart) {
    const t = invLerp(0, noticeStart, p);
    const floatY = Math.sin(t * Math.PI * 4) * 2;
    return {
      phase: "waiting",
      catImg: SVG.looking,
      catX: startX,
      catY: floatY,
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
      catY: 0,
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
    const catX = lerp(startX, yarnInitX - (isMobile ? 8 : 6), t);
    return {
      phase: "approaching",
      catImg,
      catX,
      catY: 0,
      yarnX: yarnInitX,
      yarnRot: lerp(15, 30, t),
      yarnVisible: true,
      opacity: 1,
    };
  }

  // ④ Playing
  if (p < chaseStart) {
    const t = invLerp(playStart, chaseStart, p);
    const yarnRot = t * 360 * 1.5;
    const yarnX = lerp(yarnInitX, yarnInitX + (isMobile ? 12 : 10), t);
    const catX = lerp(yarnInitX - (isMobile ? 8 : 6), yarnInitX - (isMobile ? 6 : 4), t);
    return {
      phase: "playing",
      catImg: SVG.play,
      catX,
      catY: 0,
      yarnX,
      yarnRot,
      yarnVisible: true,
      opacity: 1,
    };
  }

  // ⑤ Chasing
  if (p < endStart) {
    const t = invLerp(chaseStart, endStart, p);
    const yarnStartX = yarnInitX + (isMobile ? 12 : 10);
    const catStartX  = yarnInitX - (isMobile ? 6 : 4);
    const yarnRot    = 360 * 1.5 + t * 360 * 2;
    return {
      phase: "chasing",
      catImg: SVG.walk,
      catX: lerp(catStartX, catEndX, t),
      catY: 0,
      yarnX: lerp(yarnStartX, yarnEndX, t),
      yarnRot,
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
      catY: 0,
      yarnX: yarnEndX,
      yarnRot: 360 * 3.5,
      yarnVisible: t < 0.5,
      opacity: lerp(1, 0, t),
    };
  }
}
