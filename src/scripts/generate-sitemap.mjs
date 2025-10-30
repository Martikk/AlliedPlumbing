import { writeFileSync } from "fs";
import { SitemapStream, streamToPromise } from "sitemap";

const domain = "https://alliedplumbing.ca";

const pages = [
  "/", 
  "/about",
  "/services",
  "/services/residential-plumbing",
  "/services/commercial-plumbing",
  "/services/hvac",
  "/services/boiler-plants-controls",
  "/services/maintenance-programs",
  "/services/emergency-service",
  "/projects",
  "/careers",
  "/blog",
  "/contact",
  "/GetQuote"
];

async function generateSitemap() {
  const sitemapStream = new SitemapStream({ hostname: domain });

  pages.forEach((url) => {
    sitemapStream.write({
      url,
      changefreq: "monthly",
      priority: url === "/" ? 1.0 : 0.8,
      lastmod: new Date().toISOString(),
    });
  });

  sitemapStream.end();
  const data = await streamToPromise(sitemapStream);
  writeFileSync("public/sitemap.xml", data.toString());
  console.log("✅ sitemap.xml generated successfully");
}

generateSitemap().catch(console.error);