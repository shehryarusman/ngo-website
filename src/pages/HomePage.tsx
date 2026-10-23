import { Link } from "react-router-dom";
import { Card } from "../components/common/Card";
import { Picture } from "../components/common/Picture";
import { Section } from "../components/common/Section";
import { SupportBand } from "../components/common/SupportBand";
import { StoryImage } from "../components/common/StoryImage";
import { stories } from "../data/news";
import { programSummary, programs } from "../data/programs";
import { usePageTitle } from "../hooks/usePageTitle";

const latestStory = stories[0];

const explore = [
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
    text: "Institutional partnerships, support, and inquiries.",
    to: "/contact",
  },
];

export function HomePage() {
  usePageTitle();

  return (
    <main>
      <section className="home-hero">
        <div className="container home-hero-grid">
          <div className="card card--maroon home-hero-copy">
            <h1>
              Charitable educational initiatives opening doors to accessible
              arts, science, and research-based opportunities.
            </h1>
            <p className="lead">
              We design operational programs in collaboration with local
              educational institutions and community spaces, and with strict
              governance.
            </p>
            <div className="button-row">
              <Link className="btn btn-on-dark" to="/programs">
                What We Do
              </Link>
              <Link className="btn btn-ghost-dark" to="/impact">
                How We Work
              </Link>
            </div>
          </div>
          <div className="home-hero-media">
            <Picture name="teaching-lab" priority sizes="(min-width: 961px) 1080px, 110vw" />
          </div>
        </div>
      </section>

      {latestStory ? (
        <Section tone="tint">
          <div className="card feature-story">
            <Link
              to={`/news/${latestStory.slug}`}
              className="feature-story-media"
              tabIndex={-1}
              aria-hidden="true"
            >
              <StoryImage story={latestStory} sizes="(min-width: 960px) 40vw, 100vw" decorative />
            </Link>
            <div className="feature-story-copy">
              <p className="eyebrow">{latestStory.dateLabel}</p>
              <h2>{latestStory.title}</h2>
              <div className="button-row">
                <Link className="btn btn-primary" to={`/news/${latestStory.slug}`}>
                  Read the story
                </Link>
                <Link className="btn btn-secondary" to="/news">
                  All news
                </Link>
              </div>
            </div>
          </div>
        </Section>
      ) : null}

      <Section>
        <div className="grid grid-3">
          {explore.map((item) => (
            <Card key={item.to} to={item.to}>
              <h3>{item.title}</h3>
              <p className="muted">{item.text}</p>
              <span className="card-more">Learn more</span>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        tone="tint"
        title="Our Programs"
      >
        <div className="grid grid-4">
          {programs.map((program) => (
            <Card key={program.slug} to={`/programs/${program.slug}`}>
              <div className="card-media">
                <Picture name={program.image} alt="" sizes="(min-width: 961px) 28vw, (min-width: 641px) 56vw, 110vw" />
              </div>
              <h3>{program.name}</h3>
              <p className="muted small">{programSummary(program)}</p>
              <span className="card-more">View program</span>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SupportBand />
      </Section>
    </main>
  );
}
