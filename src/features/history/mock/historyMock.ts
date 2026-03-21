export type WorkdayHistory = {
  id: string;
  date: string;
  initialOdometer: number;
  finalOdometer: number;
  earnings: Record<string, number>;
  fuel: number;
  otherExpenses: number;
};

export function calculateWorkdayMetrics(workday: WorkdayHistory) {
  const kmDriven = workday.finalOdometer - workday.initialOdometer;
  const totalEarnings = Object.values(workday.earnings).reduce((sum, v) => sum + v, 0);
  const totalExpenses = workday.fuel + workday.otherExpenses;
  const netProfit = totalEarnings - totalExpenses;
  const earningsPerKm = kmDriven > 0 ? totalEarnings / kmDriven : 0;

  return { kmDriven, totalEarnings, totalExpenses, netProfit, earningsPerKm };
}

export const historyMock: WorkdayHistory[] = [
  {
    id: "1",
    date: "2026-03-21",
    initialOdometer: 44000,
    finalOdometer: 44187,
    earnings: { uber: 120, "99": 85 },
    fuel: 60,
    otherExpenses: 0,
  },
  {
    id: "2",
    date: "2026-03-20",
    initialOdometer: 43800,
    finalOdometer: 44000,
    earnings: { uber: 95, "99": 60 },
    fuel: 50,
    otherExpenses: 20,
  },
  {
    id: "3",
    date: "2026-03-19",
    initialOdometer: 43600,
    finalOdometer: 43800,
    earnings: { uber: 140, "99": 70 },
    fuel: 55,
    otherExpenses: 0,
  },
  {
    id: "4",
    date: "2026-03-18",
    initialOdometer: 43400,
    finalOdometer: 43600,
    earnings: { uber: 80, "99": 40 },
    fuel: 45,
    otherExpenses: 0,
  },
  {
    id: "5",
    date: "2026-03-15",
    initialOdometer: 43200,
    finalOdometer: 43400,
    earnings: { uber: 110, "99": 90 },
    fuel: 65,
    otherExpenses: 15,
  },
];
