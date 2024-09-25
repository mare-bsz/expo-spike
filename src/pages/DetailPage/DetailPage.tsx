import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Record } from '../../types/types';
import Button from '../../shared/Button/Button';
import './DetailPage.scss';
import { useAuth } from '../../contexts/AuthContext';

const DetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
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
          const errorMessage = err instanceof Error ? err.message : String(err);
          setError(`Failed to fetch record: ${errorMessage}`);
          setIsLoading(false);
        }
      }
    };

    fetchRecord();
  }, [id, keycloakInstance]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!record) {
    return <p>No record found</p>;
  }

  return (
    <div className="detail-page">
      <Button onClick={() => navigate('/')}>Back to Home</Button>
      <h1>{`${record.inventarnummer}: ${record.werktitel}`}</h1>
      <dl>
        {Object.entries(record).map(([key, value]) => (
          <React.Fragment key={key}>
            <dt>{key}</dt>
            <dd>{JSON.stringify(value)}</dd>
          </React.Fragment>
        ))}
      </dl>
    </div>
  );
};

export default DetailPage;
