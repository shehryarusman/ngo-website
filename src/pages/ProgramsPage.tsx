import { Card } from "../components/common/Card";
import { PageHeader } from "../components/common/PageHeader";
import { Picture } from "../components/common/Picture";
import { Placeholder } from "../components/common/Placeholder";
import { Section } from "../components/common/Section";
import { TitledGrid } from "../components/common/TitledGrid";
import { programSummary, programs, statusLabel } from "../data/programs";
import { programAreas } from "../data/siteContent";
import { usePageTitle } from "../hooks/usePageTitle";

export function ProgramsPage() {
  usePageTitle("What We Do");

  return (
    <main>
      <PageHeader
        title="What We Do"
        image="lab-pipette"
        actions={[
          { label: "View Programs", to: "#programs" },
          { label: "Support Programs", to: "/donate", variant: "secondary" },
        ]}
      />

      <Section id="programs" tone="tint">
        <TitledGrid title="Our Programs" cols={2}>
          {programs.map((program) => (
            <Card key={program.slug} to={`/programs/${program.slug}`}>
              <div className="card-media">
                <Picture name={program.image} alt="" sizes="(min-width: 960px) 45vw, 100vw" />
              </div>
              <p className="eyebrow">{statusLabel(program)}</p>
              <h3>{program.name}</h3>
              <p className="muted small">{programSummary(program)}</p>
              <span className="card-more">View program</span>
            </Card>
          ))}
          <Card className="span-all">
            <p>
              ARISE also sponsors seminars and speaking engagements by
              scientists and educators. An industry laboratory internship with
              a commercial testing laboratory in the Lehigh Valley is in
              development.
            </p>
          </Card>
        </TitledGrid>
      </Section>

      <Section id="areas">
        <TitledGrid title="Areas of Impact" cols={3}>
          {programAreas.map((area) => {
            const body = (
              <>
                <div className="card-media">
                  <Picture name={area.image} alt="" sizes="(min-width: 960px) 30vw, 100vw" />
                </div>
                <h3>{area.title}</h3>
                <p className="muted">{area.summary}</p>
                {area.to ? <span className="card-more">Read more</span> : null}
              </>
            );
            return area.to ? (
              <Card key={area.title} to={area.to}>
                {body}
              </Card>
            ) : (
              <Card key={area.title}>{body}</Card>
            );
          })}
        </TitledGrid>
      </Section>

      <Section id="locations-history" tone="tint">
        <TitledGrid title="Where ARISE Works" cols={2}>
          <Card>
            <h3>Philadelphia Area</h3>
            <p className="muted">Headquarters of ARISE Foundation.</p>
          </Card>
          <Card>
            <h3>United States</h3>
            <p className="muted">Programs with universities, research laboratories, and schools.</p>
          </Card>
          <Card>
            <h3>Asia</h3>
            <p className="muted">Beginning with Thailand in 2026.</p>
          </Card>
          <Card>
            <h3>History</h3>
            <Placeholder what="Timeline of key milestones since the establishment of ARISE Foundation in 2025" />
          </Card>
        </TitledGrid>
      </Section>
    </main>
  );
}
