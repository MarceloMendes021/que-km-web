import type { ReactNode } from "react";
import { formatCurrency } from "@/shared/utils/formatCurrency";

type HomeStatCardVariant = "default" | "positive" | "danger";

type HomeStatCardProps = {
  title: string;
  value: number;
  variant?: HomeStatCardVariant;
  icon?: ReactNode;
};

export function HomeStatCard({ title, value, variant = "default", icon }: HomeStatCardProps) {
  const valueColorClass = {
    default: "text-(--text-primary)",
    positive: "text-(--secondary)",
    danger: "text-(--danger)",
  }[variant];

  return (
    <section className="rounded-(--radius-card) border border-(--border) bg-(--surface) p-4">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-sm text-(--text-secondary)">{title}</p>
      </div>

      <p className={`mt-2 text-xl font-bold ${valueColorClass}`}>{formatCurrency(value)}</p>
    </section>
  );
}
