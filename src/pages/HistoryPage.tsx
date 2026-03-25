import { useState } from "react";
import { ChevronDown, History } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AppHeader } from "@/shared/layout/AppHeader";
import { BottomTabBar } from "@/shared/layout/BottomTabBar";
import { PageHeader } from "@/shared/layout/PageHeader";
import { formatCurrency } from "@/shared/utils/formatCurrency";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { historyMock, calculateWorkdayMetrics, type WorkdayHistory } from "@/features/history/mock/historyMock";

const MONTHS = [
  { label: "Março", value: "2026-03" },
  { label: "Fevereiro", value: "2026-02" },
  { label: "Janeiro", value: "2026-01" },
  { label: "Dezembro", value: "2025-12" },
];

function formatDate(dateStr: string): string {
  const [yyyy, mm, dd] = dateStr.split("-");
  const date = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });
}

function WorkdayItem({ workday, isFirst, isLast }: { workday: WorkdayHistory; isFirst: boolean; isLast: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const metrics = calculateWorkdayMetrics(workday);
  const isProfit = metrics.netProfit > 0;

  const borderLeftColor = isProfit ? "border-l-(--secondary)" : "border-l-(--danger)";
  const roundedTop = isFirst ? "rounded-tl-[calc(var(--radius-card)-1px)]" : "";
  const roundedBottom = isLast ? "rounded-bl-[calc(var(--radius-card)-1px)]" : "";

  return (
    <div className={`border-b border-(--border) last:border-b-0 border-l-2 ${borderLeftColor} ${roundedTop} ${roundedBottom}`}>
      <button type="button" onClick={() => setExpanded((prev) => !prev)} className="w-full flex items-center justify-between px-4 py-4">
        <div className="flex flex-col items-start gap-1">
          <span className="text-sm text-(--text-secondary) capitalize">{formatDate(workday.date)}</span>
          <span className={`text-lg font-bold ${isProfit ? "text-(--secondary)" : "text-(--danger)"}`}>{formatCurrency(metrics.netProfit)}</span>
        </div>

        <ChevronDown size={18} className={`text-(--text-secondary) transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" as const }}
            className="overflow-hidden"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function HistoryPage() {
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[0].value);

  const filteredHistory = historyMock.filter((w) => w.date.startsWith(selectedMonth));

  return (
    <main className="fixed inset-0 flex flex-col bg-(--background) text-(--text-primary)">
      <AppHeader />

      <div className="flex-1 overflow-y-auto pt-24 pb-28">
        <PageHeader title="Histórico" subtitle="Suas jornadas do mês" icon={<History size={28} />} />

        <section className="mt-4 px-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-(--text-secondary)">
              {filteredHistory.length} jornada{filteredHistory.length !== 1 ? "s" : ""}
            </h2>

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

          {filteredHistory.length > 0 ? (
            <div className="rounded-(--radius-card) border border-(--border) bg-(--surface) overflow-hidden">
              {filteredHistory.map((workday, index) => (
                <WorkdayItem key={workday.id} workday={workday} isFirst={index === 0} isLast={index === filteredHistory.length - 1} />
              ))}
            </div>
          ) : (
            <div className="rounded-(--radius-card) border border-(--border) bg-(--surface) px-6 py-10 flex flex-col items-center gap-2">
              <p className="text-sm font-medium text-(--text-primary)">Nenhuma jornada em {MONTHS.find((m) => m.value === selectedMonth)?.label}</p>
              <p className="text-xs text-(--text-secondary)">Inicie uma jornada na tela inicial para começar</p>
            </div>
          )}
        </section>
      </div>

      <BottomTabBar />
    </main>
  );
}
