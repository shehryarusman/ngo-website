import { Link } from "react-router-dom";

const navItems = [
  { label: "About", to: "/about" },
  { label: "Programs", to: "/programs" },
  { label: "Impact", to: "/impact" },
  { label: "Stories", to: "/stories" },
  { label: "Get Involved", to: "/get-involved" },
  { label: "Contact", to: "/contact" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link to="/" className="brand-mark">
        Ngo
      </Link>
      <nav className="header-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <Link key={item.to} to={item.to}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="header-cta">
        <Link className="btn btn-soft" to="/get-involved">
          Volunteer
        </Link>
        <Link className="btn btn-primary" to="/donate">
          Donate
        </Link>
      </div>
    </header>
  );
}
