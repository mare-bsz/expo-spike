import React, { JSX, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Record } from '../../types/types';
import Button from '../../shared/Button/Button';
import './DetailPage.scss';
import { useAuth } from '../../contexts/AuthContext';

const DetailPage: React.FC = () => {
  const { t } = useTranslation('detail');
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
          const errorMessage = (err as Error).message || String(err);
          setError(`Failed to fetch record: ${errorMessage}`);
          setIsLoading(false);
        }
      }
    };

    fetchRecord();
  }, [id, keycloakInstance]);

  const formatValue = (value: unknown): string | JSX.Element => {
    if (typeof value === 'string') {
      return value;
    }
    if (
      Array.isArray(value) &&
      value.length > 0 &&
      typeof value[0] === 'object'
    ) {
      return (
        <ul>
          {value.map((item, index) => (
            <li key={index}>
              <dl>
                {Object.entries(item).map(([itemKey, itemValue]) => (
                  <React.Fragment key={itemKey}>
                    <dt>{t(`record.${itemKey}`)}</dt>
                    <dd>{String(itemValue)}</dd>
                  </React.Fragment>
                ))}
              </dl>
            </li>
          ))}
        </ul>
      );
    }
    if (Array.isArray(value)) {
      return JSON.stringify(value);
    }
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }
    return String(value);
  };

  if (isLoading) {
    return <p>{t('loading')}</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!record) {
    return <p>{t('noRecord')}</p>;
  }

  return (
    <div className="detail-page">
      <Button onClick={() => navigate('/')}>{t('backToHome')}</Button>
      <h1>{`${record.inventarnummer}: ${record.werktitel}`}</h1>
      <dl>
        {Object.entries(record).map(([key, value]) => (
          <React.Fragment key={key}>
            <dt>{t(`record.${key}`)}</dt>
            <dd>{formatValue(value)}</dd>
          </React.Fragment>
        ))}
      </dl>
    </div>
  );
};

export default DetailPage;
