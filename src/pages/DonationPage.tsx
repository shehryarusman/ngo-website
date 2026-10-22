import { Card } from "../components/common/Card";
import { PageHeader } from "../components/common/PageHeader";
import { Placeholder } from "../components/common/Placeholder";
import { Section } from "../components/common/Section";
import { TitledGrid } from "../components/common/TitledGrid";
import { organization, statements } from "../data/organization";
import { usePageTitle } from "../hooks/usePageTitle";

export function DonationPage() {
  usePageTitle("Donate");

  return (
    <main>
      <PageHeader
        title="Donate"
        image="students-collaborating"
      />

      <Section tone="tint">
        <TitledGrid title="How to Donate" cols={3}>
          <Card>
            <h3>Online</h3>
            <Placeholder
              kind="approval"
              what="Secure online donation form, to be added once ARISE selects a payment processor and confirms its Pennsylvania charitable solicitation registration"
            />
          </Card>
          <Card>
            <h3>By Check</h3>
            <p>Checks may be made payable to ARISE Foundation and mailed to:</p>
            <address className="muted">{organization.address}</address>
          </Card>
          <Card>
            <h3>Donor-Advised Fund</h3>
            <p>
              Grants from a donor-advised fund are welcome. For details, please
              contact{" "}
              <a href={`mailto:${organization.inboxes.giving}`}>{organization.inboxes.giving}</a>.
            </p>
          </Card>
          <Card className="span-all">
            <p className="statement">{statements.charityStatus}</p>
            <p className="statement">
              Receipts and questions:{" "}
              <a href={`mailto:${organization.inboxes.giving}`}>{organization.inboxes.giving}</a>
            </p>
            <p className="statement">{statements.paDisclosure}</p>
          </Card>
        </TitledGrid>
      </Section>
    </main>
  );
}
