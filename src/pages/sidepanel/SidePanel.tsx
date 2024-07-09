import React from 'react';
import '@src/global.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import bgSidePanel from '@src/assets/img/bg_sidepannel.svg';
import Scrap from './Scrap';

const SidePanel = () => {
  return (
    <div
      className="flex justify-center w-screen h-screen bg-bottom bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${bgSidePanel})`,
      }}
    >
      <Scrap />
    </div>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);
