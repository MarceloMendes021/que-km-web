import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/insights",
    element: <InsightsPage />,
  },
  {
    path: "/history",
    element: <HistoryPage />,
  },
  {
    path: "/workday/start",
    element: <WorkdayStartPage />,
  },
  {
    path: "/workday/finish",
    element: <WorkdayFinishPage />,
  },
  {
    path: "/workday/result",
    element: <WorkdayResultPage />,
  },
  {
    path: "/km-calculator",
    element: <KmCalculatorPage />,
  },
  {
    path: "/expenses",
    element: <ExpensesPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/my-journey",
    element: <MyJourneyPage />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
