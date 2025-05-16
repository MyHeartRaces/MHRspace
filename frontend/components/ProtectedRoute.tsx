import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import { ReactNode, useEffect } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace(`/login?returnUrl=${router.asPath}`);
    }
  }, [token, router]);

  if (!token) return null;
  return <>{children}</>;
}
