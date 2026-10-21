import { Card } from "../components/common/Card";
import { PageHeader } from "../components/common/PageHeader";
import { Picture } from "../components/common/Picture";
import { Placeholder } from "../components/common/Placeholder";
import { Section } from "../components/common/Section";
import { statements } from "../data/organization";
import { programs } from "../data/programs";
import { programAreas } from "../data/siteContent";
import { usePageTitle } from "../hooks/usePageTitle";

export function ProgramsPage() {
  usePageTitle("Programs");

  return (
    <main>
      <PageHeader
        eyebrow="What We Do"
        title="Programs that connect students to real opportunity."
        lead="ARISE runs three science programs, from high school through postdoctoral research, plus arts education."
        image="lab-pipette"
        actions={[
          { label: "View Programs", to: "#programs" },
          { label: "Support Programs", to: "/donate", variant: "secondary" },
        ]}
        aside={
          <>
            <p className="eyebrow">How ARISE Works</p>
            <p>{statements.howWeWork}</p>
          </>
        }
      />

      <Section id="programs" tone="tint" eyebrow="Programs" title="Our Programs">
        <div className="grid grid-2">
          {programs.map((program) => (
            <Card key={program.slug} to={`/programs/${program.slug}`}>
              <div className="card-media">
                <Picture name={program.image} alt="" sizes="(min-width: 960px) 45vw, 100vw" />
              </div>
              <h3>{program.name}</h3>
              <p className="small">
                <span className="label">Who it serves:</span> {program.serves}
              </p>
              <p className="small">
                <span className="label">Status:</span> {program.status}
              </p>
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
        </div>
      </Section>

      <Section
        id="areas"
        eyebrow="Why We Do It"
        title="Areas of Impact"
        intro="Learn about the mission of ARISE Foundation by field of impact, or take a look into our mission as a whole."
      >
        <div className="grid grid-3">
          {programAreas.map((area) => {
            const body = (
              <>
                <div className="card-media">
                  <Picture name={area.image} alt="" sizes="(min-width: 960px) 30vw, 100vw" />
                </div>
                <h3>{area.title}</h3>
                <p className="muted">{area.summary}</p>
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
        </div>
      </Section>

      <Section
        id="locations-history"
        tone="tint"
        eyebrow="Locations & History"
        title="Where ARISE Works"
        intro={statements.whereWeWork}
      >
        <div className="grid grid-4">
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
        </div>
      </Section>
    </main>
  );
}
