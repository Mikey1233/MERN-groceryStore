// app/providers.tsx or components/Providers.tsx
"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "sonner";
import { AIChatSupport } from "../AIChatSupport";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster position="bottom-right" />
        {children}
          {/* AI Chat Support Component */}
      <AIChatSupport />
      </QueryClientProvider>
    </AuthProvider>
  );
}
