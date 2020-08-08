import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { Octokit } from '@octokit/rest';
import { AppContext } from './context/AppContext';
import { ExportIssues } from './export/ExportIssues';

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
        <ExportIssues user={user} />
      </AppContext.Provider>
    </div>
  );
}

export default App;
