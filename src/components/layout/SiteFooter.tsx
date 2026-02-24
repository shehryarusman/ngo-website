import { Link } from "react-router-dom";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-topline">
        <p className="eyebrow">Global Hope Initiative</p>
        <p>Independent NGO, established 2015</p>
      </div>

      <div className="footer-grid">
        <div className="footer-brand">
          <h3>Professional, transparent, and community-led implementation.</h3>
          <p>
            We partner with local institutions to deliver measurable outcomes
            in health, education, water, and livelihoods. Program and finance
            reports are shared through quarterly disclosure cycles.
          </p>
        </div>

        <div className="footer-column">
          <h4>Explore</h4>
          <Link to="/about">About</Link>
          <Link to="/programs">Programs</Link>
          <Link to="/impact">Impact</Link>
          <Link to="/stories">Stories</Link>
        </div>

        <div className="footer-column">
          <h4>Engage</h4>
          <Link to="/get-involved">Get Involved</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/donate">Donation Page</Link>
        </div>

        <div className="footer-column footer-contact">
          <h4>Head Office</h4>
          <p>1204 Unity Ave, Washington, DC 20005</p>
          <p>partnerships@globalhope.org</p>
          <p>+1 (202) 555-0182</p>
          <p>Tax ID: 92-8134706</p>
        </div>
      </div>

      <div className="footer-bottomline">
        <p>2026 Global Hope Initiative. All rights reserved.</p>
        <p>Safeguarding, compliance, and donor privacy standards in effect.</p>
      </div>
    </footer>
  );
}
