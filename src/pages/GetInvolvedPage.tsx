import { Link } from "react-router-dom";
import { BentoCard } from "../components/common/BentoCard";
import { PageHero } from "../components/common/PageHero";
import { ParallaxImage } from "../components/common/ParallaxImage";
import { SectionHeading } from "../components/common/SectionHeading";
import { involvementTracks, partnerList } from "../data/siteContent";

export function GetInvolvedPage() {
  return (
    <main className="page-container">
      <PageHero
        eyebrow="Get Involved"
        title="Multiple pathways to support long-term impact."
        description="Contribute through volunteering, institutional partnerships, corporate engagement, and campaign support."
        imageSrc="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=88"
        imageAlt="Volunteer planning session"
        primaryCta={{ label: "Open Donation Page", to: "/donate" }}
        secondaryCta={{ label: "Contact Partnerships", to: "/contact" }}
        rightContent={
          <>
            <p className="eyebrow">Participation</p>
            <h3>Structured Involvement</h3>
            <p>
              Every volunteer or partner role has defined outcomes, supervision,
              and accountability standards.
            </p>
          </>
        }
      />

      <section className="section-block">
        <SectionHeading
          eyebrow="Support Tracks"
          title="How You Can Participate"
          description="Choose the involvement model aligned with your capabilities."
        />
        <div className="bento-grid involvement-grid">
          {involvementTracks.map((track) => (
            <BentoCard key={track.title} className="involvement-card reveal">
              <h3>{track.title}</h3>
              <p>{track.text}</p>
            </BentoCard>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeading
          eyebrow="Partners"
          title="Current Network"
          description="Representative partners in program delivery, funding, and research."
        />
        <div className="bento-grid">
          <BentoCard className="partners-card reveal">
            <div className="partner-pill-grid">
              {partnerList.map((partner) => (
                <span key={partner}>{partner}</span>
              ))}
            </div>
          </BentoCard>
          <BentoCard className="partners-image-card reveal">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1800&q=88"
              alt="Partnership meeting"
              intensity={12}
            />
          </BentoCard>
        </div>
      </section>

      <section className="section-block">
        <div className="bento-grid">
          <BentoCard className="wide-cta-card reveal">
            <p className="eyebrow">Action</p>
            <h2>Start with one clear commitment today.</h2>
            <p>
              Join as a volunteer, sponsor a program line, or explore
              long-horizon institutional collaboration.
            </p>
            <div className="button-row">
              <Link className="btn btn-primary" to="/donate">
                Donate
              </Link>
              <Link className="btn btn-soft" to="/contact">
                Request Partnership Call
              </Link>
            </div>
          </BentoCard>
        </div>
      </section>
    </main>
  );
}
