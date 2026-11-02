import { useEffect, useRef, useState } from "react";
import { giveLively } from "../../data/organization";

// The Give Lively script polls the page for this element and fills it with a
// <gl-donation-widget-container> whose shadow root holds the form (.gl-widget).
// Loaded once, it keeps running: when the form leaves its shadow root it waits
// for the element to reappear and renders the form again, which is how it
// survives client-side navigation away from and back to /donate.
const CONTAINER_ID = "give-lively-widget";
const CONTAINER_CLASS = "gl-simple-donation-widget";
const HOST_TAG = "gl-donation-widget-container";
const SCRIPT_ID = "give-lively-script";
// The script needs no network to render once it has run, only its 250 ms poll,
// so a form still missing after this long means the running copy is stuck.
const RECOVERY_MS = 3000;

let loading: Promise<void> | null = null;

/** Adds the script to <head> once per page load; a failed load is retried on the next mount. */
function loadScript(): Promise<void> {
  if (!loading) {
    loading = new Promise<void>((resolve, reject) => {
      document.getElementById(SCRIPT_ID)?.remove();
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = giveLively.widgetScriptUrl;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        loading = null;
        script.remove();
        reject(new Error("Give Lively script failed to load"));
      };
      document.head.appendChild(script);
    });
  }
  return loading;
}

function renderedForm(container: HTMLElement) {
  return (
    container.querySelector(HOST_TAG)?.shadowRoot?.querySelector(".gl-widget") ??
    container.querySelector(".gl-widget")
  );
}

/**
 * Give Lively donation form. A link to the hosted donation page shows until
 * the form renders, and stays if the script fails or is blocked.
 */
export function GiveLivelyWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const check = () => setRendered(Boolean(renderedForm(container)));
    const observer = new MutationObserver(check);
    observer.observe(container, { childList: true, subtree: true });
    check();

    let active = true;
    let recovery = 0;
    loadScript().then(
      () => {
        if (!active) return;
        // The running copy can miss this container if the previous one was
        // removed in the instant between rendering and wiring up the form.
        // Replace it with a fresh copy; each render resets the container, so
        // this can never show two forms.
        recovery = window.setTimeout(() => {
          if (!active || renderedForm(container)) return;
          loading = null;
          loadScript().catch(() => undefined);
        }, RECOVERY_MS);
      },
      () => undefined
    );

    return () => {
      active = false;
      window.clearTimeout(recovery);
      observer.disconnect();
      // Empty the form's shadow root so the script sees the form gone and
      // waits for the next container instead of watching a detached one.
      const shadow = container.querySelector(HOST_TAG)?.shadowRoot;
      if (shadow) shadow.innerHTML = "";
    };
  }, []);

  return (
    <>
      {/* Give Lively owns this element's contents; React renders it empty. */}
      <div id={CONTAINER_ID} className={CONTAINER_CLASS} ref={containerRef} />
      {!rendered && (
        <div className="button-row">
          <a className="btn btn-primary" href={giveLively.donatePageUrl}>
            Donate online
          </a>
        </div>
      )}
    </>
  );
}
