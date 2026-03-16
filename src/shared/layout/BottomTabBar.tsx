import { Calculator, History, House, Wallet } from "lucide-react";
import { NavLink } from "react-router-dom";

const tabs = [
  {
    to: "/",
    label: "Home",
    icon: House,
  },
  {
    to: "/km-calculator",
    label: "Calculadora",
    icon: Calculator,
  },
  {
    to: "/history",
    label: "Histórico",
    icon: History,
  },
  {
    to: "/expenses",
    label: "Despesas",
    icon: Wallet,
  },
];

export function BottomTabBar() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-(--border) bg-(--surface)">
      <div className="mx-auto grid max-w-md grid-cols-4 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <NavLink key={tab.to} to={tab.to}>
              {({ isActive }) => (
                <div className="flex flex-col items-center justify-center gap-1">
                  <Icon size={20} className={isActive ? "text-(--primary)" : "text-(--text-secondary)"} />

                  <span className={`text-xs ${isActive ? "text-(--primary)" : "text-(--text-secondary)"}`}>{tab.label}</span>
                </div>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
