import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import './Home.scss';
import Search from '../../components/Search/Search';
import ResultList from '../../components/ResultList/ResultList';
import { Record } from '../../types/types';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation('home');
  const [records, setRecords] = useState<Record[]>();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="home">
      <Header />
      <main role="main">
        <div className="content">
          <Search setRecords={setRecords} setIsLoading={setIsLoading} />
          {isLoading && <p>{t('isLoading')}</p>}
          {records && records.length === 0 && !isLoading && (
            <p>{t('noResults')}</p>
          )}
          {records && records.length > 0 && !isLoading && (
            <ResultList records={records} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
