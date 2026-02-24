import { HTMLAttributes } from "react";

type CardTag = "article" | "section" | "div";

interface BentoCardProps extends HTMLAttributes<HTMLElement> {
  as?: CardTag;
}

export function BentoCard({
  as = "article",
  className,
  children,
  ...rest
}: BentoCardProps) {
  const Element = as;

  return (
    <Element className={["bento-card", className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </Element>
  );
}
