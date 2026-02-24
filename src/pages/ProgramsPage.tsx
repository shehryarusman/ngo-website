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
        eyebrow="Programs"
        title="Integrated programs designed for real delivery."
        description="Our portfolio combines healthcare, education, infrastructure, and livelihoods to address linked community needs."
        imageSrc="https://images.unsplash.com/photo-1527525443983-6e60c75fff46?auto=format&fit=crop&w=1800&q=88"
        imageAlt="Program team in field"
        primaryCta={{ label: "Support Programs", to: "/donate" }}
        secondaryCta={{ label: "See Outcomes", to: "/impact" }}
        rightContent={
          <>
            <p className="eyebrow">Model</p>
            <h3>Country Portfolio Structure</h3>
            <p>
              Every country implementation plan includes local partners,
              measurable KPIs, and annual review milestones.
            </p>
          </>
        }
      />

      <section className="section-block">
        <SectionHeading
          eyebrow="Program Areas"
          title="Core Delivery Streams"
          description="Each program line has dedicated teams, budget controls, and impact measurement."
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

      <section className="section-block">
        <div className="bento-grid">
          <BentoCard className="wide-cta-card reveal">
            <p className="eyebrow">Implementation Approach</p>
            <h2>Program teams coordinate through shared field operations.</h2>
            <p>
              Health, education, and livelihoods leads work from one country
              operations model to reduce overhead and improve continuity.
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
    </main>
  );
}
