import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/shared/utils/formatCurrency";
import type { DayResult } from "@/features/workday/utils/validateWorkdayFinish";
import { useEffect } from "react";

function ResultCard({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-(--radius-card) border border-(--border) bg-(--surface) px-6 py-4">
      <p className="text-sm text-(--text-secondary)">{label}</p>
      <p className={`mt-1 font-bold ${highlight ? "text-3xl" : "text-xl"} text-(--text-primary)`}>{value}</p>
    </motion.div>
  );
}

export function WorkdayResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result as DayResult | undefined;

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    function handlePopState() {
      navigate("/", { replace: true });
    }

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate]);

  if (!result) {
    navigate("/");
    return null;
  }

  const isProfit = result.netProfit > 0;
  const isNeutral = result.netProfit === 0;

  const profitConfig = {
    icon: isNeutral ? (
      <Minus size={48} className="text-yellow-400" />
    ) : isProfit ? (
      <TrendingUp size={48} className="text-(--secondary)" />
    ) : (
      <TrendingDown size={48} className="text-(--danger)" />
    ),
    label: isNeutral ? "Dia neutro" : isProfit ? "Valeu a pena!" : "Dia no prejuízo",
    labelColor: isNeutral ? "text-yellow-400" : isProfit ? "text-(--secondary)" : "text-(--danger)",
    profitColor: isNeutral ? "text-yellow-400" : isProfit ? "text-(--secondary)" : "text-(--danger)",
  };

  return (
    <main className="min-h-dvh bg-(--background) px-4 py-8 text-(--text-primary)">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center gap-2 mt-8 mb-8"
      >
        {profitConfig.icon}
        <p className={`text-2xl font-bold ${profitConfig.labelColor}`}>{profitConfig.label}</p>
        <p className="text-sm text-(--text-secondary)">Resumo do seu dia</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }} className="space-y-3">
        <div className="rounded-(--radius-card) border border-(--border) bg-(--surface) px-6 py-5">
          <p className="text-sm text-(--text-secondary)">Lucro líquido</p>
          <p className={`mt-1 text-4xl font-bold ${profitConfig.profitColor}`}>{formatCurrency(result.netProfit)}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <ResultCard label="Faturamento" value={formatCurrency(result.totalEarnings)} />
          <ResultCard label="Despesas" value={formatCurrency(result.totalExpenses)} />
          <ResultCard label="KM rodados" value={`${result.kmDriven.toFixed(0)} km`} />
          <ResultCard label="Ganho por km" value={`R$ ${result.earningsPerKm.toFixed(2)}`} />
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.4 }} className="mt-8">
        <Button onClick={() => navigate("/")} className="w-full h-14 rounded-xl bg-(--primary) text-lg! font-semibold text-white hover:bg-(--primary)/90">
          <Home size={20} />
          Voltar para o início
        </Button>
      </motion.div>
    </main>
  );
}
