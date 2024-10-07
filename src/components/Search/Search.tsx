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
};

const Search: React.FC<SearchProps> = ({
  setRecords,
  setIsLoading,
  searchTerm,
  setSearchTerm,
  setNumFound,
  firstResultPosition,
}) => {
  const { t } = useTranslation('search');
  const navigate = useNavigate();
  const location = useLocation();
  const { keycloakInstance } = useAuth();

  const fetchData = async (query: string) => {
    if (keycloakInstance?.token) {
      try {
        const response = await axios.get(
          `/sbspike/selekt?qry=text all "${query}"&len=25&fst=${firstResultPosition}&mim=json`,
          {
            headers: {
              Authorization: `Bearer ${keycloakInstance.token}`,
            },
          }
        );
        setRecords(response.data.records);
        setNumFound(response.data.head.numFound);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch data', error);
        setIsLoading(false);
      }
    }
  };

  const triggerSearch = () => {
    if (searchTerm.trim()) {
      setIsLoading(true);
      fetchData(searchTerm);
      navigate(`/?qry=${encodeURIComponent(searchTerm)}`, { replace: true });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNumFound(0);
    triggerSearch();
  };

  // trigger search, if there is a query in the location on mount
  useEffect(() => {
    const stateRecords = (location.state as { records: Record[] })?.records;

    if (!stateRecords) {
      const query = new URLSearchParams(location.search).get('qry');
      if (query) {
        setSearchTerm(query);
        fetchData(query);
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
