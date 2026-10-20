import { Link } from "react-router-dom";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-topline">
        <p className="eyebrow">ARISE Foundation</p>
        <p>Independent NGO, established 2025</p>
      </div>

      <div className="footer-grid">
        <div className="footer-brand">
          <h3>Charitable, educational, scientific, and community-led.</h3>
          <p>
            We partner with local educational institutions and community spaces
            to deliver initiatives opening doors to accessible arts, science,
            and research-based opportunities.
          </p>
        </div>

        <div className="footer-column">
          <h4>Explore</h4>
          <Link to="/about">Who We Are</Link>
          <Link to="/programs">What We Do</Link>
          <Link to="/impact">How We Work</Link>
        </div>

        <div className="footer-column">
          <h4>Engage</h4>
          <Link to="/get-involved">Get Involved</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/donate">Donate</Link>
        </div>

        <div className="footer-column footer-contact">
          <h4>Headquarters</h4>
          <p>1427 Byberry Rd, Huntingdon Valley, PA 19006</p>
          <p>info@arisegiving.org</p>
          <p>+1 (215) 901-8722</p>
        </div>
      </div>

      <div className="footer-bottomline">
        <p>© 2026 ARISE Foundation. All rights reserved.</p>
        <p>Safeguarding, compliance, and donor privacy standards in effect.</p>
      </div>
    </footer>
  );
}
