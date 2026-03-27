import { useAuthStore } from "@/shared/hooks/useAuthStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LoginPage() {
  const navigate = useNavigate();

  const [showEmailForm, setShowEmailForm] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const login = useAuthStore((s) => s.login);

  function handleChange(field: "email" | "password", value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleEmailLogin() {
    login({ name: form.email.split("@")[0], avatarUrl: null });
    navigate("/");
  }

  function handleSocialLogin() {
    login({ name: "Usuário", avatarUrl: null });
    navigate("/");
  }

  function handleRegister() {
    navigate("/register");
  }

  return (
    <main className="h-dvh overflow-hidden bg-(--background) px-6 text-(--text-primary)">
      <div className="mx-auto flex h-full w-full max-w-md flex-col">
        <section className="flex flex-col items-center gap-1 pt-20">
          <div className="flex w-40 items-center justify-center">
            <img src="/Logo-Que-KM-é-esse.png" alt="Logo Que KM é esse" className="h-full w-full object-contain" />
          </div>

          <p className="mb-10 mt-4 text-sm text-(--text-secondary)">Seu dia de trabalho começa aqui</p>

          <div className="flex w-full flex-col gap-3">
            <Button
              type="button"
              onClick={handleSocialLogin}
              className="flex h-14 w-full items-center justify-center gap-3 rounded-xl border border-(--border) bg-(--surface) text-sm font-medium text-(--text-primary) hover:bg-(--surface)/80"
            >
              <img className="h-5 w-5" src="/icons/apple-icon.svg" alt="Apple" />
              <span>Continuar com Apple</span>
            </Button>

            <Button
              type="button"
              onClick={handleSocialLogin}
              className="flex h-14 w-full items-center justify-center gap-3 rounded-xl border border-(--border) bg-(--surface) text-sm font-medium text-(--text-primary) hover:bg-(--surface)/80"
            >
              <img className="h-5 w-5" src="/icons/google-icon.svg" alt="Google" />
              <span>Continuar com Google</span>
            </Button>

            <div className="my-2 flex items-center py-2 text-xs text-(--text-secondary)">
              <div className="flex-1 border-t border-(--border)" />
              <span className="px-3">ou</span>
              <div className="flex-1 border-t border-(--border)" />
            </div>

            <AnimatePresence>
              {showEmailForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex flex-col gap-3 overflow-hidden"
                >
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-secondary) pointer-events-none" />
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="h-14 w-full rounded-xl border border-(--border) bg-(--surface) pl-11 pr-4 text-sm text-(--text-primary) outline-none placeholder:text-(--text-secondary) focus:border-(--primary) transition-colors"
                    />
                  </div>

                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-secondary) pointer-events-none" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Sua senha"
                      value={form.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      className="h-14 w-full rounded-xl border border-(--border) bg-(--surface) pl-11 pr-12 text-sm text-(--text-primary) outline-none placeholder:text-(--text-secondary) focus:border-(--primary) transition-colors"
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-(--text-secondary) hover:text-(--text-primary) transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              type="button"
              onClick={showEmailForm ? handleEmailLogin : () => setShowEmailForm(true)}
              className="h-14 w-full rounded-xl bg-(--primary) text-sm font-semibold text-white hover:bg-(--primary)/90"
            >
              {showEmailForm ? "Entrar" : "Entrar com e-mail"}
            </Button>

            {showEmailForm && (
              <button type="button" onClick={() => setShowEmailForm(false)} className="text-center text-xs text-(--text-secondary) hover:text-(--text-primary) transition-colors">
                Cancelar
              </button>
            )}

            <button type="button" onClick={handleRegister} className="mt-1 text-center text-sm text-(--text-secondary)">
              Novo por aqui? <span className="font-semibold text-(--primary)">Criar conta</span>
            </button>
          </div>
        </section>

        <footer className="mt-auto pb-3 pt-2 text-center">
          <p className="text-[12px] text-(--text-secondary)">Ao continuar, você concorda com os termos de uso e a política de privacidade.</p>
        </footer>
      </div>
    </main>
  );
}
