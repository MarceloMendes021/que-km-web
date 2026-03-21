export type ExpenseCategory = "fuel" | "maintenance" | "fine" | "car_rental" | "financing" | "insurance" | "other";

export type PaymentMethod = "cash" | "debit" | "credit" | "pix" | "other";

export type Expense = {
  id: string;
  category: ExpenseCategory;
  description: string;
  amount: number;
  date: string;
  paymentMethod: PaymentMethod;
};

export const CATEGORY_CONFIG: Record<ExpenseCategory, { label: string; color: string }> = {
  fuel: { label: "Combustível", color: "#00a5da" },
  maintenance: { label: "Manutenção", color: "#F5A623" },
  fine: { label: "Multa", color: "#ff453a" },
  car_rental: { label: "Aluguel do carro", color: "#a78bfa" },
  financing: { label: "Financiamento", color: "#f472b6" },
  insurance: { label: "IPVA / Seguro", color: "#00e676" },
  other: { label: "Outros", color: "#9ba1a6" },
};

export const PAYMENT_METHOD_CONFIG: Record<PaymentMethod, { label: string }> = {
  cash: { label: "Dinheiro" },
  debit: { label: "Cartão de débito" },
  credit: { label: "Cartão de crédito" },
  pix: { label: "Pix" },
  other: { label: "Outros" },
};

export const expensesMock: Expense[] = [
  { id: "1", category: "fuel", description: "Posto Shell", amount: 250, date: "2026-03-18", paymentMethod: "pix" },
  { id: "2", category: "maintenance", description: "Troca de óleo", amount: 180, date: "2026-03-15", paymentMethod: "cash" },
  { id: "3", category: "insurance", description: "Seguro mensal", amount: 150, date: "2026-03-01", paymentMethod: "debit" },
  { id: "4", category: "fuel", description: "Posto Ipiranga", amount: 220, date: "2026-02-20", paymentMethod: "pix" },
  { id: "5", category: "financing", description: "Parcela do carro", amount: 890, date: "2026-02-05", paymentMethod: "debit" },
  { id: "6", category: "fine", description: "Multa de trânsito", amount: 130, date: "2026-01-22", paymentMethod: "credit" },
  { id: "7", category: "car_rental", description: "Aluguel semanal", amount: 400, date: "2026-01-10", paymentMethod: "pix" },
];
