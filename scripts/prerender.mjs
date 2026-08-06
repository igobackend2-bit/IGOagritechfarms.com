// Prerender step — runs once after `vite build`, before the site is deployed.
//
// Why this exists: this app is a client-side-rendered React SPA. The server
// always sends the SAME static index.html for every URL; the per-page
// <title>/<meta description>/<link rel="canonical"> tags are only written in
// by src/components/SEO.tsx AFTER React and JavaScript run in the visitor's
// browser. That means "View Source", social-media link previews (Facebook,
// LinkedIn, WhatsApp, X), and any crawler that doesn't execute JavaScript
// only ever see the generic default tags from index.html — never the
// per-page ones.
//
// This script fixes that by using a real headless browser to visit each
// route after the production build, letting SEO.tsx run exactly as it does
// for a real visitor, then saving the fully-rendered HTML as that route's
// actual static file (e.g. dist/projects/agri/polyhouse/index.html). nginx's
// existing `try_files` rule then serves that file directly for that exact
// URL — correct tags from the very first byte, no JavaScript required.
//
// This does not change any app/component source code — it only runs against
// the already-built dist/ output.

import { createServer } from "node:http";
import { readFile, stat, mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer";

const DIST_DIR = path.resolve("dist");
const PORT = 4173;

// Every route the marketing team needs correct tags for in raw HTML.
// Static top-level pages + the 20 project pages from SEO_OVERRIDES in
// src/pages/ProjectRouter.tsx. Admin/ads/legacy/dynamic-id routes are
// intentionally excluded (not public-facing SEO targets).
const ROUTES = [
  "/",
  "/about",
  "/projects",
  "/services",
  "/products",
  "/courses",
  "/faq",
  "/contact",
  "/blog",
  "/careers",
  "/agri-startup-platform",
  "/igo-groups",
  "/privacy",
  "/terms",
  "/projects/agri/polyhouse",
  "/projects/aquaculture",
  "/projects/livestock",
  "/projects/engineering",
  "/projects/agri/polyhouse/naturally-ventilated",
  "/projects/agri/polyhouse/climate-controlled",
  "/projects/agri/polyhouse/polycarbonate",
  "/projects/agri/polyhouse/shade-net",
  "/projects/agri/polyhouse/mist-chamber",
  "/projects/agri/hydroponic",
  "/projects/agri/hydroponic/nft",
  "/projects/agri/hydroponic/dwc",
  "/projects/agri/hydroponic/towers",
  "/projects/agri/hydroponic/commercial",
  "/projects/agri/hydroponic/indoor",
  "/projects/agri/vertical",
  "/projects/agri/vertical/indoor",
  "/projects/agri/vertical/commercial",
  "/projects/agri/vertical/smart-grow",
  "/projects/agri/open-field",
];

const MIME = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
  ".xml": "application/xml",
};

function serveStatic() {
  return createServer(async (req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    let filePath = path.join(DIST_DIR, urlPath);
    try {
      const s = existsSync(filePath) ? await stat(filePath) : null;
      if (urlPath === "/" || !s || s.isDirectory()) {
        filePath = path.join(DIST_DIR, "index.html");
      }
      const data = await readFile(filePath);
      const ext = path.extname(filePath);
      res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  });
}

async function main() {
  if (!existsSync(DIST_DIR)) {
    console.error("dist/ not found — run `npm run build` before `npm run prerender`.");
    process.exit(1);
  }

  const server = serveStatic();
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`[prerender] static server on http://localhost:${PORT}`);

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  let ok = 0;
  const failed = [];

  for (const route of ROUTES) {
    const page = await browser.newPage();
    try {
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: "networkidle0",
        timeout: 30000,
      });
      // Small buffer so SEO.tsx's useEffect has definitely committed its
      // document.title / meta tag writes before we snapshot the DOM.
      await new Promise((r) => setTimeout(r, 300));
      const html = await page.content();

      const outDir = route === "/" ? DIST_DIR : path.join(DIST_DIR, route);
      await mkdir(outDir, { recursive: true });
      await writeFile(path.join(outDir, "index.html"), html);
      console.log(`[prerender] ok   ${route}`);
      ok++;
    } catch (err) {
      console.error(`[prerender] FAIL ${route}: ${err.message}`);
      failed.push(route);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  await new Promise((resolve) => server.close(resolve));

  console.log(`\n[prerender] done: ${ok}/${ROUTES.length} routes prerendered.`);
  if (failed.length) {
    console.error(`[prerender] failed routes (left serving the default SPA shell, not fatal): ${failed.join(", ")}`);
  }
  // Only hard-fail the build if nothing at all could be prerendered —
  // a handful of individual route failures should not block deployment.
  if (ok === 0) {
    process.exit(1);
  }
}

main();
