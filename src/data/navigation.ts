import { programs } from "./programs";

export interface NavItem {
  label: string;
  to: string;
  children: Array<{ label: string; to: string }>;
}

export const mainNav: NavItem[] = [
  {
    label: "Who We Are",
    to: "/about",
    children: [
      { label: "About ARISE", to: "/about" },
      { label: "Our Story", to: "/about#story" },
      { label: "Board of Directors", to: "/board" },
      { label: "News & Stories", to: "/news" },
    ],
  },
  {
    label: "What We Do",
    to: "/programs",
    children: [
      { label: "All Programs", to: "/programs" },
      ...programs.map((program) => ({
        label: program.name,
        to: `/programs/${program.slug}`,
      })),
      { label: "Areas of Impact", to: "/programs#areas" },
    ],
  },
  {
    label: "How We Work",
    to: "/impact",
    children: [
      { label: "Overview", to: "/impact" },
      { label: "Transparency", to: "/transparency" },
    ],
  },
  {
    label: "Get Involved",
    to: "/get-involved",
    children: [
      { label: "Apply", to: "/get-involved#apply" },
      { label: "Partner", to: "/get-involved#partner" },
      { label: "Donate", to: "/donate" },
    ],
  },
];

export const footerNav = {
  explore: [
    { label: "Who We Are", to: "/about" },
    { label: "What We Do", to: "/programs" },
    { label: "How We Work", to: "/impact" },
    { label: "News & Stories", to: "/news" },
    { label: "Transparency", to: "/transparency" },
  ],
  engage: [
    { label: "Get Involved", to: "/get-involved" },
    { label: "Contact", to: "/contact" },
    { label: "Donate", to: "/donate" },
  ],
};
