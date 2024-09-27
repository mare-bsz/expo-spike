import React, { JSX } from 'react';
import { TFunction } from 'i18next';

export const formatRecordValue = (
  value: unknown,
  t: TFunction
): string | JSX.Element => {
  if (typeof value === 'string') {
    return value;
  }
  if (
    Array.isArray(value) &&
    value.length > 0 &&
    typeof value[0] === 'object'
  ) {
    return (
      <ul className="detail-page__value-list">
        {value.map((item, index) => (
          <li className="detail-page__value-list-item" key={index}>
            <dl className="detail-page__definition-list">
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
