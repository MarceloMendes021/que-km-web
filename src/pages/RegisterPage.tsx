import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

export function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function handleChange(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function validate() {
    const newErrors = { name: "", email: "", password: "", confirmPassword: "" };
    let valid = true;

    if (!form.name.trim()) {
      newErrors.name = "Informe seu nome";
      valid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = "Informe seu e-mail";
      valid = false;
    }

    if (form.password.length < 6) {
      newErrors.password = "A senha precisa ter no mínimo 6 caracteres";
      valid = false;
    }

    if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "As senhas não coincidem";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  function handleRegister() {
    if (!validate()) return;
    navigate("/onboarding");
  }

  return (
    <main className="min-h-dvh bg-(--background) px-6 pb-8 text-(--text-primary)">
      <div className="mx-auto w-full max-w-md">
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="pt-14">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="flex items-center gap-1 text-sm text-(--text-secondary) hover:text-(--text-primary) transition-colors"
          >
            <ChevronLeft size={18} />
            Voltar
          </button>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="visible" className="mt-8 flex flex-col gap-1">
          <motion.h1 variants={item} className="text-2xl font-bold text-(--text-primary)">
            Criar conta
          </motion.h1>

          <motion.p variants={item} className="text-sm text-(--text-secondary)">
            Preencha os dados para começar
          </motion.p>

          <div className="mt-8 flex flex-col gap-3">
            <motion.div variants={item} className="flex flex-col gap-1">
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-secondary) pointer-events-none" />
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={`h-14 w-full rounded-xl border bg-(--surface) pl-11 pr-4 text-sm text-(--text-primary) outline-none placeholder:text-(--text-secondary) transition-colors ${
                    errors.name ? "border-(--danger)" : "border-(--border) focus:border-(--primary)"
                  }`}
                />
              </div>
              <AnimatePresence>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="pl-1 text-xs text-(--danger)"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div variants={item} className="flex flex-col gap-1">
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-secondary) pointer-events-none" />
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={`h-14 w-full rounded-xl border bg-(--surface) pl-11 pr-4 text-sm text-(--text-primary) outline-none placeholder:text-(--text-secondary) transition-colors ${
                    errors.email ? "border-(--danger)" : "border-(--border) focus:border-(--primary)"
                  }`}
                />
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="pl-1 text-xs text-(--danger)"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div variants={item} className="flex flex-col gap-1">
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-secondary) pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Crie uma senha"
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className={`h-14 w-full rounded-xl border bg-(--surface) pl-11 pr-12 text-sm text-(--text-primary) outline-none placeholder:text-(--text-secondary) transition-colors ${
                    errors.password ? "border-(--danger)" : "border-(--border) focus:border-(--primary)"
                  }`}
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
              <AnimatePresence>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="pl-1 text-xs text-(--danger)"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div variants={item} className="flex flex-col gap-1">
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-secondary) pointer-events-none" />
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirme a senha"
                  value={form.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  className={`h-14 w-full rounded-xl border bg-(--surface) pl-11 pr-12 text-sm text-(--text-primary) outline-none placeholder:text-(--text-secondary) transition-colors ${
                    errors.confirmPassword ? "border-(--danger)" : "border-(--border) focus:border-(--primary)"
                  }`}
                />
                <button
                  type="button"
                  aria-label={showConfirm ? "Esconder senha" : "Mostrar senha"}
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-(--text-secondary) hover:text-(--text-primary) transition-colors"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <AnimatePresence>
                {errors.confirmPassword && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="pl-1 text-xs text-(--danger)"
                  >
                    {errors.confirmPassword}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div variants={item} className="mt-2">
              <Button type="button" onClick={handleRegister} className="h-14 w-full rounded-xl bg-(--primary) text-sm font-semibold text-white hover:bg-(--primary)/90">
                Criar conta
              </Button>
            </motion.div>

            <motion.div variants={item} className="text-center">
              <button type="button" onClick={() => navigate("/login")} className="text-sm text-(--text-secondary)">
                Já tem conta? <span className="font-semibold text-(--primary)">Entrar</span>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
