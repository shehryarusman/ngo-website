import { Link } from "react-router-dom";
import { footerNav } from "../../data/navigation";
import { organization } from "../../data/organization";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <p className="footer-name">ARISE Foundation</p>
            <p className="footer-tagline">
              Charitable, educational, scientific, and community-led.
            </p>
            <p>
              We partner with local educational institutions and community
              spaces to deliver initiatives opening doors to accessible arts,
              science, and research-based opportunities.
            </p>
          </div>

          <div className="footer-column">
            <h2>Explore</h2>
            <ul>
              {footerNav.explore.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h2>Engage</h2>
            <ul>
              {footerNav.engage.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h2>Headquarters</h2>
            <address>
              {organization.address}
              <br />
              <a href={`mailto:${organization.inboxes.info}`}>
                {organization.inboxes.info}
              </a>
              <br />
              <a href={`tel:${organization.phone.tel}`}>{organization.phone.display}</a>
            </address>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ARISE Foundation. All rights reserved.</p>
          <p>ARISE Foundation is a 501(c)(3) public charity.</p>
        </div>
      </div>
    </footer>
  );
}
