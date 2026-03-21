import { HomeStatCard } from "@/features/home/components/HomeStatCard";
import { MonthSummaryCard } from "@/features/home/components/MonthSummaryCard";
import { AppHeader } from "@/shared/layout/AppHeader";
import { BottomTabBar } from "@/shared/layout/BottomTabBar";
import { Card, CardContent } from "@/components/ui/card";
import { WorkdayActionButton } from "@/features/workday/components/WorkdayActionButton";

export function HomePage() {
  const month = new Date().toLocaleDateString("pt-BR", {
    month: "long",
  });

  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

  return (
    <main className="min-h-dvh bg-(--background) pt-24 pb-4 text-(--text-primary)">
      <AppHeader />
      <section className="mt-4 px-4 space-y-4">
        <MonthSummaryCard amount={1350} monthLabel="Janeiro" trend="positive" />

        <div className="grid grid-cols-2 gap-4">
          <HomeStatCard icon={<img src="/icons/dollar-icon.svg" alt="Ícone de dólar" />} title="Faturamento" value={1234} variant="positive" />
          <HomeStatCard icon={<img src="/icons/wallet-out-icon.svg" alt="Ícone de despesas" />} title="Despesas" value={600} variant="danger" />
        </div>

        <Card>
          <CardContent className="flex flex-col gap-1 px-4 py-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-(--text-secondary)">Dias trabalhados em {capitalizedMonth}</span>
              <span className="text-lg font-semibold text-(--text-primary)">5</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-(--text-secondary)">KM rodados em {capitalizedMonth}</span>
              <span className="text-lg font-semibold text-(--text-primary)">412 km</span>
            </div>
          </CardContent>
        </Card>

        <WorkdayActionButton workdayStarted={false} />
      </section>
      <BottomTabBar />
    </main>
  );
}
