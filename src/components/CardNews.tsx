import React from 'react';
import tvIcon from '@src/assets/img/TV.svg';
import calendarIcon from '@assets/img/Calendar.svg';
import LiquidFillGauge from './LiquidFillGauge';

const CardNews = () => {
  const config = {
    waveAnimate: false,
    waveRise: false,
    valueCountUp: false,
  };

  return (
    <div className="w-[26rem] 3xl:w-[35rem] 4xl:w-[47.375rem] h-[11.5rem] 3xl:h-[12rem] 4xl:h-[16rem] bg-white rounded-[1.875rem] shadow-md">
      <div className="w-[26rem] 3xl:w-[35rem] 4xl:w-[47.375rem] h-[4.625rem] 3xl:h-[5.125rem] 4xl:h-[9.125rem] bg-gray-500 rounded-ss-[1.875rem] rounded-se-[1.875rem]" />
      <div className="flex items-center justify-between">
        <div className="flex flex-col m-5 w-[18.25rem] 3xl:w-[27.25rem] 4xl:w-[39.625rem] h-[4.375rem] ">
          <p className="flex-1 items-start text-[1rem] font-semibold">
            [뉴스줌인]라인야후, 탈네이버 본격화... 글로벌 사업 '분수령'
          </p>
          <div className="flex items-end justify-end">
            <div className="flex items-center ml-5">
              <img src={tvIcon} className="w-[0.75rem] h-[0.75rem]" />
              <span className="ml-2 text-[0.75rem]">한국일보</span>
            </div>
            <div className="flex items-center ml-5">
              <img src={calendarIcon} className="w-[0.75rem] h-[0.75rem]" />
              <span className="ml-2 text-[0.75rem]">2024.07.03</span>
            </div>
          </div>
        </div>
        <div className="m-5 ml-0 w-[4rem] h-[4rem]">
          <LiquidFillGauge elementId="gauge1" value={87} config={config} />
        </div>
      </div>
    </div>
  );
};

export default CardNews;
