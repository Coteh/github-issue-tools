import React, { useState } from 'react';
import { Button } from 'react-components';

interface Props {
  handleImport: Function;
}

export function ImportDialog(props: Props) {
  const [fileList, setFileList] = useState<FileList | null>(null);
  const { handleImport } = props;

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
      <input
        type="file"
        name="inputfile"
        onChange={(e) => setFileList(e.target.files)}
      ></input>
      <Button
        onClick={(_) => {
          if (fileList == null) {
            console.log('Please specify a file');
            return;
          }
          handleImport('test-repo', fileList[0]);
        }}
      >
        Import
      </Button>
    </div>
  );
}
