import React from 'react';
import { Link } from 'react-router-dom';
import { Record } from '../../types/types';
import './ResultList.scss';
import Image, { ImageModifier } from '../../shared/Image/Image';

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
            className="result-list__link"
            to={`/detail/${record.imdasid}`}
            state={{ record, searchTerm, records }}
          >
            <>
              <div className="result-list__item-image">
                <Image
                  imdasId={record.imdasid}
                  title={record.anzeigetitel}
                  width={300} // fetched images are quite blurry under 300px
                  modifier={ImageModifier.COVER}
                />
              </div>
              <p className="result-list__item-title">{record.anzeigetitel}</p>
            </>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ResultList;
