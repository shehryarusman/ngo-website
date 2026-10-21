import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";

export function NotFoundPage() {
  usePageTitle("Page not found");

  return (
    <main className="not-found">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1>This page is not available.</h1>
        <p className="lead">Use the main site navigation or return to the homepage.</p>
        <Link className="btn btn-primary" to="/">
          Return Home
        </Link>
      </div>
    </main>
  );
}
