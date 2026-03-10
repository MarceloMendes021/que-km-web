import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { HistoryPage } from "@/pages/HistoryPage";
import { HomePage } from "@/pages/HomePage";
import { KmCalculatorPage } from "@/pages/KmCalculatorPage";
import { LoginPage } from "@/pages/LoginPage";
import { WorkdayFinishPage } from "@/pages/WorkdayFinishPage";
import { WorkdayStartPage } from "@/pages/WorkdayStartPage";

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
    path: "/workday/start",
    element: <WorkdayStartPage />,
  },
  {
    path: "/workday/finish",
    element: <WorkdayFinishPage />,
  },
  {
    path: "/history",
    element: <HistoryPage />,
  },
  {
    path: "/km-calculator",
    element: <KmCalculatorPage />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
