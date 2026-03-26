import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Car, Gauge } from "lucide-react";
import { AppHeader } from "@/shared/layout/AppHeader";
import { BottomTabBar } from "@/shared/layout/BottomTabBar";
import { PageHeader } from "@/shared/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { validateOdometer } from "@/features/workday/utils/validateOdometer";
import { useWorkdayStore } from "@/features/workday/stores/useWorkdayStore";

export function WorkdayStartPage() {
  const navigate = useNavigate();
  const [odometer, setOdometer] = useState("");
  const [error, setError] = useState<string | null>(null);
  const startWorkday = useWorkdayStore((s) => s.startWorkday);

  function handleStart() {
    const validationError = validateOdometer(odometer);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    startWorkday(Number(odometer));
    navigate("/");
  }

  return (
    <main className="fixed inset-0 bg-(--background) pt-24 pb-28 text-(--text-primary)">
      <AppHeader />

      <PageHeader title="Iniciar Jornada" subtitle="Registre o KM atual do odômetro" icon={<Car size={28} />} />

      <section className="mt-4 px-4 space-y-6">
        <div
          className={`rounded-(--radius-card) border bg-(--surface) px-10 py-5 transition-colors cursor-text
            ${error ? "border-(--danger)" : "border-(--border)"}`}
          onClick={() => document.getElementById("odometer-input")?.focus()}
        >
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-9 items-center justify-center rounded-lg bg-(--primary)/10">
              <Gauge size={28} className="text-(--primary)" />
            </div>
            <span className="text-lg font-medium text-(--text-secondary)">KM Inicial</span>
          </div>

          <div className="mt-3">
            <input
              id="odometer-input"
              type="number"
              inputMode="numeric"
              value={odometer}
              onChange={(e) => {
                setOdometer(e.target.value);
                setError(null);
              }}
              onKeyDown={(e) => {
                if (["e", "E", "+", "-", "."].includes(e.key)) e.preventDefault();
                if (e.key === "Enter") handleStart();
              }}
              placeholder="0"
              className="w-full bg-transparent text-3xl! font-bold text-(--text-primary) outline-none placeholder:text-(--text-secondary)"
            />
          </div>
        </div>

        {error && <p className="text-sm text-(--danger)">{error}</p>}

        <Button onClick={handleStart} className="w-full text-lg! h-14 rounded-xl bg-(--primary) font-semibold text-white hover:bg-(--primary)/90">
          Iniciar Dia
        </Button>
      </section>
      <BottomTabBar />
    </main>
  );
}
