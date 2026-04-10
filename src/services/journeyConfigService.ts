import api from "@/services/apiClient";

export type FuelType = "gasolina" | "etanol" | "flex" | "gnv" | "diesel";

export interface JourneyConfig {
  carModel: string;
  fuelType: FuelType;
  avgConsumption: number;
  monthGoal: number;
  plannedDays: number;
  minValuePerKm: number;
}

export async function getJourneyConfig() {
  const response = await api.get("/api/journey-config");
  return response.data;
}

export async function updateJourneyConfig(data: Partial<JourneyConfig>) {
  const response = await api.put("/api/journey-config", data);
  return response.data;
}
