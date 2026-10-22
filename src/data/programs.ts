import type { PhotoName } from "./images";

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
  image: PhotoName;
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
    image: "lab-pipette",
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
    image: "cells-microscopy",
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
    image: "students-collaborating",
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
    image: "art-brushes",
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

/** "Active" or "In development": the status without its trailing sentence(s). */
export function statusLabel(program: Program) {
  return program.status.split(".")[0];
}

/** Anything the status says beyond the label, e.g. which program it includes. */
export function statusNote(program: Program) {
  return program.status.slice(program.status.indexOf(".") + 1).trim();
}

/** One-line card summary: the first sentence of what ARISE provides. */
export function programSummary(program: Program) {
  const end = program.provides.indexOf(". ");
  return end === -1 ? program.provides : program.provides.slice(0, end + 1);
}
