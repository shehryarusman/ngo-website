// Self-hosted photos in public/images, each exported as <name>-800.webp and
// <name>-1200.webp, <name>-1600.webp and <name>-2400.webp (see README → Assets for how to add more).
// Sources and licences are recorded in public/images/CREDITS.md.
export const photos = {
  "teaching-lab": { alt: "Students working together in a teaching laboratory", width: 1600, height: 1068 },
  "mentor-session": { alt: "A mentor working through written exercises with a student", width: 1600, height: 1066 },
  "lab-bench": { alt: "Two researchers working at a laboratory bench", width: 1600, height: 1067 },
  "document-review": { alt: "Two people reviewing a document at a table", width: 1600, height: 1067 },
  "working-table": { alt: "People taking notes together around a table", width: 1600, height: 1071 },
  "library-desk": { alt: "A student reading at a library desk", width: 1600, height: 1067 },
  "test-tubes": { alt: "A student selecting a test tube from a laboratory rack", width: 1600, height: 1067 },
  "lab-instrument": { alt: "A researcher loading samples into a laboratory instrument", width: 1600, height: 1067 },
  "poster-session": { alt: "A researcher presenting results at a conference poster session", width: 1600, height: 1115 },
  "piano-practice": { alt: "A student practising at an upright piano", width: 1600, height: 1066 },
  "painter-easel": { alt: "A painter working on a canvas in a studio", width: 1600, height: 1066 },
  "lab-workstation": { alt: "A researcher working at a laboratory workstation", width: 1600, height: 1067 },
  "soldering-bench": { alt: "Hands soldering a circuit board at a workbench", width: 1600, height: 1067 },
  "field-notebook": { alt: "A field researcher writing notes among plants", width: 1600, height: 1067 },
  "lecture-hall": { alt: "Students listening in a lecture hall", width: 1600, height: 1067 },
  "campus-brick": { alt: "Bicycles beside brick buildings on a campus", width: 1600, height: 1068 },
} as const;

export type PhotoName = keyof typeof photos;
