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
        title="Get Involved"
        image="team-planning"
      />

      <Section tone="tint">
        <div className="grid grid-3">
          <Card id="apply">
            <h2 className="h3">Apply</h2>
            <p className="card-audience">Students and Researchers</p>
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
            <div className="card-actions">
              <Link className="btn btn-primary" to="/programs">
                View Programs
              </Link>
            </div>
          </Card>

          <Card id="partner">
            <h2 className="h3">Partner</h2>
            <p className="card-audience">Universities, Laboratories, and Schools</p>
            <p>
              Universities, laboratories, and schools may propose a partnership
              or request support for a specific researcher or group of
              students.
            </p>
            <p className="small">
              Contact:{" "}
              <a href={`mailto:${organization.inboxes.partners}`}>{organization.inboxes.partners}</a>
            </p>
            <div className="card-actions">
              <a className="btn btn-primary" href={`mailto:${organization.inboxes.partners}`}>
                Contact Partnerships
              </a>
            </div>
          </Card>

          <Card id="donate">
            <h2 className="h3">Donate</h2>
            <p>
              Donors may give online or by check, or through a donor-advised
              fund.
            </p>
            <div className="card-actions">
              <Link className="btn btn-primary" to="/donate">
                Donate
              </Link>
            </div>
          </Card>
          <Card className="span-all">
            <p className="statement">{statements.nondiscrimination}</p>
          </Card>
        </div>
      </Section>

      <Section
        id="partners"
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
