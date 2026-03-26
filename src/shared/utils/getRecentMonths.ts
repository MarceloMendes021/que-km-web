import { MONTHS } from "@/shared/constants/months";

type MonthOption = {
  label: string;
  value: string;
};

export function getRecentMonths(count = 4): MonthOption[] {
  const result: MonthOption[] = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const year = date.getFullYear();
    const month = date.getMonth();

    result.push({
      label: MONTHS[month],
      value: `${year}-${String(month + 1).padStart(2, "0")}`,
    });
  }

  return result;
}
