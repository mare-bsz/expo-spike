import React from 'react';
import { Record } from '../../types/types';
import './ResultList.scss';

type ResultListProps = {
  records: Record[];
};

const ResultList: React.FC<ResultListProps> = ({ records }) => {
  return (
    <ul className="result-list">
      {records?.map((record, index) => (
        <li className="result-list__item" key={index}>
          {`${record.inventarnummer}: ${record.werktitel}`}
        </li>
      ))}
    </ul>
  );
};

export default ResultList;
