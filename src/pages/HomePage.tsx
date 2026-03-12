import { HomeStatCard } from "@/features/home/components/HomeStatCard";
import { MonthSummaryCard } from "@/features/home/components/MonthSummaryCard";
import { AppHeader } from "@/shared/components/AppHeader";

export function HomePage() {
  return (
    <main className="min-h-dvh bg-(--background) py-4 text-(--text-primary)">
      <AppHeader />

      <section className="mt-4  px-6  flex flex-col  gap-4">
        <MonthSummaryCard amount={1350} monthLabel="Janeiro" trend="positive" />

        <div className="grid grid-cols-2 gap-4">
          <HomeStatCard icon={<img src="/icons/dollar-icon.svg" alt="Ícone de dólar" />} title="Faturamento" value={1234} variant="positive" />
          <HomeStatCard icon={<img src="/icons/wallet-out-icon.svg" alt="Ícone de orçamento" />} title="Despesas" value={600} variant="danger" />
        </div>
      </section>
    </main>
  );
}
