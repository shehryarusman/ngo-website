import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { SiteFooter } from "./components/layout/SiteFooter";
import { SiteHeader } from "./components/layout/SiteHeader";
import { useCardInteractivity } from "./hooks/useCardInteractivity";
import { useRevealAnimations } from "./hooks/useRevealAnimations";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { DonationPage } from "./pages/DonationPage";
import { GetInvolvedPage } from "./pages/GetInvolvedPage";
import { HomePage } from "./pages/HomePage";
import { ImpactPage } from "./pages/ImpactPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProgramsPage } from "./pages/ProgramsPage";
import { StoriesPage } from "./pages/StoriesPage";

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const location = useLocation();

  useRevealAnimations();
  useCardInteractivity();

  useEffect(() => {
    const timer = window.setTimeout(() => setIsBooting(false), 480);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const targetId = decodeURIComponent(location.hash.slice(1));
      window.requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname, location.hash]);

  return (
    <div className="app-shell">
      {isBooting ? (
        <div className="app-loader" aria-hidden="true">
          <div className="loader-orb" />
          <p>Preparing impact dashboard</p>
        </div>
      ) : null}
      <div className="noise-layer" />
      <SiteHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/impact" element={<ImpactPage />} />
        <Route path="/stories" element={<StoriesPage />} />
        <Route path="/get-involved" element={<GetInvolvedPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/donate" element={<DonationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <SiteFooter />
    </div>
  );
}

export default App;
