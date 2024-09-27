import { useEffect, useState } from 'react';
import axios from 'axios';
import { Record } from '../../../types/types';
import { useAuth } from '../../../contexts/AuthContext';

const useFetchRecord = (id: string) => {
  const { keycloakInstance } = useAuth();
  const [record, setRecord] = useState<Record | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecord = async () => {
      if (keycloakInstance?.token) {
        try {
          const response = await axios.get(
            `/sbspike/selekt?id=${id}&mim=json`,
            {
              headers: {
                Authorization: `Bearer ${keycloakInstance.token}`,
              },
            }
          );
          setRecord(response.data.records[0]);
          setIsLoading(false);
        } catch (err) {
          const errorMessage = (err as Error).message || String(err);
          setError(`Failed to fetch record: ${errorMessage}`);
          setIsLoading(false);
        }
      }
    };

    fetchRecord();
  }, [id, keycloakInstance]);

  return { record, isLoading, error };
};

export default useFetchRecord;
