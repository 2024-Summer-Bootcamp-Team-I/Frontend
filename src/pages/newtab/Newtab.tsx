import React, { useState } from 'react';
import '@src/global.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import backGround from '@src/assets/img/bg_img.svg';
import Navbar from '@src/components/Navbar';
import ClassifiedNews from './ClassifiedNews';
import ChannelRanking from './ChannelRanking';
import MyNews from './MyNews';
import LiquidFillGauge from '@src/components/LiquidFillGauge';

const Newtab = () => {
  const [currentPage, setCurrentPage] = useState<'ClassifiedNews' | 'MyNews' | 'ChannelRanking'>('MyNews');

  // 모션 없게 설정한 config 객체
  const config = {
    waveAnimate: false,
    waveRise: false,
    valueCountUp: false,
  };

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
      <div className="flex mb-10 drop-shadow-lg">
        <LiquidFillGauge elementId="gauge1" value={25} />
        <LiquidFillGauge elementId="gauge2" value={50} />
        <LiquidFillGauge elementId="gauge3" value={75} />
        <LiquidFillGauge elementId="gauge4" value={90} />
      </div>
      <div className="flex drop-shadow-lg">
        <LiquidFillGauge elementId="gauge5" value={25} config={config} />
        <LiquidFillGauge elementId="gauge6" value={50} config={config} />
        <LiquidFillGauge elementId="gauge7" value={75} config={config} />
        <LiquidFillGauge elementId="gauge8" value={90} config={config} />
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Newtab, <div> Loading ... </div>), <div> Error Occur </div>);
