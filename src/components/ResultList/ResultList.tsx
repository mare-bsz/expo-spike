import React from 'react';
import { Link } from 'react-router-dom';
import { Record } from '../../types/types';
import './ResultList.scss';
import Image from '../../shared/Image/Image';

type ResultListProps = {
  records: Record[];
  searchTerm: string;
};

const ResultList: React.FC<ResultListProps> = ({ records, searchTerm }) => {
  return (
    <ul className="result-list">
      {records.map((record, index) => (
        <li key={index} className="result-list__item">
          <Image
            imdasId={record.imdasid}
            title={record.anzeigetitel}
            width={400}
          />
          <Link
            to={`/detail/${record.imdasid}`}
            state={{ record, searchTerm, records }}
          >
            {record.anzeigetitel}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ResultList;
