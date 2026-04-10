import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { RideThresholds } from "@/features/tools/km-calculator/utils/calculateRideValue";

interface WorkdayStore {
  isActive: boolean;
  startOdometer: number | null;
  startTime: string | null;
  thresholds: RideThresholds;
  workdayId: string | null;
  setWorkdayId: (id: string) => void;

  startWorkday: (odometer: number) => void;
  finishWorkday: () => void;
  setThresholds: (thresholds: RideThresholds) => void;
}

export const useWorkdayStore = create<WorkdayStore>()(
  persist(
    (set) => ({
      isActive: false,
      startOdometer: null,
      startTime: null,
      thresholds: { good: 1.5, acceptable: 1.4 },
      workdayId: null,

      startWorkday: (odometer) =>
        set({
          isActive: true,
          startOdometer: odometer,
          startTime: new Date().toISOString(),
        }),

      setWorkdayId: (id) => set({ workdayId: id }),

      finishWorkday: () =>
        set({
          isActive: false,
          startOdometer: null,
          startTime: null,
          workdayId: null,
        }),

      setThresholds: (thresholds) => set({ thresholds }),
    }),
    { name: "workday-store" },
  ),
);
