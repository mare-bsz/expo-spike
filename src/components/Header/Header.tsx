import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import './Header.scss';

const Header: React.FC = () => {
  const { t } = useTranslation('header'); // Use 'header' namespace
  const { logout } = useAuth();

  return (
    <header role="banner" className="header">
      <h1>{t('title')}</h1>
      <button onClick={logout}>{t('logout')}</button>
    </header>
  );
};

export default Header;
