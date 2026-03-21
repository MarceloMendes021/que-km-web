import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function LoginPage() {
  const navigate = useNavigate();

  function handleLogin() {
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
              onClick={handleLogin}
              className="flex h-14 w-full items-center justify-center gap-3 rounded-xl border border-(--border) bg-(--surface) text-sm font-medium text-(--text-primary) hover:bg-(--surface)/80"
            >
              <img className="h-5 w-5" src="/icons/apple-icon.svg" alt="Apple" />
              <span>Continuar com Apple</span>
            </Button>

            <Button
              type="button"
              onClick={handleLogin}
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

            <Button type="button" onClick={handleLogin} className="h-14 w-full rounded-xl bg-(--primary) text-sm font-semibold text-white hover:bg-(--primary)/90">
              Entrar com e-mail
            </Button>

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
