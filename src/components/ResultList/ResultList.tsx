import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Record } from '../../types/types';
import './ResultList.scss';

type ResultListProps = {
  records: Record[];
};

const ResultList: React.FC<ResultListProps> = ({ records }) => {
  const navigate = useNavigate();

  const handleClick = (record: Record) => {
    navigate(`/detail/${record.imdasid}`, { state: record });
  };

  return (
    <ul className="result-list">
      {records.map((record, index) => (
        <li
          className="result-list__item"
          key={index}
          onClick={() => handleClick(record)}
        >
          {`${record.inventarnummer}: ${record.werktitel}`}
        </li>
      ))}
    </ul>
  );
};

export default ResultList;
