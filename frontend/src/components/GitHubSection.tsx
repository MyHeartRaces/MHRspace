import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import RepoCard from "./RepoCard";
import { GitHubRepo } from "@/types/github";

const username =
    process.env.NEXT_PUBLIC_GITHUB_USERNAME ??
    process.env.GITHUB_USERNAME ??
    "MyHeartRaces";

const fetchRepos = async (): Promise<GitHubRepo[]> => {
    const { data } = await axios.get<GitHubRepo[]>(
        `https://api.github.com/users/${username}/repos?sort=pushed`,
    );
    return data;
};

export default function GitHubSection() {
    const { data: repos = [] } = useQuery<GitHubRepo[]>({
        queryKey: ["repos", username],
        queryFn: fetchRepos,
        refetchInterval: 1000 * 60 * 30, // 30 min
        staleTime: 1000 * 60 * 10,
    });

    return (
        <section className="my-8">
            <h2 className="text-3xl font-bold mb-4">Latest public work on GitHub</h2>

            <div className="grid gap-4 md:grid-cols-2">
                {repos.map((repo) => (
                    <motion.div
                        key={repo.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <RepoCard repo={repo} />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
