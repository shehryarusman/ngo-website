import { Link } from "react-router-dom";
import { Card } from "../components/common/Card";
import { PageHeader } from "../components/common/PageHeader";
import { Section } from "../components/common/Section";
import { organization, statements } from "../data/organization";
import { programs } from "../data/programs";
import { partnerList } from "../data/siteContent";
import { usePageTitle } from "../hooks/usePageTitle";

export function GetInvolvedPage() {
  usePageTitle("Get Involved");

  return (
    <main>
      <PageHeader
        eyebrow="Get Involved"
        title="Apply, partner, or donate."
        lead="ARISE welcomes applications from students and researchers, partnerships with institutions, and support from donors."
        image="team-planning"
      />

      <Section tone="tint">
        <div className="grid grid-3">
          <Card id="apply">
            <p className="eyebrow">Apply</p>
            <h2 className="h3">Students and Researchers</h2>
            <p>
              Students and researchers apply through the ARISE website, through
              a participating university or school, or directly to ARISE. Each
              program page states eligibility, timing, and what to submit.
            </p>
            <ul className="check-list small">
              {programs.map((program) => (
                <li key={program.slug}>
                  <Link to={`/programs/${program.slug}#apply`}>{program.name}</Link>
                </li>
              ))}
            </ul>
            <p className="small">
              Questions:{" "}
              <a href={`mailto:${organization.inboxes.apply}`}>{organization.inboxes.apply}</a>
            </p>
          </Card>

          <Card id="partner">
            <p className="eyebrow">Partner</p>
            <h2 className="h3">Universities, Laboratories, and Schools</h2>
            <p>
              Universities, laboratories, and schools may propose a partnership
              or request support for a specific researcher or group of
              students.
            </p>
            <p className="small">
              Contact:{" "}
              <a href={`mailto:${organization.inboxes.partners}`}>
                {organization.inboxes.partners}
              </a>
            </p>
          </Card>

          <Card id="donate">
            <p className="eyebrow">Donate</p>
            <h2 className="h3">Donors</h2>
            <p>
              Donors may give online or by check, or through a donor-advised
              fund. {statements.charityStatus}
            </p>
            <div className="button-row">
              <Link className="btn btn-primary" to="/donate">
                Donate
              </Link>
            </div>
          </Card>
        </div>
        <p className="statement statement-spaced">
          {statements.nondiscrimination}
        </p>
      </Section>

      <Section
        id="partners"
        eyebrow="Partners"
        title="Current Partners"
        intro="Partners in the ARISE High School Scholars – Thailand Pilot 2026."
      >
        <ul className="pill-list">
          {partnerList.map((partner) => (
            <li key={partner}>{partner}</li>
          ))}
        </ul>
      </Section>
    </main>
  );
}
