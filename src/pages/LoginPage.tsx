import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigate = useNavigate();
  function handleLogin() {
    navigate("/");
  }

  return (
    // Container principal da tela
    // Ocupa altura total e aplica fundo global do tema
    <main className="min-h-screen bg-(--background) px-4  text-(--text-primary)">
      {/* 
        Wrapper central:
        - Centraliza conteúdo horizontalmente
        - Limita largura para melhor leitura em mobile
        - Usa flex para distribuir topo / centro / rodapé
      */}
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-md flex-col justify-between">
        {/* Espaço superior para empurrar conteúdo ao centro */}
        <div />

        {/* Bloco principal da tela */}
        <section className="flex flex-col items-center gap-1">
          <div className="flex h-35 w-35 items-center justify-center  ">
            <img src="/Logo-Que-KM-é-esse.png" alt="Logo Que KM é esse" />
          </div>

          {/* Cabeçalho da tela */}
          <header className="space-y-1 text-center">
            {/* Título principal */}
            <h1 className="text-[14px] text-(--text-secondary) mb-15">Entre para continuar</h1>
          </header>

          {/* Área de botões de login */}
          <div className="flex w-full flex-col gap-3">
            {/*
              Botão Apple
              - Social login
              - Estilo: botão secundário (surface)
            */}
            <button
              type="button"
              onClick={handleLogin}
              className="flex h-14 items-center justify-center gap-3 rounded-xl border border-(--border) bg-(--surface) px-4 text-sm font-medium text-(--text-primary)"
            >
              <img className="h-5 w-5" src="/public/icons/apple-icon.svg" alt="Apple" />
              <p>Continuar com Apple</p>
            </button>

            {/*
              Botão Google
              - Social login
              - Mesmo padrão visual do botão Apple
            */}
            <button
              type="button"
              onClick={handleLogin}
              className="flex h-14 items-center justify-center gap-3 rounded-xl border border-(--border) bg-(--surface) px-4 text-sm font-medium text-(--text-primary)"
            >
              <img className="h-5 w-5" src="/public/icons/google-icon.svg" alt="Google" />
              <p>Continuar com Google</p>
            </button>

            {/* Divisor "ou" com linhas laterais */}
            <div className=" my-2 flex items-center py-2 text-xs text-(--text-secondary)">
              <div className="flex-1 border-t border-(--border)" />
              <span className="px-3">ou</span>
              <div className="flex-1 border-t border-(--border)" />
            </div>

            {/*
              Botão principal
              - Ação primária da tela
              - Usa cor primary do tema
            */}
            <button type="button" onClick={handleLogin} className="h-14 rounded-xl bg-(--primary) px-4 text-sm font-semibold text-white">
              Entrar com e-mail
            </button>
          </div>
        </section>

        {/* Rodapé com termos */}
        <footer className="pt-6 text-center">
          <p className="text-[12px] text-(--text-secondary)">Ao continuar, você concorda com os termos de uso e a política de privacidade.</p>
        </footer>
      </div>
    </main>
  );
}
