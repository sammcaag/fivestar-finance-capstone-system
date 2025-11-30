import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  addYears,
  addMonths,
} from "date-fns";

// THIS UTILS IS GENERIC THAT CAN GET VARIOUS CALCULATIONS FROM DATES

export function calculateDate(
  startDate: Date | string | null | undefined,
  endDate: Date | string | null | undefined
) {
  if (!startDate || !endDate) {
    return { years: 0, months: 0, days: 0, totalMonths: 0, totalDays: 0 };
  }

  const s = new Date(startDate);
  const e = new Date(endDate);

  if (isNaN(s.getTime()) || isNaN(e.getTime()) || e < s) {
    return { years: 0, months: 0, days: 0, totalMonths: 0, totalDays: 0 };
  }

  // Years
  const years = differenceInYears(e, s);
  const afterYears = addYears(s, years);

  // Months
  const months = differenceInMonths(e, afterYears);
  const afterMonths = addMonths(afterYears, months);

  // Days
  const days = differenceInDays(e, afterMonths);

  const totalMonths = years * 12 + months;
  const totalDays = differenceInDays(e, s);

  return { years, months, days, totalMonths, totalDays };
}
