import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import Keycloak from 'keycloak-js';
import { initKeycloak, keycloakInstance } from '../services/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  initialized: boolean;
  keycloakInstance: Keycloak | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    initKeycloak((authenticated: boolean) => {
      setIsAuthenticated(authenticated);
      setInitialized(true);
    });
  }, []);

  const logout = () => {
    keycloakInstance.logout();
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, initialized, keycloakInstance, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
