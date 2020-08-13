import React, { useEffect, useState } from 'react';
import { Button } from 'coteh-react-components';

const AUTH_SERVER_URL = process.env.REACT_APP_AUTH_SERVER_URL;
const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

interface Props {
  handleAuthGranted: Function;
}

export function Auth(props: Props) {
  const { handleAuthGranted } = props;
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function requestAccessToken(code: string, state: string) {
      await fetch(`${AUTH_SERVER_URL}/auth_token`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
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
          const result: {
            access_token: string;
          } = await res.json();
          handleAuthGranted(result.access_token);
          setAuthenticated(true);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function requestIdentity() {
    const resp = await fetch(`${AUTH_SERVER_URL}/gen_state`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const respJson = await resp.json();
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${respJson.state}&scope=repo`;
  }

  return (
    <div>
      {(() => {
        if (!authenticated) {
          return (
            <Button onClick={(_) => requestIdentity()}>
              Authorize with GitHub
            </Button>
          );
        }
      })()}
    </div>
  );
}
