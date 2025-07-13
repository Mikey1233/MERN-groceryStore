"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem("user");

    if (!session) {
      toast.error("Please sign in to access this page");
      router.push("/");
    } else if (user?.role !== "admin") {
      toast.error("Admin access required");
      router.push("/");
    } else {
      setIsAllowed(true);
    }
  }, [user, router]);

  if (!isAllowed) {
    return null; // Don’t render anything while checking
  }

  return <>{children}</>;
}
