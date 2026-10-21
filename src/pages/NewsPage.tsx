import { Card } from "../components/common/Card";
import { PageHeader } from "../components/common/PageHeader";
import { Section } from "../components/common/Section";
import { StoryImage } from "../components/common/StoryImage";
import { stories } from "../data/news";
import { usePageTitle } from "../hooks/usePageTitle";

export function NewsPage() {
  usePageTitle("News & Stories");

  return (
    <main>
      <PageHeader eyebrow="News" title="News & Stories" />
      <Section>
        <div className="story-list">
          {stories.map((story) => (
            <Card key={story.slug} to={`/news/${story.slug}`} className="story-row">
              <StoryImage story={story} sizes="160px" decorative />
              <div className="story-body">
                <p className="muted">{story.dateLabel}</p>
                <h2 className="h3">{story.title}</h2>
                <span className="card-more">Read the story</span>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}
