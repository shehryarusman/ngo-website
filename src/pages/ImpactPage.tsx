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
        eyebrow="Impact"
        title="Evidence over assumptions."
        description="We track outcomes at program, partner, and community levels to ensure decisions are grounded in measurable evidence."
        imageSrc="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1800&q=88"
        imageAlt="Field data collection meeting"
        primaryCta={{ label: "Read Stories", to: "/stories" }}
        secondaryCta={{ label: "Support This Work", to: "/donate" }}
        rightContent={
          <>
            <p className="eyebrow">Reporting Cycle</p>
            <h3>Quarterly And Annual Reviews</h3>
            <p>
              Country teams report KPI progress, budget variance, and operational
              risks to a central governance board each quarter.
            </p>
          </>
        }
      />

      <section className="section-block">
        <SectionHeading
          eyebrow="Latest Results"
          title="Operational Metrics"
          description="Recent impact and delivery indicators from active portfolios."
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

      <section className="section-block">
        <SectionHeading
          eyebrow="Reports"
          title="Public Documentation"
          description="Core reports shared with funders, partners, and communities."
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
              alt="Impact analyst reviewing reports"
              intensity={13}
            />
          </BentoCard>
        </div>
      </section>

      <section className="section-block">
        <div className="bento-grid">
          <BentoCard className="wide-cta-card reveal">
            <p className="eyebrow">Support The Next Cycle</p>
            <h2>Funding enables scaled, measurable program delivery.</h2>
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
