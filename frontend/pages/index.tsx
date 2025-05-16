import GitHubSection from "@/components/GitHubSection";
import LinkBlock from "@/components/LinkBlock";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function Home() {
  const { token } = useAuth();
  return (
    <div className="max-w-4xl mx-auto px-4">
      {!token && (
        <section className="text-center mt-20">
          <h1 className="text-4xl font-bold mb-4">Welcome to MHRspace</h1>
          <p className="text-lg mb-6">A personal portfolio, secure notes, and developer showcase in one.</p>
          <div className="flex justify-center gap-4">
            <Link href="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-md">Sign In</Link>
            <Link href="/register" className="border px-4 py-2 rounded-md">Register</Link>
          </div>
        </section>
      )}

      {token && (
        <>
          <GitHubSection />
          <LinkBlock />
        </>
      )}
    </div>
  );
}
