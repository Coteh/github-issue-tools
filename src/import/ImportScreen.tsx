import React, { useState, useEffect } from 'react';
import { Button } from 'coteh-react-components';
import { parseCSVHeaders } from '../util/import';
import { ImportMapDialog } from './ImportMapDialog';

const IMPORT_FIELDS = ['title', 'body'];

interface Props {
  handleImport: Function;
  handleImportMap: Function;
  RepoSelect: any;
}

export function ImportScreen(props: Props) {
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [repo, setRepo] = useState('');
  const { handleImport, handleImportMap, RepoSelect } = props;

  useEffect(() => {
    if (fileList != null) {
      parseCSVHeaders(fileList[0])
        .then((columns) => {
          setColumns(columns);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [fileList]);

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
      {(() => {
        if (columns.length === 0) {
          return <></>;
        }
        return (
          <ImportMapDialog
            userColumns={columns}
            importFields={IMPORT_FIELDS}
            handleImportMap={handleImportMap}
          />
        );
      })()}
      {React.cloneElement(RepoSelect, {
        onRepoSelect: (repoName: string) => setRepo(repoName),
      })}
      <Button
        onClick={(_) => {
          if (fileList == null) {
            console.log('Please specify a file');
            return;
          }
          handleImport(repo, fileList[0]);
        }}
      >
        Import
      </Button>
    </div>
  );
}
