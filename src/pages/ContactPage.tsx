import { FormEvent } from "react";
import { BentoCard } from "../components/common/BentoCard";
import { PageHero } from "../components/common/PageHero";
import { SectionHeading } from "../components/common/SectionHeading";
import { contactOffices } from "../data/siteContent";

const topicLabels: Record<string, string> = {
  partnership: "Partnership",
  media: "Media",
  grants: "Grants",
  programs: "Programs and applications",
  other: "Other",
};

// No form backend yet: open the visitor's email client addressed to info@.
function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const field = (key: string) => String(data.get(key) ?? "").trim();
  const topic = topicLabels[field("topic")] ?? "General";
  const body = [
    field("message"),
    "",
    `Name: ${field("name")}`,
    `Email: ${field("email")}`,
    field("organization") ? `Organization: ${field("organization")}` : "",
  ]
    .filter((line, index) => index < 2 || line)
    .join("\n");
  window.location.href = `mailto:${contactOffices[0].email}?subject=${encodeURIComponent(
    `[${topic}] Website inquiry`
  )}&body=${encodeURIComponent(body)}`;
}

export function ContactPage() {
  return (
    <main className="page-container">
      <PageHero
        eyebrow="Contact"
        title="Connect with the right team quickly."
        description="For partnerships, media, grants, operations, and program collaboration requests."
        imageSrc="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=88"
        imageAlt="Professional team collaboration"
        primaryCta={{ label: "Donate", to: "/donate" }}
        secondaryCta={{ label: "View What We Do", to: "/programs" }}
        rightContent={
          <>
            <p className="eyebrow">Get In Touch</p>
            <h3>We read every message</h3>
            <p>
              Questions about programs, partnerships, or giving are routed to
              the director who handles them.
            </p>
          </>
        }
      />

      <section className="section-block">
        <SectionHeading
          eyebrow="Inquiry Form"
          title="Send A Direct Request"
          description="Send us a message and we will get back to you by email."
        />
        <div className="bento-grid contact-page-grid">
          <BentoCard className="contact-form-card reveal">
            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >
              <label className="input-block">
                Full name
                <input type="text" name="name" autoComplete="name" required />
              </label>
              <label className="input-block">
                Email
                <input type="email" name="email" autoComplete="email" required />
              </label>
              <label className="input-block">
                Organization
                <input type="text" name="organization" autoComplete="organization" />
              </label>
              <label className="input-block">
                Topic
                <select name="topic" defaultValue="partnership">
                  <option value="partnership">Partnership</option>
                  <option value="media">Media</option>
                  <option value="grants">Grants</option>
                  <option value="programs">Programs and applications</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label className="input-block">
                Message
                <textarea name="message" rows={5} required />
              </label>
              <button type="submit" className="btn btn-primary">
                Send Request
              </button>
            </form>
          </BentoCard>
          <BentoCard className="office-list-card reveal">
            <h3>Contact Information</h3>
            <div className="office-list">
              {contactOffices.map((office) => (
                <article key={office.city}>
                  <h4>{office.city}</h4>
                  <p>{office.address}</p>
                  <p>
                    <a href={`tel:${office.phone.replace(/[^\d+]/g, "")}`}>{office.phone}</a>
                  </p>
                  <p>
                    <a href={`mailto:${office.email}`}>{office.email}</a>
                  </p>
                </article>
              ))}
            </div>
          </BentoCard>
        </div>
      </section>
    </main>
  );
}
