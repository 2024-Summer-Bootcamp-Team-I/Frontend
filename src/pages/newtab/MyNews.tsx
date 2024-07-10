import LiquidFillGauge from '@root/src/components/LiquidFillGauge';
import React from 'react';

const MyNews = () => {
  return (
    <div className="flex mx-10">
      <LiquidFillGauge elementId="gauge1" value={25} />
      <LiquidFillGauge elementId="gauge2" value={50} />
      <LiquidFillGauge elementId="gauge3" value={75} />
      <LiquidFillGauge elementId="gauge4" value={100} />
    </div>
  );
};

export default MyNews;
