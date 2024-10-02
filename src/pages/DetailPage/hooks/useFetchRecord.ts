import { useEffect, useState } from 'react';
import axios from 'axios';
import { Record } from '../../../types/types';
import { useAuth } from '../../../contexts/AuthContext';

const useFetchRecord = (id: string) => {
  const { token } = useAuth();
  const [record, setRecord] = useState<Record | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecord = async () => {
      if (token) {
        try {
          const response = await axios.get(
            `/sbspike/selekt?id=${id}&mim=json`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
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
  }, [id, token]);

  return { record, isLoading, error };
};

export default useFetchRecord;
