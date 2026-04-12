export type Expense = {
  id: string;
  category: ExpenseCategory;
  description: string;
  amount: number;
  date: string;
  paymentMethod: PaymentMethod;
};

export type ExpenseCategory = "fuel" | "food" | "maintenance" | "fine" | "car_rental" | "financing" | "insurance" | "other";

export type PaymentMethod = "cash" | "debit" | "credit" | "pix" | "other";

export const PAYMENT_METHOD_CONFIG: Record<PaymentMethod, { label: string }> = {
  cash: { label: "Dinheiro" },
  debit: { label: "Cartão de débito" },
  credit: { label: "Cartão de crédito" },
  pix: { label: "Pix" },
  other: { label: "Outros" },
};

export const CATEGORY_CONFIG: Record<ExpenseCategory, { label: string; color: string }> = {
  fuel: { label: "Combustível", color: "#00a5da" },
  food: { label: "Alimentação", color: "#fb923c" },
  maintenance: { label: "Manutenção", color: "#F5A623" },
  fine: { label: "Multa", color: "#ff453a" },
  car_rental: { label: "Aluguel do carro", color: "#a78bfa" },
  financing: { label: "Financiamento", color: "#f472b6" },
  insurance: { label: "IPVA / Seguro", color: "#00e676" },
  other: { label: "Outros", color: "#9ba1a6" },
};
