"use client";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      toast.error("Please sign in to access this page");
      router.push("/");
    } else if (user.role !== "admin") {
      toast.error("Admin access required");
      router.push("/");
    }
  }, [user, router]);

  // Don't render anything while redirecting
  if (!user || user.role !== "admin") {
    return null;
  }

  return <>{children}</>;
}