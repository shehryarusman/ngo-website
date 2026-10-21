import { Link } from "react-router-dom";
import { BentoCard } from "../components/common/BentoCard";
import { PageHero } from "../components/common/PageHero";
import { Placeholder } from "../components/common/Placeholder";
import { SectionHeading } from "../components/common/SectionHeading";
import { leadership } from "../data/siteContent";

export function AboutPage() {
  return (
    <main className="page-container">
      <PageHero
        eyebrow="Who We Are"
        title="Opening access to arts, science, and research."
        description="ARISE Foundation is a Pennsylvania nonprofit and a 501(c)(3) public charity that runs hands-on science education and research programs for students and early-career researchers."
        imageSrc="https://images.unsplash.com/photo-1581093458791-9f3c3900df7b?auto=format&fit=crop&w=1800&q=84"
        imageAlt="Research workspace with laboratory glassware"
        primaryCta={{ label: "Meet The Board", to: "/board" }}
        secondaryCta={{ label: "View What We Do", to: "/programs" }}
        rightContent={
          <>
            <p className="eyebrow">Mission</p>
            <p>
              ARISE advances science, education, and innovation by operating
              educational and research-based programs that promote scientific
              knowledge, training, and public understanding.
            </p>
          </>
        }
      />

      <section id="story" className="section-block">
        <SectionHeading
          eyebrow="Story"
          title="About The Bigger Picture"
          description="The name stands for Arts, Research, Innovation, Science and Education."
        />
        <div className="bento-grid about-story-grid">
          <BentoCard className="about-story-card about-story-wide reveal">
            <h3>Our Story</h3>
            <Placeholder what="History of ARISE Foundation (one to two paragraphs): the purpose of its founding, its founders, and its activities since establishment in 2025." />
          </BentoCard>
          <BentoCard className="about-story-card reveal">
            <h3>How ARISE Works</h3>
            <p>
              ARISE designs and runs its own programs, directly and in
              collaboration with universities, research laboratories, and
              schools. It covers participation costs such as travel, lodging,
              and meals so that finances are not a barrier. ARISE also supports
              complementary educational programs in the arts.
            </p>
          </BentoCard>
          <BentoCard className="about-story-card reveal">
            <h3>Where ARISE Works</h3>
            <p>
              ARISE is based in the Philadelphia area and works with
              institutions in the United States and Asia, beginning with
              Thailand in 2026.
            </p>
          </BentoCard>
          <BentoCard className="about-story-card about-story-wide reveal">
            <h3>Donations</h3>
            <p>
              ARISE is recognized by the IRS as a 501(c)(3) public charity, so
              contributions are tax-deductible to the extent allowed by law.
            </p>
            <div className="button-row">
              <Link className="btn btn-primary" to="/donate">
                Donate
              </Link>
            </div>
          </BentoCard>
        </div>
      </section>

      <section id="role" className="section-block">
        <SectionHeading
          eyebrow="Role"
          title="Mission And Current Activities"
          description="ARISE runs three science programs, from high school through postdoctoral research, plus arts education."
        />
        <div className="bento-grid value-grid">
          {[
            [
              "Biomedical Research Laboratory Internship",
              "High school students ages 16–18 and early undergraduates",
            ],
            [
              "Graduate and Postdoctoral Fellowship Support",
              "Graduate students and postdoctoral researchers in biomedical research",
            ],
            [
              "Travel Grant Program",
              "High school, college and graduate students, young researchers, and underfunded academic labs",
            ],
            [
              "Arts Education and Exhibitions",
              "Emerging local and regional artists, and the public",
            ],
          ].map(([title, serves]) => (
            <BentoCard key={title} className="value-card reveal">
              <h3>{title}</h3>
              <p>
                <span className="value-label">Who it serves:</span> {serves}
              </p>
            </BentoCard>
          ))}
        </div>
      </section>

      <section id="board" className="section-block">
        <SectionHeading
          eyebrow="Board"
          title="Board of Directors"
          description="ARISE is led by a three-member Board of Directors."
        />
        <div className="bento-grid board-preview-grid">
          {leadership.map((member) => (
            <BentoCard key={member.name} className="board-preview-card reveal">
              <h3>{member.name}</h3>
              <p className="leader-role">{member.role}</p>
              {member.bio ? (
                <p>{member.bio}</p>
              ) : (
                <Placeholder what={`Summary of ${member.name}'s role at ARISE Foundation (one to two sentences), consistent in style with the other directors' summaries.`} />
              )}
              <Link className="btn btn-soft" to="/board">
                Read Full Bio
              </Link>
            </BentoCard>
          ))}
        </div>
      </section>
    </main>
  );
}
