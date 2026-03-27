import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/shared/components/DatePicker";
import { useCurrencyInput } from "@/shared/hooks/useCurrencyInput";
import { CATEGORY_CONFIG, PAYMENT_METHOD_CONFIG, type ExpenseCategory, type PaymentMethod } from "@/services/expensesService";
import { addExpense } from "@/services/expensesService";

type Props = {
  open: boolean;
  onClose: () => void;
};

function todayAsInputValue() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function ExpenseSheet({ open, onClose }: Props) {
  const [category, setCategory] = useState<ExpenseCategory | "">("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(todayAsInputValue());
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | "">("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { displayValue, rawValue, handleChange } = useCurrencyInput();

  const queryClient = useQueryClient();

  async function handleSubmit() {
    const newErrors: Record<string, string> = {};

    if (!category) newErrors.category = "Selecione uma categoria";
    if (!rawValue || parseFloat(rawValue) <= 0) {
      newErrors.amount = "Informe um valor válido";
    }
    if (!date) newErrors.date = "Informe a data";
    if (!paymentMethod) newErrors.paymentMethod = "Selecione a forma de pagamento";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    await addExpense({
      category: category as ExpenseCategory,
      amount: parseFloat(rawValue),
      description,
      date,
      paymentMethod: paymentMethod as PaymentMethod,
    });

    await queryClient.invalidateQueries({ queryKey: ["expenses"] });

    handleClose();
  }

  function handleClose() {
    setCategory("");
    setDescription("");
    setDate(todayAsInputValue());
    setPaymentMethod("");
    setErrors({});
    handleChange("");
    onClose();
  }

  const selectClass = (field: string) =>
    `h-12 w-full rounded-md border px-4 bg-(--surface) text-sm text-(--text-primary) outline-none transition-colors
    ${errors[field] ? "border-(--danger)" : "border-(--border) focus:border-(--primary)"}`;

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="bg-(--background) border-(--border) rounded-t-2xl px-4 pb-8">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-base font-semibold text-(--text-primary)">Nova despesa</SheetTitle>
        </SheetHeader>

        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-(--text-secondary)">Categoria</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value as ExpenseCategory);
                setErrors((prev) => ({ ...prev, category: "" }));
              }}
              className={selectClass("category")}
            >
              <option value="">Selecione...</option>
              {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                <option key={key} value={key}>
                  {config.label}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-xs text-(--danger)">{errors.category}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-(--text-secondary)">Valor</label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="R$ 0,00"
              value={displayValue}
              onChange={(e) => {
                handleChange(e.target.value);
                setErrors((prev) => ({ ...prev, amount: "" }));
              }}
              className={`h-12 w-full rounded-md border px-4 bg-(--surface) text-sm text-(--text-primary) outline-none transition-colors
                ${errors.amount ? "border-(--danger)" : "border-(--border) focus:border-(--primary)"}`}
            />
            {errors.amount && <p className="text-xs text-(--danger)">{errors.amount}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-(--text-secondary)">Descrição (opcional)</label>
            <input
              type="text"
              placeholder="Ex: Posto Shell"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`h-12 w-full rounded-md border border-(--border) px-4 bg-(--surface) text-sm text-(--text-primary) outline-none focus:border-(--primary) transition-colors`}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-(--text-secondary)">Data</label>
            <DatePicker
              value={date}
              onChange={(val) => {
                setDate(val);
                setErrors((prev) => ({ ...prev, date: "" }));
              }}
              error={errors.date}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-(--text-secondary)">Forma de pagamento</label>
            <select
              value={paymentMethod}
              onChange={(e) => {
                setPaymentMethod(e.target.value as PaymentMethod);
                setErrors((prev) => ({ ...prev, paymentMethod: "" }));
              }}
              className={selectClass("paymentMethod")}
            >
              <option value="">Selecione...</option>
              {Object.entries(PAYMENT_METHOD_CONFIG).map(([key, config]) => (
                <option key={key} value={key}>
                  {config.label}
                </option>
              ))}
            </select>
            {errors.paymentMethod && <p className="text-xs text-(--danger)">{errors.paymentMethod}</p>}
          </div>

          <Button onClick={handleSubmit} className="w-full h-12 rounded-xl bg-(--primary) text-sm font-semibold text-white hover:bg-(--primary)/90">
            Salvar despesa
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
