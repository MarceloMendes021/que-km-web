import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AppHeader } from "@/shared/layout/AppHeader";
import { BottomTabBar } from "@/shared/layout/BottomTabBar";
import { PageHeader } from "@/shared/layout/PageHeader";
import { History } from "lucide-react";
import { formatCurrency } from "@/shared/utils/formatCurrency";
import { historyMock, calculateWorkdayMetrics, type WorkdayHistory } from "@/features/history/mock/historyMock";

function formatDate(dateStr: string): string {
  const [yyyy, mm, dd] = dateStr.split("-");
  const date = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });
}

function WorkdayItem({ workday }: { workday: WorkdayHistory }) {
  const [expanded, setExpanded] = useState(false);
  const metrics = calculateWorkdayMetrics(workday);
  const isProfit = metrics.netProfit > 0;

  return (
    <div className="border-b border-(--border) last:border-0">
      <button type="button" onClick={() => setExpanded((prev) => !prev)} className="w-full flex items-center justify-between px-4 py-4">
        <div className="flex flex-col items-start gap-1">
          <span className="text-sm text-(--text-secondary) capitalize">{formatDate(workday.date)}</span>
          <span className={`text-lg font-bold ${isProfit ? "text-(--secondary)" : "text-(--danger)"}`}>{formatCurrency(metrics.netProfit)}</span>
        </div>

        <ChevronDown size={18} className={`text-(--text-secondary) transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-2">
          <div className="rounded-(--radius-card) border border-(--border) bg-(--background) divide-y divide-(--border)">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-(--text-secondary)">Faturamento</span>
              <span className="text-sm font-semibold text-(--secondary)">{formatCurrency(metrics.totalEarnings)}</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-(--text-secondary)">Despesas</span>
              <span className="text-sm font-semibold text-(--danger)">{formatCurrency(metrics.totalExpenses)}</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-(--text-secondary)">KM rodados</span>
              <span className="text-sm font-semibold text-(--text-primary)">{metrics.kmDriven} km</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-(--text-secondary)">Ganho por km</span>
              <span className="text-sm font-semibold text-(--text-primary)">R$ {metrics.earningsPerKm.toFixed(2)}/km</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function HistoryPage() {
  return (
    <main className="min-h-dvh bg-(--background) pt-24 pb-4 pb-28 text-(--text-primary)">
      <AppHeader />

      <PageHeader title="Histórico" subtitle="Suas jornadas do mês" icon={<History size={28} />} />

      <section className="mt-4 px-4 space-y-4">
        {historyMock.length > 0 ? (
          <div className="rounded-(--radius-card) border border-(--border) bg-(--surface)">
            {historyMock.map((workday) => (
              <WorkdayItem key={workday.id} workday={workday} />
            ))}
          </div>
        ) : (
          <div className="rounded-(--radius-card) border border-(--border) bg-(--surface) px-6 py-10 flex flex-col items-center gap-2">
            <p className="text-sm font-medium text-(--text-primary)">Nenhuma jornada este mês</p>
            <p className="text-xs text-(--text-secondary)">Inicie uma jornada na tela inicial para começar</p>
          </div>
        )}
      </section>

      <BottomTabBar />
    </main>
  );
}
