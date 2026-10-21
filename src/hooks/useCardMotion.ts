import { useEffect } from "react";

// How far (px) a card drifts toward the pointer at its edges, and how far it tilts.
const MAX_SHIFT_X = 8;
const MAX_SHIFT_Y = 6;
const MAX_TILT_X = 2.8;
const MAX_TILT_Y = 2.4;
// Cards wider than this move proportionally less, so large panels stay calm.
const FULL_MOTION_WIDTH = 480;
// Share of the remaining distance covered each frame (easing).
const EASE = 0.14;

type CardState = {
  frame: number;
  x: number;
  y: number;
  lift: number;
  targetX: number;
  targetY: number;
  targetLift: number;
};

const PROPS = ["--card-x", "--card-y", "--card-rx", "--card-ry", "--card-lift", "--shadow-x", "--shadow-y", "--gloss-x", "--gloss-y"];

/**
 * Every card leans toward the mouse: it drifts and tilts toward the pointer,
 * its shadow moves the opposite way and a soft highlight follows the cursor.
 * One set of delegated listeners covers every card on every route; each card
 * eases with its own requestAnimationFrame loop while it moves. Mouse only,
 * paused while a field inside the card has focus, and off when the visitor
 * prefers reduced motion.
 */
export function useCardMotion() {
  useEffect(() => {
    const query = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );
    if (!query.matches) {
      return;
    }

    const states = new Map<HTMLElement, CardState>();
    let active: HTMLElement | null = null;

    const render = (card: HTMLElement, s: CardState) => {
      const style = card.style;
      style.setProperty("--card-x", `${s.x.toFixed(2)}px`);
      style.setProperty("--card-y", `${(s.y - 3 * s.lift).toFixed(2)}px`);
      style.setProperty("--card-ry", `${((s.x / MAX_SHIFT_X) * MAX_TILT_X).toFixed(2)}deg`);
      style.setProperty("--card-rx", `${((-s.y / MAX_SHIFT_Y) * MAX_TILT_Y).toFixed(2)}deg`);
      style.setProperty("--card-lift", s.lift.toFixed(3));
      style.setProperty("--shadow-x", `${(-s.x * 0.7).toFixed(2)}px`);
      style.setProperty("--shadow-y", `${(-s.y * 0.5).toFixed(2)}px`);
      style.setProperty("--gloss-x", `${(50 + (s.x / MAX_SHIFT_X) * 42).toFixed(1)}%`);
      style.setProperty("--gloss-y", `${(22 + (s.y / MAX_SHIFT_Y) * 40).toFixed(1)}%`);
    };

    const step = (card: HTMLElement) => {
      const s = states.get(card);
      if (!s) return;
      s.x += (s.targetX - s.x) * EASE;
      s.y += (s.targetY - s.y) * EASE;
      s.lift += (s.targetLift - s.lift) * EASE;
      const settled =
        Math.abs(s.targetX - s.x) < 0.05 &&
        Math.abs(s.targetY - s.y) < 0.05 &&
        Math.abs(s.targetLift - s.lift) < 0.01;
      if (settled && s.targetLift === 0) {
        cancelAnimationFrame(s.frame);
        states.delete(card);
        PROPS.forEach((prop) => card.style.removeProperty(prop));
        card.classList.remove("is-moving");
        return;
      }
      render(card, s);
      s.frame = settled ? 0 : requestAnimationFrame(() => step(card));
    };

    const schedule = (card: HTMLElement, s: CardState) => {
      if (!s.frame) s.frame = requestAnimationFrame(() => step(card));
    };

    const stateFor = (card: HTMLElement) => {
      let s = states.get(card);
      if (!s) {
        s = { frame: 0, x: 0, y: 0, lift: 0, targetX: 0, targetY: 0, targetLift: 0 };
        states.set(card, s);
        card.classList.add("is-moving");
      }
      return s;
    };

    const release = (card: HTMLElement) => {
      const s = states.get(card);
      if (!s) return;
      s.targetX = 0;
      s.targetY = 0;
      s.targetLift = 0;
      schedule(card, s);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const card = (event.target as Element | null)?.closest<HTMLElement>(".card") ?? null;
      if (card !== active) {
        if (active) release(active);
        active = card;
      }
      if (!card) return;
      const s = stateFor(card);
      if (card.matches(":focus-within")) {
        s.targetX = 0;
        s.targetY = 0;
      } else {
        const rect = card.getBoundingClientRect();
        const scale = Math.min(1, FULL_MOTION_WIDTH / rect.width);
        const ratioX = Math.max(-0.5, Math.min(0.5, (event.clientX - rect.left) / rect.width - 0.5));
        const ratioY = Math.max(-0.5, Math.min(0.5, (event.clientY - rect.top) / rect.height - 0.5));
        s.targetX = ratioX * 2 * MAX_SHIFT_X * scale;
        s.targetY = ratioY * 2 * MAX_SHIFT_Y * scale;
      }
      s.targetLift = 1;
      schedule(card, s);
    };

    // Typing into a field must not happen on a tilted card.
    const onFocusIn = (event: FocusEvent) => {
      const card = (event.target as Element | null)?.closest<HTMLElement>(".card");
      const s = card && states.get(card);
      if (!card || !s) return;
      s.targetX = 0;
      s.targetY = 0;
      schedule(card, s);
    };

    const onLeaveWindow = () => {
      if (active) release(active);
      active = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("focusin", onFocusIn);
    document.documentElement.addEventListener("pointerleave", onLeaveWindow);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("focusin", onFocusIn);
      document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
      states.forEach((s, card) => {
        cancelAnimationFrame(s.frame);
        PROPS.forEach((prop) => card.style.removeProperty(prop));
        card.classList.remove("is-moving");
      });
      states.clear();
    };
  }, []);
}
