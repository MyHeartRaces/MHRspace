/**
 * Narrow type in line with the fields we actually use.
 * You can expand this list later if you need more properties.
 */
export interface GitHubRepo {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
    pushed_at: string;      // ISO date string
}
