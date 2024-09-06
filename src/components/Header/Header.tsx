import React from 'react';
import { useTranslation } from 'react-i18next';
import './Header.scss';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { t } = useTranslation('header'); // Use 'header' namespace
  const { logout } = useAuth();

  return (
    <header className="header">
      <h1>{t('title')}</h1>
      <button onClick={logout}>{t('logout')}</button>
    </header>
  );
};

export default Header;
