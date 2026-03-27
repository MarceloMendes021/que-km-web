import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute } from "@/app/ProtectedRoute";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { InsightsPage } from "@/pages/InsightsPage";
import { HistoryPage } from "@/pages/HistoryPage";
import { KmCalculatorPage } from "@/pages/KmCalculatorPage";
import { WorkdayFinishPage } from "@/pages/WorkdayFinishPage";
import { WorkdayStartPage } from "@/pages/WorkdayStartPage";
import { WorkdayResultPage } from "@/pages/WorkdayResultPage";
import { ExpensesPage } from "@/pages/ExpensesPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { MyJourneyPage } from "@/pages/MyJourneyPage";
import { OnboardingPage } from "@/pages/OnboardingPage";
import { ForgotPasswordPage } from "@/pages/ForgotPasswordPage";
import { HelpPage } from "@/pages/HelpPage";

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/onboarding", element: <OnboardingPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/help", element: <HelpPage /> },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/insights",
    element: (
      <ProtectedRoute>
        <InsightsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/history",
    element: (
      <ProtectedRoute>
        <HistoryPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/workday/start",
    element: (
      <ProtectedRoute>
        <WorkdayStartPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/workday/finish",
    element: (
      <ProtectedRoute>
        <WorkdayFinishPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/workday/result",
    element: (
      <ProtectedRoute>
        <WorkdayResultPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/km-calculator",
    element: (
      <ProtectedRoute>
        <KmCalculatorPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/expenses",
    element: (
      <ProtectedRoute>
        <ExpensesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/my-journey",
    element: (
      <ProtectedRoute>
        <MyJourneyPage />
      </ProtectedRoute>
    ),
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
