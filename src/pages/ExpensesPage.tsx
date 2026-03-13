import { AppHeader } from "@/shared/components/AppHeader";

export function ExpensesPage() {
  return (
    <main className="min-h-dvh bg-(--background) px-6 py-4 text-(--text-primary)">
      <AppHeader />

      {/* Conteúdo da página (placeholder por enquanto) */}
      <section className="mt-6">
        <p className="text-(--text-secondary)">Expenses page</p>
      </section>
    </main>
  );
}
