import React, { useState } from 'react';

interface Props {
  repoNames: string[];
  loading: boolean;
  onRepoSelect?: (repoName: string) => void;
}

export function RepositorySelect(props: Props) {
  const [repo, setRepo] = useState('');

  const { repoNames, loading, onRepoSelect } = props;

  return (
    <div>
      <label>Repo</label>
      <select
        data-testid="repo-select"
        value={repo}
        onChange={(e) => {
          setRepo(e.target.value);
          if (onRepoSelect) onRepoSelect(e.target.value);
        }}
      >
        <option value="">
          {loading ? 'Loading repositories...' : 'Please select a repository'}
        </option>
        {repoNames.map((repoName, i) => (
          <option key={`repo_${i}_${repoName}`} value={repoName}>
            {repoName}
          </option>
        ))}
      </select>
    </div>
  );
}
