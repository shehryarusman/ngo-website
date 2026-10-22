import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TARGETS = ".section .section-header, .section .grid > *, .section .cta-band, .section .feature-story";

/**
 * Fades content up as it scrolls into view, and again each time it is
 * scrolled back down to. Only elements that start below the fold are hidden,
 * so the first screen (and LCP) renders at once; opacity/transform changes
 * cause no layout shift.
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

    // Shows an element once it is a little way into the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove("reveal-pending");
          entry.target.classList.add("reveal-in");
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );

    // Hides it again once it has left through the bottom of the viewport, so
    // it fades in on the next scroll down. Elements that leave through the
    // top stay shown. A separate observer, because the one above reports its
    // boundary 8% above the bottom edge, not at it.
    const resetObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const bottom = entry.rootBounds?.bottom ?? window.innerHeight;
        if (entry.isIntersecting || entry.boundingClientRect.top < bottom) return;
        entry.target.classList.remove("reveal-in");
        entry.target.classList.add("reveal-pending");
      });
    });

    pending.forEach((element) => {
      // Stagger siblings in the same grid slightly.
      const position = element.parentElement?.classList.contains("grid")
        ? Array.prototype.indexOf.call(element.parentElement.children, element)
        : 0;
      element.style.setProperty("--reveal-delay", `${Math.min(position, 4) * 70}ms`);
      element.classList.add("reveal-pending");
      observer.observe(element);
      resetObserver.observe(element);
    });

    return () => {
      observer.disconnect();
      resetObserver.disconnect();
      pending.forEach((element) => element.classList.remove("reveal-pending", "reveal-in"));
    };
  }, [location.pathname]);
}
