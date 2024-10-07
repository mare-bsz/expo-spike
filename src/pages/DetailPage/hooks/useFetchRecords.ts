import axios from 'axios';
import React from 'react';
import { Record } from '../../../types/types';
import { useAuth } from '../../../contexts/AuthContext';

const useFetchRecords = (
  setRecords: React.Dispatch<React.SetStateAction<Record[] | undefined>>,
  setFirstResultPosition: React.Dispatch<React.SetStateAction<number>>,
  setNumFound: React.Dispatch<React.SetStateAction<number>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { keycloakInstance } = useAuth();

  return async (query: string, fst: number) => {
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
};

export default useFetchRecords;
