import { useState } from "react";
import { DayPicker, useDayPicker } from "react-day-picker";
import { ptBR } from "react-day-picker/locale";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

function parseInputDate(value: string): Date | undefined {
  if (!value) return undefined;
  const [yyyy, mm, dd] = value.split("-").map(Number);
  return new Date(yyyy, mm - 1, dd);
}

function toInputValue(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function formatDisplay(value: string): string {
  if (!value) return "Selecione a data";
  const [yyyy, mm, dd] = value.split("-");
  return `${dd}/${mm}/${yyyy}`;
}

function CustomCaption({ displayMonth }: { displayMonth: Date }) {
  const { goToMonth, nextMonth, previousMonth } = useDayPicker();

  const label = displayMonth.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  const capitalized = label.charAt(0).toUpperCase() + label.slice(1);

  return (
    <div className="flex items-center justify-between px-1 mb-3">
      <button
        type="button"
        onClick={() => previousMonth && goToMonth(previousMonth)}
        className="flex items-center justify-center h-7 w-7 rounded-md text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--border) transition-colors"
      >
        <ChevronLeft size={16} />
      </button>

      <span className="text-sm font-medium text-(--text-primary)">{capitalized}</span>

      <button
        type="button"
        onClick={() => nextMonth && goToMonth(nextMonth)}
        className="flex items-center justify-center h-7 w-7 rounded-md text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--border) transition-colors"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

export function DatePicker({ value, onChange, error }: Props) {
  const [open, setOpen] = useState(false);
  const selected = parseInputDate(value);

  function handleSelect(date: Date | undefined) {
    if (date) {
      onChange(toInputValue(date));
      setOpen(false);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`h-12 w-full rounded-md border px-4 bg-(--surface) text-sm text-left flex items-center justify-between transition-colors
          ${error ? "border-(--danger)" : open ? "border-(--primary)" : "border-(--border)"}`}
      >
        <span className={value ? "text-(--text-primary)" : "text-(--text-secondary)"}>{formatDisplay(value)}</span>
        <ChevronDown size={16} className={`text-(--text-secondary) transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="rounded-(--radius-card) border border-(--border) bg-(--surface) p-3">
          <style>{`
            .rdp-root {
              --rdp-accent-color: #00a5da;
              --rdp-accent-background-color: #00a5da20;
              width: 100%;
            }
            .rdp-month { width: 100%; }
            .rdp-month_caption { display: none; }
            .rdp-nav { display: none; }
            .rdp-month_grid {
              width: 100%;
              border-collapse: collapse;
            }
            .rdp-weekdays {
              display: flex;
              margin-bottom: 4px;
            }
            .rdp-weekday {
              flex: 1;
              text-align: center;
              font-size: 11px;
              color: #9ba1a6;
              padding-bottom: 6px;
              font-weight: 400;
            }
            .rdp-week { display: flex; }
            .rdp-day {
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 2px 0;
            }
            .rdp-day_button {
              width: 34px;
              height: 34px;
              border-radius: 8px;
              font-size: 13px;
              color: #ffffff;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              border: none;
              background: transparent;
              transition: background-color 0.15s;
            }
            .rdp-day_button:hover { background-color: #1f2933; }
            .rdp-selected .rdp-day_button {
              background-color: #00a5da;
              color: #ffffff;
              font-weight: 600;
            }
            .rdp-today .rdp-day_button {
              color: #00a5da;
              font-weight: 600;
            }
            .rdp-today.rdp-selected .rdp-day_button { color: #ffffff; }
            .rdp-outside .rdp-day_button {
              color: #9ba1a6;
              opacity: 0.4;
            }
          `}</style>

          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            locale={ptBR}
            components={{
              MonthCaption: ({ calendarMonth }) => <CustomCaption displayMonth={calendarMonth.date} />,
            }}
          />
        </div>
      )}

      {error && <p className="text-xs text-(--danger)">{error}</p>}
    </div>
  );
}
