import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Home.scss';
import Search from '../../components/Search/Search';
import ResultList from '../../components/ResultList/ResultList';
import { Record } from '../../types/types';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation('home');
  const [records, setRecords] = useState<Record[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  // handle records and searchTerm on update, like when navigating
  useEffect(() => {
    const stateRecords = (location.state as { records: Record[] })?.records;
    const query = new URLSearchParams(location.search).get('qry');

    if (stateRecords) {
      setRecords(stateRecords);
    }

    if (query) {
      setSearchTerm(query);
    }
  }, [location.state, location.search]);

  return (
    <div className="home">
      <Search
        setRecords={setRecords}
        setIsLoading={setIsLoading}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {isLoading && <p className="search-status">{t('isLoading')}</p>}
      {records && records.length === 0 && !isLoading && (
        <p className="search-status">{t('noResults')}</p>
      )}
      {records && records.length > 0 && !isLoading && (
        <ResultList records={records} searchTerm={searchTerm} />
      )}
    </div>
  );
};

export default Home;
