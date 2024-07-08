import React from 'react';
import '@src/global.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import bgSidePanel from '@src/assets/img/bg_sidepannel.svg';

const SidePanel = () => {
  return (
    <div
      className="w-screen h-screen bg-bottom bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${bgSidePanel})`,
      }}
    >
      <h1>My navernews sidepanel</h1>
      <p>This side panel will display only on https://news.naver.com/</p>
    </div>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);
