import React, { FormEvent, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { Record } from '../../types/types';
import './Search.scss';

type SearchProps = {
  setRecords: React.Dispatch<React.SetStateAction<Record[]>>;
};

const Search: React.FC<SearchProps> = ({ setRecords }) => {
  const { t } = useTranslation('search');
  const [searchTerm, setSearchTerm] = useState('');
  const { keycloakInstance } = useAuth();

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
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData(searchTerm);
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
          <button type="submit">{t('search')}</button>
        </div>
      </form>
    </div>
  );
};

export default Search;
