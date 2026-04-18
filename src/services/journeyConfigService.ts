import api from "@/services/apiClient";

export type FuelType = "gasolina" | "etanol" | "flex" | "gnv" | "diesel";

export interface JourneyConfigPayload {
  car_model?: string;
  fuel_type?: FuelType;
  avg_consumption?: number;
  month_goal?: number;
  planned_days?: number;
  min_value_per_km?: number;
}

export async function updateJourneyConfig(data: JourneyConfigPayload) {
  const response = await api.put("/api/journey-config", data);
  return response.data;
}
export async function getJourneyConfig() {
  const response = await api.get("/api/journey-config");
  const data = response.data;
  if (!data) return null;
  return {
    carModel: data.car_model,
    fuelType: data.fuel_type,
    avgConsumption: data.avg_consumption,
    monthGoal: data.month_goal,
    plannedDays: data.planned_days,
    minValuePerKm: data.min_value_per_km,
  };
}
