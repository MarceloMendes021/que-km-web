import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit() {
    if (!email) return;
    setSent(true);
  }

  if (sent) {
    return (
      <main className="h-dvh bg-(--background) px-6 text-(--text-primary) flex flex-col items-center justify-center gap-4">
        <p className="text-lg font-semibold">E-mail enviado</p>
        <p className="text-sm text-(--text-secondary) text-center">Verifique sua caixa de entrada e siga as instruções.</p>
        <Link to="/login" className="text-sm text-(--primary) font-semibold">
          Voltar para o login
        </Link>
      </main>
    );
  }

  return (
    <main className="h-dvh bg-(--background) px-6 text-(--text-primary) flex flex-col justify-center gap-6">
      <div className="flex flex-col gap-1">
        <p className="text-lg font-semibold">Esqueceu a senha?</p>
        <p className="text-sm text-(--text-secondary)">Informe seu e-mail e enviaremos as instruções.</p>
      </div>

      <div className="relative">
        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-secondary) pointer-events-none" />
        <input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-14 w-full rounded-xl border border-(--border) bg-(--surface) pl-11 pr-4 text-sm text-(--text-primary) outline-none placeholder:text-(--text-secondary) focus:border-(--primary) transition-colors"
        />
      </div>

      <Button onClick={handleSubmit} className="h-14 w-full rounded-xl bg-(--primary) text-sm font-semibold text-white hover:bg-(--primary)/90">
        Enviar instruções
      </Button>

      <Link to="/login" className="text-center text-sm text-(--text-secondary)">
        Lembrou a senha? <span className="font-semibold text-(--primary)">Voltar para o login</span>
      </Link>
    </main>
  );
}
