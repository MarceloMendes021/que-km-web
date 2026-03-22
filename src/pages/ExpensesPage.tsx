import { useState } from "react";
import { Plus, ChevronDown, Wallet } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { AppHeader } from "@/shared/layout/AppHeader";
import { BottomTabBar } from "@/shared/layout/BottomTabBar";
import { PageHeader } from "@/shared/layout/PageHeader";
import { formatCurrency } from "@/shared/utils/formatCurrency";
import { expensesMock, CATEGORY_CONFIG, type Expense } from "@/features/expenses/mock/expensesMock";
import { ExpenseSheet } from "@/features/expenses/components/ExpenseSheet";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

const MONTHS = [
  { label: "Março", value: "2026-03" },
  { label: "Fevereiro", value: "2026-02" },
  { label: "Janeiro", value: "2026-01" },
  { label: "Dezembro", value: "2025-12" },
];

function groupByCategory(expenses: Expense[]) {
  const groups: Record<string, number> = {};
  expenses.forEach((expense) => {
    groups[expense.category] = (groups[expense.category] || 0) + expense.amount;
  });
  return Object.entries(groups).map(([category, value]) => ({
    category,
    value,
    label: CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG].label,
    color: CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG].color,
  }));
}

export function ExpensesPage() {
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[0].value);
  const [sheetOpen, setSheetOpen] = useState(false);

  const filteredExpenses = expensesMock.filter((e) => e.date.startsWith(selectedMonth));
  const chartData = groupByCategory(filteredExpenses);
  const totalExpenses = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <main className="min-h-dvh bg-(--background) pt-24 pb-36 text-(--text-primary)">
      <AppHeader />

      <PageHeader title="Despesas" subtitle="Mantenha seus gastos sob controle" icon={<Wallet size={28} />} showBackButton={false} />

      <section className="mt-2 px-4 space-y-6">
        <div className="flex items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 rounded-full border border-(--border) bg-(--surface) px-3 py-1.5 text-sm text-(--text-secondary)">
                {MONTHS.find((m) => m.value === selectedMonth)?.label}
                <ChevronDown size={14} />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="bg-(--surface) border-(--border)">
              {MONTHS.map((month) => (
                <DropdownMenuItem
                  key={month.value}
                  onClick={() => setSelectedMonth(month.value)}
                  className={selectedMonth === month.value ? "text-(--primary)" : "text-(--text-secondary)"}
                >
                  {month.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {chartData.length > 0 ? (
          <div className="rounded-(--radius-card) border border-(--border) bg-(--surface) px-6 py-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-(--text-primary)">Despesas por categoria</p>
              <p className="text-sm font-bold text-(--danger)">{formatCurrency(totalExpenses)}</p>
            </div>

            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={chartData} cx="50%" cy="50%" outerRadius={90} paddingAngle={3} dataKey="value">
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-2 space-y-2">
              {chartData.map((entry) => (
                <div key={entry.category} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                    <span className="text-xs text-(--text-secondary)">{entry.label}</span>
                  </div>
                  <span className="text-xs font-semibold text-(--text-primary)">{formatCurrency(entry.value)}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-(--radius-card) border border-(--border) bg-(--surface) px-6 py-10 flex flex-col items-center gap-2">
            <p className="text-sm font-medium text-(--text-primary)">Nenhuma despesa</p>
            <p className="text-xs text-(--text-secondary)">Toque no + para lançar uma despesa</p>
          </div>
        )}

        {filteredExpenses.length > 0 && (
          <div className="rounded-(--radius-card) border border-(--border) bg-(--surface) divide-y divide-(--border)">
            {filteredExpenses.map((expense) => {
              const config = CATEGORY_CONFIG[expense.category];
              return (
                <div key={expense.id} className="flex items-center justify-between px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: config.color }} />
                    <div className="flex flex-col">
                      <span className="text-sm text-(--text-primary)">{expense.description}</span>
                      <span className="text-xs text-(--text-secondary)">
                        {config.label} · {new Date(expense.date + "T00:00:00").toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-(--danger)">{formatCurrency(expense.amount)}</span>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <button className="fixed bottom-24 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-(--primary) shadow-lg" onClick={() => setSheetOpen(true)}>
        <Plus size={24} className="text-white" />
      </button>

      <ExpenseSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />

      <BottomTabBar />
    </main>
  );
}
