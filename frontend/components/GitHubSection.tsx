import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import RepoCard from "./RepoCard";
import { motion } from "framer-motion";

const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "MyHeartRaces";

const fetchRepos = async () => {
  const { data } = await axios.get(`https://api.github.com/users/${username}/repos?sort=pushed`);
  return data;
};

export default function GitHubSection() {
  const { data: repos = [] } = useQuery({
    queryKey: ["repos", username],
    queryFn: fetchRepos,
    refetchInterval: 1000 * 60 * 30,
    staleTime: 1000 * 60 * 10,
  });

  return (
    <section className="my-10">
      <h2 className="text-3xl font-bold mb-6">Latest GitHub Repositories</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {repos.map((repo: any) => (
          <motion.div key={repo.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            <RepoCard repo={repo} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
