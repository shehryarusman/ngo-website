import { Card } from "../components/common/Card";
import { PageHeader } from "../components/common/PageHeader";
import { Placeholder } from "../components/common/Placeholder";
import { Section } from "../components/common/Section";
import { boardMembers } from "../data/siteContent";
import { usePageTitle } from "../hooks/usePageTitle";

export function BoardPage() {
  usePageTitle("Board of Directors");

  return (
    <main>
      <PageHeader
        eyebrow="Who We Are"
        title="Board of Directors"
        lead="ARISE is led by a three-member Board of Directors."
      />

      <Section>
        <div className="board-list">
          {boardMembers.map((member) => (
            <Card key={member.name} className="board-profile">
              <Placeholder
                kind="image"
                className="board-profile-photo"
                what={`Formal portrait photograph of ${member.name}`}
              />
              <div className="board-profile-body">
                <div>
                  <h2>{member.name}</h2>
                  <p className="board-role">{member.role}</p>
                  {member.pronouns ? <p className="muted small">{member.pronouns}</p> : null}
                </div>

                {member.intro ? (
                  <p>{member.intro}</p>
                ) : (
                  <Placeholder
                    what={`Introductory paragraph for ${member.name} (two to three sentences): professional background and contribution to ARISE Foundation.`}
                  />
                )}

                {member.sections.length > 0 ? (
                  <div className="board-sections">
                    {member.sections.map((section) => (
                      <section key={section.title}>
                        <h3>{section.title}</h3>
                        <p className="muted">{section.body}</p>
                      </section>
                    ))}
                  </div>
                ) : (
                  <Placeholder
                    what={`Full biography of ${member.name}, in the same four sections used for the other directors: Professional Background, Reasons for Serving, Personal Background, and Role at ARISE.`}
                  />
                )}
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}
