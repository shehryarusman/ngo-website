export const leadership = [
  {
    name: "Dr. Elena Atochina-Vasserman, M.D., Ph.D.",
    role: "President and Director",
    bio: "Elena oversees the design and evaluation of science-focused grant programs supporting emerging researchers, and welcomes collaboration with educators, students, and partners devoted to advancing science and research.",
  },
  {
    name: "Jessica Vasserman",
    role: "Secretary and Director, Arts & Research",
    bio: "Jess leads the evaluation and preparation of arts-related grant submissions, and welcomes collaborations and discussions regarding ARISE's arts and science initiatives.",
  },
  {
    name: "Ilya Vasserman",
    role: "Treasurer, CFO and Director",
    bio: null,
  },
];

export const boardMembers: Array<{
  name: string;
  role: string;
  pronouns?: string;
  intro?: string;
  sections: Array<{ title: string; body: string }>;
}> = [
  {
    name: "Dr. Elena Atochina-Vasserman, M.D., Ph.D.",
    role: "President and Director",
    pronouns: "she/her",
    intro:
      "As a distinguished scientist and educator with more than three decades of experience in immunology, pulmonary biology, and advanced therapeutic delivery systems, working extensively with mRNA vaccine technology, Elena brings deep scientific insight and a commitment to fostering education and research to the ARISE Foundation.",
    sections: [
      {
        title: "Professional Background",
        body:
          "As a Research Assistant Professor of Medicine in the Infectious Diseases Division at a leading Philadelphia-area research university, Elena has made extensive contributions to inflammatory lung disease, innate immunity, and targeted drug-delivery systems, including major studies in surfactant protein biology, endothelial inflammation, and molecular mechanisms underlying pulmonary dysfunction. In recent years, she has led innovative work developing next-generation, one-component platforms for mRNA delivery, advancing solutions for scalability, accessibility, and precision targeting in vaccines. Her publications appear in leading journals including Science, JACS, and Nature Communications. She has also served on numerous scientific review committees, including NIH panels and national research foundations.",
      },
      {
        title: "Why She Serves",
        body:
          "Elena's dedication to the ARISE Foundation is grounded in her belief that science and education are transformative forces. Having mentored young researchers for decades, she is committed to supporting students pursuing careers in science by providing access to resources and opportunities that accelerate their development.",
      },
      {
        title: "Personal Touch",
        body:
          "Originally trained in medicine and biophysics, Elena has conducted research across Russia and the United States for more than three decades. She is known for her collaborative spirit, scientific rigor, and dedication to nurturing future scientists.",
      },
      {
        title: "Role at ARISE",
        body:
          "Elena oversees the design and evaluation of science-focused grant programs supporting emerging researchers, and welcomes collaboration with educators, students, and partners devoted to advancing science and research.",
      },
    ],
  },
  {
    name: "Jessica Vasserman",
    role: "Secretary and Director, Arts & Research",
    pronouns: "she/her",
    intro:
      "Jess is an emerging leader in biomedical research and a passionate advocate for increasing accessibility to science and the arts. With experience in cutting-edge mRNA research and personal foundation in creative expression, Jess brings an interdisciplinary perspective to the ARISE Foundation.",
    sections: [
      {
        title: "Professional Background",
        body:
          "Recently graduated with a Bachelor of Science in Biology from Drexel University, concentrated in Pathobiology with a minor in Japanese, Jess continues her pursuit of science in an RNA research laboratory at a Philadelphia-area university, producing, evaluating, and purifying modified mRNA for next-generation vaccine platforms. Her work includes cell culture, mRNA optimization, and comparative analysis of delivery technologies. Earlier, she completed research through Drexel's STAR Scholars Program, studying ion channel localization in descending neurons using Drosophila models. She has co-authored multiple peer-reviewed publications and possesses extensive laboratory and analytical experience. In her spare time, she bridges her passions for biology and art as a freelance visual artist and scientific illustrator. Her illustrations have appeared across various scientific publications including the Lancet, Frontiers in Physiology, and the cover of Springer's Cardiac Bioelectric Therapy textbook.",
      },
      {
        title: "Why She Serves",
        body:
          "Jess's passion for ARISE is rooted in her belief that both science and the arts are essential to nurturing curiosity, personal growth, and self-identity. Her academic and artistic journey inspires her commitment to supporting students who demonstrate talent in the arts and sciences.",
      },
      {
        title: "Personal Touch",
        body:
          "Jess is an accomplished painter and musician. She's fluent in English and Russian and conversational in Japanese; she studied abroad in Tokyo and continues to practice her language skills by tutoring Japanese. She values community engagement, creativity, and interdisciplinary collaboration.",
      },
      {
        title: "Role at ARISE",
        body:
          "Jess leads the evaluation and preparation of arts-related grant submissions, and welcomes collaborations and discussions regarding ARISE's arts and science initiatives.",
      },
    ],
  },
  {
    name: "Ilya Vasserman",
    role: "Treasurer, CFO and Director",
    sections: [],
  },
];

// "Areas of Impact" text is from the client's website notes.
export const programAreas: Array<{
  title: string;
  summary: string;
  image: string;
  to?: string;
}> = [
  {
    title: "Art",
    summary: "Furthering culture and expression by fostering creativity and community.",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1600&q=84",
  },
  {
    title: "Research",
    summary:
      "Opening doors and destabilizing barriers to research by funding travel to conferences, as well as fellowship opportunities.",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1600&q=84",
  },
  {
    title: "Innovation",
    summary: "Pushing boundaries of what is known by promoting discovery of the unknown.",
    image:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1600&q=84",
  },
  {
    title: "Science",
    summary:
      "Expanding knowledge and advancing science through educational and research-based programs.",
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1600&q=84",
  },
  {
    title: "Education",
    summary:
      "Extending horizons for young academics by creating opportunities for accessible education.",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=84",
  },
  {
    title: "Mission",
    summary:
      "Read about ARISE Foundation's mission to impassion, inspire, and educate across Arts, Research, Innovation, Science, and Education.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=84",
    to: "/about",
  },
];

export const impactSnapshots = [
  { metric: "2025", context: "Independent NGO established" },
  { metric: "2026", context: "First summer student programs opening" },
  { metric: "501(c)(3)", context: "IRS-recognized public charity" },
  { metric: "2", context: "Initial focus areas: arts and science" },
  { metric: "US & Asia", context: "Programs in the United States and Asia, beginning with Thailand in 2026" },
  { metric: "Local", context: "Educational institution and community-space partnerships" },
];

export const reports = [
  {
    name: "2026 Program Opening Brief",
    detail: "Student eligibility, partner structure, and program expectations.",
  },
  {
    name: "Annual Financial Summary",
    detail: "A one-page summary of donations, operating costs, and program spending.",
  },
  {
    name: "Safeguarding And Governance Review",
    detail: "Student protection, partner expectations, and compliance status updates.",
  },
];

export const involvementTracks = [
  {
    title: "Skilled Volunteering",
    text: "Support projects in health, education, design, engineering, and communications.",
  },
  {
    title: "Institutional Partnerships",
    text: "Co-fund and co-deliver initiatives with clear goals and reporting.",
  },
  {
    title: "Corporate Engagement",
    text: "Employee volunteering, matching campaigns, and strategic sponsorship programs.",
  },
  {
    title: "Regional Advocacy",
    text: "Join policy roundtables and knowledge-sharing events with local leaders.",
  },
];

export const partnerList = [
  "Chula VRC",
  "University of Pennsylvania Alumni Club of Thailand",
  "The Weissman Family",
];

export const contactOffices = [
  {
    city: "Headquarters",
    address: "1427 Byberry Rd, Huntingdon Valley, PA 19006",
    phone: "+1 (215) 901-8722",
    email: "info@arisegiving.org",
  },
];
