import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Car, Gauge, Fuel, DollarSign } from "lucide-react";
import { AppHeader } from "@/shared/layout/AppHeader";
import { BottomTabBar } from "@/shared/layout/BottomTabBar";
import { PageHeader } from "@/shared/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { WORKDAY_APPS } from "@/features/workday/config/apps";
import { validateWorkdayFinish, toCalculation, calculateDayResult, type WorkdayFinishData } from "@/features/workday/utils/validateWorkdayFinish";

const INITIAL_ODOMETER = 44000;

export function WorkdayFinishPage() {
  const navigate = useNavigate();

  const [data, setData] = useState<WorkdayFinishData>({
    finalOdometer: "",
    earnings: Object.fromEntries(WORKDAY_APPS.map((app) => [app.id, ""])),
    fuel: "",
    otherExpenses: "",
  });

  const [errors, setErrors] = useState<{
    finalOdometer?: string;
    earnings?: string;
  }>({});

  function handleEarningChange(appId: string, value: string) {
    setData((prev) => ({
      ...prev,
      earnings: { ...prev.earnings, [appId]: value },
    }));
    setErrors((prev) => ({ ...prev, earnings: undefined }));
  }

  function handleFinish() {
    const validationErrors = validateWorkdayFinish(data);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const calculation = toCalculation(data);
    const result = calculateDayResult(calculation, INITIAL_ODOMETER);

    navigate("/workday/result", { state: { result } });
  }

  return (
    <main className="min-h-dvh bg-(--background) pt-24 pb-4 pb-28 text-(--text-primary)">
      <AppHeader />

      <PageHeader title="Encerrar Jornada" subtitle="Como foi o seu dia?" icon={<Car size={28} />} />

      <section className="mt-4 px-4 space-y-6">
        <div className="flex flex-col gap-1">
          <div
            className={`rounded-(--radius-card) border bg-(--surface) px-10 py-5 transition-colors cursor-text
              ${errors.finalOdometer ? "border-(--danger)" : "border-(--border)"}`}
            onClick={() => document.getElementById("final-odometer")?.focus()}
          >
            <div className="flex items-center gap-2 text-(--text-secondary)">
              <Gauge size={28} />
              <span className="text-lg">KM Final</span>
            </div>
            <input
              id="final-odometer"
              type="number"
              inputMode="numeric"
              placeholder="0"
              value={data.finalOdometer}
              onChange={(e) => {
                setData((prev) => ({ ...prev, finalOdometer: e.target.value }));
                setErrors((prev) => ({ ...prev, finalOdometer: undefined }));
              }}
              onKeyDown={(e) => {
                if (["e", "E", "+", "-", "."].includes(e.key)) e.preventDefault();
              }}
              className="mt-3 w-full bg-transparent text-3xl! font-bold text-(--text-primary) outline-none placeholder:text-(--text-secondary)"
            />
          </div>
          {errors.finalOdometer && <p className="text-sm text-(--danger)">{errors.finalOdometer}</p>}
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <DollarSign size={18} className="text-(--text-secondary)" />
            <span className="text-base font-medium text-(--text-primary)">Ganhos do dia</span>
          </div>

          {errors.earnings && <p className="text-sm text-(--danger)">{errors.earnings}</p>}

          <div className="grid grid-cols-2 gap-3">
            {WORKDAY_APPS.map((app) => (
              <div
                key={app.id}
                className="rounded-(--radius-card) border border-(--border) bg-(--surface) px-4 py-4 cursor-text"
                onClick={() => document.getElementById(`earning-${app.id}`)?.focus()}
              >
                <div className="flex items-center gap-2">
                  <img src={app.logo} alt={app.name} className="h-6 w-6 rounded-md object-contain" />
                  <span className="text-sm text-(--text-secondary)">{app.name}</span>
                </div>
                <input
                  id={`earning-${app.id}`}
                  type="number"
                  inputMode="decimal"
                  placeholder="0"
                  value={data.earnings[app.id]}
                  onChange={(e) => handleEarningChange(app.id, e.target.value)}
                  onKeyDown={(e) => {
                    if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
                  }}
                  className="mt-2 w-full bg-transparent text-xl! font-bold text-(--secondary) outline-none placeholder:text-(--text-secondary)"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Fuel size={18} className="text-(--text-secondary)" />
            <span className="text-base font-medium text-(--text-primary)">Despesas</span>
          </div>

          <div className="rounded-(--radius-card) border border-(--border) bg-(--surface) divide-y divide-(--border)">
            <div className="flex items-center justify-between px-4 py-4 cursor-text" onClick={() => document.getElementById("fuel")?.focus()}>
              <span className="text-sm text-(--text-secondary)">Combustível</span>
              <input
                id="fuel"
                type="number"
                inputMode="decimal"
                placeholder="R$ 0,00"
                value={data.fuel}
                onChange={(e) => setData((prev) => ({ ...prev, fuel: e.target.value }))}
                onKeyDown={(e) => {
                  if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
                }}
                className="w-32 bg-transparent text-right text-base font-semibold text-(--text-primary) outline-none placeholder:text-(--text-secondary)"
              />
            </div>

            <div className="flex items-center justify-between px-4 py-4 cursor-text" onClick={() => document.getElementById("other-expenses")?.focus()}>
              <span className="text-sm text-(--text-secondary)">Outras despesas</span>
              <input
                id="other-expenses"
                type="number"
                inputMode="decimal"
                placeholder="R$ 0,00"
                value={data.otherExpenses}
                onChange={(e) => setData((prev) => ({ ...prev, otherExpenses: e.target.value }))}
                onKeyDown={(e) => {
                  if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
                }}
                className="w-32 bg-transparent text-right text-base font-semibold text-(--text-primary) outline-none placeholder:text-(--text-secondary)"
              />
            </div>
          </div>
        </div>

        <Button onClick={handleFinish} className="w-full text-lg! h-14 rounded-xl bg-(--danger) font-semibold text-white hover:bg-(--danger)/90">
          Ver Resultado do Dia
        </Button>
      </section>
      <BottomTabBar />
    </main>
  );
}
