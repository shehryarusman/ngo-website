import { Link } from "react-router-dom";
import { BentoCard } from "../components/common/BentoCard";
import { PageHero } from "../components/common/PageHero";
import { ParallaxImage } from "../components/common/ParallaxImage";
import { SectionHeading } from "../components/common/SectionHeading";
import { impactSnapshots, reports } from "../data/siteContent";

export function ImpactPage() {
  return (
    <main className="page-container">
      <PageHero
        eyebrow="How We Work"
        title="Clear governance for student opportunity."
        description="We track programs, funding, partner commitments, and student-facing outcomes so ARISE can grow with discipline and transparency."
        imageSrc="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=84"
        imageAlt="Documents and reporting dashboard"
        primaryCta={{ label: "Read Our Story", to: "/about#story" }}
        secondaryCta={{ label: "Support This Work", to: "/donate" }}
        rightContent={
          <>
            <p className="eyebrow">Reporting Cycle</p>
            <h3>Quarterly And Annual Reviews</h3>
            <p>
              Program progress, budget variance, and operational risks are
              reviewed against board-approved expectations.
            </p>
          </>
        }
      />

      <section id="operations" className="section-block">
        <SectionHeading
          eyebrow="Operations"
          title="Operating Snapshot"
          description="Current organizational and program indicators for ARISE."
        />
        <div className="bento-grid impact-snapshots-grid">
          {impactSnapshots.map((snapshot) => (
            <BentoCard key={snapshot.metric + snapshot.context} className="snapshot-card reveal">
              <h3>{snapshot.metric}</h3>
              <p>{snapshot.context}</p>
            </BentoCard>
          ))}
        </div>
      </section>

      <section id="financials" className="section-block">
        <SectionHeading
          eyebrow="Financials"
          title="Public Documentation"
          description="Core reports prepared for donors, partners, and community stakeholders."
        />
        <div className="bento-grid reports-grid">
          {reports.map((report) => (
            <BentoCard key={report.name} className="report-card reveal">
              <h3>{report.name}</h3>
              <p>{report.detail}</p>
              <button type="button" className="btn btn-soft">
                Request PDF
              </button>
            </BentoCard>
          ))}
          <BentoCard className="report-media-card reveal">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=88"
              alt="Program reporting documents"
              intensity={13}
            />
          </BentoCard>
        </div>
      </section>

      <section id="funding" className="section-block">
        <div className="bento-grid">
          <BentoCard className="wide-cta-card reveal">
            <p className="eyebrow">Support The Next Cycle</p>
            <h2>Funding opens access to serious educational opportunity.</h2>
            <p>
              Contributions are tied to program budgets and reviewed in public
              reporting cycles.
            </p>
            <div className="button-row">
              <Link className="btn btn-primary" to="/donate">
                Donate
              </Link>
              <Link className="btn btn-soft" to="/contact">
                Partner With Us
              </Link>
            </div>
          </BentoCard>
        </div>
      </section>
    </main>
  );
}
