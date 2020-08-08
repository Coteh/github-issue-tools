import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { ExportDialog } from './ExportDialog';
import converter from 'json-2-csv';

interface Props {
    user: string;
}

export function ExportIssues(props: Props) {
    const {octokit} = useContext(AppContext);
    const {user} = props;

    const downloadExport = (blob: Blob) => {
        let url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
        window.URL.revokeObjectURL(url);
    }
    
    const handleExport = (repo: string) => {
        octokit.paginate(octokit.issues.listForRepo, {
            owner: user,
            repo: repo,
        }).then((res) => {
            const data = res.filter((issue) => issue.pull_request === undefined).map((issue) => {
                return {
                    title: issue.title,
                    state: issue.state,
                    description: issue.body,
                }
            });
            converter.json2csv(data, (err, csv) => {
                if (err) {
                  console.error("error converting!");
                }
                downloadExport(new Blob([csv!], {
                    type: 'text/csv',
                }));
            });
        })
        .catch((e) => {
            console.error(e);
        });
    }
    
    return (
        <ExportDialog handleExport={handleExport}/>
    );
}