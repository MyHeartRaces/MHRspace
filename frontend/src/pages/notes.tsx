import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Notes() {
    const { token } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Redirect to login if not authenticated
        if (!token) {
            router.push("/login");
        }
    }, [token, router]);

    if (!token) {
        return null; // Don't render anything while redirecting
    }

    // Use the environment variable for the Outline URL or a default
    const outlineUrl = process.env.NEXT_PUBLIC_OUTLINE_URL || "http://localhost:3001";

    return (
        <iframe
            src={outlineUrl}
            className="w-full h-screen border-none"
            title="Outline Notes"
        />
    );
}