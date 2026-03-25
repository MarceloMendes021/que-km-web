export type FuelType = "gasolina" | "etanol" | "flex" | "gnv" | "diesel";

export type JourneyConfig = {
  carModel: string;
  fuelType: FuelType;
  avgConsumption: number;
  monthGoal: number;
  plannedDays: number;
  minValuePerKm: number;
};

export const journeyConfigMock: JourneyConfig = {
  carModel: "",
  fuelType: "etanol",
  avgConsumption: 10,
  monthGoal: 5000,
  plannedDays: 22,
  minValuePerKm: 1.5,
};
