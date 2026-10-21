import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { SiteFooter } from "./components/layout/SiteFooter";
import { SiteHeader } from "./components/layout/SiteHeader";
import { useCardMotion } from "./hooks/useCardMotion";
import { useReveal } from "./hooks/useReveal";
import { AboutPage } from "./pages/AboutPage";
import { BoardPage } from "./pages/BoardPage";
import { ContactPage } from "./pages/ContactPage";
import { DonationPage } from "./pages/DonationPage";
import { GetInvolvedPage } from "./pages/GetInvolvedPage";
import { HomePage } from "./pages/HomePage";
import { ImpactPage } from "./pages/ImpactPage";
import { NewsPage } from "./pages/NewsPage";
import { NewsStoryPage } from "./pages/NewsStoryPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProgramPage } from "./pages/ProgramPage";
import { ProgramsPage } from "./pages/ProgramsPage";
import { TransparencyPage } from "./pages/TransparencyPage";

function useScrollOnNavigate() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // In-page anchors scroll (smoothly unless reduced motion is set, via CSS).
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
      return;
    }
    // New pages start at the top immediately; no animated scroll.
    window.scrollTo(0, 0);
  }, [pathname, hash]);
}

function App() {
  useScrollOnNavigate();
  useReveal();
  useCardMotion();

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader />
      <div id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/programs/:slug" element={<ProgramPage />} />
          <Route path="/impact" element={<ImpactPage />} />
          <Route path="/transparency" element={<TransparencyPage />} />
          <Route path="/get-involved" element={<GetInvolvedPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/donate" element={<DonationPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:slug" element={<NewsStoryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <SiteFooter />
    </>
  );
}

export default App;
