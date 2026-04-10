import api from "@/services/apiClient";

export interface InsightsSummary {
  totalEarnings: number;
  totalExpenses: number;
  netProfit: number;
  earningsByApp: { app: string; value: number }[];
  monthGoal: number;
  workedDays: number;
  plannedDays: number;
  averageProfitPerDay: number;
  daysRemainingInMonth: number;
  averageEarningsPerKm: number;
  suggestedMinPerKm: number;
}

export async function getMonthlyInsights(month: string) {
  const response = await api.get("/api/insights", { params: { month } });
  return response.data;
}
