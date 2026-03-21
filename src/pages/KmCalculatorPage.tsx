import { useState } from "react";
import { AppHeader } from "@/shared/layout/AppHeader";
import { BottomTabBar } from "@/shared/layout/BottomTabBar";
import { PageHeader } from "@/shared/layout/PageHeader";
import { Calculator } from "lucide-react";
import { CalculatorResult } from "@/features/tools/km-calculator/components/CalculatorResult";
import { calculateRideValue, type RideResult } from "@/features/tools/km-calculator/utils/calculateRideValue";

export function KmCalculatorPage() {
  const [price, setPrice] = useState("");
  const [distance, setDistance] = useState("");

  const priceNumber = parseFloat(price);
  const distanceNumber = parseFloat(distance);

  const isValidInput = Number.isFinite(priceNumber) && Number.isFinite(distanceNumber) && priceNumber > 0 && distanceNumber > 0;

  const result: RideResult | null = isValidInput ? calculateRideValue(priceNumber, distanceNumber) : null;

  return (
    <main className="min-h-dvh bg-(--background) pt-24 pb-28 text-(--text-primary)">
      <AppHeader />

      <PageHeader title="Calculadora" subtitle="Essa corrida vale a pena?" icon={<Calculator size={28} />} />

      <section className="mt-4 px-4 space-y-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-(--text-primary)">Valor da corrida (R$)</label>
            <input
              type="number"
              placeholder="Ex: 25,00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onKeyDown={(e) => {
                if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
              }}
              className="h-14 text-lg! rounded-md mt-2 border border-(--border) bg-(--surface) px-4"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-(--text-primary)">Distância (km)</label>
            <input
              type="number"
              placeholder="Ex: 5"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              onKeyDown={(e) => {
                if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
              }}
              className="h-14 text-lg! rounded-md mt-2 border border-(--border) bg-(--surface) px-4"
            />
          </div>
        </div>

        {result && <CalculatorResult result={result} />}
      </section>
      <BottomTabBar />
    </main>
  );
}
