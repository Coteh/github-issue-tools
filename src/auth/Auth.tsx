import React, { useEffect } from 'react';
import { Button } from 'coteh-react-components';

const AUTH_SERVER_URL = process.env.REACT_APP_AUTH_SERVER_URL;

interface Props {
  handleAuthGranted: Function;
  authenticated: boolean;
}

export function Auth(props: Props) {
  const { handleAuthGranted, authenticated } = props;

  useEffect(() => {
    async function getAccessToken() {
      const resp = await fetch(`${AUTH_SERVER_URL}/get_token`, {
        method: 'GET',
        credentials: 'include',
      });
      if (resp.status !== 200) {
        console.error('could not get token');
        return;
      }
      let jsonResp;
      try {
        jsonResp = await resp.json();
      } catch (e) {
        console.error('could not get token: ', e);
        return;
      }
      if (!jsonResp.accessToken) {
        console.error('could not get token, not found in response');
        return;
      }
      handleAuthGranted(jsonResp.accessToken);
    }
    getAccessToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function requestIdentity() {
    window.location.href = `${AUTH_SERVER_URL}/connect/github`;
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
