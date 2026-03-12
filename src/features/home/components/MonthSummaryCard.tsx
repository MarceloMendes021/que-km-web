import { TrendingDown, MoveRight, TrendingUp } from "lucide-react";

type MonthSummaryTrend = "positive" | "negative" | "neutral";

type MonthSummaryCardProps = {
  amount: number;
  monthLabel: string;
  trend: MonthSummaryTrend;
};

function formatCurrency(value: number) {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}

export function MonthSummaryCard({ amount, monthLabel, trend }: MonthSummaryCardProps) {
  const trendConfig = {
    positive: {
      valueColor: "text-(--secondary)",
      helperText: "Excelente",
      helperTextColor: "text-(--secondary)",
      icon: <TrendingUp className="h-5 w-5 text-(--secondary)" />,
    },
    negative: {
      valueColor: "text-(--danger)",
      helperText: "Atenção",
      helperTextColor: "text-(--danger)",
      icon: <TrendingDown className="h-5 w-5 text-(--danger)" />,
    },
    neutral: {
      valueColor: "text-(--text-primary)",
      helperText: "Em acompanhamento",
      helperTextColor: "text-(--text-secondary)",
      icon: <MoveRight className="h-5 w-5 text-(--text-secondary)" />,
    },
  }[trend];

  return (
    /*
      Card principal da Home
      - Exibe o resultado acumulado do mês
      - Varia visualmente conforme a tendência atual
    */
    <section className="rounded-(--radius-card) border border-(--border) bg-(--surface) p-5">
      {/* Linha superior do card */}
      <div className="flex items-start justify-between gap-4">
        <div>
          {/* Título principal */}
          <p className="text-base font-medium text-(--text-primary)">Lucro do mês</p>

          {/* Referência do mês atual */}
          <p className="mt-1 text-sm text-(--text-secondary)">{monthLabel}</p>
        </div>

        {/* Ícone que indica a tendência do mês */}
        <div>{trendConfig.icon}</div>
      </div>

      {/* Valor financeiro principal do card */}
      <p className={`mt-5 text-[32px] font-bold ${trendConfig.valueColor}`}>{formatCurrency(amount)}</p>

      {/* Texto de apoio conforme tendência */}
      <p className={`mt-1 text-sm ${trendConfig.helperTextColor}`}>{trendConfig.helperText}</p>
    </section>
  );
}
