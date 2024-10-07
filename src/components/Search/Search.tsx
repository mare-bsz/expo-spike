import React, { FormEvent, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { Record } from '../../types/types';
import Button from '../../shared/Button/Button';
import './Search.scss';

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
  const { keycloakInstance } = useAuth();

  const fetchData = async (query: string, fst: number) => {
    if (keycloakInstance?.token) {
      try {
        const response = await axios.get(
          `/sbspike/selekt?qry=text all "${query}"&len=25&fst=${fst}&mim=json`,
          {
            headers: {
              Authorization: `Bearer ${keycloakInstance.token}`,
            },
          }
        );
        const records = response.data.records;
        const numFound = response.data.head.numFound;

        if (fst >= numFound) {
          setFirstResultPosition(0);
        } else {
          setFirstResultPosition(fst);
        }

        setRecords(records);
        setNumFound(numFound);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch data', error);
        setIsLoading(false);
      }
    }
  };

  const triggerSearch = () => {
    if (searchTerm.trim()) {
      // Ensure searchTerm is non-empty
      setIsLoading(true);
      fetchData(searchTerm, firstResultPosition).then(() => {
        navigate(
          `/?qry=${encodeURIComponent(searchTerm)}&fst=${firstResultPosition}`,
          { replace: true }
        );
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNumFound(0); // Reset numFound when triggering a new search
    setFirstResultPosition(0); // Reset firstResultPosition when triggering a new search
    triggerSearch(); // Initiate the search
  };

  // trigger search, if there is a query in the location on mount
  useEffect(() => {
    const stateRecords = (location.state as { records: Record[] })?.records;

    if (!stateRecords) {
      const urlParams = new URLSearchParams(location.search);
      const query = urlParams.get('qry');
      const fst = parseInt(urlParams.get('fst') || '0', 10);

      if (query) {
        setSearchTerm(query);
        setFirstResultPosition(fst);
        fetchData(query, fst);
      }
    }
  }, []);

  // Handle search on pagination
  useEffect(() => {
    // Trigger search if searchTerm is non-empty (important during navigation)
    if (searchTerm.trim()) {
      triggerSearch();
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
