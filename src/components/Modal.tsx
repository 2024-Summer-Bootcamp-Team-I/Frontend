import React from 'react';

const Modal = ({ notice, handleClose }) => {
  return (
    <div className="flex-z-3 flex justify-center w-[20rem] h-[10rem] bg-white rounded-3xl">
      <div className="flex flex-col items-center justify-evenly">
        <p className="text-[1rem] text-black">{notice}</p>
        <button onClick={handleClose} className="w-[9rem] h-[3rem] text-[1rem] text-white bg-[#106aab] rounded-full">
          확인
        </button>
      </div>
    </div>
  );
};

export default Modal;
