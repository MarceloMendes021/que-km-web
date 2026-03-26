import { MONTHS } from "@/shared/constants/months";

export function getCurrentMonth(): string {
  const monthIndex = new Date().getMonth();
  const month = MONTHS[monthIndex];
  return month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
}
