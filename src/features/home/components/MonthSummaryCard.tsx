import { TrendingDown, MoveRight, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/shared/utils/formatCurrency";

type MonthSummaryTrend = "positive" | "negative" | "neutral";

type MonthSummaryCardProps = {
  amount: number;
  monthLabel: string;
  trend: MonthSummaryTrend;
};

export function MonthSummaryCard({ amount, monthLabel, trend }: MonthSummaryCardProps) {
  const trendConfig = {
    positive: {
      valueColor: "text-(--secondary)",
      helperText: "Você está indo bem!",
      helperTextColor: "text-(--secondary)",
      icon: <TrendingUp className="h-5 w-5 text-(--secondary)" />,
    },
    negative: {
      valueColor: "text-(--danger)",
      helperText: "Fique de olho nos gastos",
      helperTextColor: "text-(--danger)",
      icon: <TrendingDown className="h-5 w-5 text-(--danger)" />,
    },
    neutral: {
      valueColor: "text-(--text-primary)",
      helperText: "Mês em andamento",
      helperTextColor: "text-(--text-secondary)",
      icon: <MoveRight className="h-5 w-5 text-(--text-secondary)" />,
    },
  }[trend];

  return (
    <section className="rounded-(--radius-card) border border-(--border) bg-(--surface) py-5 px-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-base font-medium text-(--text-primary)">Lucro do mês</p>
          <p className="mt-1 text-sm text-(--text-secondary)">{monthLabel}</p>
        </div>

        <div>{trendConfig.icon}</div>
      </div>

      <p className={`mt-4 text-[32px] font-bold ${trendConfig.valueColor}`}>{formatCurrency(amount)}</p>

      <p className={`mt-1 text-sm ${trendConfig.helperTextColor}`}>{trendConfig.helperText}</p>
    </section>
  );
}
