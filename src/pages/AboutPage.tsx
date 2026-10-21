import { Link } from "react-router-dom";
import { Card } from "../components/common/Card";
import { PageHeader } from "../components/common/PageHeader";
import { Placeholder } from "../components/common/Placeholder";
import { Section } from "../components/common/Section";
import { statements } from "../data/organization";
import { programs } from "../data/programs";
import { leadership } from "../data/siteContent";
import { usePageTitle } from "../hooks/usePageTitle";

export function AboutPage() {
  usePageTitle("About");

  return (
    <main>
      <PageHeader
        eyebrow="Who We Are"
        title="Opening access to arts, science, and research."
        lead="ARISE Foundation is a Pennsylvania nonprofit and a 501(c)(3) public charity that runs hands-on science education and research programs for students and early-career researchers."
        image="students-library"
        actions={[
          { label: "Meet The Board", to: "/board" },
          { label: "View What We Do", to: "/programs", variant: "secondary" },
        ]}
        aside={
          <>
            <p className="eyebrow">Mission</p>
            <p>{statements.mission}</p>
          </>
        }
      />

      <Section
        id="story"
        tone="tint"
        eyebrow="Story"
        title="About The Bigger Picture"
        intro="The name stands for Arts, Research, Innovation, Science and Education."
      >
        <div className="grid grid-2">
          <Card className="span-all">
            <h3>Our Story</h3>
            <Placeholder what="History of ARISE Foundation (one to two paragraphs): the purpose of its founding, its founders, and its activities since establishment in 2025." />
          </Card>
          <Card>
            <h3>How ARISE Works</h3>
            <p>{statements.howWeWork}</p>
          </Card>
          <Card>
            <h3>Where ARISE Works</h3>
            <p>{statements.whereWeWork}</p>
          </Card>
        </div>
      </Section>

      <Section
        id="role"
        eyebrow="Role"
        title="Mission And Current Activities"
        intro="ARISE runs three science programs, from high school through postdoctoral research, plus arts education."
      >
        <div className="grid grid-4">
          {programs.map((program) => (
            <Card key={program.slug} to={`/programs/${program.slug}`}>
              <h3>{program.name}</h3>
              <p className="small">
                <span className="label">Who it serves:</span> {program.serves}
              </p>
              <span className="card-more">View program</span>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="board"
        tone="tint"
        eyebrow="Board"
        title="Board of Directors"
        intro="ARISE is led by a three-member Board of Directors."
      >
        <div className="grid grid-3">
          {leadership.map((member) => (
            <Card key={member.name}>
              <h3>{member.name}</h3>
              <p className="board-role">{member.role}</p>
              {member.bio ? (
                <p className="muted">{member.bio}</p>
              ) : (
                <Placeholder
                  what={`Summary of ${member.name}'s role at ARISE Foundation (one to two sentences), consistent in style with the other directors' summaries.`}
                />
              )}
              <Link className="card-more" to="/board">
                Read full biography
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="cta-band">
          <div>
            <h2>Donations</h2>
            <p>
              ARISE is recognized by the IRS as a 501(c)(3) public charity, so
              contributions are tax-deductible to the extent allowed by law.
            </p>
          </div>
          <Link className="btn btn-on-dark" to="/donate">
            Donate
          </Link>
        </div>
      </Section>
    </main>
  );
}
