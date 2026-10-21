import { useEffect } from "react";

// Matches the hover styles in styles.css: tiles move, large panels don't.
const TILE = ".grid > .card:not(.span-all), .card--link";

// How far (px) a card drifts toward the pointer at its edges.
const MAX_SHIFT_X = 8;
const MAX_SHIFT_Y = 6;

/**
 * Cards drift toward the mouse: on entry they lean toward the edge the pointer
 * came in from, then follow it while it moves. One set of delegated listeners
 * covers every tile on every route; the motion itself is a CSS transition
 * on `translate`, so nothing animates in JavaScript. Mouse only, and off when
 * the visitor prefers reduced motion.
 */
export function useCardMotion() {
  useEffect(() => {
    const query = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );
    if (!query.matches) {
      return;
    }

    let active: HTMLElement | null = null;
    let frame = 0;
    let lastX = 0;
    let lastY = 0;

    const apply = () => {
      frame = 0;
      if (!active) return;
      const rect = active.getBoundingClientRect();
      const ratioX = Math.max(-0.5, Math.min(0.5, (lastX - rect.left) / rect.width - 0.5));
      const ratioY = Math.max(-0.5, Math.min(0.5, (lastY - rect.top) / rect.height - 0.5));
      active.style.setProperty("--card-x", `${(ratioX * 2 * MAX_SHIFT_X).toFixed(2)}px`);
      active.style.setProperty("--card-y", `${(ratioY * 2 * MAX_SHIFT_Y - 3).toFixed(2)}px`);
    };

    const release = (card: HTMLElement) => {
      card.style.removeProperty("--card-x");
      card.style.removeProperty("--card-y");
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const card = (event.target as Element | null)?.closest<HTMLElement>(TILE) ?? null;
      if (card !== active) {
        if (active) release(active);
        active = card;
      }
      if (!active) return;
      lastX = event.clientX;
      lastY = event.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeaveWindow = () => {
      if (active) release(active);
      active = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeaveWindow);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      if (active) release(active);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
    };
  }, []);
}
