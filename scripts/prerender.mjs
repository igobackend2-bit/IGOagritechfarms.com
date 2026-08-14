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
// Static top-level pages + all project pages from SEO_OVERRIDES in
// src/pages/ProjectRouter.tsx + all service/product category and
// subcategory pages from navLinks in src/data/siteData.ts.
// Admin/ads/legacy/dynamic-id routes are intentionally excluded
// (not public-facing SEO targets).
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
  // Legacy standalone project pages (own components, not ProjectRouter)
  "/projects/joint-venture",
  "/projects/mushroom",
  "/projects/hydroponic",
  "/projects/polyhouse",
  // Agri Farming Projects (category page itself was previously missing —
  // same class of bug as the other "/services"/"/products" parents)
  "/projects/agri",
  "/projects/agri/protected",
  "/projects/agri/protected/naturally-ventilated",
  "/projects/agri/protected/climate-controlled",
  "/projects/agri/protected/polycarbonate",
  "/projects/agri/protected/shade-net",
  "/projects/agri/protected/mist-chamber",
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
  "/projects/agri/open-field/dragon-fruit",
  "/projects/agri/open-field/guava",
  "/projects/agri/open-field/mango",
  "/projects/agri/open-field/papaya",
  "/projects/agri/open-field/fig",
  "/projects/agri/open-field/blueberry",
  "/projects/agri/vegetable",
  "/projects/agri/vegetable/cucumber",
  "/projects/agri/vegetable/capsicum",
  "/projects/agri/vegetable/tomato",
  "/projects/agri/vegetable/chilli",
  "/projects/agri/vegetable/muskmelon",
  "/projects/agri/vegetable/watermelon",
  "/projects/agri/medicinal",
  "/projects/agri/medicinal/aloe-vera",
  "/projects/agri/medicinal/moringa",
  "/projects/agri/medicinal/ginger",
  "/projects/agri/medicinal/turmeric",
  "/projects/agri/medicinal/tapioca",
  "/projects/agri/floriculture",
  "/projects/agri/floriculture/rose",
  "/projects/agri/floriculture/jasmine",
  "/projects/agri/floriculture/marigold",
  "/projects/agri/floriculture/exotic",
  "/projects/agri/mushroom",
  "/projects/agri/mushroom/oyster",
  "/projects/agri/mushroom/button",
  "/projects/agri/mushroom/commercial",
  "/projects/agri/urban",
  "/projects/agri/urban/rooftop",
  "/projects/agri/urban/terrace",
  "/projects/agri/urban/kitchen",
  "/projects/agri/urban/microgreens",
  "/projects/agri/nursery",
  "/projects/agri/nursery/commercial",
  "/projects/agri/nursery/seedling",
  "/projects/agri/nursery/tissue-culture",
  // Aquaculture Farming Projects
  "/projects/aquaculture",
  "/projects/aquaculture/fish",
  "/projects/aquaculture/fish/traditional",
  "/projects/aquaculture/fish/intensive",
  "/projects/aquaculture/fish/cage",
  "/projects/aquaculture/biofloc",
  "/projects/aquaculture/biofloc/fish",
  "/projects/aquaculture/biofloc/shrimp",
  "/projects/aquaculture/shrimp",
  "/projects/aquaculture/shrimp/vannamei",
  "/projects/aquaculture/shrimp/prawn",
  "/projects/aquaculture/crab",
  "/projects/aquaculture/crab/mud-crab",
  "/projects/aquaculture/integrated",
  "/projects/aquaculture/integrated/aquaponics",
  "/projects/aquaculture/integrated/fish-crop",
  // Livestock Farming Projects
  "/projects/livestock",
  "/projects/livestock/goat",
  "/projects/livestock/goat/commercial",
  "/projects/livestock/goat/integrated",
  "/projects/livestock/sheep",
  "/projects/livestock/sheep/commercial",
  "/projects/livestock/dairy",
  "/projects/livestock/dairy/setup",
  "/projects/livestock/dairy/automated",
  "/projects/livestock/poultry",
  "/projects/livestock/poultry/broiler",
  "/projects/livestock/poultry/layer",
  "/projects/livestock/integrated",
  "/projects/livestock/integrated/goat-fish",
  "/projects/livestock/integrated/dairy-crop",
  // Farm Engineering Projects
  "/projects/engineering",
  "/projects/engineering/infrastructure",
  "/projects/engineering/infrastructure/cold-storage",
  "/projects/engineering/infrastructure/pack-house",
  "/projects/engineering/infrastructure/buildings",
  "/projects/engineering/infrastructure/roads",
  "/projects/engineering/water",
  "/projects/engineering/water/rainwater",
  "/projects/engineering/water/pond-liner",
  "/projects/engineering/water/irrigation",
  "/projects/engineering/water/borewell",
  "/projects/engineering/solar",
  "/projects/engineering/solar/crop-dryer",
  "/projects/engineering/solar/heater",
  "/projects/engineering/solar/fencing",
  "/projects/engineering/solar/lighting",
  "/projects/engineering/development",
  "/projects/engineering/development/surveying",
  "/projects/engineering/development/topographic",
  "/projects/engineering/development/contour",
  "/projects/engineering/development/leveling",
  // Service category + subcategory pages (from navLinks in src/data/siteData.ts).
  // These were previously missing from prerender, meaning JS-less crawlers
  // saw an empty shell for every /services/* page below the top-level index.
  "/services/farm-planning",
  "/services/farm-planning/farm-business-planning",
  "/services/farm-planning/agri-investment-consulting",
  "/services/farm-planning/crop-selection-consulting",
  "/services/farm-planning/farm-layout-design",
  "/services/farm-planning/aquaculture-consulting",
  "/services/farm-planning/land-surveying",
  "/services/farming-project-setup",
  "/services/farming-project-setup/polyhouse-installation",
  "/services/farming-project-setup/hydroponic-setup",
  "/services/farming-project-setup/vertical-farming-setup",
  "/services/farming-project-setup/fish-farming-setup",
  "/services/farming-project-setup/biofloc-installation",
  "/services/farming-project-setup/aquaculture-pond-construction",
  "/services/farming-project-setup/aquaponics-setup",
  "/services/farming-project-setup/goat-farm-setup",
  "/services/farming-project-setup/dairy-farm-setup",
  "/services/farming-project-setup/sheep-farm-setup",
  "/services/farming-project-setup/poultry-farm-setup",
  "/services/farming-project-setup/gis-mapping",
  "/services/farm-infrastructure",
  "/services/farm-infrastructure/cold-storage-construction",
  "/services/farm-infrastructure/packhouse-construction",
  "/services/farm-infrastructure/farm-building-design",
  "/services/farm-infrastructure/drip-irrigation-installation",
  "/services/farm-infrastructure/sprinkler-irrigation-systems",
  "/services/farm-infrastructure/water-pump-systems",
  "/services/farm-infrastructure/land-leveling",
  "/services/maintenance-support",
  "/services/maintenance-support/livestock-shed-construction",
  "/services/maintenance-support/polyhouse-amc",
  "/services/maintenance-support/hydroponic-system-amc",
  "/services/maintenance-support/farm-equipment-maintenance",
  // Product category + subcategory pages (from navLinks in src/data/siteData.ts).
  // Same gap as services above — previously entirely un-prerendered.
  "/products/agri-inputs",
  "/products/agri-inputs/veg-seeds",
  "/products/agri-inputs/fruit-seeds",
  "/products/agri-inputs/leafy-seeds",
  "/products/agri-inputs/media",
  "/products/agri-inputs/nutrition",
  "/products/agri-inputs/protection",
  "/products/agri-inputs/pgrs",
  "/products/agri-inputs/mulching",
  "/products/structure",
  "/products/structure/frames",
  "/products/structure/covering",
  "/products/structure/nets",
  "/products/structure/ventilation",
  "/products/structure/misting",
  "/products/structure/plumbing",
  "/products/automation",
  "/products/automation/dosing",
  "/products/automation/controllers",
  "/products/automation/motors",
  "/products/automation/electrical",
  "/products/horticulture",
  "/products/horticulture/vegetables",
  "/products/horticulture/flowers",
  "/products/horticulture/fruits",
  "/products/horticulture/herbs",
  "/products/digital",
  "/products/digital/hardware",
  "/products/digital/software",
  "/products/digital/services",
  "/products/specialized",
  "/products/specialized/post-harvest",
  "/products/specialized/aquaculture",
  "/products/specialized/livestock",
  // Blog posts (static content from blogPosts in src/data/siteData.ts —
  // not Supabase-backed, so the full list is known at build time).
  "/blog/igo-agrimart-solutions",
  "/blog/dr-john-yesudhas-icon-of-india",
  "/blog/independence-day-2023",
  "/blog/jnn-institute-industrial-visit",
  "/blog/best-innovative-startup-2022",
  "/blog/campus-drive-200-students",
  "/blog/agriculture-subsidies-india",
  "/blog/press-media-honours-dr-john",
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

  // Save a copy of the plain (pre-prerender) CSR shell as 200.html BEFORE
  // the loop below overwrites dist/index.html with the homepage's fully
  // rendered content. Genuinely nonexistent URLs (typos, broken links,
  // anything not in ROUTES) fall back to this neutral shell via the
  // hosting configs (netlify.toml / vercel.json / nginx.conf all point
  // their SPA fallback at /200.html, not /index.html) — otherwise every
  // bad URL would silently serve a full duplicate copy of the homepage to
  // any crawler that doesn't execute JavaScript, with no noindex signal.
  const indexPath = path.join(DIST_DIR, "index.html");
  const shellPath = path.join(DIST_DIR, "200.html");
  if (existsSync(indexPath) && !existsSync(shellPath)) {
    const shell = await readFile(indexPath);
    await writeFile(shellPath, shell);
    console.log("[prerender] saved pre-render CSR shell as 200.html (SPA fallback target)");
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
