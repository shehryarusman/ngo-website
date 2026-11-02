// Single switch for draft content: Placeholder boxes and any card, heading or
// column that holds nothing but a placeholder. Shown in development (and in a
// build made with VITE_SHOW_PLACEHOLDERS=true); never on the public site.
export const SHOW_PLACEHOLDERS =
  import.meta.env.DEV || import.meta.env.VITE_SHOW_PLACEHOLDERS === "true";
