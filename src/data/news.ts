export interface NewsFact {
  label: string;
  text: string;
  /** Text drafted for ARISE to confirm: the note on its review box in development. */
  review?: string;
}

export interface NewsStory {
  slug: string;
  title: string;
  dateLabel: string;
  /** Portrait poster image, exported at 420w and 712w (WebP). */
  image: { base: string; width: number; height: number; alt: string };
  intro?: string;
  /** Intro drafted for ARISE to confirm: the note on its review box in development. */
  introReview?: string;
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
      base: "/images/news/thailand-pilot-2026",
      width: 712,
      height: 1601,
      alt: "ARISE High School Scholars Program Thailand Pilot 2026 banner: Inspiring the Next Generation of Young Scientists, with partner logos",
    },
    intro:
      "The ARISE High School Scholars Program begins with its pilot in Thailand: students from five secondary schools and their Guardian STEM Teachers take part in the Vaccine & Therapeutic RNA Research Forum 2026 in Bangkok.",
    introReview:
      "Introductory announcement (two to three sentences), to be published before November 9, 2026. Participating schools and students may be named only with their written permission.",
    facts: [
      {
        label: "Who",
        text: "The inaugural ARISE High School Scholars cohort: seventeen students in Grades 10–11 (Mathayom 4–5) from five secondary schools in Thailand, accompanied by their Guardian STEM Teachers.",
        review: "Confirmed number of participating students and secondary schools in Thailand",
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
