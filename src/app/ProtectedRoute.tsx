import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/shared/hooks/useAuthStore";

type Props = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: Props) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
