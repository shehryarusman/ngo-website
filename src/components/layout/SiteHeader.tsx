import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { mainNav } from "../../data/navigation";

export function SiteHeader() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);

  // Close menus on navigation.
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  // Shrink the header once the page has scrolled. The header is fixed over a
  // full-height spacer, so this never moves the page content.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setCondensed(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

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
        className={["site-header", condensed ? "is-condensed" : "", mobileOpen ? "is-menu-open" : ""]
          .filter(Boolean)
          .join(" ")}
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
            type="button"
            className="menu-toggle"
            aria-expanded={mobileOpen}
            aria-controls="site-nav"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className="menu-toggle-bars" aria-hidden="true" />
            <span className="menu-toggle-label">{mobileOpen ? "Close" : "Menu"}</span>
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
    </>
  );
}
