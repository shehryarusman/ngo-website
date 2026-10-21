import { Link } from "react-router-dom";
import { BentoCard } from "../components/common/BentoCard";
import { SectionHeading } from "../components/common/SectionHeading";
import { stories } from "../data/news";

export function NewsPage() {
  return (
    <main className="page-container">
      <section className="section-block">
        <SectionHeading eyebrow="News" title="News & Stories" level={1} />
        <div className="bento-grid news-list-grid">
          {stories.map((story) => (
            <BentoCard key={story.slug} className="news-card reveal">
              <Link to={`/news/${story.slug}`} className="news-card-media">
                <img src={story.image.src} alt={story.image.alt} loading="lazy" />
              </Link>
              <div className="news-card-body">
                <p className="eyebrow">{story.dateLabel}</p>
                <h2>{story.title}</h2>
                <Link className="btn btn-primary" to={`/news/${story.slug}`}>
                  Read the story
                </Link>
              </div>
            </BentoCard>
          ))}
        </div>
      </section>
    </main>
  );
}
