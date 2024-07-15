import React from 'react';
import xbutton from '@src/assets/img/xbutton.svg';

const TrustScoreModal = () => {
  return (
    <div>
      <div className="bg-white w-[13.375rem] h-[18.75rem] rounded-2xl shadow-xl ">
        <div className="flex justify-end pt-[0.5rem] pr-[0.5rem]">
          <button>
            <img src={xbutton} alt="Xbutton" />
          </button>
        </div>
        <div className="flex justify-between items-center pl-[1.5rem]">
          <div className="text-[1rem] text-[#505050] pb-[1rem]">신뢰도 수치 단위 (%)</div>
        </div>
        <div className="space-y-[1.5rem] text-[1.25rem] font-semibold pl-[1.5rem]">
          <div className="flex items-center">
            <div className="drop-shadow-lg w-[2rem] h-[2rem] rounded-full ring-2 ring-white bg-gradient-to-r from-[#379FFF] to-[#647CF9]"></div>
            <span className="ml-2">76 ~ 100</span>
          </div>
          <div className="flex items-center">
            <div className="drop-shadow-lg w-[2rem] h-[2rem] rounded-full ring-2 ring-white bg-gradient-to-r from-[#96CDFF] to-[#00E6B9]"></div>
            <span className="ml-2">51 ~ 75</span>
          </div>
          <div className="flex items-center">
            <div className="drop-shadow-lg w-[2rem] h-[2rem] rounded-full ring-2 ring-white bg-gradient-to-r from-[#E6EB00] to-[#EBC500]"></div>
            <span className="ml-2">26 ~ 50</span>
          </div>
          <div className="flex items-center">
            <div className="drop-shadow-lg w-[2rem] h-[2rem] rounded-full ring-2 ring-white bg-gradient-to-r from-[#DA4E00] to-[#B30000]"></div>
            <span className="ml-2">1 ~ 25</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustScoreModal;
