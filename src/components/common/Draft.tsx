import { ReactNode } from "react";
import { SHOW_PLACEHOLDERS } from "../../drafts";

// Wraps markup that exists only to hold placeholders (a card, a heading and
// its placeholders) so it disappears with them on the public site.
export function Draft({ children }: { children: ReactNode }) {
  return SHOW_PLACEHOLDERS ? <>{children}</> : null;
}
