import api from "@/services/apiClient";
import type { WorkdayHistory } from "@/features/history/utils/historyUtils";
import { calculateWorkdayMetrics } from "@/features/history/utils/historyUtils";

interface WorkdayRaw {
  id: string;
  date: string;
  start_odometer: number;
  end_odometer: number;
  earnings_uber: number | string;
  earnings_99: number | string;
  earnings_particular: number | string;
  expenses_fuel?: number | string;
  expenses_other?: number | string;
}

export async function getWorkdayHistory(month: string) {
  const response = await api.get("/api/workdays", { params: { month } });
  return response.data.map((w: WorkdayRaw) => ({
    id: w.id,
    date: w.date.split("T")[0],
    initialOdometer: w.start_odometer,
    finalOdometer: w.end_odometer,
    earnings: {
      uber: Number(w.earnings_uber) || 0,
      "99": Number(w.earnings_99) || 0,
      particular: Number(w.earnings_particular) || 0,
    },
    fuel: Number(w.expenses_fuel) || 0,
    otherExpenses: Number(w.expenses_other) || 0,
  }));
}

export { calculateWorkdayMetrics };
export type { WorkdayHistory };
