import { AppHeader } from "@/shared/layout/AppHeader";
import { BottomTabBar } from "@/shared/layout/BottomTabBar";
import { PageHeader } from "@/shared/layout/PageHeader";
import { HelpCircle } from "lucide-react";

const FAQS = [
  {
    question: "Como iniciar uma jornada?",
    answer: "Na tela inicial, toque em 'Iniciar Jornada' e informe o KM atual do odômetro.",
  },
  {
    question: "Como registrar uma despesa?",
    answer: "Acesse a aba 'Despesas' e toque no botão + para lançar uma nova despesa.",
  },
  {
    question: "Como funciona a calculadora de KM?",
    answer: "Informe o valor da corrida e a distância. O app calcula o valor por KM e avalia se vale a pena.",
  },
  {
    question: "Como encerrar a jornada?",
    answer: "Na tela inicial, toque em 'Encerrar Jornada', informe o KM final e os ganhos do dia.",
  },
];

export function HelpPage() {
  return (
    <main className="min-h-dvh bg-(--background) pt-24 pb-36 text-(--text-primary)">
      <AppHeader />

      <PageHeader title="Ajuda" subtitle="Dúvidas frequentes" icon={<HelpCircle size={28} />} showBackButton={false} />

      <section className="mt-4 px-4 space-y-3">
        {FAQS.map((faq) => (
          <div key={faq.question} className="rounded-(--radius-card) border border-(--border) bg-(--surface) px-4 py-4 flex flex-col gap-2">
            <p className="text-sm font-semibold text-(--text-primary)">{faq.question}</p>
            <p className="text-sm text-(--text-secondary)">{faq.answer}</p>
          </div>
        ))}
      </section>

      <BottomTabBar />
    </main>
  );
}
