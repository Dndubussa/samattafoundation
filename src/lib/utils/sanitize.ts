import DOMPurify from "dompurify";

/** Sanitizes CMS HTML before rendering to prevent XSS. */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target"],
  });
}
