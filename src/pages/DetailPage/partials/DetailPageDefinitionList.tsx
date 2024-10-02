import React from 'react';
import { useTranslation } from 'react-i18next';
import { Record } from '../../../types/types';
import { formatRecordValue } from '../utils/formatters';

type DetailPageDefinitionListProps = {
  record: Record;
};

const DetailPageDefinitionList: React.FC<DetailPageDefinitionListProps> = ({
  record,
}) => {
  const { t } = useTranslation('detail');

  return (
    <dl className="detail-page__definition-list">
      {Object.entries(record).map(([key, value]) => {
        if (key === 'anzeigetitel') {
          return null;
        }

        return (
          <React.Fragment key={key}>
            <dt>{t(`record.${key}`)}</dt>
            <dd>{formatRecordValue(value, t)}</dd>
          </React.Fragment>
        );
      })}
    </dl>
  );
};

export default DetailPageDefinitionList;
