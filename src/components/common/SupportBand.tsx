import { Link } from "react-router-dom";

/** Closing call to action on Home, About and How We Work. */
export function SupportBand() {
  return (
    <div className="cta-band">
      <h2>Support Our Mission</h2>
      <Link className="btn btn-on-dark" to="/donate">
        Donate
      </Link>
    </div>
  );
}
