import { Link, useParams } from "react-router-dom";
import { Card } from "../components/common/Card";
import { PageHeader } from "../components/common/PageHeader";
import { Placeholder } from "../components/common/Placeholder";
import { Section } from "../components/common/Section";
import { stories } from "../data/news";
import { organization, statements } from "../data/organization";
import { programs, scholarsApplication, type ProgramApplication } from "../data/programs";
import { usePageTitle } from "../hooks/usePageTitle";
import { NotFoundPage } from "./NotFoundPage";

function Requirements({ application }: { application: ProgramApplication }) {
  return (
    <div className="requirements">
      <div>
        <h3>Who Submits</h3>
        <p>{application.submittedBy}</p>
      </div>
      <div>
        <h3>Information Requested</h3>
        <ul className="check-list">
          {application.information.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Documents To Upload</h3>
        <ul className="check-list">
          {application.uploads.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ProgramPage() {
  const { slug } = useParams();
  const program = programs.find((item) => item.slug === slug);
  usePageTitle(program?.name);

  if (!program) {
    return <NotFoundPage />;
  }

  const scholarsStory = stories.find((story) => story.slug === "thailand-pilot-2026");

  return (
    <main>
      <PageHeader
        title={program.name}
        image={program.image}
        actions={[
          { label: "How To Apply", to: "#apply" },
          { label: "All Programs", to: "/programs", variant: "secondary" },
        ]}
        aside={
          <>
            <p className="eyebrow">Status</p>
            <p>{program.status}</p>
            {program.statusApproval ? (
              <Placeholder kind="approval" what={program.statusApproval} />
            ) : null}
          </>
        }
      />

      <Section tone="tint">
        <div className="grid grid-3">
          <Card>
            <h2 className="h3">Who It Serves</h2>
            <p>{program.serves}</p>
          </Card>
          <Card>
            <h2 className="h3">What ARISE Provides</h2>
            <p>{program.provides}</p>
          </Card>
          <Card>
            <h2 className="h3">Timing</h2>
            {program.timing ? <p>{program.timing}</p> : null}
            <Placeholder
              what={`Application deadlines and program dates for ${program.name}, per the final program guidelines`}
            />
          </Card>
          <Card className="span-all">
            <h2 className="h3">Eligibility</h2>
            <Placeholder
              what={`Eligibility criteria and selection process for ${program.name}, per the final program guidelines (under review by ARISE's attorneys)`}
            />
          </Card>
        </div>
      </Section>

      {program.slug === "travel-grants" ? (
        <Section
          id="high-school-scholars"
          title="ARISE High School Scholars Program"
        >
          <Card>
            <div className="prose">
              <p>
                The ARISE High School Scholars Program brings delegations of
                motivated high school students and their STEM teachers to
                international scientific forums. ARISE makes a travel grant to
                each participating school, which covers approved travel,
                lodging and meals, and the school manages its own delegation.
                Students complete online preparatory modules before the forum
                and meet scientists and ARISE leaders afterward. The first
                cohort takes part in Bangkok in November 2026.
              </p>
              <p>
                Schools and teachers may contact{" "}
                <a href={`mailto:${organization.inboxes.scholars}`}>
                  {organization.inboxes.scholars}
                </a>
                .
              </p>
            </div>
            <Requirements application={scholarsApplication} />
            {scholarsStory ? (
              <div className="button-row">
                <Link className="btn btn-primary" to={`/news/${scholarsStory.slug}`}>
                  Read: {scholarsStory.title}
                </Link>
              </div>
            ) : null}
          </Card>
        </Section>
      ) : null}

      <Section
        id="apply"
        tone={program.slug === "travel-grants" ? "tint" : "default"}
        title="How To Apply"
        intro="Applications may be submitted through the ARISE website, through a participating university or school, or directly to ARISE."
      >
        <Card>
          <Requirements application={program.application} />
          <Placeholder
            kind="approval"
            what={`Online application form for ${program.name}, to be added once the form service is selected and the consent and privacy wording has been reviewed by ARISE's attorneys`}
          />
          <p>
            Questions about applications may be sent to{" "}
            <a href={`mailto:${organization.inboxes.apply}`}>{organization.inboxes.apply}</a>.
          </p>
          <p className="statement">{statements.nondiscrimination}</p>
        </Card>
      </Section>
    </main>
  );
}
