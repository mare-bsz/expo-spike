import React from 'react';
import { Record } from '../../types/types';

type ResultListProps = {
  records: Record[];
};

const ResultList: React.FC<ResultListProps> = ({ records }) => {
  return (
    <ul>
      {records?.map((record, index) => (
        <li key={index}>{`${record.inventarnummer}: ${record.werktitel}`}</li>
      ))}
    </ul>
  );
};

export default ResultList;
