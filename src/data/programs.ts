// Program details come from the client's program summary (Oct 20, 2026).
// Anything not stated there is left for a <Placeholder> on the page.

export interface ProgramApplication {
  submittedBy: string;
  information: string[];
  uploads: string[];
}

export interface Program {
  slug: string;
  name: string;
  serves: string;
  provides: string;
  status: string;
  /** Status detail that needs written permission before it can be published. */
  statusApproval?: string;
  timing?: string;
  image: { src: string; alt: string };
  application: ProgramApplication;
}

export const programs: Program[] = [
  {
    slug: "biomedical-research-internship",
    name: "Biomedical Research Laboratory Internship",
    serves: "High school students ages 16–18 and early undergraduates.",
    provides:
      "Internships in academic research laboratories, mentored by researchers. Travel, lodging and stipends are provided where eligible.",
    status: "Active.",
    statusApproval:
      "Names of partner universities, to be published only with each university's written permission",
    timing: "Internships last one to ten weeks, typically during the summer.",
    image: {
      src: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1800&q=84",
      alt: "Students working in a science laboratory",
    },
    application: {
      submittedBy:
        "The student. A parent or guardian co-signs for applicants under 18.",
      information: [
        "Name, date of birth and contact details",
        "School or university, and grade or year",
        "Research interests",
        "Available dates",
        "Whether travel or lodging support is needed",
        "Whether a visa may be needed",
      ],
      uploads: [
        "Resume",
        "Transcript",
        "Personal statement (one page)",
        "Recommendation from a teacher or professor",
        "Parent or guardian consent, for applicants under 18",
      ],
    },
  },
  {
    slug: "fellowship-support",
    name: "Graduate and Postdoctoral Fellowship Support",
    serves:
      "Graduate students and postdoctoral researchers in biomedical research.",
    provides:
      "Fellowship funding through the researcher's university, with travel support where needed.",
    status: "Active.",
    image: {
      src: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1800&q=84",
      alt: "Cells viewed under a microscope",
    },
    application: {
      submittedBy:
        "The researcher, or the laboratory or university on the researcher's behalf.",
      information: [
        "Applicant and principal investigator details",
        "University and laboratory",
        "Field of study",
        "Research summary",
        "Support requested and period of support",
        "University grants office contact",
      ],
      uploads: [
        "CV",
        "Research proposal (two to three pages)",
        "Budget",
        "Letter of support from the principal investigator",
      ],
    },
  },
  {
    slug: "travel-grants",
    name: "Travel Grant Program",
    serves:
      "High school, college and graduate students, young researchers, underfunded academic laboratories, and schools sending student delegations.",
    provides:
      "Travel grants to attend and present at scientific conferences, covering conference registration, travel, lodging and meals. Grants are awarded to individuals or to their schools and institutions.",
    status: "Active. Includes the ARISE High School Scholars Program.",
    image: {
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1800&q=84",
      alt: "Students collaborating around a table",
    },
    application: {
      submittedBy: "The student, young researcher, or laboratory.",
      information: [
        "Conference name, dates and location",
        "Whether presenting or attending",
        "Estimated costs",
        "Other funding received",
      ],
      uploads: [
        "CV",
        "Abstract or acceptance notice",
        "Budget",
        "Letter from an advisor or principal investigator",
      ],
    },
  },
  {
    slug: "arts-education",
    name: "Arts Education and Exhibitions",
    serves: "Emerging local and regional artists, and the public.",
    provides:
      "Support for exhibitions, workshops, small awards and public programs.",
    status: "In development.",
    image: {
      src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1800&q=84",
      alt: "Paint brushes and colors",
    },
    application: {
      submittedBy: "The artist or organization.",
      information: [
        "Name and contact details",
        "Discipline",
        "Project or exhibition description",
        "Dates",
        "Budget",
      ],
      uploads: ["Portfolio (images or links)", "Artist statement", "CV"],
    },
  },
];

export const scholarsApplication: ProgramApplication = {
  submittedBy: "The school (not individual students).",
  information: [
    "School and contact person",
    "Nominated students and their grades",
    "Guardian STEM Teacher",
    "How students were selected",
    "Estimated budget",
  ],
  uploads: [
    "Signed and stamped school participation form",
    "Parent or guardian permissions",
  ],
};

export const nondiscriminationStatement =
  "ARISE serves participants, volunteers and board members regardless of race, color, creed, disability or ethnic origin.";
