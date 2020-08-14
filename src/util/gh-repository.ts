import { Octokit } from '@octokit/rest';

export async function getUserRepositories(octokit: Octokit): Promise<string[]> {
  return (await octokit.paginate(octokit.repos.listForAuthenticatedUser)).map(
    (repo: any) => repo.name,
  );
}
