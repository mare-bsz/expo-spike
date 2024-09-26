import React from 'react';
import { Link } from 'react-router-dom';
import { Record } from '../../types/types';
import './ResultList.scss';

type ResultListProps = {
  records: Record[];
  searchTerm: string;
};

const ResultList: React.FC<ResultListProps> = ({ records, searchTerm }) => {
  return (
    <ul className="result-list">
      {records.map((record, index) => (
        <li key={index} className="result-list__item">
          <Link
            to={`/detail/${record.imdasid}`}
            state={{ record, searchTerm, records }}
          >
            {`${record.inventarnummer}: ${record.werktitel}`}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ResultList;
