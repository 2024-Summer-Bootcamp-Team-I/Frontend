import React from 'react';
import '@src/global.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import backGround from '@src/assets/img/bg_img.svg';
import Navbar from '@src/components/Navbar';
import SearchBar from '@root/src/components/SearchBar';

const Newtab = () => {
  return (
    <div
      className="w-screen h-screen bg-bottom bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${backGround})`,
      }}
    >
      <Navbar />
    </div>
  );
};

export default withErrorBoundary(withSuspense(Newtab, <div> Loading ... </div>), <div> Error Occur </div>);
