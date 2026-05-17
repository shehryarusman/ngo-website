import { Link } from "react-router-dom";
import { BentoCard } from "../components/common/BentoCard";
import { PageHero } from "../components/common/PageHero";
import { SectionHeading } from "../components/common/SectionHeading";
import { leadership } from "../data/siteContent";

export function AboutPage() {
  return (
    <main className="page-container">
      <PageHero
        eyebrow="Who We Are"
        title="Opening access to arts, science, and research."
        description="ARISE Foundation is built to connect students with high-quality educational opportunities through disciplined programs, trusted partners, and transparent governance."
        imageSrc="https://images.unsplash.com/photo-1581093458791-9f3c3900df7b?auto=format&fit=crop&w=1800&q=84"
        imageAlt="Research workspace with laboratory glassware"
        primaryCta={{ label: "Meet The Board", to: "/board" }}
        secondaryCta={{ label: "View What We Do", to: "/programs" }}
        rightContent={
          <>
            <p className="eyebrow">Mission</p>
            <h3>Accessible Opportunity</h3>
            <p>
              We focus on practical access to scientific, artistic, and
              research-based environments where students can build confidence
              and capability.
            </p>
          </>
        }
      />

      <section id="story" className="section-block">
        <SectionHeading
          eyebrow="Story"
          title="About The Bigger Picture"
          description="ARISE was created to make serious educational opportunity easier to reach for students with curiosity, discipline, and creative ambition."
        />
        <div className="bento-grid about-story-grid">
          <BentoCard className="about-story-card reveal">
            <h3>Inspired By Access</h3>
            <p>
              The foundation's work is centered on opening doors to places and
              programs that can change how students see their own futures:
              research labs, arts spaces, mentorship networks, and educational
              communities built around real participation.
            </p>
          </BentoCard>
          <BentoCard className="about-story-card reveal">
            <h3>Built For Trust</h3>
            <p>
              Programs are designed with institutional partners and community
              spaces so each initiative has a clear purpose, accountable
              oversight, and a path for students to keep growing after the
              program ends.
            </p>
          </BentoCard>
        </div>
      </section>

      <section id="role" className="section-block">
        <SectionHeading
          eyebrow="Role"
          title="Mission And Current Activities"
          description="ARISE is beginning with focused 2026 programming that connects students to hands-on research, arts, and mentorship opportunities."
        />
        <div className="bento-grid value-grid">
          {[
            [
              "Science Access",
              "Students enter real research environments and learn through guided, hands-on exposure.",
            ],
            [
              "Arts Opportunity",
              "Creative students gain pathways to mentorship, preparation, and program support.",
            ],
            [
              "Research Readiness",
              "Programs emphasize preparation, professionalism, curiosity, and ethical participation.",
            ],
            [
              "Community Partnerships",
              "Local institutions and community spaces help keep opportunities practical and accountable.",
            ],
          ].map(([title, text]) => (
            <BentoCard key={title} className="value-card reveal">
              <h3>{title}</h3>
              <p>{text}</p>
            </BentoCard>
          ))}
        </div>
      </section>

      <section id="board" className="section-block">
        <SectionHeading
          eyebrow="Board"
          title="Board of Directors"
          description="ARISE is led by directors with scientific, educational, and artistic experience."
        />
        <div className="bento-grid board-preview-grid">
          {leadership.map((member) => (
            <BentoCard key={member.name} className="board-preview-card reveal">
              <h3>{member.name}</h3>
              <p className="leader-role">{member.role}</p>
              <p>{member.bio}</p>
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
