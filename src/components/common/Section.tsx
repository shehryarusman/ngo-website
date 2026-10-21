import { ReactNode } from "react";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: ReactNode;
  /** "tint" renders a full-width white band to separate sections. */
  tone?: "default" | "tint";
  children?: ReactNode;
  className?: string;
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  tone = "default",
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={["section", tone === "tint" ? "section--tint" : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="container">
        {eyebrow || title || intro ? (
          <header className="section-header">
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            {title ? <h2>{title}</h2> : null}
            {intro ? <div className="section-intro">{intro}</div> : null}
          </header>
        ) : null}
        {children}
      </div>
    </section>
  );
}
