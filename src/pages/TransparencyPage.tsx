import { PageHeader } from "../components/common/PageHeader";
import { Placeholder } from "../components/common/Placeholder";
import { Section } from "../components/common/Section";
import { organization, statements } from "../data/organization";
import { usePageTitle } from "../hooks/usePageTitle";

// Document list from the client's program summary. Each document is posted as
// a PDF once ARISE (and its attorneys, where noted) supplies it.
const documents = [
  {
    name: "IRS determination letters",
    detail: "Original exemption letter and the September 21, 2026 public charity reclassification letter.",
    when: "Available now",
    pending: "PDF of the IRS determination letters",
  },
  {
    name: "Application for exemption",
    detail: "Form 1023 with all attachments and IRS correspondence.",
    when: "After attorney review",
    pending: "PDF of Form 1023 and attachments, once ARISE's attorneys confirm what is posted (including whether Form 8940 and its exhibits are included)",
  },
  {
    name: "Annual returns",
    detail: "The three most recent IRS annual returns, as filed, with donor names and addresses removed from Schedule B where permitted.",
    when: "Beginning with the first return, due in 2027",
    pending: "PDF of each annual return as filed",
  },
  {
    name: "Financial summary",
    detail: "A one-page annual summary or annual report.",
    when: "After ARISE's first full year",
    pending: "PDF of the annual financial summary",
  },
];

export function TransparencyPage() {
  usePageTitle("Transparency");

  return (
    <main>
      <PageHeader
        title="Transparency"
      />

      <Section tone="tint" title="IRS Documents and Financial Reports">
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Document</th>
                <th scope="col">Description</th>
                <th scope="col">Availability</th>
                <th scope="col">File</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.name}>
                  <td className="label" data-label="Document">{doc.name}</td>
                  <td data-label="Description">{doc.detail}</td>
                  <td data-label="Availability">{doc.when}</td>
                  <td data-label="File">
                    <Placeholder kind="document" className="placeholder-compact" what={doc.pending} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Governance and Nondiscrimination">
        <div className="prose">
          <p>{statements.nondiscrimination}</p>
          <Placeholder
            kind="approval"
            what="Links to ARISE's governance and nondiscrimination policies, if the Board of Directors chooses to publish them"
          />
        </div>
      </Section>

      <Section tone="tint" title="Inspection and Copies">
        <div className="prose">
          <p>
            Documents may be inspected at {organization.address}, or requested
            by email at{" "}
            <a href={`mailto:${organization.inboxes.info}`}>{organization.inboxes.info}</a>.
          </p>
          <p className="statement">{statements.paDisclosure}</p>
        </div>
      </Section>
    </main>
  );
}
