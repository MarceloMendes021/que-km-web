import api from "@/services/apiClient";

interface FinishWorkdayData {
  finalOdometer: number;
  earnings: Record<string, number>;
  fuel: number;
  otherExpenses: number;
}

export async function startWorkday(odometer: number) {
  const response = await api.post("/api/workdays", { initialOdometer: odometer });
  return response.data;
}

export async function finishWorkday(id: string, data: Partial<FinishWorkdayData>) {
  const response = await api.patch(`/api/workdays/${id}`, data);
  return response.data;
}

export async function getActiveWorkday() {
  const response = await api.get("/api/workdays/active");
  return response.data;
}
