import React, { useState } from 'react';
import { Button } from 'coteh-react-components';

interface Props {
  handleExport: Function;
  RepoSelect: any;
}

export function ExportScreen(props: Props) {
  const { handleExport, RepoSelect } = props;
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
      {React.cloneElement(RepoSelect, {
        onRepoSelect: (repoName: string) => setRepo(repoName),
      })}
      <Button onClick={(_) => handleExport(repo)}>Export</Button>
    </div>
  );
}
