import { HomeStatCard } from "@/features/home/components/HomeStatCard";
import { MonthSummaryCard } from "@/features/home/components/MonthSummaryCard";
import { AppHeader } from "@/shared/layout/AppHeader";
import { BottomTabBar } from "@/shared/layout/BottomTabBar";
import { WorkdayActionButton } from "@/features/workday/components/WorkdayActionButton";
import { Briefcase, Car } from "lucide-react";

function getGreeting(name: string): string {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) return `Olá, ${name}! Bom dia.`;
  if (hour >= 12 && hour < 18) return `Olá, ${name}! Boa tarde.`;
  return `Olá, ${name}! Boa noite.`;
}

export function HomePage() {
  const month = new Date().toLocaleDateString("pt-BR", { month: "long" });
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

  return (
    <main className="h-dvh overflow-hidden bg-(--background) pt-24 pb-28 text-(--text-primary)">
      <AppHeader />
      <section className="mt-4 px-4 space-y-4">
        <p className="text-lg font-semibold text-(--text-primary)">{getGreeting("Marcelo")}</p>

        <MonthSummaryCard amount={1350} monthLabel="Janeiro" trend="positive" />

        <div className="grid grid-cols-2 gap-4">
          <HomeStatCard icon={<img src="/icons/dollar-icon.svg" alt="Ícone de dólar" />} title="Faturamento" value={1234} variant="positive" />
          <HomeStatCard icon={<img src="/icons/wallet-out-icon.svg" alt="Ícone de despesas" />} title="Despesas" value={600} variant="danger" />
        </div>

        <div className="rounded-(--radius-card) border border-(--border) bg-(--surface) px-4 py-3 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase size={16} className="text-(--text-secondary)" />
              <span className="text-sm text-(--text-secondary)">Dias trabalhados em {capitalizedMonth}</span>
            </div>
            <span className="text-lg font-semibold text-(--text-primary)">5</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Car size={16} className="text-(--text-secondary)" />
              <span className="text-sm text-(--text-secondary)">KM rodados em {capitalizedMonth}</span>
            </div>
            <span className="text-lg font-semibold text-(--text-primary)">412 km</span>
          </div>
        </div>

        <WorkdayActionButton workdayStarted={false} />
      </section>
      <BottomTabBar />
    </main>
  );
}
