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
          <Placeholder what="Introductory announcement (two to three sentences), to be published before November 9, 2026. Participating schools and students may be named only with their written permission." />

          <dl className="story-facts">
            {story.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>
                  {fact.text}
                  {fact.todo ? (
                    <>
                      {" "}
                      <Placeholder inline what={fact.todo} />
                    </>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>

          <h2>Recap</h2>
          <Placeholder what="Program recap, to be published after November 10, 2026: summary of student activities and learning outcomes, and next steps for the program." />
          <Placeholder
            kind="image"
            what="Photographs from the forum and closing session, to be published only with school and parent or guardian consent"
          />
          <Placeholder
            kind="approval"
            what="Brief quotation from a Guardian STEM Teacher or participating student; name and school to be included only with written consent"
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
