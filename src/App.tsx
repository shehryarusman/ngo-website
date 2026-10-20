import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { SiteFooter } from "./components/layout/SiteFooter";
import { SiteHeader } from "./components/layout/SiteHeader";
import { useButtonInteractivity } from "./hooks/useButtonInteractivity";
import { useCardInteractivity } from "./hooks/useCardInteractivity";
import { useRevealAnimations } from "./hooks/useRevealAnimations";
import { AboutPage } from "./pages/AboutPage";
import { BoardPage } from "./pages/BoardPage";
import { ContactPage } from "./pages/ContactPage";
import { DonationPage } from "./pages/DonationPage";
import { GetInvolvedPage } from "./pages/GetInvolvedPage";
import { HomePage } from "./pages/HomePage";
import { ImpactPage } from "./pages/ImpactPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProgramsPage } from "./pages/ProgramsPage";

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const location = useLocation();

  useRevealAnimations();
  useCardInteractivity();
  useButtonInteractivity();

  useEffect(() => {
    const timer = window.setTimeout(() => setIsBooting(false), 480);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const behavior: ScrollBehavior = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
      ? "auto"
      : "smooth";

    if (location.hash) {
      const targetId = decodeURIComponent(location.hash.slice(1));
      window.requestAnimationFrame(() => {
        const target = document.getElementById(targetId);
        if (target) {
          // Offset manually: scrollIntoView ignores scroll-margin on some cards.
          const offset = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - offset,
            behavior,
          });
        } else {
          window.scrollTo({ top: 0, behavior });
        }
      });
      return;
    }

    window.scrollTo({ top: 0, behavior });
  }, [location.pathname, location.hash]);

  return (
    <div className="app-shell">
      {isBooting ? (
        <div className="app-loader" aria-hidden="true">
          <div className="loader-orb" />
          <p>Preparing ARISE Foundation</p>
        </div>
      ) : null}
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <div className="noise-layer" />
      <SiteHeader />
      <div id="main-content" tabIndex={-1}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/impact" element={<ImpactPage />} />
        <Route path="/get-involved" element={<GetInvolvedPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/donate" element={<DonationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </div>
      <SiteFooter />
    </div>
  );
}

export default App;
