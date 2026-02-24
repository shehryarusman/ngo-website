import { useEffect, useRef, useState } from "react";

interface ParallaxImageProps {
  src: string;
  alt: string;
  intensity?: number;
  className?: string;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=88";

export function ParallaxImage({
  src,
  alt,
  intensity = 34,
  className,
}: ParallaxImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const frameRef = useRef<number>(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const targetOpacityRef = useRef(0);
  const currentOpacityRef = useRef(0);
  const [resolvedSrc, setResolvedSrc] = useState(src);

  useEffect(() => {
    setResolvedSrc(src);
  }, [src]);

  useEffect(() => {
    if (!imageRef.current) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      const image = imageRef.current;
      image.style.setProperty("--parallax-opacity", "1");
      image.style.setProperty("--parallax-y", "0px");
      image.style.setProperty("--parallax-scale", "1.02");
      image.style.setProperty("--parallax-brightness", "1");
      image.style.objectPosition = "center 50%";
      return;
    }

    const animate = () => {
      const image = imageRef.current;
      if (!image) {
        frameRef.current = 0;
        return;
      }

      const diff = targetRef.current - currentRef.current;
      currentRef.current += diff * 0.22;

      const offset = currentRef.current;
      const maxOffset = intensity * 1.8;
      const scale = 1.08 + (maxOffset - Math.abs(offset)) * 0.0012;
      const brightness = 0.94 + (maxOffset - Math.abs(offset)) * 0.0021;
      const opacityDiff = targetOpacityRef.current - currentOpacityRef.current;
      currentOpacityRef.current += opacityDiff * 0.2;

      image.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
      image.style.setProperty("--parallax-scale", `${scale.toFixed(3)}`);
      image.style.setProperty("--parallax-brightness", `${brightness.toFixed(3)}`);
      image.style.setProperty(
        "--parallax-opacity",
        `${currentOpacityRef.current.toFixed(3)}`
      );
      image.style.objectPosition = `center ${(50 + offset * 1.4).toFixed(2)}%`;

      if (Math.abs(diff) < 0.05 && Math.abs(opacityDiff) < 0.02) {
        frameRef.current = 0;
        return;
      }

      frameRef.current = window.requestAnimationFrame(animate);
    };

    const updateTarget = () => {
      const image = imageRef.current;
      if (!image) {
        return;
      }

      const stableContainer = image.parentElement ?? image;
      const rect = stableContainer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const travel = viewportHeight + rect.height;
      const progress = (viewportHeight - rect.top) / travel;
      const normalized = (0.5 - progress) * 2;
      const maxOffset = intensity * 1.8;
      targetRef.current = Math.max(
        Math.min(normalized * maxOffset, maxOffset),
        -maxOffset
      );

      const visiblePixels = Math.max(
        0,
        Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)
      );
      const maxVisiblePixels = Math.min(rect.height, viewportHeight);

      if (visiblePixels <= 0 || maxVisiblePixels <= 0) {
        targetOpacityRef.current = 0;
      } else {
        if (rect.height > viewportHeight) {
          targetOpacityRef.current = 1;
        } else {
          const hiddenTop = Math.max(0, -rect.top);
          const hiddenBottom = Math.max(0, rect.bottom - viewportHeight);
          const clipped = Math.max(hiddenTop, hiddenBottom);
          const fadeDistance = Math.max(70, Math.min(190, rect.height * 0.36));
          const fadeProgress = Math.max(0, Math.min(1, clipped / fadeDistance));
          targetOpacityRef.current = 1 - fadeProgress;
        }
      }

      if (frameRef.current === 0) {
        frameRef.current = window.requestAnimationFrame(animate);
      }
    };

    updateTarget();
    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", updateTarget, { passive: true });

    return () => {
      if (frameRef.current !== 0) {
        window.cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", updateTarget);
    };
  }, [intensity]);

  return (
    <img
      ref={imageRef}
      src={resolvedSrc}
      alt={alt}
      loading="lazy"
      onError={() => setResolvedSrc(FALLBACK_IMAGE)}
      className={["parallax-image", className].filter(Boolean).join(" ")}
    />
  );
}
