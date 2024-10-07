import React from 'react';
import { useTranslation } from 'react-i18next';
import './Pagination.scss';
import Button from '../../shared/Button/Button';
import classNames from 'classnames';

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
      <Button
        className={classNames(
          'pagination__button',
          'pagination__button--back',
          {
            'pagination__button--invisible': !canGoBack,
          }
        )}
        onClick={() => {
          setFirstResultPosition(Math.max(0, firstResultPosition - 25));
        }}
        aria-label={t('back')}
      >
        {'<'}
      </Button>
      <span>{`${firstResultPosition + 1} - ${Math.min(
        firstResultPosition + 25,
        numFound
      )} ${t('of')} ${numFound} ${t('results')}`}</span>
      <Button
        className={classNames(
          'pagination__button',
          'pagination__button--forward',
          {
            'pagination__button--invisible': !canGoForward,
          }
        )}
        onClick={() => {
          setFirstResultPosition(firstResultPosition + 25);
        }}
        aria-label={t('forward')}
      >
        {'>'}
      </Button>
    </div>
  );
};

export default Pagination;
