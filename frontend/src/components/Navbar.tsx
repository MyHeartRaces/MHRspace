import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
    const { token, logout } = useAuth();

    return (
        <nav className="bg-gray-100 shadow-sm py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                    MyHeartRaces
                </Link>

                <div className="flex gap-4">
                    <Link href="/" className="hover:text-blue-600 transition">
                        Home
                    </Link>

                    {token ? (
                        <>
                            <Link href="/notes" className="hover:text-blue-600 transition">
                                Notes
                            </Link>
                            <Link href="/twofactor" className="hover:text-blue-600 transition">
                                Setup 2FA
                            </Link>
                            <button
                                onClick={logout}
                                className="hover:text-blue-600 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="hover:text-blue-600 transition">
                                Login
                            </Link>
                            <Link href="/register" className="hover:text-blue-600 transition">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}