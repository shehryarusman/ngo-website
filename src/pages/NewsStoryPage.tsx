import { Link, useParams } from "react-router-dom";
import { Draft } from "../components/common/Draft";
import { Placeholder } from "../components/common/Placeholder";
import { Section } from "../components/common/Section";
import { StoryImage } from "../components/common/StoryImage";
import { stories } from "../data/news";
import { usePageTitle } from "../hooks/usePageTitle";
import { NotFoundPage } from "./NotFoundPage";

export function NewsStoryPage() {
  const { slug } = useParams();
  const story = stories.find((item) => item.slug === slug);
  usePageTitle(story?.title);

  if (!story) {
    return <NotFoundPage />;
  }

  return (
    <main>
      <Section className="story-section">
        <div className="story-layout">
          <article className="story-body">
            <p className="eyebrow">
              <Link to="/news">News</Link> · {story.dateLabel}
            </p>
            <h1>{story.title}</h1>
            {story.intro && story.introReview ? (
              <Placeholder kind="review" what={story.introReview}>
                <p className="lead">{story.intro}</p>
              </Placeholder>
            ) : story.intro ? (
              <p className="lead">{story.intro}</p>
            ) : null}

            <dl className="story-facts">
              {story.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>
                    {fact.review ? (
                      <Placeholder kind="review" what={fact.review}>
                        {fact.text}
                      </Placeholder>
                    ) : (
                      fact.text
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <Draft>
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
            </Draft>

            <div className="button-row">
              <Link className="btn btn-secondary" to="/news">
                All stories
              </Link>
              <Link className="btn btn-secondary" to="/programs/travel-grants#high-school-scholars">
                ARISE High School Scholars Program
              </Link>
            </div>
          </article>
          <aside className="story-poster">
            <StoryImage story={story} sizes="(min-width: 960px) 33vw, 100vw" priority />
          </aside>
        </div>
      </Section>
    </main>
  );
}
