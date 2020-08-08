import React, { useContext } from 'react';
import { ImportDialog } from './ImportDialog';
import { AppContext } from '../context/AppContext';
import converter from 'json-2-csv';

interface Props {
  user: string;
}

export function ImportIssues(props: Props) {
  const { octokit } = useContext(AppContext);
  const { user } = props;

  const handleImport = (repo: string, csvFile: File) => {
    let fr = new FileReader();
    fr.readAsText(csvFile);
    fr.onload = () => {
      converter.csv2json(fr.result as string, (err, data) => {
        if (err) {
          console.log('Error reading CSV file');
          return;
        }
        data?.forEach((record) => {
          octokit.issues
            .create({
              owner: user,
              repo,
              title: record.title,
              body: record.description,
            })
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
      });
    };
  };

  return <ImportDialog handleImport={handleImport} />;
}
