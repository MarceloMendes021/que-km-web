import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Fuel, Target, TrendingUp, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrencyInput } from "@/shared/hooks/useCurrencyInput";
import { useAuthStore } from "@/shared/hooks/useAuthStore";
import type { FuelType } from "@/services/journeyConfigService";

const FUEL_OPTIONS: { value: FuelType; label: string }[] = [
  { value: "gasolina", label: "Gasolina" },
  { value: "etanol", label: "Etanol" },
  { value: "flex", label: "Flex" },
  { value: "gnv", label: "GNV" },
  { value: "diesel", label: "Diesel" },
];

const STEPS = [
  { title: "Seu veículo", subtitle: "Nos conte sobre seu carro", icon: Car },
  { title: "Combustível", subtitle: "Como seu carro abastece?", icon: Fuel },
  { title: "Suas metas", subtitle: "O que você quer alcançar?", icon: Target },
];

export function OnboardingPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    carModel: "",
    fuelType: "flex" as FuelType,
    avgConsumption: "",
    plannedDays: "",
    minValuePerKm: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const monthGoalInput = useCurrencyInput();

  function validateStep() {
    const newErrors: Record<string, string> = {};

    if (step === 0 && !form.carModel.trim()) {
      newErrors.carModel = "Informe o modelo do seu carro";
    }

    if (step === 1 && (!form.avgConsumption || parseFloat(form.avgConsumption) <= 0)) {
      newErrors.avgConsumption = "Informe o consumo médio";
    }

    if (step === 2) {
      if (!monthGoalInput.rawValue || parseFloat(monthGoalInput.rawValue) <= 0) {
        newErrors.monthGoal = "Informe sua meta mensal";
      }
      if (!form.plannedDays || parseInt(form.plannedDays) <= 0) {
        newErrors.plannedDays = "Informe os dias planejados";
      }
      if (!form.minValuePerKm || parseFloat(form.minValuePerKm) <= 0) {
        newErrors.minValuePerKm = "Informe o valor mínimo por km";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleNext() {
    if (!validateStep()) return;

    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
      return;
    }

    // último step — conclui onboarding
    login();
    navigate("/");
  }

  function handleBack() {
    setStep((s) => s - 1);
    setErrors({});
  }

  const StepIcon = STEPS[step].icon;

  return (
    <main className="min-h-dvh bg-(--background) px-6 pb-8 text-(--text-primary)">
      <div className="mx-auto w-full max-w-md">
        {/* header com progresso */}
        <div className="flex items-center justify-between pt-14 pb-8">
          <button
            type="button"
            onClick={step === 0 ? () => navigate("/register") : handleBack}
            className="flex items-center gap-1 text-sm text-(--text-secondary) hover:text-(--text-primary) transition-colors"
          >
            <ChevronLeft size={18} />
            Voltar
          </button>

          <div className="flex gap-2">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? "w-6 bg-(--primary)" : i < step ? "w-3 bg-(--primary)/40" : "w-3 bg-(--border)"}`}
              />
            ))}
          </div>

          <span className="text-xs text-(--text-secondary)">
            {step + 1}/{STEPS.length}
          </span>
        </div>

        {/* conteúdo do step */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-(--primary)/10 mb-2">
                <StepIcon size={24} className="text-(--primary)" />
              </div>
              <h1 className="text-2xl font-bold">{STEPS[step].title}</h1>
              <p className="text-sm text-(--text-secondary)">{STEPS[step].subtitle}</p>
            </div>

            {/* step 0 — veículo */}
            {step === 0 && (
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-(--text-secondary)">Modelo do carro</label>
                  <input
                    type="text"
                    placeholder="Ex: Onix 1.0 2022"
                    value={form.carModel}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, carModel: e.target.value }));
                      setErrors((prev) => ({ ...prev, carModel: "" }));
                    }}
                    className={`h-14 w-full rounded-xl border bg-(--surface) px-4 text-sm text-(--text-primary) outline-none placeholder:text-(--text-secondary) transition-colors ${
                      errors.carModel ? "border-(--danger)" : "border-(--border) focus:border-(--primary)"
                    }`}
                  />
                  {errors.carModel && <p className="text-xs text-(--danger)">{errors.carModel}</p>}
                </div>
              </div>
            )}

            {/* step 1 — combustível */}
            {step === 1 && (
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-(--text-secondary)">Tipo de combustível</label>
                  <select
                    value={form.fuelType}
                    onChange={(e) => setForm((prev) => ({ ...prev, fuelType: e.target.value as FuelType }))}
                    className="h-14 w-full rounded-xl border border-(--border) bg-(--surface) px-4 text-sm text-(--text-primary) outline-none"
                  >
                    {FUEL_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-(--text-secondary)">Consumo médio (km/l)</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder="Ex: 10"
                    value={form.avgConsumption}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, avgConsumption: e.target.value }));
                      setErrors((prev) => ({ ...prev, avgConsumption: "" }));
                    }}
                    onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
                    className={`h-14 w-full rounded-xl border bg-(--surface) px-4 text-sm text-(--text-primary) outline-none placeholder:text-(--text-secondary) transition-colors ${
                      errors.avgConsumption ? "border-(--danger)" : "border-(--border) focus:border-(--primary)"
                    }`}
                  />
                  {errors.avgConsumption && <p className="text-xs text-(--danger)">{errors.avgConsumption}</p>}
                </div>
              </div>
            )}

            {/* step 2 — metas */}
            {step === 2 && (
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-(--text-secondary)">Meta mensal de lucro</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="R$ 0,00"
                    value={monthGoalInput.displayValue}
                    onChange={(e) => {
                      monthGoalInput.handleChange(e.target.value);
                      setErrors((prev) => ({ ...prev, monthGoal: "" }));
                    }}
                    className={`h-14 w-full rounded-xl border bg-(--surface) px-4 text-sm text-(--text-primary) outline-none placeholder:text-(--text-secondary) transition-colors ${
                      errors.monthGoal ? "border-(--danger)" : "border-(--border) focus:border-(--primary)"
                    }`}
                  />
                  {errors.monthGoal && <p className="text-xs text-(--danger)">{errors.monthGoal}</p>}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-(--text-secondary)">Dias planejados no mês</label>
                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder="Ex: 22"
                    value={form.plannedDays}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, plannedDays: e.target.value }));
                      setErrors((prev) => ({ ...prev, plannedDays: "" }));
                    }}
                    onKeyDown={(e) => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()}
                    className={`h-14 w-full rounded-xl border bg-(--surface) px-4 text-sm text-(--text-primary) outline-none placeholder:text-(--text-secondary) transition-colors ${
                      errors.plannedDays ? "border-(--danger)" : "border-(--border) focus:border-(--primary)"
                    }`}
                  />
                  {errors.plannedDays && <p className="text-xs text-(--danger)">{errors.plannedDays}</p>}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-(--text-secondary)">Valor mínimo por km (R$/km)</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder="Ex: 1.50"
                    value={form.minValuePerKm}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, minValuePerKm: e.target.value }));
                      setErrors((prev) => ({ ...prev, minValuePerKm: "" }));
                    }}
                    onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
                    className={`h-14 w-full rounded-xl border bg-(--surface) px-4 text-sm text-(--text-primary) outline-none placeholder:text-(--text-secondary) transition-colors ${
                      errors.minValuePerKm ? "border-(--danger)" : "border-(--border) focus:border-(--primary)"
                    }`}
                  />
                  {errors.minValuePerKm && <p className="text-xs text-(--danger)">{errors.minValuePerKm}</p>}
                </div>

                <div className="rounded-xl border border-(--border) bg-(--surface)/60 px-4 py-3 flex items-start gap-3">
                  <TrendingUp size={16} className="text-(--primary) mt-0.5 shrink-0" />
                  <p className="text-xs text-(--text-secondary) leading-relaxed">
                    Esses dados alimentam os Insights — projeção do mês, taxa de aproveitamento e valor sugerido por km. Você pode alterar depois em "Minha Jornada".
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8">
          <Button
            type="button"
            onClick={handleNext}
            className="h-14 w-full rounded-xl bg-(--primary) text-sm font-semibold text-white hover:bg-(--primary)/90 flex items-center justify-center gap-2"
          >
            {step === STEPS.length - 1 ? (
              "Começar a usar"
            ) : (
              <>
                Próximo <ChevronRight size={18} />
              </>
            )}
          </Button>
        </div>
      </div>
    </main>
  );
}
