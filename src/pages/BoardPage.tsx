import { Card } from "../components/common/Card";
import { Draft } from "../components/common/Draft";
import { PageHeader } from "../components/common/PageHeader";
import { Placeholder } from "../components/common/Placeholder";
import { Section } from "../components/common/Section";
import { boardMembers } from "../data/siteContent";
import { usePageTitle } from "../hooks/usePageTitle";

const introNote = (name: string) =>
  `Introductory paragraph for ${name} (two to three sentences): professional background and contribution to ARISE Foundation.`;

const sectionNote = (name: string, title: string) =>
  `"${title}" section of ${name}'s biography, consistent in style with the other directors' biographies.`;

export function BoardPage() {
  usePageTitle("Board of Directors");

  return (
    <main>
      <PageHeader
        title="Board of Directors"
      />

      <Section>
        <div className="board-list">
          {boardMembers.map((member) => (
            <Card key={member.name} className="board-profile">
              <img
                className="board-profile-photo"
                src={`/images/${member.photo.base}-${member.photo.widths[0]}.webp`}
                srcSet={member.photo.widths
                  .map((w) => `/images/${member.photo.base}-${w}.webp ${w}w`)
                  .join(", ")}
                sizes="(max-width: 640px) 220px, 180px"
                width={180}
                height={240}
                alt={`Portrait of ${member.name}`}
                loading="lazy"
                decoding="async"
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
                  <Placeholder what={introNote(member.name)} />
                )}

                <div className="board-sections">
                  {member.sections.map((section) =>
                    !section.body ? (
                      <Draft key={section.title}>
                        <section>
                          <h3>{section.title}</h3>
                          <Placeholder what={sectionNote(member.name, section.title)} />
                        </section>
                      </Draft>
                    ) : (
                      <section key={section.title}>
                        <h3>{section.title}</h3>
                        <p className="muted">{section.body}</p>
                      </section>
                    )
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}
