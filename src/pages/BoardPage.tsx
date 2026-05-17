import { BentoCard } from "../components/common/BentoCard";
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
        />
      </section>

      <section className="board-profile-list">
        {boardMembers.map((member) => (
          <BentoCard key={member.name} className="board-profile-card reveal">
            <div className="board-profile-header">
              <div>
                <h2>{member.name}</h2>
                <p className="leader-role">{member.role}</p>
                <p className="board-pronouns">{member.pronouns}</p>
              </div>
            </div>

            <p className="board-profile-intro">{member.intro}</p>

            <div className="board-profile-sections">
              {member.sections.map((section) => (
                <section key={section.title}>
                  <h3>{section.title}</h3>
                  <p>{section.body}</p>
                </section>
              ))}
            </div>
          </BentoCard>
        ))}
      </section>
    </main>
  );
}
