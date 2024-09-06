import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../components/Header/Header';
import './Home.scss';
import Search from '../../components/Search/Search';

const Home: React.FC = () => {
  const { t } = useTranslation('home');

  return (
    <div>
      <Header />
      <div className="content">
        <h1>{t('welcome')}</h1>
        <Search />
      </div>
    </div>
  );
};

export default Home;
