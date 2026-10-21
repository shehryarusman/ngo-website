import { BentoCard } from "../components/common/BentoCard";
import { Placeholder } from "../components/common/Placeholder";
import { SectionHeading } from "../components/common/SectionHeading";
import { boardMembers } from "../data/siteContent";

export function BoardPage() {
  return (
    <main className="page-container board-page">
      <section className="section-block">
        <SectionHeading
          eyebrow="Who We Are"
          title="Board of Directors"
          description="Leadership profiles for the ARISE Foundation board."
          level={1}
        />
      </section>

      <section className="board-profile-list">
        {boardMembers.map((member) => (
          <BentoCard key={member.name} className="board-profile-card reveal">
            <div className="board-profile-header">
              <Placeholder
                kind="image"
                className="board-photo-placeholder"
                what={`Formal portrait photograph of ${member.name}`}
              />
              <div>
                <h2>{member.name}</h2>
                <p className="leader-role">{member.role}</p>
                {member.pronouns ? (
                  <p className="board-pronouns">{member.pronouns}</p>
                ) : null}
              </div>
            </div>

            {member.intro ? (
              <p className="board-profile-intro">{member.intro}</p>
            ) : (
              <Placeholder
                what={`Introductory paragraph for ${member.name} (two to three sentences): professional background and contribution to ARISE Foundation.`}
              />
            )}

            {member.sections.length > 0 ? (
              <div className="board-profile-sections">
                {member.sections.map((section) => (
                  <section key={section.title}>
                    <h3>{section.title}</h3>
                    <p>{section.body}</p>
                  </section>
                ))}
              </div>
            ) : (
              <Placeholder
                what={`Full biography of ${member.name}, in the same four sections used for the other directors: Professional Background, Reasons for Serving, Personal Background, and Role at ARISE.`}
              />
            )}
          </BentoCard>
        ))}
      </section>
    </main>
  );
}
