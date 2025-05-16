import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export default function EnhancedNavbar() {
    const { token, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-indigo-800">
                        MHRspace
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-indigo-600 transition font-medium">
                            Home
                        </Link>

                        {token ? (
                            <>
                                <Link href="/notes" className="text-gray-700 hover:text-indigo-600 transition font-medium">
                                    Notes
                                </Link>
                                <Link href="/twofactor" className="text-gray-700 hover:text-indigo-600 transition font-medium">
                                    Setup 2FA
                                </Link>
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="text-gray-700 hover:text-indigo-600 transition font-medium">
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition shadow-sm"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-gray-600 hover:text-gray-900 focus:outline-none"
                        >
                            {mobileMenuOpen ? (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
                        <div className="flex flex-col space-y-4">
                            <Link
                                href="/"
                                className="text-gray-700 hover:text-indigo-600 transition font-medium"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Home
                            </Link>

                            {token ? (
                                <>
                                    <Link
                                        href="/notes"
                                        className="text-gray-700 hover:text-indigo-600 transition font-medium"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Notes
                                    </Link>
                                    <Link
                                        href="/twofactor"
                                        className="text-gray-700 hover:text-indigo-600 transition font-medium"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Setup 2FA
                                    </Link>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="px-4 py-2 text-indigo-600 font-medium hover:text-indigo-800 transition text-left"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="text-gray-700 hover:text-indigo-600 transition font-medium"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="text-gray-700 hover:text-indigo-600 transition font-medium"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}