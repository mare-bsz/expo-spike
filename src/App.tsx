import React from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import AuthProvider, { useAuth } from './contexts/AuthContext';
import HomePage from './pages/HomePage/HomePage';
import LogoutPage from './pages/LogoutPage/LogoutPage';
import DetailPage from './pages/DetailPage/DetailPage';
import Header from './components/Header/Header';
import './App.scss';

const AppContent: React.FC = () => {
  const { isAuthenticated, initialized } = useAuth();

  if (!initialized) {
    return null;
  }

  return (
    <div className="outer-wrapper">
      <Header />
      <main role="main">
        <div className="content">
          <Routes>
            <Route path="/logout" element={<LogoutPage />} />
            <Route
              path="/"
              element={isAuthenticated ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/detail/:id"
              element={isAuthenticated ? <DetailPage /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </main>
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
