"use client";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      alert("admin users only")
      router.push("/"); // 👈 optionally trigger modal via query
    }
  }, [user]);

  if (!user) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
}
