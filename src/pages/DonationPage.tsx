import { Card } from "../components/common/Card";
import { Draft } from "../components/common/Draft";
import { PageHeader } from "../components/common/PageHeader";
import { Placeholder } from "../components/common/Placeholder";
import { Section } from "../components/common/Section";
import { organization, statements } from "../data/organization";
import { SHOW_PLACEHOLDERS } from "../drafts";
import { usePageTitle } from "../hooks/usePageTitle";

export function DonationPage() {
  usePageTitle("Donate");

  return (
    <main>
      <PageHeader
        title="Donate"
        image="library-desk"
      />

      <Section tone="tint" title="How to Donate">
        <div className={SHOW_PLACEHOLDERS ? "grid grid-3" : "grid grid-2"}>
          <Draft>
            <Card>
              <h3>Online</h3>
              <Placeholder
                kind="approval"
                what="Secure online donation form, to be added once ARISE selects a payment processor and confirms its Pennsylvania charitable solicitation registration"
              />
            </Card>
          </Draft>
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
        </div>
      </Section>
    </main>
  );
}
