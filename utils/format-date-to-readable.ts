// Format Date with day name
export const formatDateToReadable = (
  date: Date | string,
  mini?: boolean,
  withoutWeekday?: boolean
) => {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString("en-PH", {
    weekday: mini ? undefined : withoutWeekday ? undefined : "long",
    year: "numeric",
    month: mini ? "short" : "long",
    day: "numeric",
  });
};
