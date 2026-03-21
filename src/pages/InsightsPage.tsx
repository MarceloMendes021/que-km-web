import { AppHeader } from "@/shared/layout/AppHeader";
import { BottomTabBar } from "@/shared/layout/BottomTabBar";

export function InsightsPage() {
  return (
    <main className="min-h-dvh bg-(--background) py-4 text-(--text-primary)">
      <AppHeader />
      <section className="mt-4 px-4">
        <p className="text-(--text-secondary)">Insights em construção...</p>
      </section>
      <BottomTabBar />
    </main>
  );
}
