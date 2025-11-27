export const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
