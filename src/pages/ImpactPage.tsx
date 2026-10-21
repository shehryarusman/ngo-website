import { Link } from "react-router-dom";
import { Card } from "../components/common/Card";
import { PageHeader } from "../components/common/PageHeader";
import { Placeholder } from "../components/common/Placeholder";
import { Section } from "../components/common/Section";
import { statements } from "../data/organization";
import { organizationFacts } from "../data/siteContent";
import { usePageTitle } from "../hooks/usePageTitle";

export function ImpactPage() {
  usePageTitle("How We Work");

  return (
    <main>
      <PageHeader
        title="Clear governance for student opportunity."
        lead={statements.howWeWork}
        image="documents-review"
        actions={[
          { label: "Transparency", to: "/transparency" },
          { label: "Support This Work", to: "/donate", variant: "secondary" },
        ]}
      />

      <Section id="operations" tone="tint" title="ARISE at a Glance">
        <div className="grid grid-4">
          {organizationFacts.map((fact) => (
            <Card key={fact.figure}>
              <p className="fact-figure">{fact.figure}</p>
              <p className="muted">{fact.label}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="governance" title="Oversight and Reporting">
        <div className="grid grid-2">
          <Card>
            <h3>Board Oversight</h3>
            <Placeholder what="Description of how the Board of Directors oversees programs and grants (one paragraph), per the board's approved governance policies" />
          </Card>
          <Card>
            <h3>Public Documents</h3>
            <p>
              ARISE posts its public IRS documents on its Transparency page,
              where anyone may view, download and print them free of charge.
            </p>
            <Link className="card-more" to="/transparency">
              View the Transparency page
            </Link>
          </Card>
        </div>
      </Section>

      <Section id="funding">
        <div className="cta-band">
          <div>
            <h2>Funding</h2>
            <p>
              ARISE covers participation costs such as travel, lodging, and
              meals so that finances are not a barrier. {statements.charityStatus}
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
