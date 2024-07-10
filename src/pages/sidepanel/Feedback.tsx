import React from 'react';
import line from '@src/assets/img/Line1.svg';
import FeedbackIcon from '@src/assets/img/FeedbackIcon.svg';
import ShortcutIcon from '@src/assets/img/ShortcutsIcon.svg';
import LiquidFillGauge from '@root/src/components/LiquidFillGauge';
import TruestScoreInfo from '@root/src/components/TruestScoreInfo';
import LeftStar from '@src/components/LeftStar';
import RatingStars from '@src/components/RatingStars';

const Feedback = () => {
  const handleRatingChange = (rating: number) => {
    console.log('Rating:', rating);
  };
  return (
    <div className="justify-center w-[30rem] h-[100vh]">
      <div className="flex h-[7.25rem] items-center justify-between">
        <p className="mx-8 h-[3rem] text-[2rem]">LOGO</p>
        <button className="flex mx-8 items-center justify-center w-[14rem] h-[3rem] bg-midnight text-white text-[1.25rem] rounded-full">
          <p className="pr-2">검증된 기사 보러가기</p>
          <img src={ShortcutIcon} />
        </button>
      </div>
      <div className="text-midnight">
        <div className="px-[2rem] flex items-center">
          <img src={FeedbackIcon} />
          <p className="ml-1 font-extrabold text-[1.5rem]">피드백</p>
        </div>
        <p className="px-[2rem] py-[0.75rem] text-[1.25rem]">
          해당 기사의 가짜뉴스 판별 점수에 대한 <br />
          별점을 남겨주세요!
        </p>
      </div>
      <div className="px-8 pt-[1.25rem]">
        <img src={line} />
      </div>
      <div className="flex-col w-[26rem] h-[18rem] bg-white rounded-[2.5rem] m-8 shadow-lg">
        <p className="px-[2.5rem] py-8 text-2xl underline underline-offset-8 text-[#106AAB] font-semibold">판별 점수</p>
        <div className="flex justify-between mx-[2.5rem]">
          <div className="w-[10rem] h-[10rem]">
            <LiquidFillGauge elementId="gauge1" value={25} />
          </div>

          <div className="flex flex-col">
            <p className="text-base text-[#505050] pb-[0.75rem] leading-5">판별 점수 단위 (%)</p>
            <TruestScoreInfo />
          </div>
        </div>
      </div>
      <div className="w-[26rem] h-[12.75rem] bg-white rounded-[2.5rem] m-8 shadow-lg">
        <div className="py-8">
          <RatingStars totalStars={5} onRatingChange={handleRatingChange} />
        </div>
      </div>
    </div>
  );
};

export default Feedback;
