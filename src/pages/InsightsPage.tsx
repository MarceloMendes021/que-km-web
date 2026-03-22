import { useNavigate } from "react-router-dom";
import { AppHeader } from "@/shared/layout/AppHeader";
import { BottomTabBar } from "@/shared/layout/BottomTabBar";
import { PageHeader } from "@/shared/layout/PageHeader";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";
import { History, Target, TrendingUp, Zap, Award, BarChart2 } from "lucide-react";
import { formatCurrency } from "@/shared/utils/formatCurrency";
import { insightsMock } from "@/features/insights/mock/insightsMock";

const DONUT_COLORS = ["#00e676", "#ff453a"];
const BAR_COLORS = ["#CCCCCC", "#F5A623", "#a78bfa"];

export function InsightsPage() {
  const navigate = useNavigate();
  const data = insightsMock;

  const donutData = [
    { name: "Lucro", value: data.netProfit },
    { name: "Despesas", value: data.totalExpenses },
  ];

  const goalProgress = Math.min((data.netProfit / data.monthGoal) * 100, 100);
  const projectedProfit = data.averageProfitPerDay * (data.workedDays + data.daysRemainingInMonth);
  const utilizationRate = Math.round((data.workedDays / data.plannedDays) * 100);

  return (
    <main className="min-h-dvh bg-(--background) pt-24 pb-28 text-(--text-primary)">
      <AppHeader />

      <PageHeader title="Insights" subtitle="Veja como seu mês está evoluindo" icon={<BarChart2 size={28} />} showBackButton={false} />

      <section className="mt-4 px-4 space-y-6">
        <div className="rounded-(--radius-card) border border-(--border) bg-(--surface) px-6 py-5">
          <p className="text-sm font-medium text-(--text-primary)">Lucro vs Despesas</p>
          <p className="text-xs text-(--text-secondary) mt-1">
            Despesas representam <span className="text-(--danger) font-semibold">{Math.round((data.totalExpenses / data.totalEarnings) * 100)}%</span> do seu faturamento
          </p>

          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={donutData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                {donutData.map((_, index) => (
                  <Cell key={index} fill={DONUT_COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="flex justify-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-(--secondary)" />
              <span className="text-xs text-(--text-secondary)">Lucro {formatCurrency(data.netProfit)}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-(--danger)" />
              <span className="text-xs text-(--text-secondary)">Despesas {formatCurrency(data.totalExpenses)}</span>
            </div>
          </div>
        </div>

        <div className="rounded-(--radius-card) border border-(--border) bg-(--surface) px-6 py-5">
          <p className="text-sm font-medium text-(--text-primary)">Faturamento por app</p>

          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={data.earningsByApp} margin={{ top: 16, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="app" tick={{ fill: "#9ba1a6", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#9ba1a6", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {data.earningsByApp.map((_, index) => (
                  <Cell key={index} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-(--radius-card) border border-(--border) bg-(--surface) px-6 py-5">
          <div className="flex items-center gap-2 mb-3">
            <Target size={18} className="text-(--primary)" />
            <p className="text-sm font-medium text-(--text-primary)">Meta do mês</p>
          </div>

          <div className="flex items-end justify-between mb-2">
            <span className="text-2xl font-bold text-(--secondary)">{formatCurrency(data.netProfit)}</span>
            <span className="text-sm text-(--text-secondary)">de {formatCurrency(data.monthGoal)}</span>
          </div>

          <div className="h-3 w-full rounded-full bg-(--border)">
            <div className="h-3 rounded-full bg-(--secondary) transition-all" style={{ width: `${goalProgress}%` }} />
          </div>
          <p className="mt-2 text-xs text-(--text-secondary)">{Math.round(goalProgress)}% da meta atingida</p>
        </div>

        <div className="rounded-(--radius-card) border border-(--border) bg-(--surface) px-6 py-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={18} className="text-(--primary)" />
            <p className="text-sm font-medium text-(--text-primary)">Projeção do mês</p>
          </div>

          {data.workedDays < 5 ? (
            <p className="text-sm text-(--text-secondary)">Ainda são poucos dias para uma projeção precisa. Volte em alguns dias para um resultado mais confiável.</p>
          ) : (
            <>
              <p className="text-2xl font-bold text-(--text-primary)">{formatCurrency(projectedProfit)}</p>
              <p className="mt-1 text-xs text-(--text-secondary)">
                Você trabalhou {data.workedDays} dias com média de {formatCurrency(data.averageProfitPerDay)}/dia. Se mantiver o ritmo, deve fechar o mês em torno de{" "}
                <span className="text-(--text-primary) font-semibold">{formatCurrency(projectedProfit)}</span>.
              </p>
            </>
          )}
        </div>

        <div className="rounded-(--radius-card) border border-(--border) bg-(--surface) px-6 py-5">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={18} className="text-(--primary)" />
            <p className="text-sm font-medium text-(--text-primary)">Taxa de aproveitamento</p>
          </div>

          <p className="text-2xl font-bold text-(--text-primary)">{utilizationRate}%</p>
          <p className="mt-1 text-xs text-(--text-secondary)">
            Você trabalhou {data.workedDays} dos {data.plannedDays} dias planejados este mês.
          </p>
        </div>

        <div className="rounded-(--radius-card) border border-(--border) bg-(--surface) px-6 py-5">
          <div className="flex items-center gap-2 mb-2">
            <Award size={18} className="text-(--primary)" />
            <p className="text-sm font-medium text-(--text-primary)">Valor mínimo por km</p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-(--text-secondary)">Sua média atual</p>
              <p className="text-xl font-bold text-(--danger)">R$ {data.averageEarningsPerKm.toFixed(2)}/km</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-(--text-secondary)">Sugerido</p>
              <p className="text-xl font-bold text-(--secondary)">R$ {data.suggestedMinPerKm.toFixed(2)}/km</p>
            </div>
          </div>

          <p className="mt-3 text-xs text-(--text-secondary)">
            Para cobrir suas despesas com mais folga, tente aceitar corridas acima de{" "}
            <span className="text-(--secondary) font-semibold">R$ {data.suggestedMinPerKm.toFixed(2)}/km</span>.
          </p>
        </div>

        <button onClick={() => navigate("/history")} className="w-full flex items-center justify-between rounded-(--radius-card) border border-(--border) bg-(--surface) px-6 py-4">
          <div className="flex items-center gap-3">
            <History size={20} className="text-(--primary)" />
            <span className="text-sm font-medium text-(--text-primary)">Ver histórico completo</span>
          </div>
          <span className="text-(--text-secondary)">→</span>
        </button>
      </section>
      <BottomTabBar />
    </main>
  );
}
