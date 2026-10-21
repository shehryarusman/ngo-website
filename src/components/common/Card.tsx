import { HTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

interface CardProps extends HTMLAttributes<HTMLElement> {
  /** When set, the whole card is a link. */
  to?: string;
  children: ReactNode;
}

export function Card({ to, className, children, ...rest }: CardProps) {
  const classes = ["card", to ? "card--link" : "", className].filter(Boolean).join(" ");

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <article className={classes} {...rest}>
      {children}
    </article>
  );
}
