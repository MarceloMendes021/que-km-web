import { useSignIn } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const CLERK_ERRORS: Record<string, string> = {
  "Invalid verification code": "Código inválido.",
  "Password is incorrect": "Senha incorreta.",
  "identifier already exists": "E-mail já cadastrado.",
  "is invalid": "E-mail inválido.",
};

export function LoginPage() {
  const navigate = useNavigate();
  const { signIn, isLoaded, setActive } = useSignIn();

  const [showEmailForm, setShowEmailForm] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoaded || !signIn) return null;

  function handleChange(field: "email" | "password", value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  }

  async function handleEmailLogin() {
    try {
      setIsSubmitting(true);
      const result = await signIn!.create({
        identifier: form.email,
        password: form.password,
      });
      if (result.status === "complete") {
        await setActive!({ session: result.createdSessionId });
        navigate("/");
      }
    } catch (err: unknown) {
      const clerkError = err as { errors?: { message: string }[] };
      const raw = clerkError.errors?.[0]?.message ?? "";
      const translated = Object.entries(CLERK_ERRORS).find(([key]) => raw.includes(key))?.[1] ?? "Erro ao entrar. Tente novamente.";
      setError(translated);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleSocialLoginGoogle() {
    signIn!.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    });
  }

  function handleSocialLoginApple() {
    setError("Login com Apple em breve.");
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
              onClick={handleSocialLoginApple}
              className="flex h-14 w-full items-center justify-center gap-3 rounded-xl border border-(--border) bg-(--surface) text-sm font-medium text-(--text-primary) hover:bg-(--surface)/80"
            >
              <img className="h-5 w-5" src="/icons/apple-icon.svg" alt="Apple" />
              <span>Continuar com Apple</span>
            </Button>

            <Button
              type="button"
              onClick={handleSocialLoginGoogle}
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

            {error && <p className="pl-1 text-xs text-(--danger)">{error}</p>}

            <Button
              type="button"
              onClick={showEmailForm ? handleEmailLogin : () => setShowEmailForm(true)}
              disabled={isSubmitting}
              className="h-14 w-full rounded-xl bg-(--primary) text-sm font-semibold text-white hover:bg-(--primary)/90"
            >
              {showEmailForm && isSubmitting ? "Aguarde..." : showEmailForm ? "Entrar" : "Entrar com e-mail"}
            </Button>

            {showEmailForm && (
              <button type="button" onClick={() => setShowEmailForm(false)} className="text-center text-xs text-(--text-secondary) hover:text-(--text-primary) transition-colors">
                Cancelar
              </button>
            )}

            <Link to="/register" className="mt-1 text-center text-sm text-(--text-secondary)">
              Novo por aqui? <span className="font-semibold text-(--primary)">Criar conta</span>
            </Link>
          </div>
        </section>

        <footer className="mt-auto pb-3 pt-2 text-center">
          <p className="text-[12px] text-(--text-secondary)">Ao continuar, você concorda com os termos de uso e a política de privacidade.</p>
        </footer>
      </div>
    </main>
  );
}
