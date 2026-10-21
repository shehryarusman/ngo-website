// End-to-end site check: renders every route at desktop and mobile widths and
// fails on broken internal links, console errors, horizontal overflow, clipped
// text, missing/duplicate <h1>, broken images, or forbidden text.
//
// Usage: npm run build && npm run preview & npm run check:site [baseUrl]
// Optional: SHOTS_DIR=./shots to save full-page screenshots.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = process.argv[2] ?? "http://localhost:4173";
const shotsDir = process.env.SHOTS_DIR;
if (shotsDir) mkdirSync(shotsDir, { recursive: true });

const routes = [
  "/", "/about", "/board", "/programs",
  "/programs/biomedical-research-internship", "/programs/fellowship-support",
  "/programs/travel-grants", "/programs/arts-education",
  "/impact", "/transparency", "/get-involved", "/contact", "/donate",
  "/news", "/news/thailand-pilot-2026",
];

// Text that must never appear on the public site (unapproved partner names,
// dollar figures, personal inboxes, developer copy).
const forbidden = [/Penn(?!sylvania)/, /Rutgers/, /Weissman Lab/, /\$\d/, /quarterly/i,
  /(ilya|elena|jessica)@/i, /\bAPI\b/, /demo_/, /Plum/i, /lorem/i];

const viewports = { desktop: { width: 1366, height: 900 }, mobile: { width: 390, height: 844 } };
const problems = [];
const placeholders = {};
const links = new Set();

const browser = await chromium.launch();
for (const [vpName, viewport] of Object.entries(viewports)) {
  const page = await browser.newPage({ viewport, reducedMotion: "reduce" });
  page.on("pageerror", (e) => problems.push(`${vpName}: page error ${e}`));
  page.on("console", (m) => m.type() === "error" && problems.push(`${vpName}: console ${m.text()}`));

  for (const route of routes) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      const imgs = [...document.images];
      imgs.forEach((img) => { img.loading = "eager"; });
      await Promise.all(imgs.map((img) => img.complete ? null
        : new Promise((done) => { img.onload = img.onerror = done; setTimeout(done, 8000); })));
    });
    const info = await page.evaluate(() => {
      const clipped = [];
      for (const el of document.querySelectorAll("h1,h2,h3,p,li,dd,dt,td,a.btn,button,label,.placeholder")) {
        if (!el.textContent.trim() || !el.getClientRects().length) continue;
        let a = el.parentElement;
        while (a && a !== document.body) {
          const cs = getComputedStyle(a);
          if (cs.overflowX !== "visible" || cs.overflowY !== "visible") {
            const A = a.getBoundingClientRect(), E = el.getBoundingClientRect();
            if (E.top < A.top - 1 || E.bottom > A.bottom + 1 || E.left < A.left - 1 || E.right > A.right + 1) {
              clipped.push(el.textContent.trim().slice(0, 40));
            }
            break;
          }
          a = a.parentElement;
        }
      }
      return {
        text: document.body.innerText,
        links: [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")),
        clipped,
        brokenImages: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src),
        placeholders: document.querySelectorAll("[data-placeholder]").length,
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        h1: document.querySelectorAll("h1").length,
      };
    });

    info.links.filter((h) => h.startsWith("/") || h.startsWith("#"))
      .forEach((h) => links.add(h.startsWith("#") ? route + h : h));
    for (const re of forbidden) {
      const match = info.text.match(re);
      if (match) problems.push(`${route}: forbidden text "${match[0]}"`);
    }
    if (info.clipped.length) problems.push(`${vpName} ${route}: clipped text ${info.clipped.join(" | ")}`);
    if (info.overflow > 0) problems.push(`${vpName} ${route}: horizontal overflow ${info.overflow}px`);
    if (info.brokenImages.length) problems.push(`${route}: broken images ${info.brokenImages.join(", ")}`);
    if (info.h1 !== 1) problems.push(`${vpName} ${route}: ${info.h1} <h1> elements`);
    if (vpName === "desktop") placeholders[route] = info.placeholders;
    if (shotsDir) {
      const name = (route === "/" ? "home" : route.slice(1).replaceAll("/", "_")) + `-${vpName}.png`;
      await page.screenshot({ path: `${shotsDir}/${name}`, fullPage: true });
    }
  }
  await page.close();
}

// Follow every internal link and in-page anchor.
const page = await browser.newPage();
for (const link of links) {
  const [path, hash] = link.split("#");
  const res = await page.goto(base + (path || "/"), { waitUntil: "networkidle" });
  const state = await page.evaluate((id) => ({
    notFound: !!document.querySelector("main.not-found"),
    hashOk: !id || !!document.getElementById(id),
  }), hash);
  if (!res?.ok() || state.notFound || !state.hashOk) problems.push(`broken link ${link}`);
}
await browser.close();

console.log(`Routes: ${routes.length} × ${Object.keys(viewports).length} viewports, links checked: ${links.size}`);
console.log("Placeholders still to fill:", placeholders);
if (problems.length) {
  console.error(`\n${problems.length} problem(s):\n- ${[...new Set(problems)].join("\n- ")}`);
  process.exit(1);
}
console.log("All checks passed.");
