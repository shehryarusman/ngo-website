import { FocusEvent, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  {
    label: "Who We Are",
    to: "/about",
    dropdown: [
      { label: "Story", to: "/about#story" },
      { label: "Role", to: "/about#role" },
      { label: "Board", to: "/board" },
    ],
  },
  {
    label: "What We Do",
    to: "/programs",
    dropdown: [
      { label: "Areas", to: "/programs#areas" },
      { label: "Programs", to: "/programs#programs" },
      { label: "Locations & History", to: "/programs#locations-history" },
    ],
  },
  {
    label: "How We Work",
    to: "/impact",
    dropdown: [
      { label: "Operations", to: "/impact#operations" },
      { label: "Funding", to: "/impact#funding" },
      { label: "Financials", to: "/impact#financials" },
    ],
  },
  {
    label: "Get Involved",
    to: "/get-involved",
    dropdown: [
      { label: "Get Chosen", to: "/get-involved#get-chosen" },
      { label: "Wanna Help?", to: "/get-involved#wanna-help" },
    ],
  },
];

export function SiteHeader() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    setOpenMenu(null);
  }, [location.pathname, location.hash]);

  const handleBlur = (
    event: FocusEvent<HTMLDivElement>,
    menuPath: string
  ) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setOpenMenu((currentMenu) =>
        currentMenu === menuPath ? null : currentMenu
      );
    }
  };

  return (
    <header className="site-header">
      <Link to="/" className="brand-mark">
        ARISE
      </Link>
      <nav className="header-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <div
            key={item.to}
            className="nav-menu"
            onMouseEnter={() => setOpenMenu(item.to)}
            onMouseLeave={() => setOpenMenu(null)}
            onFocus={() => setOpenMenu(item.to)}
            onBlur={(event) => handleBlur(event, item.to)}
          >
            <Link className="nav-link" to={item.to}>
              {item.label}
            </Link>
            <div
              className={
                openMenu === item.to
                  ? "nav-dropdown is-open"
                  : "nav-dropdown"
              }
            >
              {item.dropdown.map((dropdownItem) => (
                <Link
                  key={dropdownItem.to}
                  to={dropdownItem.to}
                  onClick={() => setOpenMenu(null)}
                >
                  {dropdownItem.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div className="header-cta">
        <Link className="btn btn-soft" to="/contact">
          Contact
        </Link>
        <Link className="btn btn-primary" to="/donate">
          Donate
        </Link>
      </div>
    </header>
  );
}
