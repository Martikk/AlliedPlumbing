import { useEffect } from "react";

type Props = {
  title?: string;
  description?: string;
  canonical?: string;
  jsonLd?: object;
};

export default function Head({ title, description, canonical, jsonLd }: Props) {
  useEffect(() => {
    if (title) document.title = title;

    const setMeta = (attr: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${attr}"]` : `meta[name="${attr}"]`;
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(isProperty ? "property" : "name", attr);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // === Base Meta ===
    if (description) setMeta("description", description);
    if (canonical) {
      let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }

    // === Favicons ===
    const favicons = [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ];
    favicons.forEach(({ rel, type, href }) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement("link");
        link.rel = rel;
        if (type) link.type = type;
        link.href = href;
        document.head.appendChild(link);
      }
    });

    // === Open Graph ===
    const ogImage =
      "https://res.cloudinary.com/dzytbkc5l/image/upload/v1760068156/Allied/14_urnogx.png";
    setMeta("og:type", "website", true);
    if (title) setMeta("og:title", title, true);
    if (description) setMeta("og:description", description, true);
    if (canonical) setMeta("og:url", canonical, true);
    setMeta("og:image", ogImage, true);
    setMeta("og:site_name", "Allied Plumbing, Heating & Air Conditioning", true);

    // === Twitter ===
    setMeta("twitter:card", "summary_large_image");
    if (title) setMeta("twitter:title", title);
    if (description) setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);

    // === JSON-LD structured data ===
    let script: HTMLScriptElement | null = null;
    if (jsonLd) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      if (script) document.head.removeChild(script);
    };
  }, [title, description, canonical, jsonLd]);

  return null;
}