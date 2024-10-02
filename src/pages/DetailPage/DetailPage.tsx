import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Record } from '../../types/types';
import Button from '../../shared/Button/Button';
import Status from '../../shared/Status/Status';
import useFetchRecord from './hooks/useFetchRecord';
import DetailPageDefinitionList from './partials/DetailPageDefinitionList';
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

  return (
    <>
      <Button className="detail-page__back-button" onClick={handleBackToHome}>
        {t('backToHome')}
      </Button>
      <div className="detail-page">
        {isLoading && <Status>{t('loading')}</Status>}
        {error && <Status>{error}</Status>}
        {!error && !isLoading && !record && <Status>{t('noRecord')}</Status>}
        {record && (
          <>
            <h1>{record.anzeigetitel}</h1>
            <DetailPageDefinitionList record={record} />
          </>
        )}
      </div>
    </>
  );
};

export default DetailPage;
