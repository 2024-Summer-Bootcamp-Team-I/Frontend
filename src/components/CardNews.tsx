import React from 'react';
import articleEx from '@src/assets/img/article2.svg';
import tvIcon from '@src/assets/img/TV.svg';
import calendarIcon from '@assets/img/Calendar.svg';
import percentEx from '@assets/img/percentEx.svg';

const CardNews = () => {
  return (
    <div className="w-[25rem] h-[14rem] bg-white rounded-[1.875rem] shadow-md">
      <div className="w-[25rem] h-[7.5rem]">
        <img src={articleEx} />
      </div>
      <div className="flex">
        <div className="flex flex-col m-5 w-[17.25rem] h-[4.375rem] ">
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
        <img className="m-5 ml-0 w-[4rem] h-[4rem]" src={percentEx} />
      </div>
    </div>
  );
};

export default CardNews;
