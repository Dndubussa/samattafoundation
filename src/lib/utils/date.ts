const LONG_DATE_FORMAT: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

/** Formats ISO date strings for display across blog and content pages. */
export function formatLongDate(dateString?: string | null): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", LONG_DATE_FORMAT);
}
