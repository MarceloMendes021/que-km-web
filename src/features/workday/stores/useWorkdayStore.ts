import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WorkdayStore {
  isActive: boolean;
  startOdometer: number | null;
  startTime: string | null;

  startWorkday: (odometer: number) => void;
  finishWorkday: () => void;
}

export const useWorkdayStore = create<WorkdayStore>()(
  persist(
    (set) => ({
      isActive: false,
      startOdometer: null,
      startTime: null,

      startWorkday: (odometer) =>
        set({
          isActive: true,
          startOdometer: odometer,
          startTime: new Date().toISOString(),
        }),

      finishWorkday: () =>
        set({
          isActive: false,
          startOdometer: null,
          startTime: null,
        }),
    }),
    { name: "workday-store" },
  ),
);
