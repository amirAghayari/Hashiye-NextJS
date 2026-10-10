const ARABIC_SCRIPT =
  /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF‌‍]/;
const LATIN_SCRIPT = /[A-Za-zÀ-ɏ]/;

export type TextDir = "ltr" | "rtl";

/**
 * Direction of a text, from its dominant letter script. Students may write
 * in Persian or English; mixed names and tags use "auto" at the call site.
 */
export function textDir(text: string): TextDir {
  let latin = 0;
  let arabic = 0;
  for (const ch of text) {
    if (LATIN_SCRIPT.test(ch)) latin++;
    else if (ARABIC_SCRIPT.test(ch)) arabic++;
  }
  if (latin + arabic === 0) return "rtl";
  return latin > arabic ? "ltr" : "rtl";
}

export function isLtr(text: string): boolean {
  return textDir(text) === "ltr";
}
