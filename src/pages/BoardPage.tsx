import { Card } from "../components/common/Card";
import { Draft } from "../components/common/Draft";
import { PageHeader } from "../components/common/PageHeader";
import { Placeholder } from "../components/common/Placeholder";
import { Section } from "../components/common/Section";
import { boardMembers } from "../data/siteContent";
import { SHOW_PLACEHOLDERS } from "../drafts";
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
            <Card
              key={member.name}
              className={SHOW_PLACEHOLDERS ? "board-profile" : "board-profile board-profile--no-photo"}
            >
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

                {member.intro && member.draft ? (
                  <Placeholder kind="review" what={introNote(member.name)}>
                    <p>{member.intro}</p>
                  </Placeholder>
                ) : member.intro ? (
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
                        {member.draft ? (
                          <Placeholder kind="review" what={sectionNote(member.name, section.title)}>
                            <p className="muted">{section.body}</p>
                          </Placeholder>
                        ) : (
                          <p className="muted">{section.body}</p>
                        )}
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
