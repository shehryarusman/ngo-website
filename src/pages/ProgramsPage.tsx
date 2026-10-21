import { Link } from "react-router-dom";
import { BentoCard } from "../components/common/BentoCard";
import { PageHero } from "../components/common/PageHero";
import { ParallaxImage } from "../components/common/ParallaxImage";
import { Placeholder } from "../components/common/Placeholder";
import { SectionHeading } from "../components/common/SectionHeading";
import { programs } from "../data/programs";
import { programAreas } from "../data/siteContent";

export function ProgramsPage() {
  return (
    <main className="page-container">
      <PageHero
        eyebrow="What We Do"
        title="Programs that connect students to real opportunity."
        description="ARISE runs three science programs, from high school through postdoctoral research, plus arts education."
        imageSrc="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1800&q=84"
        imageAlt="Students working in a science laboratory"
        primaryCta={{ label: "View Programs", to: "#programs" }}
        secondaryCta={{ label: "Support Programs", to: "/donate" }}
        rightContent={
          <>
            <p className="eyebrow">Model</p>
            <p className="hero-side-title">How ARISE Works</p>
            <p>
              ARISE designs and runs its own programs, directly and in
              collaboration with universities, research laboratories, and
              schools, and covers participation costs such as travel, lodging,
              and meals.
            </p>
          </>
        }
      />

      <section id="areas" className="section-block">
        <SectionHeading
          eyebrow="Why We Do It"
          title="Areas of Impact"
          description="Learn about the mission of ARISE Foundation by field of impact, or take a look into our mission as a whole."
        />
        <div className="bento-grid program-areas-grid">
          {programAreas.map((area, index) => {
            const content = (
              <>
                <div className="program-area-media">
                  <ParallaxImage src={area.image} alt="" intensity={12 + index} />
                </div>
                <h3>{area.title}</h3>
                <p>{area.summary}</p>
              </>
            );

            return area.to ? (
              <Link
                key={area.title}
                to={area.to}
                className="bento-card program-area-card program-area-link reveal"
              >
                {content}
              </Link>
            ) : (
              <BentoCard key={area.title} className="program-area-card reveal">
                {content}
              </BentoCard>
            );
          })}
        </div>
      </section>

      <section id="programs" className="section-block">
        <SectionHeading eyebrow="Programs" title="Our Programs" />
        <div className="bento-grid program-list-grid">
          {programs.map((program) => (
            <Link
              key={program.slug}
              to={`/programs/${program.slug}`}
              className="bento-card program-list-card reveal"
            >
              <h3>{program.name}</h3>
              <p>
                <span className="value-label">Who it serves:</span>{" "}
                {program.serves}
              </p>
              <p>
                <span className="value-label">Status:</span> {program.status}
              </p>
              <span className="program-list-more">View program</span>
            </Link>
          ))}
          <BentoCard className="program-list-note reveal">
            <p>
              ARISE also sponsors seminars and speaking engagements by
              scientists and educators. An industry laboratory internship with
              a commercial testing laboratory in the Lehigh Valley is in
              development.
            </p>
          </BentoCard>
        </div>
      </section>

      <section id="locations-history" className="section-block">
        <SectionHeading
          eyebrow="Locations & History"
          title="Where ARISE Works"
          description="ARISE is based in the Philadelphia area and works with institutions in the United States and Asia, beginning with Thailand in 2026."
        />
        <div className="bento-grid timeline-grid">
          <BentoCard className="timeline-card reveal">
            <h3>Philadelphia Area</h3>
            <p>Headquarters of ARISE Foundation.</p>
          </BentoCard>
          <BentoCard className="timeline-card reveal">
            <h3>United States</h3>
            <p>Programs with universities, research laboratories, and schools.</p>
          </BentoCard>
          <BentoCard className="timeline-card reveal">
            <h3>Asia</h3>
            <p>Beginning with Thailand in 2026.</p>
          </BentoCard>
          <BentoCard className="timeline-card reveal">
            <h3>History</h3>
            <Placeholder what="Timeline of key milestones since the establishment of ARISE Foundation in 2025" />
          </BentoCard>
        </div>
      </section>
    </main>
  );
}
