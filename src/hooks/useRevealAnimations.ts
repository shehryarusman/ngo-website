import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useRevealAnimations() {
  const location = useLocation();

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal")
    );

    if (reduceMotion) {
      revealElements.forEach((element) => element.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          const isVisible = target.classList.contains("visible");

          if (!isVisible && entry.intersectionRatio >= 0.24) {
            entry.target.classList.add("visible");
          } else if (isVisible && entry.intersectionRatio <= 0.08) {
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        threshold: [0, 0.08, 0.18, 0.24, 0.4, 0.65, 1],
        rootMargin: "0px 0px -2% 0px",
      }
    );

    revealElements.forEach((element) => {
      element.classList.remove("visible");
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [location.pathname]);
}
