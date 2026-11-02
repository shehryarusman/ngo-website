import { ReactNode } from "react";
import { SHOW_PLACEHOLDERS } from "../../drafts";

type PlaceholderKind = "text" | "image" | "document" | "approval";

interface CommonProps {
  /** Exactly what belongs here, e.g. "Ilya Vasserman bio, 3–4 sentences". */
  what: string;
  inline?: boolean;
  className?: string;
}

type PlaceholderProps = CommonProps &
  (
    | { kind?: PlaceholderKind; children?: never }
    /** Drafted content awaiting the client's review: published as written. */
    | { kind: "review"; children: ReactNode }
  );

const labels: Record<PlaceholderKind | "review", string> = {
  text: "To write",
  image: "Image needed",
  document: "Document needed",
  approval: "Needs approval",
  review: "Draft for review",
};

// Deliberately loud marker for content the client still has to supply.
// Every instance carries data-placeholder so tests can count what's outstanding.
// Renders nothing on the public site (see SHOW_PLACEHOLDERS), except a
// "review" placeholder, whose drafted content is published as plain markup.
export function Placeholder({
  what,
  kind = "text",
  inline = false,
  className,
  children,
}: PlaceholderProps) {
  if (!SHOW_PLACEHOLDERS) return kind === "review" ? <>{children}</> : null;

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
      {kind === "review" ? <Element className="placeholder-content">{children}</Element> : null}
    </Element>
  );
}
