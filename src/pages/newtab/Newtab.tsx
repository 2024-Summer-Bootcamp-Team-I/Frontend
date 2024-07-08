import React, { useState } from 'react';
import '@src/global.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import backGround from '@src/assets/img/bg_img.svg';
import Navbar from '@src/components/Navbar';
import ClassifiedNews from './ClassifiedNews';
import ChannelRanking from './ChannelRanking';
import MyNews from './MyNews';

const Newtab = () => {
  const [currentPage, setCurrentPage] = useState<'ClassifiedNews' | 'MyNews' | 'ChannelRanking'>('MyNews');
  return (
    <div
      className="w-screen h-screen bg-bottom bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${backGround})`,
      }}
    >
      <div>
        <Navbar currentPage={currentPage} onClick={setCurrentPage} />
        <div>
          {currentPage === 'ClassifiedNews' && <ClassifiedNews />}
          {currentPage === 'MyNews' && <MyNews />}
          {currentPage === 'ChannelRanking' && <ChannelRanking />}
        </div>
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Newtab, <div> Loading ... </div>), <div> Error Occur </div>);
