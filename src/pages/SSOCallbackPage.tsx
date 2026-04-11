import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

export function SSOCallbackPage() {
  return <AuthenticateWithRedirectCallback />;
}
