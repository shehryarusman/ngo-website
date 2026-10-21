import { Link, useParams } from "react-router-dom";
import { BentoCard } from "../components/common/BentoCard";
import { PageHero } from "../components/common/PageHero";
import { Placeholder } from "../components/common/Placeholder";
import { SectionHeading } from "../components/common/SectionHeading";
import { stories } from "../data/news";
import {
  nondiscriminationStatement,
  programs,
  scholarsApplication,
  type ProgramApplication,
} from "../data/programs";
import { NotFoundPage } from "./NotFoundPage";

function ApplicationRequirements({
  application,
}: {
  application: ProgramApplication;
}) {
  return (
    <div className="program-requirements">
      <div>
        <h3>Who Submits</h3>
        <p>{application.submittedBy}</p>
      </div>
      <div>
        <h3>Information Requested</h3>
        <ul>
          {application.information.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Documents To Upload</h3>
        <ul>
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

  if (!program) {
    return <NotFoundPage />;
  }

  const thailandStory = stories.find(
    (story) => story.slug === "thailand-pilot-2026"
  );

  return (
    <main className="page-container">
      <PageHero
        eyebrow="Program"
        title={program.name}
        description={program.provides}
        imageSrc={program.image.src}
        imageAlt={program.image.alt}
        primaryCta={{ label: "How To Apply", to: "#apply" }}
        secondaryCta={{ label: "All Programs", to: "/programs#programs" }}
        rightContent={
          <>
            <p className="eyebrow">Status</p>
            <p className="hero-side-title">{program.status}</p>
            {program.statusApproval ? (
              <Placeholder kind="approval" what={program.statusApproval} />
            ) : null}
          </>
        }
      />

      <section className="section-block">
        <div className="bento-grid program-facts-grid">
          <BentoCard className="program-fact-card reveal">
            <h2>Who It Serves</h2>
            <p>{program.serves}</p>
          </BentoCard>
          <BentoCard className="program-fact-card reveal">
            <h2>What ARISE Provides</h2>
            <p>{program.provides}</p>
          </BentoCard>
          <BentoCard className="program-fact-card reveal">
            <h2>Timing</h2>
            {program.timing ? <p>{program.timing}</p> : null}
            <Placeholder
              what={`Application deadlines and program dates for ${program.name}, per the final program guidelines`}
            />
          </BentoCard>
          <BentoCard className="program-fact-card program-fact-wide reveal">
            <h2>Eligibility</h2>
            <Placeholder
              what={`Eligibility criteria and selection process for ${program.name}, per the final program guidelines (under review by ARISE's attorneys)`}
            />
          </BentoCard>
        </div>
      </section>

      {program.slug === "travel-grants" ? (
        <section id="high-school-scholars" className="section-block">
          <SectionHeading
            eyebrow="Travel Grant Program"
            title="ARISE High School Scholars Program"
          />
          <div className="bento-grid program-facts-grid">
            <BentoCard className="program-fact-card program-fact-wide reveal">
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
                <a href="mailto:scholars@arisegiving.org">
                  scholars@arisegiving.org
                </a>
                .
              </p>
              <ApplicationRequirements application={scholarsApplication} />
              {thailandStory ? (
                <div className="button-row">
                  <Link
                    className="btn btn-primary"
                    to={`/news/${thailandStory.slug}`}
                  >
                    Read: {thailandStory.title}
                  </Link>
                </div>
              ) : null}
            </BentoCard>
          </div>
        </section>
      ) : null}

      <section id="apply" className="section-block">
        <SectionHeading
          eyebrow="Apply"
          title="How To Apply"
          description="Applications may be submitted through the ARISE website, through a participating university or school, or directly to ARISE."
        />
        <div className="bento-grid program-facts-grid">
          <BentoCard className="program-fact-card program-fact-wide reveal">
            <ApplicationRequirements application={program.application} />
            <Placeholder
              kind="approval"
              what={`Online application form for ${program.name}, to be added once the form service is selected and the consent and privacy wording has been reviewed by ARISE's attorneys`}
            />
            <p>
              Questions about applications may be sent to{" "}
              <a href="mailto:apply@arisegiving.org">apply@arisegiving.org</a>.
            </p>
            <p className="program-nondiscrimination">
              {nondiscriminationStatement}
            </p>
          </BentoCard>
        </div>
      </section>
    </main>
  );
}
