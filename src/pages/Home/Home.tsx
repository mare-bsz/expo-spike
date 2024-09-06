import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../components/Header/Header';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import './Home.scss';

const Home: React.FC = () => {
  const { t } = useTranslation('home');
  const { keycloakInstance } = useAuth();

  const fetchData = async () => {
    if (keycloakInstance?.token) {
      try {
        const response = await axios.get('/sbspike/selekt?mim=json', {
          headers: {
            Authorization: `Bearer ${keycloakInstance.token}`,
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="content">
        <h1>{t('welcome')}</h1>
        <button onClick={fetchData}>{t('fetchData')}</button>
      </div>
    </div>
  );
};

export default Home;
