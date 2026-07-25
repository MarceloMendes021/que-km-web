import { useState } from "react";
import { ChevronDown, History, Pencil } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AppHeader } from "@/shared/layout/AppHeader";
import { BottomTabBar } from "@/shared/layout/BottomTabBar";
import { PageHeader } from "@/shared/layout/PageHeader";
import { formatCurrency } from "@/shared/utils/formatCurrency";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { getRecentMonths } from "@/shared/utils/getRecentMonths";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWorkdayHistory, calculateWorkdayMetrics, type WorkdayHistory } from "@/services/historyService";
import { updateWorkday } from "@/services/workdayService";
import { useCurrencyInput } from "@/shared/hooks/useCurrencyInput";

const MONTHS = getRecentMonths();

function formatDate(dateStr: string): string {
  const [yyyy, mm, dd] = dateStr.split("-");
  const date = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });
}

function EditWorkdayModal({ workday, onClose }: { workday: WorkdayHistory; onClose: () => void }) {
  const queryClient = useQueryClient();

  const uberInput = useCurrencyInput();
  const app99Input = useCurrencyInput();
  const particularInput = useCurrencyInput();
  const fuelInput = useCurrencyInput();
  const foodInput = useCurrencyInput();
  const otherInput = useCurrencyInput();

  const mutation = useMutation({
    mutationFn: (data: Parameters<typeof updateWorkday>[1]) => updateWorkday(workday.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
      onClose();
    },
  });

  function handleSave() {
    mutation.mutate({
      earnings_uber: parseFloat(uberInput.rawValue) || workday.earnings.uber,
      earnings_99: parseFloat(app99Input.rawValue) || workday.earnings["99"],
      earnings_particular: parseFloat(particularInput.rawValue) || workday.earnings.particular,
      expenses_fuel: parseFloat(fuelInput.rawValue) || workday.fuel,
      expenses_food: parseFloat(foodInput.rawValue) || workday.food,
      expenses_other: parseFloat(otherInput.rawValue) || workday.otherExpenses,
    });
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end justify-center pb-[max(5rem,env(safe-area-inset-bottom))]" onClick={onClose}>
      <div className="w-full max-w-md bg-(--surface) rounded-t-2xl p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-base font-semibold text-(--text-primary)">Editar jornada</h2>

        <div className="space-y-3">
          <p className="text-xs font-medium text-(--text-secondary) uppercase tracking-wide">Ganhos</p>
          {[
            { label: "Uber", input: uberInput, current: workday.earnings.uber },
            { label: "99", input: app99Input, current: workday.earnings["99"] },
            { label: "Particular", input: particularInput, current: workday.earnings.particular },
          ].map(({ label, input, current }) => (
            <div key={label} className="flex items-center justify-between rounded-xl border border-(--border) bg-(--background) px-4 py-3">
              <span className="text-sm text-(--text-secondary)">{label}</span>
              <input
                type="text"
                inputMode="numeric"
                placeholder={`R$ ${current.toFixed(2)}`}
                value={input.displayValue}
                onChange={(e) => input.handleChange(e.target.value)}
                className="w-28 bg-transparent text-right text-sm font-semibold text-(--secondary) outline-none placeholder:text-(--text-secondary)"
              />
            </div>
          ))}

          <p className="text-xs font-medium text-(--text-secondary) uppercase tracking-wide pt-1">Despesas</p>
          {[
            { label: "Combustível", input: fuelInput, current: workday.fuel },
            { label: "Alimentação", input: foodInput, current: workday.food },
            { label: "Outros", input: otherInput, current: workday.otherExpenses },
          ].map(({ label, input, current }) => (
            <div key={label} className="flex items-center justify-between rounded-xl border border-(--border) bg-(--background) px-4 py-3">
              <span className="text-sm text-(--text-secondary)">{label}</span>
              <input
                type="text"
                inputMode="numeric"
                placeholder={`R$ ${current.toFixed(2)}`}
                value={input.displayValue}
                onChange={(e) => input.handleChange(e.target.value)}
                className="w-28 bg-transparent text-right text-sm font-semibold text-(--danger) outline-none placeholder:text-(--text-secondary)"
              />
            </div>
          ))}
        </div>

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onClose} className="flex-1 h-12 rounded-xl border border-(--border) text-sm font-semibold text-(--text-secondary)">
            Cancelar
          </button>
          <button type="button" onClick={handleSave} disabled={mutation.isPending} className="flex-1 h-12 rounded-xl bg-(--primary) text-sm font-semibold text-white">
            {mutation.isPending ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}

function WorkdayItem({ workday, isFirst, isLast, onEdit }: { workday: WorkdayHistory; isFirst: boolean; isLast: boolean; onEdit: (workday: WorkdayHistory) => void }) {
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
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(workday);
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-(--border) bg-(--surface) py-2.5 text-sm font-medium text-(--text-secondary) hover:text-(--text-primary) transition-colors"
              >
                <Pencil size={14} />
                Editar jornada
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function HistoryPage() {
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[0].value);
  const [editingWorkday, setEditingWorkday] = useState<WorkdayHistory | null>(null);

  const { data: filteredHistory = [] } = useQuery({
    queryKey: ["history", selectedMonth],
    queryFn: () => getWorkdayHistory(selectedMonth),
  });

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
              {filteredHistory.map((workday: WorkdayHistory, index: number) => (
                <WorkdayItem key={workday.id} workday={workday} isFirst={index === 0} isLast={index === filteredHistory.length - 1} onEdit={setEditingWorkday} />
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

      {editingWorkday && <EditWorkdayModal workday={editingWorkday} onClose={() => setEditingWorkday(null)} />}
      <BottomTabBar />
    </main>
  );
}
