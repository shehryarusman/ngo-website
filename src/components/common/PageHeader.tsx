import { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { PhotoName } from "../../data/images";
import { Picture } from "./Picture";

interface Action {
  label: string;
  to: string;
  variant?: "primary" | "secondary";
}

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  actions?: Action[];
  image?: PhotoName;
  /** Short supporting panel shown under the lead (e.g. mission, status). */
  aside?: ReactNode;
}

export function PageHeader({
  eyebrow,
  title,
  lead,
  actions,
  image,
  aside,
}: PageHeaderProps) {
  // Bento header: a maroon title tile, the photo tile beside it, and the
  // supporting note (mission, status) as its own tile under the title.
  return (
    <header className={image ? "page-header page-header--image" : "page-header"}>
      <div className="container page-header-grid">
        <div className="card card--maroon page-header-copy">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1>{title}</h1>
          {lead ? <div className="lead">{lead}</div> : null}
          {actions && actions.length > 0 ? (
            <div className="button-row">
              {actions.map((action) => (
                <Link
                  key={action.to + action.label}
                  className={
                    action.variant === "secondary"
                      ? "btn btn-ghost-dark"
                      : "btn btn-on-dark"
                  }
                  to={action.to}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
        {image ? (
          <div className="page-header-media">
            <Picture name={image} priority sizes="(min-width: 961px) 840px, 110vw" />
          </div>
        ) : null}
        {aside ? <aside className="card page-header-aside">{aside}</aside> : null}
      </div>
    </header>
  );
}
