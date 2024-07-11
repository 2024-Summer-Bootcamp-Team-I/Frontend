import React from 'react';
import LiquidFillGauge from './LiquidFillGauge';
import TrustScoreInfo from './TrustScoreInfo';

type TrustScoreProps = {
  newsId: number;
  score: number;
};

const TrustScore: React.FC<TrustScoreProps> = ({ newsId, score }) => {
  return (
    <div className="flex-col w-[26rem] h-[18rem] bg-white rounded-[2.5rem] shadow-lg">
      <p className="px-[2.5rem] py-8 text-2xl underline underline-offset-8 text-[#106AAB] font-semibold">판별 점수</p>
      <div className="flex justify-between mx-[2.5rem]">
        <div className="w-[10rem] h-[10rem]">
          <LiquidFillGauge elementId={newsId} value={score} />
        </div>

        <div className="flex flex-col">
          <p className="text-base text-[#505050] pb-[0.75rem] leading-5">판별 점수 단위 (%)</p>
          <TrustScoreInfo />
        </div>
      </div>
    </div>
  );
};

export default TrustScore;
