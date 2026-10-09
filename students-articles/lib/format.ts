const faInteger = new Intl.NumberFormat("fa-IR");
const faScore = new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 1 });

/** Persian digits: 12 -> ۱۲ */
export const faNum = (n: number) => faInteger.format(n);

/** Score with at most one decimal: 17 -> ۱۷, 17.25 -> ۱۷٫۳ */
export const formatScore = (score: number) =>
  faScore.format(Math.round(score * 10) / 10);

/** Reading time in minutes, at ~200 words per minute (minimum 1). */
export function readingMinutes(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** One-line teaser from article content, cut on a word boundary. */
export function excerpt(text: string, max = 160) {
  const flat = text.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  return flat.slice(0, max).replace(/\s+\S*$/, "") + "…";
}
