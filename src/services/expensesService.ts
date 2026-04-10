import api from "@/services/apiClient";
import { PAYMENT_METHOD_CONFIG, CATEGORY_CONFIG } from "@/features/expenses/utils/expensesUtils";
import type { Expense, ExpenseCategory, PaymentMethod } from "@/features/expenses/utils/expensesUtils";

export async function getExpenses(month: string) {
  const response = await api.get("/api/expenses", { params: { month } });
  return response.data;
}

export async function addExpense(data: Omit<Expense, "id">) {
  const response = await api.post("/api/expenses", data);
  return response.data;
}

export async function deleteExpenses(id: string) {
  const response = await api.delete(`/api/expenses/${id}`);
  return response.data;
}

export { PAYMENT_METHOD_CONFIG, CATEGORY_CONFIG };
export type { Expense, ExpenseCategory, PaymentMethod };
