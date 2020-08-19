import React from 'react';
import { ExportScreen } from './ExportScreen';
import converter from 'json-2-csv';
import useAppContext from '../context/useAppContext';

interface Props {
  user: string;
  RepoSelect: any;
}

export function ExportIssues(props: Props) {
  const { octokit } = useAppContext();
  const { user, RepoSelect } = props;

  const downloadExport = (blob: Blob) => {
    let url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');
    window.URL.revokeObjectURL(url);
  };

  const handleExport = (repo: string) => {
    octokit
      .paginate(octokit.issues.listForRepo, {
        owner: user,
        repo: repo,
      })
      .then((res) => {
        const data = res
          .filter((issue) => issue.pull_request === undefined)
          .map((issue) => {
            return {
              title: issue.title,
              state: issue.state,
              description: issue.body,
            };
          });
        converter.json2csv(data, (err, csv) => {
          if (err) {
            console.error('error converting!');
            return;
          }
          downloadExport(
            new Blob([csv!], {
              type: 'text/csv',
            }),
          );
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return <ExportScreen handleExport={handleExport} RepoSelect={RepoSelect} />;
}
