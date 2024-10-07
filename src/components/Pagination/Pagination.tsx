import React from 'react';
import { useTranslation } from 'react-i18next';

type PaginationProps = {
  firstResultPosition: number;
  setFirstResultPosition: React.Dispatch<React.SetStateAction<number>>;
  numFound: number;
};

const Pagination: React.FC<PaginationProps> = ({
  firstResultPosition,
  setFirstResultPosition,
  numFound,
}) => {
  const { t } = useTranslation('pagination');
  const canGoBack = firstResultPosition > 0;
  const canGoForward = firstResultPosition + 25 < numFound;

  return (
    <div className="pagination">
      {canGoBack && (
        <button
          onClick={() => {
            setFirstResultPosition(Math.max(0, firstResultPosition - 25));
          }}
        >
          {t('back')}
        </button>
      )}
      <span>{`${firstResultPosition + 1} - ${Math.min(
        firstResultPosition + 25,
        numFound
      )} ${t('of')} ${numFound} ${t('results')}`}</span>
      {canGoForward && (
        <button
          onClick={() => {
            setFirstResultPosition(firstResultPosition + 25);
          }}
        >
          {t('forward')}
        </button>
      )}
    </div>
  );
};

export default Pagination;
