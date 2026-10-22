import { FormEvent } from "react";
import { Card } from "../components/common/Card";
import { PageHeader } from "../components/common/PageHeader";
import { Section } from "../components/common/Section";
import { contactTopics, organization } from "../data/organization";
import { usePageTitle } from "../hooks/usePageTitle";

// Until the contact form is backed by the database, submitting opens the
// visitor's email client addressed to the inbox for the chosen topic.
function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const field = (key: string) => String(data.get(key) ?? "").trim();
  const topic = contactTopics.find((item) => item.value === field("topic")) ?? contactTopics[0];
  const body = [
    field("message"),
    "",
    `Name: ${field("name")}`,
    `Email: ${field("email")}`,
    field("organization") ? `Organization: ${field("organization")}` : "",
  ]
    .filter((line, index) => index < 2 || line)
    .join("\n");

  window.location.href = `mailto:${organization.inboxes[topic.inbox]}?subject=${encodeURIComponent(
    `[${topic.label}] Website inquiry`
  )}&body=${encodeURIComponent(body)}`;
}

export function ContactPage() {
  usePageTitle("Contact");

  return (
    <main>
      <PageHeader title="Contact" />

      <Section tone="tint">
        <div className="contact-layout">
          <Card>
            <form className="form" aria-label="Contact" onSubmit={handleSubmit}>
              <div className="form-row">
                <label className="field">
                  Full name
                  <input type="text" name="name" autoComplete="name" required />
                </label>
                <label className="field">
                  Email
                  <input type="email" name="email" autoComplete="email" required />
                </label>
              </div>
              <div className="form-row">
                <label className="field">
                  Organization (optional)
                  <input type="text" name="organization" autoComplete="organization" />
                </label>
                <label className="field">
                  Topic
                  <select name="topic" defaultValue={contactTopics[0].value}>
                    {contactTopics.map((topic) => (
                      <option key={topic.value} value={topic.value}>
                        {topic.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="field">
                Message
                <textarea name="message" rows={6} required />
              </label>
              <div className="button-row">
                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </div>
            </form>
          </Card>

          {/* Set like a letterhead: the topic inboxes are reached through the form. */}
          <Card className="contact-card">
            <p className="contact-card-name">ARISE Foundation</p>
            <address>{organization.address}</address>
            <p>
              <a href={`tel:${organization.phone.tel}`}>{organization.phone.display}</a>
              <br />
              Fax {organization.fax.display}
              <br />
              <a href={`mailto:${organization.inboxes.info}`}>{organization.inboxes.info}</a>
            </p>
          </Card>
        </div>
      </Section>
    </main>
  );
}
