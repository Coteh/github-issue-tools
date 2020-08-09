import React, { useContext, useState } from 'react';
import { ImportScreen } from './ImportScreen';
import { AppContext } from '../context/AppContext';
import { parseCSVFile } from '../util/import-util';

interface Props {
  user: string;
}

export function ImportIssues(props: Props) {
  const { octokit } = useContext(AppContext);
  const { user } = props;

  const [importMappings, setImportMappings] = useState<Map<
    string,
    string
  > | null>(null);

  const handleImportMap = (importMap: Map<string, string>) => {
    setImportMappings(importMap);
  };

  const handleImport = (repo: string, csvFile: File) => {
    if (importMappings == null) {
      console.log('Please select mappings');
      return;
    }
    parseCSVFile(csvFile)
      .then((records) => {
        records.forEach((record) => {
          let createParams: { [key: string]: string } = {
            owner: user,
            repo,
          };
          importMappings.forEach((column, field) => {
            createParams[field] = record[column];
          });
          //   console.log(createParams);
          octokit.issues
            .create(createParams as any)
            .then((res) => {
              if (res.status === 201) {
                console.log('issue created');
                let issue = res.data;
                if (record.state.toLowerCase() === 'closed') {
                  octokit.issues
                    .update({
                      owner: user,
                      repo,
                      issue_number: issue.number,
                      state: 'closed',
                    })
                    .then((res) => {
                      if (res.status === 200) {
                        console.log('issue closed successfully');
                        return;
                      }
                      console.log('error closing issue');
                    })
                    .catch((err) => {
                      console.log('error closing issue', err);
                    });
                }
                return;
              }
              console.log('error creating issue');
            })
            .catch((err) => {
              console.log('error creating issue', err);
            });
        });
      })
      .catch((err) => {
        console.log('error creating issue', err);
      });
  };

  return (
    <ImportScreen
      handleImport={handleImport}
      handleImportMap={handleImportMap}
    />
  );
}
