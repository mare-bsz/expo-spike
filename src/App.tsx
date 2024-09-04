import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Keycloak from 'keycloak-js';
import { useTranslation } from 'react-i18next';

const keycloak = new Keycloak({
  url: 'https://authtest.bsz-bw.de/kc/',
  realm: 'MusIS',
  clientId: 'expodblocal',
});

const App: React.FC = () => {
  const { t } = useTranslation();
  const [keycloakInstance, setKeycloakInstance] = useState<Keycloak | null>(
    null
  );
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
      setKeycloakInstance(keycloak);
      setAuthenticated(authenticated);
    });
  }, []);

  const fetchData = async () => {
    if (keycloakInstance?.token) {
      try {
        const response = await axios.get('/sbspike/selekt?mim=json', {
          headers: {
            Authorization: `Bearer ${keycloakInstance.token}`,
          },
        });
        // eslint-disable-next-line
        console.log(response.data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    }
  };

  return (
    <div>
      {authenticated ? (
        <div>
          <h1>{t('welcome')}</h1>
          <button onClick={fetchData}>{t('fetchData')}</button>
        </div>
      ) : (
        <div>{t('loading')}</div>
      )}
    </div>
  );
};

export default App;
