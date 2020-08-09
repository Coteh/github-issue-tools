import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import { Octokit } from '@octokit/rest';
import { AppContext } from './context/AppContext';
import { ExportIssues } from './export/ExportIssues';
import { TabMenu } from './main/TabMenu';
import { ImportIssues } from './import/ImportIssues';

const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_AUTH_TOKEN,
});

function App() {
  const [user, setUser] = useState('');

  useEffect(() => {
    async function getUserData() {
      setUser((await octokit.request('/user')).data.login);
    }
    getUserData();
  }, []);

  return (
    <div className="App">
      <AppContext.Provider value={{ octokit }}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Welcome {user}!</p>
        </header>
        <Router>
          <TabMenu />
          <Switch>
            <Route path="/export">
              <ExportIssues user={user} />
            </Route>
            <Route path="/import">
              <ImportIssues user={user} />
            </Route>
            <Route path="/"></Route>
          </Switch>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
