import type { NewsStory } from "../../data/news";

interface StoryImageProps {
  story: NewsStory;
  sizes: string;
  priority?: boolean;
  decorative?: boolean;
}

export function StoryImage({ story, sizes, priority = false, decorative = false }: StoryImageProps) {
  const { base, width, height, alt } = story.image;
  return (
    <img
      src={`${base}-712.webp`}
      srcSet={`${base}-420.webp 420w, ${base}-712.webp 712w`}
      sizes={sizes}
      width={width}
      height={height}
      alt={decorative ? "" : alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
