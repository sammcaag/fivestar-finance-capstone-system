export const formatDateToReadable = (date: Date | string) => {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString("en-PH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
