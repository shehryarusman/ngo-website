import { Children, CSSProperties, isValidElement, ReactNode } from "react";

interface TitledGridProps {
  title: string;
  eyebrow?: string;
  intro?: ReactNode;
  /** Content columns beside the title tile on wide screens. */
  cols: number;
  children: ReactNode;
}

/** Content columns beside the title tile at ≤1120px. */
const COMPACT_COLS = 2;

const spansAll = (child: ReactNode) =>
  isValidElement<{ className?: string }>(child) &&
  (child.props.className ?? "").split(" ").includes("span-all");

/**
 * A card grid led by a maroon title tile in the first column, spanning every
 * row of the cards beside it. On phones the tile sits above the cards.
 */
export function TitledGrid({ title, eyebrow, intro, cols, children }: TitledGridProps) {
  const items = Children.toArray(children);
  const wide = items.filter(spansAll).length;
  const rowsAt = (columns: number) => Math.ceil((items.length - wide) / columns) + wide;

  const style = {
    "--cols-wide": cols,
    "--rows-wide": rowsAt(cols),
    "--cols-compact": Math.min(cols, COMPACT_COLS),
    "--rows-compact": rowsAt(Math.min(cols, COMPACT_COLS)),
  } as CSSProperties;

  return (
    <div className="grid titled-grid" style={style}>
      <header className="card card--maroon card--title">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
        {intro ? <p className="card-title-intro">{intro}</p> : null}
      </header>
      {children}
    </div>
  );
}
