import { insightsMock } from "@/features/insights/mock/insightsMock";

export type InsightsSummary = typeof insightsMock;

export async function getMonthlyInsights(month: string): Promise<InsightsSummary> {
  await new Promise((r) => setTimeout(r, 300));

  void month;
  return insightsMock;
}
