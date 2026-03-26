import { journeyConfigMock } from "@/features/journey/mock/journeyConfigMock";
import type { JourneyConfig, FuelType } from "@/features/journey/mock/journeyConfigMock";
export type { JourneyConfig, FuelType };

export async function getJourneyConfig(): Promise<JourneyConfig> {
  await new Promise((r) => setTimeout(r, 300));
  return journeyConfigMock;
}

export async function updateJourneyConfig(data: Partial<JourneyConfig>): Promise<JourneyConfig> {
  await new Promise((r) => setTimeout(r, 300));

  Object.assign(journeyConfigMock, data);
  return journeyConfigMock;
}
