import { useState } from "react";

export function useCurrencyInput(initialValue = "") {
  const [displayValue, setDisplayValue] = useState(initialValue ? formatDisplay(parseFloat(initialValue) * 100) : "");
  const [rawValue, setRawValue] = useState(initialValue);

  function formatDisplay(cents: number): string {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(cents / 100);
  }

  function handleChange(input: string) {
    const digits = input.replace(/\D/g, "");

    if (digits === "") {
      setDisplayValue("");
      setRawValue("");
      return;
    }

    const cents = parseInt(digits, 10);
    setDisplayValue(formatDisplay(cents));
    setRawValue(String(cents / 100));
  }

  return { displayValue, rawValue, handleChange };
}
