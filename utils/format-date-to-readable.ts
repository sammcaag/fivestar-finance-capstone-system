export const formatDateToReadable = (date: Date | string, mini?: boolean) => {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString("en-PH", {
    weekday: mini ? "short" : "long",
    year: "numeric",
    month: mini ? "short" : "long",
    day: "numeric",
  });
};
