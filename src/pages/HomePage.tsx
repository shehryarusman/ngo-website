import { Link } from "react-router-dom";
import { BentoCard } from "../components/common/BentoCard";
import { ParallaxImage } from "../components/common/ParallaxImage";
import { stories } from "../data/news";

const latestStory = stories[0];

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
          <Link
            to={`/news/${latestStory.slug}`}
            className="landing-story-media"
            tabIndex={-1}
            aria-hidden="true"
          >
            <img src={latestStory.image.src} alt="" />
          </Link>
          <p className="eyebrow">Latest Story</p>
          <h2 className="landing-story-title">{latestStory.title}</h2>
          <p>{latestStory.dateLabel}</p>
          <Link className="btn btn-primary" to={`/news/${latestStory.slug}`}>
            Read the story
          </Link>
        </BentoCard>
      </section>

      <section className="section-block home-information-intro">
        <div className="bento-grid home-explore-grid">
          <BentoCard className="home-briefing-card reveal">
            <p>
              Explore the ins-and-outs of our organization, available programs,
              and partnership opportunities.
            </p>
          </BentoCard>
          {[
            {
              title: "About The Organization",
              text: "Our inspiration, mission, and leadership.",
              to: "/about",
            },
            {
              title: "Programs",
              text: "Learn about our programs furthering our mission.",
              to: "/programs",
            },
            {
              title: "Contact & Partnerships",
              text: "Click here for institutional and community-based collaboration, to support our mission, or to contact us with any questions!",
              to: "/contact",
            },
          ].map((item) => (
            <Link key={item.to} to={item.to} className="bento-card home-explore-card reveal">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
