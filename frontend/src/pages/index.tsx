import { useAuth } from "@/hooks/useAuth";
import GitHubSection from "@/components/GitHubSection";
import LinkBlock from "@/components/LinkBlock";
import Link from "next/link";
import Head from "next/head";
import EnhancedNavbar from "@/components/EnhancedNavbar";

export default function Home() {
    const { token } = useAuth();

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
            <Head>
                <title>MHRspace - Your Personal Digital Dashboard</title>
                <meta name="description" content="A secure, personal dashboard to manage your notes, track your GitHub projects, and keep everything you need in one place." />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            </Head>
            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-5xl">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 leading-tight">
                                Organize Your Digital Life with MHRspace
                            </h1>
                            <p className="mt-6 text-lg text-gray-600">
                                A secure, personal dashboard to manage your notes, track your GitHub projects,
                                and keep everything you need in one place.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                {token ? (
                                    <Link
                                        href="/notes"
                                        className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition shadow-md"
                                    >
                                        Go to Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition shadow-md"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="px-8 py-3 border border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition"
                                        >
                                            Create Account
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <div className="relative">
                                <div className="absolute -inset-1 bg-indigo-100 rounded-lg blur-md"></div>
                                <div className="relative bg-white p-6 rounded-lg shadow-lg border border-indigo-100">
                                    <div className="w-full h-64 bg-indigo-50 rounded-md flex items-center justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-32 h-32 text-indigo-300"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1}
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="mt-3 space-y-2">
                                        <div className="h-4 bg-indigo-50 rounded-md w-3/4"></div>
                                        <div className="h-4 bg-indigo-50 rounded-md w-1/2"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 bg-white">
                <div className="container mx-auto max-w-5xl">
                    <h2 className="text-3xl font-bold text-center text-indigo-900 mb-12">Features</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition border border-gray-100">
                            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-indigo-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-indigo-900 mb-2">Personal Notes</h3>
                            <p className="text-gray-600">
                                Keep your thoughts organized with a powerful note-taking system powered by Outline.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition border border-gray-100">
                            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-indigo-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-indigo-900 mb-2">GitHub Integration</h3>
                            <p className="text-gray-600">
                                Track and showcase your latest GitHub repositories directly on your dashboard.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition border border-gray-100">
                            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-indigo-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-indigo-900 mb-2">Enhanced Security</h3>
                            <p className="text-gray-600">
                                Protect your account with two-factor authentication for an extra layer of security.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* GitHub Section & Link Block (if user is logged in) */}
            {token && (
                <section className="py-12 px-4">
                    <div className="container mx-auto max-w-5xl">
                        <GitHubSection />
                        <LinkBlock />
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="py-8 px-4 bg-indigo-900 text-white">
                <div className="container mx-auto max-w-5xl">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <h2 className="text-xl font-bold">MHRspace</h2>
                            <p className="text-indigo-200 mt-1">Your personal digital dashboard</p>
                        </div>
                        <div className="flex gap-6">
                            <a href="#" className="text-indigo-200 hover:text-white transition">Privacy</a>
                            <a href="#" className="text-indigo-200 hover:text-white transition">Terms</a>
                            <a href="#" className="text-indigo-200 hover:text-white transition">Contact</a>
                        </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-indigo-800 text-center text-indigo-300">
                        <p>&copy; {new Date().getFullYear()} MHRspace. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}