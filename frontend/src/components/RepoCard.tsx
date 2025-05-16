import { GitHubRepo } from "@/types/github";

interface Props {
    repo: GitHubRepo;
}

export default function RepoCard({ repo }: Props) {
    return (
        <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="block rounded-2xl p-4 border hover:shadow transition"
        >
            <h3 className="font-semibold text-xl">{repo.name}</h3>

            {repo.description && (
                <p className="text-sm text-gray-600 line-clamp-2">
                    {repo.description}
                </p>
            )}

            <p className="mt-2 text-xs">
                ★ {repo.stargazers_count} • Updated{" "}
                {new Date(repo.pushed_at).toLocaleDateString()}
            </p>
        </a>
    );
}
