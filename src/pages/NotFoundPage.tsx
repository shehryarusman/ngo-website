import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="page-container not-found-page">
      <section className="bento-grid">
        <article className="bento-card reveal">
          <p className="eyebrow">404</p>
          <h1>This page is not available.</h1>
          <p>Use the main site navigation or return to the homepage.</p>
          <Link className="btn btn-primary" to="/">
            Return Home
          </Link>
        </article>
      </section>
    </main>
  );
}
