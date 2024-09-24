import React from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import AuthProvider, { useAuth } from '../../contexts/AuthContext'; // Ensure correct path
import Home from '../../pages/Home/Home';
import Logout from '../../pages/Logout/Logout';
import './App.scss';

const AppContent: React.FC = () => {
  const { isAuthenticated, initialized } = useAuth();

  if (!initialized) {
    return null;
  }

  return (
    <div className="outer-wrapper">
      <Routes>
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <Router>
      <AppContent />
    </Router>
  </AuthProvider>
);

export default App;
