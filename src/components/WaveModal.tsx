import React from 'react';

const WaveModal = () => {
  return (
    <div className="fixed flex items-center justify-content top-[3.5rem] right-[1.5rem] bg-white h-[5rem] w-[24rem] rounded-2xl shadow-xl ">
      <p className="m-4 4xl:text-sm text-[1rem]">
        최근 7일 간 뉴스 인사이드가 판별한 기사 개수를 날짜별로 조회한 데이터입니다.
      </p>
    </div>
  );
};

export default WaveModal;
