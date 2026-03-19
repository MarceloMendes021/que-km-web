export type WorkdayFinishData = {
  finalOdometer: string;
  earnings: Record<string, string>;
  fuel: string;
  otherExpenses: string;
};

export type WorkdayFinishCalculation = {
  finalOdometer: number;
  earnings: Record<string, number>;
  fuel: number;
  otherExpenses: number;
};

export type WorkdayFinishErrors = {
  finalOdometer?: string;
  earnings?: string;
};

export type DayResult = {
  kmDriven: number;
  totalEarnings: number;
  totalExpenses: number;
  netProfit: number;
  earningsPerKm: number;
  costPerKm: number;
};

export function validateWorkdayFinish(data: WorkdayFinishData): WorkdayFinishErrors {
  const errors: WorkdayFinishErrors = {};

  const finalOdometerNumber = parseFloat(data.finalOdometer);
  if (!data.finalOdometer || !Number.isFinite(finalOdometerNumber) || finalOdometerNumber <= 0) {
    errors.finalOdometer = "Informe o KM final do odômetro";
  }

  const totalEarnings = Object.values(data.earnings).reduce((sum, value) => {
    const number = parseFloat(value);
    return sum + (Number.isFinite(number) ? number : 0);
  }, 0);

  if (totalEarnings <= 0) {
    errors.earnings = "Informe pelo menos um ganho do dia";
  }

  return errors;
}

export function toCalculation(data: WorkdayFinishData): WorkdayFinishCalculation {
  return {
    finalOdometer: parseFloat(data.finalOdometer) || 0,
    earnings: Object.fromEntries(Object.entries(data.earnings).map(([app, value]) => [app, parseFloat(value) || 0])),
    fuel: parseFloat(data.fuel) || 0,
    otherExpenses: parseFloat(data.otherExpenses) || 0,
  };
}

export function calculateDayResult(calculation: WorkdayFinishCalculation, initialOdometer: number): DayResult {
  const kmDriven = calculation.finalOdometer - initialOdometer;

  const totalEarnings = Object.values(calculation.earnings).reduce((sum, value) => sum + value, 0);

  const totalExpenses = calculation.fuel + calculation.otherExpenses;
  const netProfit = totalEarnings - totalExpenses;
  const earningsPerKm = kmDriven > 0 ? totalEarnings / kmDriven : 0;
  const costPerKm = kmDriven > 0 ? totalExpenses / kmDriven : 0;

  return {
    kmDriven,
    totalEarnings,
    totalExpenses,
    netProfit,
    earningsPerKm,
    costPerKm,
  };
}
