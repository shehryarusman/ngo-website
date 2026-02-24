import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useCardInteractivity() {
  const location = useLocation();

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      return;
    }

    const cards = Array.from(document.querySelectorAll<HTMLElement>(".bento-card"));
    const cleanups: Array<() => void> = [];

    cards.forEach((card) => {
      let frameId = 0;
      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;
      let targetLift = 0;
      let currentLift = 0;
      let isHovering = false;
      let startX = 0;
      let startY = 0;
      const hoverSettleY = 4;

      const animate = () => {
        currentX += (targetX - currentX) * 0.14;
        currentY += (targetY - currentY) * 0.14;
        currentLift += (targetLift - currentLift) * 0.16;

        card.style.setProperty("--card-move-x", `${currentX.toFixed(2)}px`);
        card.style.setProperty("--card-move-y", `${currentY.toFixed(2)}px`);
        const tiltX = Math.max(-2.8, Math.min(2.8, currentX * 0.18));
        const tiltY = Math.max(-2.4, Math.min(2.4, -currentY * 0.15));
        card.style.setProperty("--card-tilt-x", `${tiltX.toFixed(2)}deg`);
        card.style.setProperty("--card-tilt-y", `${tiltY.toFixed(2)}deg`);
        card.style.setProperty("--card-lift", `${currentLift.toFixed(2)}px`);

        const nearX = Math.max(-12, Math.min(12, -currentX * 0.7));
        const nearY = 14 + currentY * 1.1 + currentLift * 0.8;
        const farX = Math.max(-20, Math.min(20, -currentX * 1.35));
        const farY = 34 + currentY * 1.8 + currentLift * 1.5;
        card.style.setProperty("--card-shadow-near-x", `${nearX.toFixed(2)}px`);
        card.style.setProperty("--card-shadow-near-y", `${nearY.toFixed(2)}px`);
        card.style.setProperty("--card-shadow-far-x", `${farX.toFixed(2)}px`);
        card.style.setProperty("--card-shadow-far-y", `${farY.toFixed(2)}px`);

        const glossX = Math.max(8, Math.min(92, 50 + currentX * 2.4));
        const glossY = Math.max(4, Math.min(84, 22 + currentY * 1.5));
        card.style.setProperty("--card-gloss-x", `${glossX.toFixed(2)}%`);
        card.style.setProperty("--card-gloss-y", `${glossY.toFixed(2)}%`);

        const xDiff = Math.abs(targetX - currentX);
        const yDiff = Math.abs(targetY - currentY);
        const liftDiff = Math.abs(targetLift - currentLift);

        if (xDiff < 0.08 && yDiff < 0.08 && liftDiff < 0.08) {
          frameId = 0;
          return;
        }

        frameId = window.requestAnimationFrame(animate);
      };

      const schedule = () => {
        if (frameId !== 0) {
          return;
        }
        frameId = window.requestAnimationFrame(animate);
      };

      const handleMouseEnter = (event: MouseEvent) => {
        isHovering = true;
        startX = event.clientX;
        startY = event.clientY;
        targetX = 0;
        targetY = hoverSettleY;
        targetLift = 7;
        schedule();
      };

      const handleMouseMove = (event: MouseEvent) => {
        if (!isHovering) {
          return;
        }

        const rect = card.getBoundingClientRect();
        const dx = (event.clientX - startX) / rect.width;
        const dy = (event.clientY - startY) / rect.height;

        targetX = Math.max(-11, Math.min(11, dx * 20));
        targetY = Math.max(-2, Math.min(12, hoverSettleY + dy * 16));
        schedule();
      };

      const handleMouseLeave = () => {
        isHovering = false;
        targetX = 0;
        targetY = 0;
        targetLift = 0;
        schedule();
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);

      cleanups.push(() => {
        if (frameId !== 0) {
          window.cancelAnimationFrame(frameId);
        }
        card.style.setProperty("--card-lift", "0px");
        card.style.setProperty("--card-tilt-x", "0deg");
        card.style.setProperty("--card-tilt-y", "0deg");
        card.style.setProperty("--card-shadow-near-x", "0px");
        card.style.setProperty("--card-shadow-near-y", "14px");
        card.style.setProperty("--card-shadow-far-x", "0px");
        card.style.setProperty("--card-shadow-far-y", "34px");
        card.style.setProperty("--card-gloss-x", "40%");
        card.style.setProperty("--card-gloss-y", "16%");
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [location.pathname]);
}
