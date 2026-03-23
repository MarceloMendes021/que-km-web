export function getCurrentMonth(): string {
  const month = new Date().toLocaleDateString("pt-BR", { month: "long" });
  return month.charAt(0).toUpperCase() + month.slice(1);
}
