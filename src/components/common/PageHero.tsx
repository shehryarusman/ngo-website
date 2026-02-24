import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { BentoCard } from "./BentoCard";
import { ParallaxImage } from "./ParallaxImage";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  primaryCta?: {
    label: string;
    to: string;
  };
  secondaryCta?: {
    label: string;
    to: string;
  };
  rightContent?: ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  primaryCta,
  secondaryCta,
  rightContent,
}: PageHeroProps) {
  return (
    <section className="bento-grid page-hero">
      <BentoCard className="hero-main reveal">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
        {primaryCta || secondaryCta ? (
          <div className="button-row">
            {primaryCta ? (
              <Link className="btn btn-primary" to={primaryCta.to}>
                {primaryCta.label}
              </Link>
            ) : null}
            {secondaryCta ? (
              <Link className="btn btn-soft" to={secondaryCta.to}>
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        ) : null}
      </BentoCard>
      <BentoCard className="hero-image reveal">
        <ParallaxImage src={imageSrc} alt={imageAlt} intensity={30} />
      </BentoCard>
      <BentoCard className="hero-side reveal">{rightContent}</BentoCard>
    </section>
  );
}
