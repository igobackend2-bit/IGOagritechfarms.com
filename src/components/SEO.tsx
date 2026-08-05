import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  author?: string;
  noIndex?: boolean;
  jsonLd?: object;
}

const BASE_URL = "https://www.igoagritechfarms.com";
const DEFAULT_IMAGE = `${BASE_URL}/assets/home-page-image.png`;
const SITE_NAME = "IGO Agritech Farms";

function setMetaTag(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function removeMetaTag(attr: "name" | "property", key: string) {
  document.head.querySelector(`meta[${attr}="${key}"]`)?.remove();
}

/**
 * SEO — directly writes title/meta/canonical/JSON-LD tags into document.head
 * on mount and whenever props change. Replaces the previous react-helmet-async
 * implementation, which rendered without errors but never actually committed
 * changes to the live DOM in production (title, canonical, and meta tags all
 * stayed frozen at the static index.html defaults on every route).
 */
export default function SEO({
  title,
  description,
  keywords,
  image = DEFAULT_IMAGE,
  url,
  type = "website",
  publishedTime,
  author,
  noIndex = false,
  jsonLd,
}: SEOProps) {
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : undefined;

  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    const canonicalUrl = url ? `${BASE_URL}${url}` : BASE_URL;

    document.title = fullTitle;

    setMetaTag("name", "description", description);
    if (keywords) setMetaTag("name", "keywords", keywords);
    else removeMetaTag("name", "keywords");

    if (noIndex) setMetaTag("name", "robots", "noindex,nofollow");
    else removeMetaTag("name", "robots");

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", type);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:image", image);
    setMetaTag("property", "og:site_name", SITE_NAME);

    if (publishedTime) setMetaTag("property", "article:published_time", publishedTime);
    else removeMetaTag("property", "article:published_time");
    if (author) setMetaTag("property", "article:author", author);
    else removeMetaTag("property", "article:author");

    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:site", "@IGOAgritech");
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", image);

    const jsonLdId = "seo-jsonld";
    let script = document.getElementById(jsonLdId) as HTMLScriptElement | null;
    if (jsonLdString) {
      if (!script) {
        script = document.createElement("script");
        script.id = jsonLdId;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = jsonLdString;
    } else if (script) {
      script.remove();
    }
  }, [title, description, keywords, image, url, type, publishedTime, author, noIndex, jsonLdString]);

  return null;
}
