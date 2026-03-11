import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigate = useNavigate();

  function handleLogin() {
    navigate("/");
  }

  return (
    <main className="h-screen overflow-hidden bg-(--background) px-6 text-(--text-primary)">
      <div className="mx-auto flex h-full w-full max-w-md flex-col">
        <section className="flex flex-col items-center gap-1 pt-20">
          <div className="flex h-35 w-35 items-center justify-center">
            <img src="/Logo-Que-KM-é-esse.png" alt="Logo Que KM é esse" className="h-full w-full object-contain" />
          </div>

          <header className="space-y-1 text-center">
            <h1 className="mb-12 text-[14px] text-(--text-secondary)">Entre para continuar</h1>
          </header>

          <div className="flex w-full flex-col gap-3">
            <button
              type="button"
              onClick={handleLogin}
              className="flex h-14 items-center justify-center gap-3 rounded-xl border border-(--border) bg-(--surface) px-4 text-sm font-medium text-(--text-primary)"
            >
              <img className="h-5 w-5" src="/icons/apple-icon.svg" alt="Apple" />
              <span>Continuar com Apple</span>
            </button>

            <button
              type="button"
              onClick={handleLogin}
              className="flex h-14 items-center justify-center gap-3 rounded-xl border border-(--border) bg-(--surface) px-4 text-sm font-medium text-(--text-primary)"
            >
              <img className="h-5 w-5" src="/icons/google-icon.svg" alt="Google" />
              <span>Continuar com Google</span>
            </button>

            <div className="my-2 flex items-center py-2 text-xs text-(--text-secondary)">
              <div className="flex-1 border-t border-(--border)" />
              <span className="px-3">ou</span>
              <div className="flex-1 border-t border-(--border)" />
            </div>

            <button type="button" onClick={handleLogin} className="h-14 rounded-xl bg-(--primary) px-4 text-sm font-semibold text-white">
              Entrar com e-mail
            </button>
          </div>
        </section>

        <footer className="mt-auto py-4 text-center">
          <p className="text-[12px] text-(--text-secondary)">Ao continuar, você concorda com os termos de uso e a política de privacidade.</p>
        </footer>
      </div>
    </main>
  );
}
