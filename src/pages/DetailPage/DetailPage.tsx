import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../../shared/Button/Button';
import Status from '../../shared/Status/Status';
import useFetchRecord from './hooks/useFetchRecord';
import DetailPageDefinitionList from './partials/DetailPageDefinitionList';
import Image from '../../shared/Image/Image';
import './DetailPage.scss';

const DetailPage: React.FC = () => {
  const { t } = useTranslation('detail');
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const location = useLocation();
  const { record, isLoading, error } = useFetchRecord(id ?? '');
  const {
    searchTerm = '',
    records = [],
    firstResultPosition = 0,
    numFound = 0,
  } = location.state ?? {};

  const handleBackToHome = () => {
    if (searchTerm && records.length > 0) {
      navigate(
        `/?qry=${encodeURIComponent(searchTerm)}&fst=${firstResultPosition}`,
        {
          state: { records, firstResultPosition, numFound },
          replace: true,
        }
      );
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
            <Image
              imdasId={record.imdasid}
              title={record.anzeigetitel}
              width={400}
            />
            <DetailPageDefinitionList record={record} />
          </>
        )}
      </div>
    </>
  );
};

export default DetailPage;
