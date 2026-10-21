import { Link, useParams } from "react-router-dom";
import { BentoCard } from "../components/common/BentoCard";
import { Placeholder } from "../components/common/Placeholder";
import { stories } from "../data/news";
import { NotFoundPage } from "./NotFoundPage";

export function NewsStoryPage() {
  const { slug } = useParams();
  const story = stories.find((item) => item.slug === slug);

  if (!story) {
    return <NotFoundPage />;
  }

  return (
    <main className="page-container">
      <section className="bento-grid story-layout">
        <BentoCard className="story-body reveal">
          <p className="eyebrow">
            <Link to="/news">News</Link> · {story.dateLabel}
          </p>
          <h1>{story.title}</h1>
          <Placeholder what="Announcement intro, 2–3 sentences (publish before November 9). Do not name schools or students without permission." />

          <dl className="story-facts">
            {story.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.text}</dd>
              </div>
            ))}
          </dl>

          <h2>Recap</h2>
          <Placeholder what="Recap, to publish after November 10: what the students did and learned, and what comes next for the program." />
          <Placeholder
            kind="image"
            what="Photos from the forum and closing session (only with school and parent consent)"
          />
          <Placeholder
            kind="approval"
            what="Short quote from a Guardian Teacher or student, with name and school only if consent is given"
          />

          <div className="button-row">
            <Link className="btn btn-soft" to="/news">
              All stories
            </Link>
          </div>
        </BentoCard>
        <BentoCard className="story-poster reveal">
          <img src={story.image.src} alt={story.image.alt} />
        </BentoCard>
      </section>
    </main>
  );
}
