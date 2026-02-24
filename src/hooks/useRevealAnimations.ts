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
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        threshold: [0, 0.01],
        rootMargin: "0px",
      }
    );

    revealElements.forEach((element) => {
      element.classList.remove("visible");
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [location.pathname]);
}
