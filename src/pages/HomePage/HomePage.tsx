import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Search from '../../components/Search/Search';
import ResultList from '../../components/ResultList/ResultList';
import Status from '../../shared/Status/Status';
import { Record } from '../../types/types';
import { useTranslation } from 'react-i18next';

const HomePage: React.FC = () => {
  const { t } = useTranslation('home');
  const [records, setRecords] = useState<Record[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  // Handle records and searchTerm on update, like when navigating
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
    <div className="home-page">
      <Search
        setRecords={setRecords}
        setIsLoading={setIsLoading}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {isLoading && <Status>{t('isLoading')}</Status>}
      {records && records.length === 0 && !isLoading && (
        <Status>{t('noResults')}</Status>
      )}
      {records && records.length > 0 && !isLoading && (
        <ResultList records={records} searchTerm={searchTerm} />
      )}
    </div>
  );
};

export default HomePage;
