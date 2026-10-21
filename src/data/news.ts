export interface NewsFact {
  label: string;
  text: string;
  /** Detail still to be confirmed by ARISE; rendered as a placeholder. */
  todo?: string;
}

export interface NewsStory {
  slug: string;
  title: string;
  dateLabel: string;
  image: { src: string; alt: string };
  facts: NewsFact[];
}

// Facts come from the client's program summary (Oct 20, 2026), in formal wording.
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
        text: "The inaugural ARISE High School Scholars cohort: students in Grades 10–11 (Mathayom 4–5), accompanied by their Guardian STEM Teachers.",
        todo: "Confirmed number of participating students and secondary schools in Thailand",
      },
      {
        label: "When and where",
        text: "November 9–10, 2026 at the Vaccine & Therapeutic RNA Research Forum 2026, Faculty of Medicine, Chulalongkorn University, hosted by Chula VRC, Chula School of Global Health, UK-SEA Vax Hub and Thailand's National Vaccine Institute.",
      },
      {
        label: "Funding",
        text: "Sponsored through ARISE travel grants awarded to each participating school under the ARISE Travel Grant Program.",
      },
      {
        label: "Program",
        text: "The program comprises three components: nine online RNA Building Blocks preparatory modules; participation in the forum; and a closing session and luncheon with ARISE leadership, including a planned visit to the Chula Vaccine Research Center laboratory.",
      },
      {
        label: "Partners",
        text: "A partnership between ARISE Foundation, Chula VRC, the University of Pennsylvania Alumni Club of Thailand and The Weissman Family.",
      },
    ],
  },
];
