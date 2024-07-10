import React, { useState, useEffect } from 'react';
import '@src/global.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import backGround from '@src/assets/img/bg_img.svg';
import Navbar from '@src/components/Navbar';
import ClassifiedNews from './ClassifiedNews';
import ChannelRanking from './ChannelRanking';
import MyNews from './MyNews';

const Newtab = () => {
  const [currentPage, setCurrentPage] = useState<'ClassifiedNews' | 'MyNews' | 'ChannelRanking'>('ClassifiedNews');

  useEffect(() => {
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
      setCurrentPage(savedPage as 'ClassifiedNews' | 'MyNews' | 'ChannelRanking');
    }
  }, []);

  return (
    <div
      className="flex flex-col w-screen h-screen bg-bottom bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${backGround})`,
      }}
    >
      <Navbar currentPage={currentPage} onClick={setCurrentPage} />
      <div className="flex items-center justify-center flex-grow">
        {currentPage === 'ClassifiedNews' && <ClassifiedNews />}
        {currentPage === 'MyNews' && <MyNews />}
        {currentPage === 'ChannelRanking' && <ChannelRanking />}
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Newtab, <div> Loading ... </div>), <div> Error Occur </div>);
