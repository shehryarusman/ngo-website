import { Link } from "react-router-dom";
import { BentoCard } from "../components/common/BentoCard";
import { PageHero } from "../components/common/PageHero";
import { ParallaxImage } from "../components/common/ParallaxImage";
import { SectionHeading } from "../components/common/SectionHeading";
import { programAreas } from "../data/siteContent";

export function ProgramsPage() {
  return (
    <main className="page-container">
      <PageHero
        eyebrow="What We Do"
        title="Programs that connect students to real opportunity."
        description="Our portfolio begins with research internships, arts preparation, mentorship, and community-based educational support."
        imageSrc="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1800&q=84"
        imageAlt="Students working in a science laboratory"
        primaryCta={{ label: "Support Programs", to: "/donate" }}
        secondaryCta={{ label: "See How We Work", to: "/impact" }}
        rightContent={
          <>
            <p className="eyebrow">Model</p>
            <h3>Partner-Led Access</h3>
            <p>
              Each program is built with educational institutions and community
              spaces so participation is practical, accountable, and meaningful.
            </p>
          </>
        }
      />

      <section id="areas" className="section-block">
        <SectionHeading
          eyebrow="Areas"
          title="Core Program Areas"
          description="Each area is designed for clear student benefit, partner accountability, and future reporting."
        />
        <div className="bento-grid program-areas-grid">
          {programAreas.map((area, index) => (
            <BentoCard key={area.title} className="program-area-card reveal">
              <div className="program-area-media">
                <ParallaxImage
                  src={area.image}
                  alt={area.title}
                  intensity={12 + index}
                />
              </div>
              <h3>{area.title}</h3>
              <p>{area.summary}</p>
            </BentoCard>
          ))}
        </div>
      </section>

      <section id="programs" className="section-block">
        <div className="bento-grid">
          <BentoCard id="internship" className="wide-cta-card reveal">
            <p className="eyebrow">Implementation Approach</p>
            <h2>Internship program</h2>
            <p>
              ARISE's first active program welcomes students into a structured
              summer research experience with hands-on laboratory exposure,
              mentorship, and clear expectations for professional growth.
            </p>
            <div className="button-row">
              <Link className="btn btn-primary" to="/contact">
                Discuss Partnership
              </Link>
              <Link className="btn btn-soft" to="/donate">
                Fund A Program Area
              </Link>
            </div>
          </BentoCard>
        </div>
      </section>

      <section id="locations-history" className="section-block">
        <SectionHeading
          eyebrow="Locations & History"
          title="Programs are shaped by trusted partnerships."
          description="ARISE is beginning with focused local collaborations and a summer 2026 research opening."
        />
        <div className="bento-grid timeline-grid">
          {[
            [
              "Philadelphia Region",
              "Initial programming centers on accessible education, science, and research-based opportunity.",
            ],
            [
              "Penn Research Access",
              "Students are welcomed into a hands-on mRNA research environment during the summer 2026 opening.",
            ],
            [
              "Community Spaces",
              "Local partners help identify, prepare, and support students across arts and science pathways.",
            ],
            [
              "2025-2026",
              "ARISE launches from governance formation into its first active student-facing programs.",
            ],
          ].map(([title, detail]) => (
            <BentoCard key={title} className="timeline-card reveal">
              <h3>{title}</h3>
              <p>{detail}</p>
            </BentoCard>
          ))}
        </div>
      </section>
    </main>
  );
}
