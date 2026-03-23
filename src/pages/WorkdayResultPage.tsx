import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/shared/utils/formatCurrency";
import type { DayResult } from "@/features/workday/utils/validateWorkdayFinish";
import { useEffect } from "react";

type ResultCardProps = {
  label: string;
  value: string;
  variant?: "positive" | "danger" | "default";
};

function ResultCard({ label, value, variant = "default" }: ResultCardProps) {
  const valueColor = {
    positive: "text-(--secondary)",
    danger: "text-(--danger)",
    default: "text-(--text-primary)",
  }[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" as const }}
      className="rounded-(--radius-card) border border-(--border) bg-(--surface) px-6 py-4"
    >
      <p className="text-sm text-(--text-secondary)">{label}</p>
      <p className={`mt-1 text-xl font-bold ${valueColor}`}>{value}</p>
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

  const config = {
    icon: isNeutral ? (
      <Minus size={32} className="text-yellow-400" />
    ) : isProfit ? (
      <TrendingUp size={32} className="text-(--secondary)" />
    ) : (
      <TrendingDown size={32} className="text-(--danger)" />
    ),
    iconBg: isNeutral ? "bg-yellow-400/10" : isProfit ? "bg-(--secondary)/10" : "bg-(--danger)/10",
    label: isNeutral ? "Dia neutro" : isProfit ? "Valeu a pena!" : "Dia no prejuízo",
    labelColor: isNeutral ? "text-yellow-400" : isProfit ? "text-(--secondary)" : "text-(--danger)",
    profitColor: isNeutral ? "text-yellow-400" : isProfit ? "text-(--secondary)" : "text-(--danger)",
  };

  return (
    <main className="min-h-dvh bg-(--background) px-4 py-8 text-(--text-primary)">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" as const }}
        className="flex flex-col items-center gap-3 mt-10 mb-8"
      >
        <div className={`flex h-20 w-20 items-center justify-center rounded-full ${config.iconBg}`}>{config.icon}</div>
        <p className={`text-2xl font-bold ${config.labelColor}`}>{config.label}</p>
        <p className="text-sm text-(--text-secondary)">Resumo do seu dia</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut" as const, delay: 0.15 }} className="space-y-3">
        <div className="rounded-(--radius-card) border border-(--border) bg-(--surface) px-6 py-5">
          <p className="text-sm text-(--text-secondary)">Lucro líquido</p>
          <p className={`mt-1 text-4xl font-bold ${config.profitColor}`}>{formatCurrency(result.netProfit)}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <ResultCard label="Faturamento" value={formatCurrency(result.totalEarnings)} variant="positive" />
          <ResultCard label="Despesas" value={formatCurrency(result.totalExpenses)} variant="danger" />
          <ResultCard label="KM rodados" value={`${result.kmDriven.toFixed(0)} km`} />
          <ResultCard label="Ganho por km" value={`R$ ${result.earningsPerKm.toFixed(2)}`} />
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.5 }} className="mt-8">
        <Button onClick={() => navigate("/")} className="w-full h-14 rounded-xl bg-(--primary) text-lg! font-semibold text-white hover:bg-(--primary)/90">
          <Home size={20} />
          Voltar para o início
        </Button>
      </motion.div>
    </main>
  );
}
