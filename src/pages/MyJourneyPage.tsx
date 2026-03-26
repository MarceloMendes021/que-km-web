import { useState } from "react";
import { Car, Fuel, Gauge, Target, Calendar, TrendingUp } from "lucide-react";
import { AppHeader } from "@/shared/layout/AppHeader";
import { BottomTabBar } from "@/shared/layout/BottomTabBar";
import { PageHeader } from "@/shared/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { useCurrencyInput } from "@/shared/hooks/useCurrencyInput";
import { useQuery } from "@tanstack/react-query";
import { getJourneyConfig, type JourneyConfig, type FuelType } from "@/services/journeyConfigService";

const FUEL_OPTIONS: { value: FuelType; label: string }[] = [
  { value: "gasolina", label: "Gasolina" },
  { value: "etanol", label: "Etanol" },
  { value: "flex", label: "Flex" },
  { value: "gnv", label: "GNV" },
  { value: "diesel", label: "Diesel" },
];

export function MyJourneyPage() {
  const { data: config, isLoading } = useQuery({
    queryKey: ["journeyConfig"],
    queryFn: getJourneyConfig,
  });

  const [localConfig, setLocalConfig] = useState<Partial<JourneyConfig>>({});
  const [saved, setSaved] = useState(false);
  const monthGoalInput = useCurrencyInput();

  const merged = config ? { ...config, ...localConfig } : null;

  if (isLoading) return <p className="text-center pt-40 text-(--text-secondary)">Carregando...</p>;
  if (!merged) return null;

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <main className="min-h-dvh bg-(--background) pt-24 pb-28 text-(--text-primary)">
      <AppHeader />

      <PageHeader title="Minha Jornada" subtitle="Configure seu veículo e metas" icon={<Car size={28} />} showBackButton={false} />

      <section className="mt-4 px-4 space-y-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-(--primary)/10">
              <Car size={16} className="text-(--primary)" />
            </div>
            <span className="text-base font-medium text-(--text-primary)">Veículo</span>
          </div>

          <div className="rounded-(--radius-card) border border-(--border) bg-(--surface) divide-y divide-(--border)">
            <div className="flex items-center justify-between px-4 py-4 cursor-text" onClick={() => document.getElementById("car-model")?.focus()}>
              <div className="flex flex-col gap-1 flex-1">
                <span className="text-xs text-(--text-secondary)">Modelo do carro</span>
                <input
                  id="car-model"
                  type="text"
                  placeholder="Ex: Onix 1.0 2022"
                  value={merged.carModel}
                  onChange={(e) => setLocalConfig((prev) => ({ ...prev, carModel: e.target.value }))}
                  className="bg-transparent text-sm font-medium text-(--text-primary) outline-none placeholder:text-(--text-secondary)"
                />
              </div>
            </div>

            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex flex-col gap-1 flex-1">
                <span className="text-xs text-(--text-secondary)">Tipo de combustível</span>
                <select
                  value={merged.fuelType}
                  onChange={(e) => setLocalConfig((prev) => ({ ...prev, fuelType: e.target.value as FuelType }))}
                  className="bg-transparent text-sm font-medium text-(--text-primary) outline-none"
                >
                  {FUEL_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-(--surface) text-(--text-primary)">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <Fuel size={16} className="text-(--text-secondary)" />
            </div>

            <div className="flex items-center justify-between px-4 py-4 cursor-text" onClick={() => document.getElementById("avg-consumption")?.focus()}>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-(--text-secondary)">Consumo médio</span>
                <div className="flex items-baseline gap-1">
                  <input
                    id="avg-consumption"
                    type="number"
                    inputMode="decimal"
                    placeholder="10"
                    value={merged.avgConsumption || ""}
                    onChange={(e) => setLocalConfig((prev) => ({ ...prev, avgConsumption: parseFloat(e.target.value) || 0 }))}
                    onKeyDown={(e) => {
                      if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
                    }}
                    className="w-16 bg-transparent text-sm font-medium text-(--text-primary) outline-none placeholder:text-(--text-secondary)"
                  />
                  <span className="text-xs text-(--text-secondary)">km/l</span>
                </div>
              </div>
              <Gauge size={16} className="text-(--text-secondary)" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-(--secondary)/10">
              <Target size={16} className="text-(--secondary)" />
            </div>
            <span className="text-base font-medium text-(--text-primary)">Metas e planejamento</span>
          </div>

          <div className="rounded-(--radius-card) border border-(--border) bg-(--surface) divide-y divide-(--border)">
            <div className="flex items-center justify-between px-4 py-4 cursor-text" onClick={() => document.getElementById("month-goal")?.focus()}>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-(--text-secondary)">Meta mensal de lucro</span>
                <span className="text-xs text-(--text-secondary) opacity-60">Usado nos Insights para medir progresso</span>
              </div>
              <input
                id="month-goal"
                type="text"
                inputMode="numeric"
                placeholder="R$ 0,00"
                value={monthGoalInput.displayValue}
                onChange={(e) => monthGoalInput.handleChange(e.target.value)}
                className="w-32 bg-transparent text-right text-sm font-semibold text-(--secondary) outline-none placeholder:text-(--text-secondary)"
              />
            </div>

            <div className="flex items-center justify-between px-4 py-4 cursor-text" onClick={() => document.getElementById("planned-days")?.focus()}>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-(--text-secondary)">Dias planejados no mês</span>
                <span className="text-xs text-(--text-secondary) opacity-60">Usado para calcular taxa de aproveitamento</span>
              </div>
              <div className="flex items-baseline gap-1">
                <input
                  id="planned-days"
                  type="number"
                  inputMode="numeric"
                  placeholder="22"
                  value={merged.plannedDays || ""}
                  onChange={(e) => setLocalConfig((prev) => ({ ...prev, plannedDays: parseInt(e.target.value) || 0 }))}
                  onKeyDown={(e) => {
                    if (["e", "E", "+", "-", "."].includes(e.key)) e.preventDefault();
                  }}
                  className="w-12 bg-transparent text-right text-sm font-semibold text-(--text-primary) outline-none placeholder:text-(--text-secondary)"
                />
                <span className="text-xs text-(--text-secondary)">dias</span>
              </div>
            </div>

            <div className="flex items-center justify-between px-4 py-4 cursor-text" onClick={() => document.getElementById("min-per-km")?.focus()}>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-(--text-secondary)">Valor mínimo por km</span>
                <span className="text-xs text-(--text-secondary) opacity-60">Sugerido nos Insights como referência</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xs text-(--text-secondary)">R$</span>
                <input
                  id="min-per-km"
                  type="number"
                  inputMode="decimal"
                  placeholder="1,50"
                  value={merged.minValuePerKm || ""}
                  onChange={(e) => setLocalConfig((prev) => ({ ...prev, minValuePerKm: parseFloat(e.target.value) || 0 }))}
                  onKeyDown={(e) => {
                    if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
                  }}
                  className="w-14 bg-transparent text-right text-sm font-semibold text-(--secondary) outline-none placeholder:text-(--text-secondary)"
                />
                <span className="text-xs text-(--text-secondary)">/km</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-(--radius-card) border border-(--border) bg-(--surface)/60 px-4 py-4 flex items-start gap-3">
          <TrendingUp size={16} className="text-(--primary) mt-0.5 shrink-0" />
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-(--text-primary)">Como esses dados são usados</span>
            <span className="text-xs text-(--text-secondary) leading-relaxed">
              A meta mensal, os dias planejados e o valor mínimo por km alimentam diretamente os cálculos da página de Insights — projeção do mês, taxa de aproveitamento e valor
              sugerido por km.
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-(--danger)/10">
              <Calendar size={16} className="text-(--danger)" />
            </div>
            <span className="text-base font-medium text-(--text-primary)">Categorias de despesa</span>
          </div>

          <div className="rounded-(--radius-card) border border-(--border) bg-(--surface) divide-y divide-(--border)">
            {["Combustível", "Manutenção", "Multa", "Aluguel do carro", "Financiamento", "Seguro", "Outros"].map((category) => (
              <div key={category} className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-(--text-primary)">{category}</span>
                <span className="text-xs text-(--text-secondary) bg-(--border) px-2 py-0.5 rounded-full">padrão</span>
              </div>
            ))}
          </div>
        </div>

        <Button onClick={handleSave} className="w-full h-12 rounded-xl bg-(--primary) font-semibold text-white hover:bg-(--primary)/90">
          {saved ? "Salvo!" : "Salvar configurações"}
        </Button>
      </section>

      <BottomTabBar />
    </main>
  );
}
