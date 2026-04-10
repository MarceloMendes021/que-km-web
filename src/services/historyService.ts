import api from "@/services/apiClient";
import type { WorkdayHistory } from "@/features/history/utils/historyUtils";
import { calculateWorkdayMetrics } from "@/features/history/utils/historyUtils";

export async function getWorkdayHistory(month: string) {
  const response = await api.get("/api/workdays", { params: { month } });
  return response.data;
}

export { calculateWorkdayMetrics };
export type { WorkdayHistory };
