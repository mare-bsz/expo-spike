import Keycloak from 'keycloak-js';

export const keycloakInstance = new Keycloak({
  url: 'https://authtest.bsz-bw.de/kc/',
  realm: 'MusIS',
  clientId: 'expodblocal',
});

export const initKeycloak = (
  onAuthenticatedCallback: (authenticated: boolean) => void
) => {
  keycloakInstance
    .init({ onLoad: 'login-required' })
    .then(onAuthenticatedCallback);

  keycloakInstance.onTokenExpired = () => {
    keycloakInstance.updateToken(30).catch(() => {
      console.error('Failed to refresh token');
      keycloakInstance.logout();
    });
  };
};
