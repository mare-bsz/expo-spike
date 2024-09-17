import React from 'react';
import Header from '../../components/Header/Header';
import './Home.scss';
import Search from '../../components/Search/Search';

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <main role="main">
        <div className="content">
          <Search />
        </div>
      </main>
    </>
  );
};

export default Home;
