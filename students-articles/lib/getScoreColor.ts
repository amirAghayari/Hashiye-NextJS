export const getScoreColor = (score: number) => {
  if (score >= 17) return "text-green-600";
  if (score >= 14) return "text-blue-600";
  if (score >= 10) return "text-yellow-600";
  return "text-red-600";
};
