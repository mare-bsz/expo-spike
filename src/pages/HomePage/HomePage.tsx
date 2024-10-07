import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Search from '../../components/Search/Search';
import ResultList from '../../components/ResultList/ResultList';
import Status from '../../shared/Status/Status';
import { Record } from '../../types/types';
import { useTranslation } from 'react-i18next';
import Pagination from '../../components/Pagination/Pagination';

const HomePage: React.FC = () => {
  const { t } = useTranslation('home');
  const location = useLocation();
  const [records, setRecords] = useState<Record[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [firstResultPosition, setFirstResultPosition] = useState<number>(
    (location.state as { firstResultPosition: number })?.firstResultPosition ||
      0
  );
  const [numFound, setNumFound] = useState<number>(
    (location.state as { numFound: number })?.numFound || 0
  );

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
        setNumFound={setNumFound}
        firstResultPosition={firstResultPosition}
      />
      {isLoading && <Status>{t('isLoading')}</Status>}
      {records && records.length === 0 && !isLoading && (
        <Status>{t('noResults')}</Status>
      )}
      {records && records.length > 0 && !isLoading && (
        <>
          <Pagination
            firstResultPosition={firstResultPosition}
            setFirstResultPosition={setFirstResultPosition}
            numFound={numFound}
          />
          <ResultList
            records={records}
            searchTerm={searchTerm}
            firstResultPosition={firstResultPosition}
            numFound={numFound}
          />
          <Pagination
            firstResultPosition={firstResultPosition}
            setFirstResultPosition={setFirstResultPosition}
            numFound={numFound}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
