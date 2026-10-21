import { Link } from "react-router-dom";
import { Card } from "../components/common/Card";
import { Picture } from "../components/common/Picture";
import { Section } from "../components/common/Section";
import { StoryImage } from "../components/common/StoryImage";
import { stories } from "../data/news";
import { statements } from "../data/organization";
import { programs } from "../data/programs";
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
    text: "Click here for institutional and community-based collaboration, to support our mission, or to contact us with any questions!",
    to: "/contact",
  },
];

export function HomePage() {
  usePageTitle();

  return (
    <main>
      <section className="home-hero">
        <div className="container home-hero-grid">
          <div className="home-hero-copy">
            <p className="eyebrow">ARISE Foundation</p>
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
              <Link className="btn btn-primary" to="/programs">
                What We Do
              </Link>
              <Link className="btn btn-secondary" to="/impact">
                How We Work
              </Link>
            </div>
          </div>
          <div className="home-hero-media">
            <Picture name="lab-glassware" priority sizes="(min-width: 960px) 40vw, 100vw" />
          </div>
        </div>
      </section>

      {latestStory ? (
        <Section tone="tint" eyebrow="Latest Story">
          <div className="feature-story">
            <Link
              to={`/news/${latestStory.slug}`}
              className="feature-story-media"
              tabIndex={-1}
              aria-hidden="true"
            >
              <StoryImage story={latestStory} sizes="(min-width: 960px) 40vw, 100vw" decorative />
            </Link>
            <div className="feature-story-copy">
              <p className="muted">{latestStory.dateLabel}</p>
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

      <Section
        intro="Explore the ins-and-outs of our organization, available programs, and partnership opportunities."
      >
        <div className="grid grid-3">
          {explore.map((item) => (
            <Card key={item.to} to={item.to}>
              <h3>{item.title}</h3>
              <p className="muted">{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        tone="tint"
        eyebrow="Programs"
        title="Our Programs"
        intro="ARISE runs three science programs, from high school through postdoctoral research, plus arts education."
      >
        <div className="grid grid-4">
          {programs.map((program) => (
            <Card key={program.slug} to={`/programs/${program.slug}`}>
              <h3>{program.name}</h3>
              <p className="muted small">{program.serves}</p>
              <span className="card-more">View program</span>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="cta-band">
          <div>
            <h2>Support Our Mission</h2>
            <p>{statements.charityStatus}</p>
          </div>
          <Link className="btn btn-on-dark" to="/donate">
            Donate
          </Link>
        </div>
      </Section>
    </main>
  );
}
