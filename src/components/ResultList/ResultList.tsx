import React from 'react';
import { Link } from 'react-router-dom';
import { Record } from '../../types/types';
import './ResultList.scss';

type ResultListProps = {
  records: Record[];
};

const ResultList: React.FC<ResultListProps> = ({ records }) => {
  return (
    <ul className="result-list">
      {records.map((record, index) => (
        <li key={index} className="result-list__item">
          <Link to={`/detail/${record.imdasid}`} state={record}>
            {`${record.inventarnummer}: ${record.werktitel}`}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ResultList;
