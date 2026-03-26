import { historyMock, calculateWorkdayMetrics } from "@/features/history/mock/historyMock";
import type { WorkdayHistory } from "@/features/history/mock/historyMock";

export async function getWorkdayHistory(month: string): Promise<WorkdayHistory[]> {
  await new Promise((r) => setTimeout(r, 300));
  return historyMock.filter((w) => w.date.startsWith(month));
}

export { calculateWorkdayMetrics };
export type { WorkdayHistory };
