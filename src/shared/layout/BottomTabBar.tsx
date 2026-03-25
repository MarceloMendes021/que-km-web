import { Calculator, House, Wallet, BarChart2 } from "lucide-react";
import { NavLink } from "react-router-dom";

const tabs = [
  {
    to: "/",
    label: "Home",
    icon: House,
  },
  {
    to: "/insights",
    label: "Insights",
    icon: BarChart2,
  },
  {
    to: "/km-calculator",
    label: "Calculadora",
    icon: Calculator,
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
      <div className="mx-auto grid max-w-md grid-cols-4 px-2 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              aria-label={tab.label}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 min-h-12 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary) focus-visible:ring-offset-2 focus-visible:ring-offset-(--surface) ${
                  isActive ? "text-(--primary)" : "text-(--text-secondary) hover:text-(--text-primary)"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`p-1.5 rounded-lg transition-all duration-200 ${isActive ? "bg-(--primary)/10" : ""}`}>
                    <Icon size={24} className="transition-transform duration-200" />
                  </div>
                  <span className="text-[11px] font-medium leading-tight">{tab.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
