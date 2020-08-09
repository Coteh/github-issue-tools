import React, { useState } from 'react';
import { Button } from 'react-components';

interface Props {
  handleExport: Function;
}

export function ExportScreen(props: Props) {
  const { handleExport } = props;
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
        <input value={repo} onChange={(e) => setRepo(e.target.value)}></input>
      </div>
      <Button onClick={(e) => handleExport(repo)}>Export</Button>
    </div>
  );
}
