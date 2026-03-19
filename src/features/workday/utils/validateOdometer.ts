export function validateOdometer(value: string): string | null {
  if (!value || value.trim() === "") {
    return "Informe o KM atual do odômetro";
  }

  const number = parseFloat(value);

  if (!Number.isFinite(number) || number <= 0) {
    return "Informe um valor válido";
  }

  if (number > 999999) {
    return "Valor muito alto. Confira o odômetro";
  }

  return null;
}
