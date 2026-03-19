import { ThumbsUp, ThumbsDown, AlertTriangle } from "lucide-react";
import type { RideResult } from "../utils/calculateRideValue";

type Props = {
  result: RideResult;
};

const ratingConfig = {
  good: {
    icon: <ThumbsUp size={48} className="text-(--secondary)" />,
    label: "Boa corrida!",
    labelColor: "text-(--secondary)",
  },
  acceptable: {
    icon: <AlertTriangle size={48} className="text-yellow-400" />,
    label: "Aceitável",
    labelColor: "text-yellow-400",
  },
  poor: {
    icon: <ThumbsDown size={48} className="text-(--danger)" />,
    label: "Não vale a pena",
    labelColor: "text-(--danger)",
  },
};

function formatValuePerKm(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function CalculatorResult({ result }: Props) {
  const config = ratingConfig[result.rating];

  return (
    <div className="flex flex-col items-center gap-2 rounded-(--radius-card) border border-(--border) bg-(--surface) py-6">
      {config.icon}

      <p className={`text-lg font-semibold ${config.labelColor}`}>{config.label}</p>

      <div className="mt-1 flex flex-col items-center gap-1">
        <span className="text-sm text-(--text-secondary)">Valor por km</span>
        <span className="text-2xl font-bold text-(--text-primary)">R$ {formatValuePerKm(result.valuePerKm)}</span>
      </div>
    </div>
  );
}
