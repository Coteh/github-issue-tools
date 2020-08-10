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

let octokit: Octokit;

function App() {
  const [user, setUser] = useState('');
  const [authToken, setAuthToken] = useState<string | null>(null);

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
          console.error(err);
        });
    }
    getUserData();
  }, [authToken]);

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
                  <ExportIssues user={user} />
                </Route>
                <Route path="/import">
                  <ImportIssues user={user} />
                </Route>
                <Route path="/"></Route>
              </Switch>
            );
          })()}
          <Auth handleAuthGranted={handleAuthGranted} />
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
