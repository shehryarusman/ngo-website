import { photos, type PhotoName } from "../../data/images";

interface PictureProps {
  name: PhotoName;
  /** Override the default alt text; pass "" for decorative images. */
  alt?: string;
  /** Rendered width hint for the browser, e.g. "(min-width: 960px) 50vw, 100vw". */
  sizes?: string;
  /** Above-the-fold images load eagerly; everything else is lazy. */
  priority?: boolean;
  className?: string;
}

export function Picture({
  name,
  alt,
  sizes = "(min-width: 960px) 50vw, 100vw",
  priority = false,
  className,
}: PictureProps) {
  const photo = photos[name];

  return (
    <img
      className={className}
      src={`/images/${name}-1600.webp`}
      srcSet={`/images/${name}-800.webp 800w, /images/${name}-1200.webp 1200w, /images/${name}-1600.webp 1600w, /images/${name}-2400.webp 2400w`}
      sizes={sizes}
      width={photo.width}
      height={photo.height}
      alt={alt ?? photo.alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
