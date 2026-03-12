import { MonthSummaryCard } from "@/features/home/components/MonthSummaryCard";
import { AppHeader } from "@/shared/components/AppHeader";

export function HomePage() {
  return (
    <main className="min-h-dvh bg-(--background) py-4 text-(--text-primary)">
      <AppHeader />

      <section className="mt-4  px-6  flex flex-col  gap-4">
        <MonthSummaryCard amount={1350} monthLabel="Janeiro" trend="positive" />
      </section>
    </main>
  );
}
