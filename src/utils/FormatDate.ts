export const formatDate = (date: Date) => {
  return date
    .toLocaleDateString("en-us", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })
    .toString();
};
