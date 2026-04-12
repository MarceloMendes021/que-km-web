import api from "@/services/apiClient";

interface FinishWorkdayData {
  end_odometer: number;
  earnings_uber: number;
  earnings_99: number;
  earnings_particular: number;
  expenses_fuel: number;
  expenses_other: number;
}

export async function startWorkday(odometer: number) {
  const response = await api.post("/api/workdays", { start_odometer: odometer });
  return response.data;
}

export async function finishWorkday(id: string, data: Partial<FinishWorkdayData>) {
  const response = await api.patch(`/api/workdays/${id}/finish`, data);
  return response.data;
}

export async function getActiveWorkday() {
  const response = await api.get("/api/workdays/active");
  return response.data;
}
