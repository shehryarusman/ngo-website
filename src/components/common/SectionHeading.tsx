interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  level?: 1 | 2;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  level = 2,
}: SectionHeadingProps) {
  const Heading = level === 1 ? "h1" : "h2";

  return (
    <header className="section-heading section-heading-card bento-card reveal">
      <p className="eyebrow">{eyebrow}</p>
      <Heading>{title}</Heading>
      <p>{description}</p>
    </header>
  );
}
