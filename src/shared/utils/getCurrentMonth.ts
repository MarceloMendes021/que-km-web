import { MONTHS } from "@/shared/constants/months";

export function getCurrentMonthParam(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

export function getCurrentMonth(): string {
  const monthIndex = new Date().getMonth();
  const month = MONTHS[monthIndex];
  return month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
}
