import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useButtonInteractivity() {
  const location = useLocation();

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      return;
    }

    const buttons = Array.from(document.querySelectorAll<HTMLElement>(".btn"));
    const cleanups: Array<() => void> = [];

    buttons.forEach((button) => {
      let frameId = 0;
      let targetShiftX = 0;
      let targetShiftY = 0;
      let currentShiftX = 0;
      let currentShiftY = 0;
      let targetScale = 1;
      let currentScale = 1;

      const animate = () => {
        currentShiftX += (targetShiftX - currentShiftX) * 0.26;
        currentShiftY += (targetShiftY - currentShiftY) * 0.26;
        currentScale += (targetScale - currentScale) * 0.22;

        button.style.setProperty("--btn-shift-x", `${currentShiftX.toFixed(2)}px`);
        button.style.setProperty("--btn-shift-y", `${currentShiftY.toFixed(2)}px`);
        button.style.setProperty("--btn-scale", `${currentScale.toFixed(3)}`);

        const isSettled =
          Math.abs(targetShiftX - currentShiftX) < 0.05 &&
          Math.abs(targetShiftY - currentShiftY) < 0.05 &&
          Math.abs(targetScale - currentScale) < 0.004;

        if (isSettled) {
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

      const handleMouseEnter = () => {
        const rect = button.getBoundingClientRect();
        button.style.setProperty("--btn-mx", `${(rect.width / 2).toFixed(2)}px`);
        button.style.setProperty("--btn-my", `${(rect.height / 2).toFixed(2)}px`);
        targetScale = 1.01;
        schedule();
      };

      const handleMouseMove = (event: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        const localX = event.clientX - rect.left;
        const localY = event.clientY - rect.top;
        const ratioX = localX / rect.width - 0.5;
        const ratioY = localY / rect.height - 0.5;

        button.style.setProperty("--btn-mx", `${localX.toFixed(2)}px`);
        button.style.setProperty("--btn-my", `${localY.toFixed(2)}px`);
        targetShiftX = ratioX * 3.2;
        targetShiftY = ratioY * 2.6;
        targetScale = 1.024;
        schedule();
      };

      const handleMouseLeave = () => {
        targetShiftX = 0;
        targetShiftY = 0;
        targetScale = 1;
        schedule();
      };

      button.addEventListener("mouseenter", handleMouseEnter);
      button.addEventListener("mousemove", handleMouseMove);
      button.addEventListener("mouseleave", handleMouseLeave);

      cleanups.push(() => {
        if (frameId !== 0) {
          window.cancelAnimationFrame(frameId);
        }
        button.style.removeProperty("--btn-mx");
        button.style.removeProperty("--btn-my");
        button.style.removeProperty("--btn-shift-x");
        button.style.removeProperty("--btn-shift-y");
        button.style.removeProperty("--btn-scale");
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mousemove", handleMouseMove);
        button.removeEventListener("mouseleave", handleMouseLeave);
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [location.pathname]);
}
