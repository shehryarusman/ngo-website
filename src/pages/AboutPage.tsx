import { Link } from "react-router-dom";
import { Card } from "../components/common/Card";
import { PageHeader } from "../components/common/PageHeader";
import { Placeholder } from "../components/common/Placeholder";
import { Section } from "../components/common/Section";
import { SupportBand } from "../components/common/SupportBand";
import { statements } from "../data/organization";
import { programSummary, programs } from "../data/programs";
import { leadership } from "../data/siteContent";
import { usePageTitle } from "../hooks/usePageTitle";

export function AboutPage() {
  usePageTitle("Who We Are");

  return (
    <main>
      <PageHeader
        title="Who We Are"
        eyebrow="Mission"
        lead={statements.mission}
        image="students-library"
        actions={[
          { label: "Meet The Board", to: "/board" },
          { label: "View What We Do", to: "/programs", variant: "secondary" },
        ]}
      />

      <Section
        id="story"
        tone="tint"
        title="About ARISE"
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
        title="Programs"
      >
        <div className="grid grid-4">
          {programs.map((program) => (
            <Card key={program.slug} to={`/programs/${program.slug}`}>
              <h3>{program.name}</h3>
              <p className="muted small">{programSummary(program)}</p>
              <span className="card-more">View program</span>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="board"
        tone="tint"
        title="Board of Directors"
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
        <SupportBand />
      </Section>
    </main>
  );
}
