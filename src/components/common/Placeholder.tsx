import { SHOW_PLACEHOLDERS } from "../../drafts";

type PlaceholderKind = "text" | "image" | "document" | "approval";

interface PlaceholderProps {
  /** Exactly what belongs here, e.g. "Ilya Vasserman bio, 3–4 sentences". */
  what: string;
  kind?: PlaceholderKind;
  inline?: boolean;
  className?: string;
}

const labels: Record<PlaceholderKind, string> = {
  text: "To write",
  image: "Image needed",
  document: "Document needed",
  approval: "Needs approval",
};

// Deliberately loud marker for content the client still has to supply.
// Every instance carries data-placeholder so tests can count what's outstanding.
// Renders nothing on the public site (see SHOW_PLACEHOLDERS).
export function Placeholder({
  what,
  kind = "text",
  inline = false,
  className,
}: PlaceholderProps) {
  if (!SHOW_PLACEHOLDERS) return null;

  const Element = inline ? "span" : "div";

  return (
    <Element
      className={["placeholder", `placeholder-${kind}`, inline ? "placeholder-inline" : "", className]
        .filter(Boolean)
        .join(" ")}
      data-placeholder={kind}
      role="note"
    >
      <span className="placeholder-label">{labels[kind]}:</span>{" "}
      <span className="placeholder-what">{what}</span>
    </Element>
  );
}
