interface Repo {
  html_url: string;
  name: string;
  description: string;
  stargazers_count: number;
  pushed_at: string;
}

export default function RepoCard({ repo }: { repo: Repo }) {
  return (
    <a href={repo.html_url} target="_blank" rel="noreferrer"
       className="block border rounded-lg p-4 hover:bg-gray-50 transition">
      <h3 className="font-semibold text-lg">{repo.name}</h3>
      {repo.description && <p className="text-sm text-gray-600 mb-2">{repo.description}</p>}
      <div className="text-xs text-gray-500 flex justify-between">
        <span>⭐ {repo.stargazers_count}</span>
        <span>{new Date(repo.pushed_at).toLocaleDateString()}</span>
      </div>
    </a>
  );
}
