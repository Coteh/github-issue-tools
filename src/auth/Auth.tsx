import React, { useEffect } from 'react';
import { Button } from 'react-components';

const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const STATE = process.env.REACT_APP_STATE;

interface Props {
  handleAuthGranted: Function;
}

export function Auth(props: Props) {
  const { handleAuthGranted } = props;

  useEffect(() => {
    async function requestAccessToken(code: string, state: string) {
      await fetch('/auth_token', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          state,
        }),
      })
        .then(async (res) => {
          if (res.status !== 200) {
            console.log('error getting access token');
            return;
          }
          const result: { access_token: string } = await res.json();
          handleAuthGranted(result.access_token);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    const href = window.location.href;
    if (href.indexOf('?') < 0) {
      return;
    }
    const params = href.slice(href.search(/code=[a-z0-9]+/)).split('&');
    if (params.length !== 2) {
      return;
    }
    const code = params[0].split('=')[1];
    const state = params[1].split('=')[1];
    requestAccessToken(code, state);
  }, []);

  function requestIdentity() {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}&scope=repo`;
  }

  return (
    <div>
      <Button onClick={(_) => requestIdentity()}>Authorize with GitHub</Button>
    </div>
  );
}
