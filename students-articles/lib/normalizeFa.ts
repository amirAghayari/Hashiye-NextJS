/** Normalises Arabic/Persian letter variants so search matches what people type. */
export function normalizeFa(text: string) {
  return text
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\u200c/g, " ")
    .toLowerCase()
    .trim();
}
