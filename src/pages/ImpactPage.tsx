import { Link } from "react-router-dom";
import { Card } from "../components/common/Card";
import { PageHeader } from "../components/common/PageHeader";
import { Placeholder } from "../components/common/Placeholder";
import { Section } from "../components/common/Section";
import { TitledGrid } from "../components/common/TitledGrid";
import { SupportBand } from "../components/common/SupportBand";
import { organizationFacts } from "../data/siteContent";
import { usePageTitle } from "../hooks/usePageTitle";

export function ImpactPage() {
  usePageTitle("How We Work");

  return (
    <main>
      <PageHeader
        title="How We Work"
        image="documents-review"
        actions={[
          { label: "Transparency", to: "/transparency" },
          { label: "Support This Work", to: "/donate", variant: "secondary" },
        ]}
      />

      <Section id="operations" tone="tint">
        <TitledGrid title="ARISE at a Glance" cols={2}>
          {organizationFacts.map((fact) => (
            <Card key={fact.figure}>
              <p className="fact-figure">{fact.figure}</p>
              <p className="muted">{fact.label}</p>
            </Card>
          ))}
        </TitledGrid>
      </Section>

      <Section id="governance">
        <TitledGrid title="Oversight and Reporting" cols={2}>
          <Card>
            <h3>Board Oversight</h3>
            <Placeholder what="Description of how the Board of Directors oversees programs and grants (one paragraph), per the board's approved governance policies" />
          </Card>
          <Card>
            <h3>Public Documents</h3>
            <Link className="card-more" to="/transparency">
              View the Transparency page
            </Link>
          </Card>
        </TitledGrid>
      </Section>

      <Section id="funding">
        <SupportBand />
      </Section>
    </main>
  );
}
