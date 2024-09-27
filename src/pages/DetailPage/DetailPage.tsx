import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Record } from '../../types/types';
import Button from '../../shared/Button/Button';
import useFetchRecord from './hooks/useFetchRecord';
import { formatRecordValue } from './utils/formatters';
import './DetailPage.scss';

const DetailPage: React.FC = () => {
  const { t } = useTranslation('detail');
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const { record, isLoading, error } = useFetchRecord(id ?? '');
  const searchTerm =
    (location.state as { searchTerm: string })?.searchTerm || '';
  const records = (location.state as { records: Record[] })?.records || [];

  const handleBackToHome = () => {
    if (searchTerm && records.length > 0) {
      navigate(`/?qry=${encodeURIComponent(searchTerm)}`, {
        state: { records },
        replace: true,
      });
    } else {
      navigate('/', { replace: true });
    }
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
      <Button onClick={handleBackToHome}>{t('backToHome')}</Button>
      <h1>{`${record.inventarnummer}: ${record.werktitel}`}</h1>
      <dl>
        {Object.entries(record).map(([key, value]) => (
          <React.Fragment key={key}>
            <dt>{t(`record.${key}`)}</dt>
            <dd>{formatRecordValue(value, t)}</dd>
          </React.Fragment>
        ))}
      </dl>
    </div>
  );
};

export default DetailPage;
