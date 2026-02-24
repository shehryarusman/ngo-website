import { FormEvent } from "react";
import { BentoCard } from "../components/common/BentoCard";
import { PageHero } from "../components/common/PageHero";
import { SectionHeading } from "../components/common/SectionHeading";
import { contactOffices } from "../data/siteContent";

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
        secondaryCta={{ label: "View Programs", to: "/programs" }}
        rightContent={
          <>
            <p className="eyebrow">Response SLA</p>
            <h3>48-Hour First Response</h3>
            <p>
              Dedicated teams handle institutional inquiries and urgent field
              matters with a defined response window.
            </p>
          </>
        }
      />

      <section className="section-block">
        <SectionHeading
          eyebrow="Inquiry Form"
          title="Send A Direct Request"
          description="Form structure is ready to connect to a backend ticketing API."
        />
        <div className="bento-grid contact-page-grid">
          <BentoCard className="contact-form-card reveal">
            <form
              className="contact-form"
              onSubmit={(event: FormEvent<HTMLFormElement>) =>
                event.preventDefault()
              }
            >
              <label className="input-block">
                Full name
                <input type="text" required />
              </label>
              <label className="input-block">
                Work email
                <input type="email" required />
              </label>
              <label className="input-block">
                Organization
                <input type="text" />
              </label>
              <label className="input-block">
                Topic
                <select defaultValue="partnership">
                  <option value="partnership">Partnership</option>
                  <option value="media">Media</option>
                  <option value="grants">Grants</option>
                  <option value="volunteering">Volunteering</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label className="input-block">
                Message
                <textarea rows={5} required />
              </label>
              <button type="submit" className="btn btn-primary">
                Send Request
              </button>
            </form>
          </BentoCard>
          <BentoCard className="office-list-card reveal">
            <h3>Regional Offices</h3>
            <div className="office-list">
              {contactOffices.map((office) => (
                <article key={office.city}>
                  <h4>{office.city}</h4>
                  <p>{office.address}</p>
                  <p>{office.phone}</p>
                </article>
              ))}
            </div>
          </BentoCard>
        </div>
      </section>
    </main>
  );
}
