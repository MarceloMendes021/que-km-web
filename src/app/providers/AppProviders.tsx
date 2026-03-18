import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import * as queryClient from "@/shared/lib/query-client";

type Props = {
  children: ReactNode;
};

export function AppProviders({ children }: Props) {
  return <QueryClientProvider client={queryClient.queryClient}>{children}</QueryClientProvider>;
}
