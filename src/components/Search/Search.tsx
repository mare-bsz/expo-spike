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
};

const Search: React.FC<SearchProps> = ({
  setRecords,
  setIsLoading,
  searchTerm,
  setSearchTerm,
}) => {
  const { t } = useTranslation('search');
  const navigate = useNavigate();
  const location = useLocation();
  const { keycloakInstance } = useAuth();
  const urlParams = new URLSearchParams(location.search);

  useEffect(() => {
    const query = urlParams.get('qry');
    if (query) {
      setSearchTerm(query);
      fetchData(query);
    }
  }, []); // Run only once on mount

  const fetchData = async (query: string) => {
    if (keycloakInstance?.token) {
      try {
        const response = await axios.get(
          `/sbspike/selekt?qry=text all "${query}"&len=10&mim=json`,
          {
            headers: {
              Authorization: `Bearer ${keycloakInstance.token}`,
            },
          }
        );
        setRecords(response.data.records);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch data', error);
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    fetchData(searchTerm);
    navigate(`/?qry=${encodeURIComponent(searchTerm)}`, { replace: true });
  };

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
