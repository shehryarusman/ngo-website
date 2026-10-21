// Self-hosted photos in public/images, each exported as <name>-800.webp and
// <name>-1600.webp (see README → Assets for how to add more).
export const photos = {
  "lab-glassware": { alt: "Laboratory glassware on a bench", width: 1600, height: 1066 },
  "lab-pipette": { alt: "Pipette dispensing into a sample tray", width: 1600, height: 1066 },
  "cells-microscopy": { alt: "Cells viewed under a fluorescence microscope", width: 1600, height: 1600 },
  "students-collaborating": { alt: "Students working together at a table", width: 1600, height: 1066 },
  "art-brushes": { alt: "Paint brushes and bright paint", width: 1600, height: 1066 },
  graduation: { alt: "Graduates in caps and gowns", width: 1600, height: 1066 },
  "documents-review": { alt: "Documents reviewed at a desk", width: 1600, height: 1068 },
  "team-planning": { alt: "People planning together at a table", width: 1600, height: 1050 },
  "students-library": { alt: "Students studying in a library", width: 1600, height: 1066 },
} as const;

export type PhotoName = keyof typeof photos;
