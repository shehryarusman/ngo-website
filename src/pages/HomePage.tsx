import { Link } from "react-router-dom";
import { BentoCard } from "../components/common/BentoCard";
import { ParallaxImage } from "../components/common/ParallaxImage";

export function HomePage() {
  return (
    <main className="page-container">
      <section className="bento-grid landing-hero-grid">
        <BentoCard className="landing-hero-card reveal">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1800&q=82"
            alt="Science laboratory workspace"
            intensity={22}
          />
          <div className="landing-hero-overlay">
            <p className="eyebrow">ARISE Foundation</p>
            <h1>
              Charitable educational initiatives opening doors to accessible
              arts, science, and research-based opportunities.
            </h1>
            <p>
              We design operational programs in collaboration with local
              educational institutions and community spaces, and with strict
              governance.
            </p>
            <div className="button-row">
              <Link className="btn btn-primary" to="/programs">
                What We Do
              </Link>
              <Link className="btn btn-soft" to="/impact">
                How We Work
              </Link>
              <Link className="btn btn-primary" to="/donate">
                Support Our Mission
              </Link>
            </div>
          </div>
        </BentoCard>

        <BentoCard className="landing-side-card reveal">
          <p className="eyebrow">Current Cycle</p>
          <h3>2026 Opening</h3>
          <p>
            Our first programs are in action this 2026 summer. We're welcoming
            ## students to Penn's finest mRNA research institution for real,
            hands-on laboratory experience.
          </p>
        </BentoCard>
      </section>

      <section className="section-block home-information-intro">
        <BentoCard className="home-briefing-card reveal">
          <p className="eyebrow">Active Programs</p>
          <h2>Internship program</h2>
          <p>
            Scroll to explore the ins-and-outs of our organization, available
            programs, and partnership opportunities.
          </p>
          <div className="button-row">
            <Link className="btn btn-primary" to="/programs#internship">
              Internship Program Page
            </Link>
          </div>
        </BentoCard>
      </section>
    </main>
  );
}
