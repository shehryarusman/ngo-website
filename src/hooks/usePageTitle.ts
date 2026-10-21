import { useEffect } from "react";

/** Sets the browser tab title, e.g. "Board of Directors | ARISE Foundation". */
export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ARISE Foundation` : "ARISE Foundation";
  }, [title]);
}
