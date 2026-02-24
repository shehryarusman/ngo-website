import { BentoCard } from "../components/common/BentoCard";
import { PageHero } from "../components/common/PageHero";
import { ParallaxImage } from "../components/common/ParallaxImage";
import { SectionHeading } from "../components/common/SectionHeading";
import { aboutValues, leadership } from "../data/siteContent";

const timeline = [
  {
    year: "2015",
    detail: "Organization founded with a rural maternal healthcare initiative.",
  },
  {
    year: "2018",
    detail: "Education continuity program launched across 3 regions.",
  },
  {
    year: "2021",
    detail: "Unified impact measurement and donor reporting platform deployed.",
  },
  {
    year: "2024",
    detail: "Cross-country livelihoods strategy expanded to 12 countries.",
  },
];

export function AboutPage() {
  return (
    <main className="page-container">
      <PageHero
        eyebrow="About"
        title="Built for accountability, not optics."
        description="We are an independent NGO focused on durable social outcomes through long-term partnerships, program discipline, and transparent reporting."
        imageSrc="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=88"
        imageAlt="Team meeting in field office"
        primaryCta={{ label: "Read Impact", to: "/impact" }}
        secondaryCta={{ label: "View Programs", to: "/programs" }}
        rightContent={
          <>
            <p className="eyebrow">Compliance</p>
            <h3>Governance Standards</h3>
            <p>
              Independent audits, safeguarding controls, and quarterly finance
              disclosures guide our operations.
            </p>
          </>
        }
      />

      <section className="section-block">
        <SectionHeading
          eyebrow="Principles"
          title="How We Operate"
          description="Field execution decisions are shaped by evidence, local leadership, and strict governance."
        />
        <div className="bento-grid value-grid">
          {aboutValues.map((value) => (
            <BentoCard key={value.title} className="value-card reveal">
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </BentoCard>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeading
          eyebrow="Leadership"
          title="Executive Team"
          description="Cross-sector expertise in healthcare systems, education strategy, and partnerships."
        />
        <div className="bento-grid leadership-grid">
          {leadership.map((member) => (
            <BentoCard key={member.name} className="leader-card reveal">
              <div className="leader-image">
                <ParallaxImage
                  src={member.image}
                  alt={member.name}
                  intensity={36}
                />
              </div>
              <h3>{member.name}</h3>
              <p className="leader-role">{member.role}</p>
              <p>{member.bio}</p>
            </BentoCard>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeading
          eyebrow="Timeline"
          title="Organizational Milestones"
          description="A concise overview of expansion and operational maturity."
        />
        <div className="bento-grid timeline-grid">
          {timeline.map((item) => (
            <BentoCard key={item.year} className="timeline-card reveal">
              <h3>{item.year}</h3>
              <p>{item.detail}</p>
            </BentoCard>
          ))}
        </div>
      </section>
    </main>
  );
}
