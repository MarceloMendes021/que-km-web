export type WorkdayHistory = {
  id: string;
  date: string;
  initialOdometer: number;
  finalOdometer: number;
  earnings: Record<string, number>;
  fuel: number;
  food: number;
  otherExpenses: number;
};

export function calculateWorkdayMetrics(workday: WorkdayHistory) {
  const kmDriven = workday.finalOdometer - workday.initialOdometer;
  const totalEarnings = Object.values(workday.earnings).reduce((sum, v) => sum + v, 0);
  const totalExpenses = workday.fuel + workday.food + workday.otherExpenses;
  const netProfit = totalEarnings - totalExpenses;
  const earningsPerKm = kmDriven > 0 ? totalEarnings / kmDriven : 0;

  return { kmDriven, totalEarnings, totalExpenses, netProfit, earningsPerKm };
}
