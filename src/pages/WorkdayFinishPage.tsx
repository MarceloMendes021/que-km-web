import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Car, Gauge, Fuel, DollarSign } from "lucide-react";
import { AppHeader } from "@/shared/layout/AppHeader";
import { BottomTabBar } from "@/shared/layout/BottomTabBar";
import { PageHeader } from "@/shared/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { WORKDAY_APPS } from "@/features/workday/config/apps";
import { useCurrencyInput } from "@/shared/hooks/useCurrencyInput";
import { validateWorkdayFinish, toCalculation, calculateDayResult, type WorkdayFinishData } from "@/features/workday/utils/validateWorkdayFinish";

const INITIAL_ODOMETER = 44000;

export function WorkdayFinishPage() {
  const navigate = useNavigate();

  const fuelInput = useCurrencyInput();
  const foodInput = useCurrencyInput();
  const otherExpensesInput = useCurrencyInput();
  const uberInput = useCurrencyInput();
  const app99Input = useCurrencyInput();
  const particularInput = useCurrencyInput();

  const earningInputs: Record<string, ReturnType<typeof useCurrencyInput>> = {
    uber: uberInput,
    "99": app99Input,
    particular: particularInput,
  };

  const [finalOdometer, setFinalOdometer] = useState("");
  const [errors, setErrors] = useState<{
    finalOdometer?: string;
    earnings?: string;
  }>({});

  const mainApps = WORKDAY_APPS.filter((app) => app.id !== "particular");
  const particularApp = WORKDAY_APPS.find((app) => app.id === "particular");

  function handleFinish() {
    const data: WorkdayFinishData = {
      finalOdometer,
      earnings: Object.fromEntries(WORKDAY_APPS.map((app) => [app.id, earningInputs[app.id].rawValue])),
      fuel: fuelInput.rawValue,
      otherExpenses: String(parseFloat(foodInput.rawValue || "0") + parseFloat(otherExpensesInput.rawValue || "0")),
    };

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
    <main className="min-h-dvh bg-(--background) pt-24 pb-28 text-(--text-primary)">
      <AppHeader />

      <PageHeader title="Encerrar Jornada" subtitle="Como foi o seu dia?" icon={<Car size={28} />} />

      <section className="mt-4 px-4 space-y-6">
        <div className="flex flex-col gap-1">
          <div
            className={`rounded-(--radius-card) border bg-(--surface) px-6 py-5 transition-colors cursor-text ${errors.finalOdometer ? "border-(--danger)" : "border-(--border)"}`}
            onClick={() => document.getElementById("final-odometer")?.focus()}
          >
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-(--primary)/10">
                <Gauge size={26} className="text-(--primary)" />
              </div>
              <span className="text-lg font-medium text-(--text-secondary)">KM Final</span>
            </div>

            <input
              id="final-odometer"
              type="number"
              inputMode="numeric"
              placeholder="0"
              value={finalOdometer}
              onChange={(e) => {
                setFinalOdometer(e.target.value);
                setErrors((prev) => ({ ...prev, finalOdometer: undefined }));
              }}
              onKeyDown={(e) => {
                if (["e", "E", "+", "-", "."].includes(e.key)) e.preventDefault();
                if (e.key === "Enter") handleFinish();
              }}
              className="mt-4 w-full bg-transparent text-3xl! font-bold text-(--text-primary) outline-none placeholder:text-(--text-secondary)/40"
            />
          </div>

          {errors.finalOdometer && <p className="text-sm text-(--danger)">{errors.finalOdometer}</p>}
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-(--secondary)/10">
              <DollarSign size={18} className="text-(--secondary)" />
            </div>
            <span className="text-base font-medium text-(--text-primary)">Ganhos do dia</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {mainApps.map((app) => (
              <div
                key={app.id}
                className={`rounded-(--radius-card) border bg-(--surface) px-4 py-4 cursor-text transition-colors ${errors.earnings ? "border-(--danger)" : "border-(--border)"}`}
                onClick={() => document.getElementById(`earning-${app.id}`)?.focus()}
              >
                <div className="flex items-center gap-2 mb-2">
                  <img src={app.logo} alt={app.name} className="h-7 w-7 rounded-lg object-contain" />
                  <span className="text-sm text-(--text-secondary)">{app.name}</span>
                </div>
                <input
                  id={`earning-${app.id}`}
                  type="text"
                  inputMode="numeric"
                  placeholder="R$ 0,00"
                  value={earningInputs[app.id]?.displayValue ?? ""}
                  onChange={(e) => {
                    earningInputs[app.id]?.handleChange(e.target.value);
                    setErrors((prev) => ({ ...prev, earnings: undefined }));
                  }}
                  className="w-full bg-transparent text-2xl! font-bold text-(--secondary) outline-none placeholder:text-(--text-secondary)"
                />
              </div>
            ))}
          </div>

          {particularApp && (
            <div
              className={`rounded-(--radius-card) border bg-(--surface)/60 px-4 py-3 cursor-text flex items-center justify-between transition-colors ${
                errors.earnings ? "border-(--danger)" : "border-(--border)"
              }`}
              onClick={() => document.getElementById(`earning-${particularApp.id}`)?.focus()}
            >
              <div className="flex items-center gap-3">
                <img src={particularApp.logo} alt={particularApp.name} className="h-7 w-7 rounded-lg object-contain opacity-70" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-(--text-primary)">Particular</span>
                  <span className="text-xs text-(--text-secondary)">Corridas fora de app</span>
                </div>
              </div>
              <input
                id={`earning-${particularApp.id}`}
                type="text"
                inputMode="numeric"
                placeholder="R$ 0,00"
                value={earningInputs[particularApp.id]?.displayValue ?? ""}
                onChange={(e) => {
                  earningInputs[particularApp.id]?.handleChange(e.target.value);
                  setErrors((prev) => ({ ...prev, earnings: undefined }));
                }}
                className="w-36 bg-transparent text-right text-xl! font-bold text-(--secondary) outline-none placeholder:text-(--text-secondary)"
              />
            </div>
          )}

          {errors.earnings && <p className="text-sm text-(--danger)">{errors.earnings}</p>}
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-(--danger)/10">
              <Fuel size={18} className="text-(--danger)" />
            </div>
            <span className="text-base font-medium text-(--text-primary)">Despesas</span>
          </div>

          <div className="rounded-(--radius-card) border border-(--border) bg-(--surface) divide-y divide-(--border)">
            <div className="flex items-center justify-between px-4 py-4 cursor-text" onClick={() => document.getElementById("fuel")?.focus()}>
              <span className="text-sm text-(--text-secondary)">Combustível</span>
              <input
                id="fuel"
                type="text"
                inputMode="numeric"
                placeholder="R$ 0,00"
                value={fuelInput.displayValue}
                onChange={(e) => fuelInput.handleChange(e.target.value)}
                className="w-32 bg-transparent text-right text-base font-semibold text-(--text-primary) outline-none placeholder:text-(--text-secondary)"
              />
            </div>

            <div className="flex items-center justify-between px-4 py-4 cursor-text" onClick={() => document.getElementById("food")?.focus()}>
              <span className="text-sm text-(--text-secondary)">Alimentação</span>
              <input
                id="food"
                type="text"
                inputMode="numeric"
                placeholder="R$ 0,00"
                value={foodInput.displayValue}
                onChange={(e) => foodInput.handleChange(e.target.value)}
                className="w-32 bg-transparent text-right text-base font-semibold text-(--text-primary) outline-none placeholder:text-(--text-secondary)"
              />
            </div>

            <div className="flex items-center justify-between px-4 py-4 cursor-text" onClick={() => document.getElementById("other-expenses")?.focus()}>
              <span className="text-sm text-(--text-secondary)">Outras despesas</span>
              <input
                id="other-expenses"
                type="text"
                inputMode="numeric"
                placeholder="R$ 0,00"
                value={otherExpensesInput.displayValue}
                onChange={(e) => otherExpensesInput.handleChange(e.target.value)}
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
