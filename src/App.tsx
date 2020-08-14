import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import { Octokit } from '@octokit/rest';
import { AppContext } from './context/AppContext';
import { ExportIssues } from './export/ExportIssues';
import { TabMenu } from './main/TabMenu';
import { ImportIssues } from './import/ImportIssues';
import { Auth } from './auth/Auth';
import { RepositorySelect } from './input/RepositorySelect';
import { getUserRepositories } from './util/gh-repository';

let octokit: Octokit;

function App() {
  const [user, setUser] = useState('');
  const [authToken, setAuthToken] = useState<string | null>(null);

  const [repoNames, setRepoNames] = useState<string[]>([]);
  const [isLoadingDone, setIsLoadingDone] = useState(false);

  useEffect(() => {
    if (authToken == null) {
      return;
    }
    octokit = new Octokit({
      auth: authToken,
    });
    async function getUserData() {
      octokit
        .request('/user')
        .then((res) => {
          setUser(res.data.login);
        })
        .catch((err) => {
          if (err.status === 401) {
            setAuthToken(null);
          }
          console.error(err);
        });
    }
    getUserData();
  }, [authToken]);

  useEffect(() => {
    if (!octokit) {
      return;
    }
    async function getRepos() {
      setRepoNames(await getUserRepositories(octokit));
      setIsLoadingDone(true);
    }

    getRepos();
  }, [user]);

  function handleAuthGranted(accessToken: string) {
    setAuthToken(accessToken);
  }

  return (
    <div className="App">
      <AppContext.Provider value={{ octokit }}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {(() => {
            if (authToken) {
              return <p>Welcome {user}!</p>;
            } else {
              return <p>Please authenticate</p>;
            }
          })()}
        </header>
        <Router>
          <TabMenu />
          {(() => {
            if (authToken == null) {
              return <></>;
            }
            return (
              <Switch>
                <Route path="/export">
                  <ExportIssues
                    user={user}
                    RepoSelect={
                      <RepositorySelect
                        repoNames={repoNames}
                        loading={!isLoadingDone}
                      />
                    }
                  />
                </Route>
                <Route path="/import">
                  <ImportIssues
                    user={user}
                    RepoSelect={
                      <RepositorySelect
                        repoNames={repoNames}
                        loading={!isLoadingDone}
                      />
                    }
                  />
                </Route>
                <Route path="/"></Route>
              </Switch>
            );
          })()}
          <Auth
            handleAuthGranted={handleAuthGranted}
            authenticated={authToken != null}
          />
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
