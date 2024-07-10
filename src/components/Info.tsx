import React from 'react';

const Info = () => {
  return (
    <div>
      <ol className="flex flex-col space-y-4 text-base font-semibold">
        <li className="flex items-center space-x-4">
          <div className="w-[1.25rem] h-[1.25rem] drop-shadow-lg rounded-full ring-2 ring-white bg-gradient-to-r from-[#379FFF] to-[#647CF9]"></div>
          <span>76 ~ 100</span>
        </li>
        <li className="flex items-center space-x-4">
          <div className="w-[1.25rem] h-[1.25rem] drop-shadow-lg rounded-full ring-2 ring-white bg-gradient-to-r from-[#96CDFF] to-[#00E6B9]"></div>
          <span>51 ~ 75</span>
        </li>
        <li className="flex items-center space-x-4">
          <div className="w-[1.25rem] h-[1.25rem] drop-shadow-lg rounded-full ring-2 ring-white bg-gradient-to-r from-[#E6EB00] to-[#EBC500]"></div>
          <span>26 ~ 50</span>
        </li>
        <li className="flex items-center space-x-4">
          <div className="w-[1.25rem] h-[1.25rem] drop-shadow-lg rounded-full ring-2 ring-white bg-gradient-to-r from-[#DA4E00] to-[#B30000]"></div>
          <span>26 ~ 50</span>
        </li>
      </ol>
    </div>
  );
};

export default Info;
