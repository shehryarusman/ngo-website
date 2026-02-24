import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BentoCard } from "../components/common/BentoCard";
import { ParallaxImage } from "../components/common/ParallaxImage";
import { SectionHeading } from "../components/common/SectionHeading";
import { homeMetrics, priorities } from "../data/siteContent";

const featuredImages = [
  {
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=88",
    alt: "Healthcare team supporting a patient",
  },
  {
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=88",
    alt: "Students in classroom",
  },
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=88",
    alt: "Community planning workshop",
  },
];

const rotatingInsights = [
  ...homeMetrics.map((metric) => ({
    id: `metric-${metric.value}`,
    banner: "Live Metric",
    title: metric.value,
    detail: metric.label,
  })),
  ...priorities.map((priority) => ({
    id: `priority-${priority.title}`,
    banner: "Strategic Priority",
    title: priority.title,
    detail: priority.description,
  })),
];

const pageLinkCards = [
  {
    title: "About The Organization",
    description: "Governance model, leadership, and operational principles.",
    cta: "Open About",
    to: "/about",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=88",
  },
  {
    title: "Programs",
    description: "Full portfolio across health, education, and livelihoods.",
    cta: "Open Programs",
    to: "/programs",
    image:
      "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?auto=format&fit=crop&w=1600&q=88",
  },
  {
    title: "Stories",
    description: "Real community outcomes and program case narratives.",
    cta: "Open Stories",
    to: "/stories",
    image:
      "https://images.unsplash.com/photo-1487980965255-d3b416303d12?auto=format&fit=crop&w=1600&q=88",
  },
  {
    title: "Contact And Partnerships",
    description: "Institutional collaboration and field support channels.",
    cta: "Contact Team",
    to: "/contact",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=88",
  },
];

export function HomePage() {
  const [activeInsightIndex, setActiveInsightIndex] = useState(0);
  const activeInsight = rotatingInsights[activeInsightIndex];

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveInsightIndex(
        (previous) => (previous + 1) % rotatingInsights.length
      );
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <main className="page-container">
      <section className="bento-grid landing-hero-grid">
        <BentoCard className="landing-hero-card reveal">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=2400&q=88"
            alt="Community healthcare outreach in the field"
            intensity={22}
          />
          <div className="landing-hero-overlay">
            <p className="eyebrow">Global Hope Initiative</p>
            <h1>Professional humanitarian delivery with measurable outcomes.</h1>
            <p>
              We design long-horizon health, education, and livelihoods
              programs with local institutions and strict governance.
            </p>
            <div className="button-row">
              <Link className="btn btn-primary" to="/donate">
                Support The Mission
              </Link>
              <Link className="btn btn-soft" to="/about">
                Why Our Model Works
              </Link>
            </div>
          </div>
        </BentoCard>

        <BentoCard className="landing-side-card reveal">
          <p className="eyebrow">Current Cycle</p>
          <h3>2026 Field Expansion</h3>
          <p>
            Programs are scaling in maternal health, school continuity, and
            clean water infrastructure under multi-year local partnerships.
          </p>
        </BentoCard>
      </section>

      <section className="section-block home-information-intro">
        <BentoCard className="home-briefing-card reveal">
          <p className="eyebrow">Operational Briefing</p>
          <h2>Scroll to explore programs, outcomes, and implementation depth.</h2>
          <p>
            The sections below provide a full operational view of our NGO:
            strategy, performance, stories, partnerships, and contribution paths.
          </p>
        </BentoCard>
      </section>

      <section className="section-block">
        <div className="bento-grid insight-linked-grid">
          <SectionHeading
            eyebrow="Program Intelligence"
            title="Live Snapshot And Strategic Focus"
            description="A rotating briefing feed combines hard metrics and priority updates from current delivery cycles."
          />
          <BentoCard className="insight-rotator-card reveal">
            <p className="insight-banner">{activeInsight.banner}</p>
            <div key={activeInsight.id} className="insight-rotator-content">
              <h3>{activeInsight.title}</h3>
              <p>{activeInsight.detail}</p>
            </div>
            <div className="insight-controls" aria-label="Insight selector">
              {rotatingInsights.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={
                    index === activeInsightIndex
                      ? "insight-dot active"
                      : "insight-dot"
                  }
                  onClick={() => setActiveInsightIndex(index)}
                  aria-label={`Show ${item.title}`}
                />
              ))}
            </div>
          </BentoCard>
          <BentoCard className="insight-action-card reveal">
            <p className="eyebrow">Action</p>
            <h3>Move From Insight To Impact</h3>
            <p>Support programs with transparent, trackable outcomes.</p>
            <Link className="btn btn-primary" to="/donate">
              Fund Active Programs
            </Link>
          </BentoCard>
        </div>
      </section>

      <section className="section-block">
        <SectionHeading
          eyebrow="In The Field"
          title="Operational Context"
          description="A visual view of healthcare, education, and local implementation work."
        />
        <div className="bento-grid media-gallery-grid">
          {featuredImages.map((image, index) => (
            <BentoCard key={image.src} className="gallery-card reveal">
              <ParallaxImage
                src={image.src}
                alt={image.alt}
                intensity={14 + index * 4}
              />
            </BentoCard>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="bento-grid page-links-grid">
          {pageLinkCards.map((card) => (
            <BentoCard key={card.title} className="page-link-card reveal">
              <div className="page-link-media">
                <ParallaxImage
                  src={card.image}
                  alt={card.title}
                  intensity={26}
                />
              </div>
              <div className="page-link-copy">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
              <Link className="btn btn-primary page-link-cta" to={card.to}>
                {card.cta}
              </Link>
            </BentoCard>
          ))}
        </div>
      </section>
    </main>
  );
}
