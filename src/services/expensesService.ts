import { expensesMock } from "@/features/expenses/mock/expensesMock";
import type { Expense, ExpenseCategory, PaymentMethod } from "@/features/expenses/mock/expensesMock";
export { CATEGORY_CONFIG, PAYMENT_METHOD_CONFIG } from "@/features/expenses/mock/expensesMock";
export type { Expense, ExpenseCategory, PaymentMethod };

export async function getExpenses(month: string): Promise<Expense[]> {
  await new Promise((r) => setTimeout(r, 300));
  return expensesMock.filter((e) => e.date.startsWith(month));
}

export async function addExpense(expense: Omit<Expense, "id">): Promise<Expense> {
  await new Promise((r) => setTimeout(r, 300));

  const newExpense = { ...expense, id: crypto.randomUUID() };
  expensesMock.push(newExpense);
  return newExpense;
}
