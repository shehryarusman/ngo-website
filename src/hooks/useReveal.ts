import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TARGETS = ".section .section-header, .section .grid > *, .section .cta-band, .section .feature-story";

/**
 * Fades content up once as it scrolls into view. Only elements that start
 * below the fold are hidden, so the first screen (and LCP) renders at once;
 * opacity/transform changes cause no layout shift.
 */
export function useReveal() {
  const location = useLocation();

  useEffect(() => {
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const fold = window.innerHeight;
    const pending = Array.from(document.querySelectorAll<HTMLElement>(TARGETS)).filter(
      (element) => element.getBoundingClientRect().top > fold
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove("reveal-pending");
          entry.target.classList.add("reveal-in");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );

    pending.forEach((element) => {
      // Stagger siblings in the same grid slightly.
      const position = element.parentElement?.classList.contains("grid")
        ? Array.prototype.indexOf.call(element.parentElement.children, element)
        : 0;
      element.style.setProperty("--reveal-delay", `${Math.min(position, 4) * 70}ms`);
      element.classList.add("reveal-pending");
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
      pending.forEach((element) => element.classList.remove("reveal-pending", "reveal-in"));
    };
  }, [location.pathname]);
}
