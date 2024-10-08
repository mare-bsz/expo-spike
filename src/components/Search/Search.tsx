import React, { FormEvent, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Record } from '../../types/types';
import Button from '../../shared/Button/Button';
import './Search.scss';
import useFetchRecords from '../../pages/DetailPage/hooks/useFetchRecords';

type SearchProps = {
  setRecords: React.Dispatch<React.SetStateAction<Record[] | undefined>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setNumFound: React.Dispatch<React.SetStateAction<number>>;
  firstResultPosition: number;
  setFirstResultPosition: React.Dispatch<React.SetStateAction<number>>;
};

const Search: React.FC<SearchProps> = ({
  setRecords,
  setIsLoading,
  searchTerm,
  setSearchTerm,
  setNumFound,
  firstResultPosition,
  setFirstResultPosition,
}) => {
  const { t } = useTranslation('search');
  const navigate = useNavigate();
  const location = useLocation();
  const fetchRecords = useFetchRecords(
    setRecords,
    setFirstResultPosition,
    setNumFound,
    setIsLoading
  );

  const triggerSearch = (qry: string, fst: number) => {
    setIsLoading(true);
    fetchRecords(qry, fst).then(() => {
      navigate(`/?qry=${encodeURIComponent(qry)}&fst=${fst}`, {
        replace: true,
      });
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setNumFound(0); // Reset numFound when triggering a new search
    setFirstResultPosition(0); // Reset firstResultPosition when triggering a new search
    triggerSearch(searchTerm, 0); // Initiate the search
  };

  // trigger search, if there is a query in the location on mount
  useEffect(() => {
    const { records } = location.state ?? {};

    if (!records) {
      const urlParams = new URLSearchParams(location.search);
      const query = urlParams.get('qry');
      const fst = parseInt(urlParams.get('fst') || '0', 10);

      if (query) {
        setSearchTerm(query);
        fetchRecords(query, fst);
      }
    }
  }, []);

  // Handle search on pagination
  useEffect(() => {
    // Trigger search if searchTerm is non-empty (important during navigation)
    if (searchTerm.trim()) {
      triggerSearch(searchTerm, firstResultPosition);
    }
  }, [firstResultPosition]);

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <div className="search__form-container">
          <label htmlFor="search">{`${t('search')}`}</label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <Button type="submit">{t('search')}</Button>
        </div>
      </form>
    </div>
  );
};

export default Search;
