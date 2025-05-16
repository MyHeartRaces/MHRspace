import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect, ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
    redirectTo?: string;
}

export default function ProtectedRoute({
    children,
    redirectTo = "/login"
}: ProtectedRouteProps) {
    const { token, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !token) {
            router.push({
                pathname: redirectTo,
                query: { returnUrl: router.asPath }
            });
        }
    }, [token, loading, router, redirectTo]);

    // Show loading indicator while checking authentication
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // Don't render children until we're sure the user is authenticated
    if (!token) {
        return null;
    }

    return <>{children}</>;
}