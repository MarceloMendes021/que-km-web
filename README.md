# Que KM é Esse?

App mobile-first para motoristas de aplicativo controlarem faturamento diário, despesas, quilometragem e ganhos por KM. Funciona como PWA instalável, 100% no celular.

---

## Stack

**Frontend**

- React + TypeScript + Vite
- Tailwind CSS v4
- Zustand (estado global com persistência)
- TanStack Query (cache e sincronização de dados)
- React Router v6
- Recharts (gráficos)
- Framer Motion (animações)

**Backend**

- Node.js + Express + TypeScript
- Prisma ORM
- Neon (PostgreSQL serverless)
- Clerk (autenticação com social login)

**Deploy**

- Frontend: Vercel
- Backend: Render

---

## Funcionalidades

- Iniciar e encerrar jornada com registro de odômetro
- Lançar ganhos por app (Uber, 99, particular)
- Registrar despesas por categoria com forma de pagamento
- Calculadora de valor por KM com avaliação da corrida
- Histórico de jornadas por mês
- Insights financeiros mensais
- Perfil e configuração de metas

---

## Rotas

| Rota               | Acesso  | Descrição                  |
| ------------------ | ------- | -------------------------- |
| `/login`           | público | Login com e-mail ou social |
| `/register`        | público | Cadastro                   |
| `/onboarding`      | público | Configuração inicial       |
| `/forgot-password` | público | Recuperação de senha       |
| `/`                | privado | Home                       |
| `/workday/start`   | privado | Iniciar jornada            |
| `/workday/finish`  | privado | Encerrar jornada           |
| `/workday/result`  | privado | Resultado do dia           |
| `/expenses`        | privado | Despesas                   |
| `/history`         | privado | Histórico                  |
| `/insights`        | privado | Insights                   |
| `/km-calculator`   | privado | Calculadora de KM          |
| `/profile`         | privado | Perfil                     |
| `/my-journey`      | privado | Minha jornada              |
| `/help`            | privado | Ajuda                      |

---

## Estrutura de pastas

```
src/
├── app/                  # AppRouter, ProtectedRoute
├── pages/                # Páginas da aplicação
├── features/             # Lógica por domínio
│   ├── workday/
│   ├── expenses/
│   ├── profile/
│   └── tools/
├── services/             # Camada de acesso a dados (mock → API)
├── shared/
│   ├── components/
│   ├── constants/
│   ├── hooks/
│   ├── layout/
│   └── utils/
```

---

## Rodando o projeto

```bash
# instalar dependências
npm install

# rodar em desenvolvimento
npm run dev

# build de produção
npm run build
```

---

## Fases do projeto

- **Fase 1** — Frontend com mocks ✅
- **Fase 2** — Backend com Neon + Clerk
- **Fase 3** — Integração frontend + backend
- **Fase 4** — Deploy (Vercel + Render)

---

## Decisões técnicas

**Zustand com persist** para estado de jornada ativa — o motorista pode fechar o app e retomar a jornada sem perder dados.

**TanStack Query** para cache de despesas e histórico — invalida automaticamente após mutações, sem precisar de estado local para loading.

**Clerk** para autenticação — cobre social login (Google, Apple) sem precisar implementar JWT, refresh token ou hash de senha manualmente.

**Neon** como banco — PostgreSQL serverless com suporte a `DATABASE_URL` e `DIRECT_URL` para uso com Prisma em ambiente serverless.
