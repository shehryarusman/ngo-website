import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { mainNav } from "../../data/navigation";

// Matches the phone/tablet breakpoint in styles.css.
const COMPACT = "(max-width: 1120px)";
// Past this scroll depth a downward scroll on compact screens hides the header.
const HIDE_AFTER = 120;

export function SiteHeader() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuOpenRef = useRef(false);
  menuOpenRef.current = mobileOpen;

  // Close menus on navigation.
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  // The header is fixed over a full-height spacer, so changing it never moves
  // the page. On desktop it shrinks once the page scrolls. On compact screens
  // it also slides away while scrolling down, leaving a round menu button,
  // and returns on any scroll up; it never hides while the menu is open.
  useEffect(() => {
    const compact = window.matchMedia(COMPACT);
    let frame = 0;
    let lastY = window.scrollY;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setCondensed(y > 24);
      const hasFocus =
        headerRef.current?.contains(document.activeElement) ?? false;
      if (
        !compact.matches ||
        menuOpenRef.current ||
        hasFocus ||
        y < HIDE_AFTER
      ) {
        setHidden(false);
      } else if (y > lastY + 4) {
        setHidden(true);
      } else if (y < lastY - 4) {
        setHidden(false);
      }
      if (Math.abs(y - lastY) > 4) lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    compact.addEventListener("change", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      compact.removeEventListener("change", update);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Open the menu in place, and move focus to its toggle so keyboard users
  // continue into the menu (the round button disappears).
  const openFromButton = () => {
    setHidden(false);
    setMobileOpen(true);
    requestAnimationFrame(() => toggleRef.current?.focus());
  };

  // Close dropdowns on Escape or a click outside the header.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const onClick = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <>
      <div className="site-header-spacer" aria-hidden="true" />
      <header
        ref={headerRef}
        className={[
          "site-header",
          condensed ? "is-condensed" : "",
          hidden ? "is-hidden" : "",
          mobileOpen ? "is-menu-open" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        // Keyboard focus entering the header brings it back into view.
        onFocus={() => setHidden(false)}
      >
        <div className="container site-header-inner">
          <Link to="/" className="brand" aria-label="ARISE Foundation home">
            <img
              src="/brand/arise-horizontal-480.webp"
              srcSet="/brand/arise-horizontal-480.webp 480w, /brand/arise-horizontal-720.webp 720w"
              sizes="210px"
              width={480}
              height={188}
              alt="ARISE Foundation — Arts, Research, Innovation, Science and Education"
            />
          </Link>

          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={mobileOpen}
            aria-controls="site-nav"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className="menu-toggle-bars" aria-hidden="true" />
            <span className="menu-toggle-label">
              {mobileOpen ? "Close" : "Menu"}
            </span>
          </button>

          <nav
            id="site-nav"
            className={mobileOpen ? "site-nav is-open" : "site-nav"}
            aria-label="Main navigation"
          >
            <ul className="nav-list">
              {mainNav.map((item) => {
                const isOpen = openMenu === item.to;
                const menuId = `menu-${item.to.slice(1)}`;
                return (
                  <li
                    key={item.to}
                    className={isOpen ? "nav-item is-open" : "nav-item"}
                    // Hover menus only for mouse pointers; touch uses the toggle button.
                    onPointerEnter={(event) => {
                      if (event.pointerType === "mouse") setOpenMenu(item.to);
                    }}
                    onPointerLeave={(event) => {
                      if (event.pointerType === "mouse") setOpenMenu(null);
                    }}
                  >
                    <div className="nav-item-row">
                      <NavLink className="nav-link" to={item.to}>
                        {item.label}
                      </NavLink>
                      <button
                        type="button"
                        className="nav-expand"
                        aria-expanded={isOpen}
                        aria-controls={menuId}
                        aria-label={`${item.label} submenu`}
                        onClick={() => setOpenMenu(isOpen ? null : item.to)}
                      >
                        <span aria-hidden="true" className="chevron" />
                      </button>
                    </div>
                    <ul id={menuId} className="nav-dropdown">
                      {item.children.map((child) => (
                        <li key={child.to + child.label}>
                          <Link to={child.to}>{child.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
            <div className="nav-actions">
              <Link className="btn btn-ghost-dark" to="/contact">
                Contact
              </Link>
              <Link className="btn btn-on-dark" to="/donate">
                Donate
              </Link>
            </div>
          </nav>
        </div>
      </header>
      <button
        type="button"
        className={hidden ? "menu-fab is-visible" : "menu-fab"}
        aria-label="Open menu"
        aria-controls="site-nav"
        aria-expanded={false}
        tabIndex={hidden ? 0 : -1}
        onClick={openFromButton}
      >
        <span className="menu-toggle-bars" aria-hidden="true" />
      </button>
    </>
  );
}
