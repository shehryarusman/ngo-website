import { Link } from "react-router-dom";
import { BentoCard } from "../components/common/BentoCard";
import { PageHero } from "../components/common/PageHero";
import { ParallaxImage } from "../components/common/ParallaxImage";
import { SectionHeading } from "../components/common/SectionHeading";
import { stories } from "../data/siteContent";

export function StoriesPage() {
  return (
    <main className="page-container">
      <PageHero
        eyebrow="Stories"
        title="Community outcomes, documented with context."
        description="Stories from families, field staff, and local partners connected to measurable progress indicators."
        imageSrc="https://images.unsplash.com/photo-1487980965255-d3b416303d12?auto=format&fit=crop&w=1800&q=88"
        imageAlt="Community discussion"
        primaryCta={{ label: "Read Impact", to: "/impact" }}
        secondaryCta={{ label: "Donate", to: "/donate" }}
        rightContent={
          <>
            <p className="eyebrow">Editorial Standard</p>
            <h3>Verification Before Publication</h3>
            <p>
              Field narratives are reviewed against program records and partner
              validation before publication.
            </p>
          </>
        }
      />

      <section className="section-block">
        <SectionHeading
          eyebrow="Field Narratives"
          title="Featured Stories"
          description="A cross-section of healthcare, education, and livelihoods outcomes."
        />
        <div className="bento-grid stories-page-grid">
          {stories.map((story, index) => (
            <BentoCard key={story.title} className="story-media-card reveal">
              <div className="story-media">
                <ParallaxImage
                  src={story.image}
                  alt={story.title}
                  intensity={11 + index}
                />
              </div>
              <h3>{story.title}</h3>
              <p className="story-quote">"{story.quote}"</p>
              <p className="story-attribution">- {story.person}</p>
            </BentoCard>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="bento-grid">
          <BentoCard className="wide-cta-card reveal">
            <p className="eyebrow">Follow Ongoing Stories</p>
            <h2>Stay informed with monthly verified field updates.</h2>
            <p>
              Receive concise updates that link narrative progress to measurable
              program outcomes.
            </p>
            <div className="button-row">
              <Link className="btn btn-soft" to="/get-involved">
                Subscribe And Volunteer
              </Link>
              <Link className="btn btn-primary" to="/donate">
                Support The Next Chapter
              </Link>
            </div>
          </BentoCard>
        </div>
      </section>
    </main>
  );
}
