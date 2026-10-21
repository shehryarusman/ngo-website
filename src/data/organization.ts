// Organization facts and official statements, from the client's program
// summary (Oct 20, 2026). Pages read these instead of repeating them.

export const organization = {
  legalName: "ARISE Foundation",
  address: "1427 Byberry Rd, Huntingdon Valley, PA 19006",
  phone: { display: "+1 (215) 901-8722", tel: "+12159018722" },
  fax: { display: "+1 (215) 893-4752" },
  website: "arisegiving.org",
  inboxes: {
    info: "info@arisegiving.org",
    apply: "apply@arisegiving.org",
    scholars: "scholars@arisegiving.org",
    giving: "giving@arisegiving.org",
    partners: "partners@arisegiving.org",
  },
} as const;

export type InboxKey = keyof typeof organization.inboxes;

/** Contact directory, in the order and wording of the spec's contact table. */
export const contactDirectory: Array<{ inbox: InboxKey; use: string }> = [
  { inbox: "info", use: "General questions and public records requests" },
  { inbox: "apply", use: "Applicant questions for all programs" },
  { inbox: "scholars", use: "High School Scholars Program schools and teachers" },
  { inbox: "giving", use: "Donations, receipts, and donor-advised fund grants" },
  { inbox: "partners", use: "Universities, laboratories, schools, funders, and sponsors" },
];

/** Contact form topics and the inbox each one routes to. */
export const contactTopics: Array<{ value: string; label: string; inbox: InboxKey }> = [
  { value: "general", label: "General question", inbox: "info" },
  { value: "programs", label: "Programs and applications", inbox: "apply" },
  { value: "scholars", label: "High School Scholars Program", inbox: "scholars" },
  { value: "giving", label: "Donations and receipts", inbox: "giving" },
  { value: "partnership", label: "Partnerships", inbox: "partners" },
  { value: "records", label: "Public records request", inbox: "info" },
];

export const statements = {
  charityStatus:
    "ARISE Foundation is a 501(c)(3) public charity. Contributions are tax-deductible to the extent allowed by law.",
  paDisclosure:
    "The official registration and financial information of ARISE Foundation may be obtained from the Pennsylvania Department of State by calling toll-free, within Pennsylvania, 1 (800) 732-0999. Registration does not imply endorsement.",
  transparency:
    "ARISE Foundation is a 501(c)(3) public charity. Copies of these documents are also available for inspection at our office or by request to info@arisegiving.org.",
  nondiscrimination:
    "ARISE serves participants, volunteers and board members regardless of race, color, creed, disability or ethnic origin.",
  mission:
    "ARISE advances science, education, and innovation by operating educational and research-based programs that promote scientific knowledge, training, and public understanding.",
  howWeWork:
    "ARISE designs and runs its own programs, directly and in collaboration with universities, research laboratories, and schools. It covers participation costs such as travel, lodging, and meals so that finances are not a barrier. ARISE also supports complementary educational programs in the arts.",
  whereWeWork:
    "ARISE is based in the Philadelphia area and works with institutions in the United States and Asia, beginning with Thailand in 2026.",
} as const;
