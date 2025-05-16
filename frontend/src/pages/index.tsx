import GitHubSection from "@/components/GitHubSection";
import LinkBlock from "@/components/LinkBlock";
import Navbar from "@/components/Navbar";

export default function Home() {
    return (
        <>
            <Navbar />
            <main className="container mx-auto px-4">
                <GitHubSection />
                <LinkBlock />
            </main>
        </>
    );
}
