import React, { useState } from 'react';
import { Button } from 'coteh-react-components';

interface Props {
  handleExport: Function;
  repoNames: string[];
  loading: boolean;
}

export function ExportScreen(props: Props) {
  const { handleExport, repoNames, loading } = props;
  const [repo, setRepo] = useState('');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100px',
        margin: '0 auto',
      }}
    >
      <div>
        <label>Repo</label>
        <select value={repo} onChange={(e) => setRepo(e.target.value)}>
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
      <Button onClick={(e) => handleExport(repo)}>Export</Button>
    </div>
  );
}
