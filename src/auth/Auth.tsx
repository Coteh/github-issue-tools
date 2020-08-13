import React, { useEffect, useState } from 'react';
import { Button } from 'coteh-react-components';

const AUTH_SERVER_URL = process.env.REACT_APP_AUTH_SERVER_URL;

interface Props {
  handleAuthGranted: Function;
}

export function Auth(props: Props) {
  const { handleAuthGranted } = props;
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const href = window.location.href;
    if (href.indexOf('?') < 0) {
      return;
    }
    const params = href.split('?')[1].split('&');
    if (params.length !== 1) {
      return;
    }
    const accessToken = params[0].split('=')[1];
    if (!accessToken) {
      console.error('Error getting access token');
      return;
    }
    handleAuthGranted(accessToken);
    setAuthenticated(true);
    global.history.pushState(null, '', href.split('?')[0]);
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
