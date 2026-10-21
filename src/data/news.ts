export interface NewsFact {
  label: string;
  text: string;
}

export interface NewsStory {
  slug: string;
  title: string;
  dateLabel: string;
  image: { src: string; alt: string };
  facts: NewsFact[];
}

// Facts are taken verbatim from the client's program summary (Oct 20, 2026).
// Newest story first; the home page features stories[0].
export const stories: NewsStory[] = [
  {
    slug: "thailand-pilot-2026",
    title: "ARISE High School Scholars – Thailand Pilot 2026",
    dateLabel: "November 9–10, 2026",
    image: {
      src: "/news/thailand-pilot-2026-banner.jpg",
      alt: "ARISE High School Scholars Program Thailand Pilot 2026 banner: Inspiring the Next Generation of Young Scientists, with partner logos",
    },
    facts: [
      {
        label: "Who",
        text: "ARISE's first High School Scholars cohort, about 5–10 Grade 10–11 (Mathayom 4–5) students and their Guardian STEM Teachers from 2–3 Thai schools.",
      },
      {
        label: "When and where",
        text: "November 9–10, 2026 at the Vaccine & Therapeutic RNA Research Forum 2026, Faculty of Medicine, Chulalongkorn University, hosted by Chula VRC, Chula School of Global Health, UK-SEA Vax Hub and Thailand's National Vaccine Institute.",
      },
      {
        label: "Funding",
        text: "Sponsored through ARISE travel grants to each participating school under the Travel Grant Program.",
      },
      {
        label: "Program",
        text: "Three parts: nine online RNA Building Blocks modules, the forum itself, and a closing session and lunch with ARISE leaders, with a planned visit to the Chula Vaccine Research Center lab.",
      },
      {
        label: "Partners",
        text: "A partnership between ARISE Foundation, Chula VRC, the University of Pennsylvania Alumni Club of Thailand and The Weissman Family.",
      },
    ],
  },
];
