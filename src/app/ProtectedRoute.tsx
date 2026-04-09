import { Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

type Props = { children: React.ReactNode };

export function ProtectedRoute({ children }: Props) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
