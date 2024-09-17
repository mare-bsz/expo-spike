import React from 'react';
import Header from '../../components/Header/Header';
import './Home.scss';
import Search from '../../components/Search/Search';

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="content">
        <Search />
      </div>
    </div>
  );
};

export default Home;
