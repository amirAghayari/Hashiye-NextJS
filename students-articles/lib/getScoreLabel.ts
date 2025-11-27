export const getScoreLabel = (score: number) => {
  if (score >= 17) return "عالی";
  if (score >= 14) return "خوب";
  if (score >= 10) return "قابل قبول";
  return "ضعیف";
};
