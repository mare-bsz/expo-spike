import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import './Home.scss';
import Search from '../../components/Search/Search';
import ResultList from '../../components/ResultList/ResultList';
import { Record } from '../../types/types';

const Home: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);

  return (
    <div className="home">
      <Header />
      <main role="main">
        <div className="content">
          <Search setRecords={setRecords} />
          <ResultList records={records} />
        </div>
      </main>
    </div>
  );
};

export default Home;
