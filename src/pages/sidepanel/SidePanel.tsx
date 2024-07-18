import React, { useRef, useState } from 'react';
import '@src/global.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import bgSidePanel from '@src/assets/img/bg_sidepannel.svg';
import Scrap from './Scrap';
import Signup from './Signup';
import Login from './Login';
import Modal from '@src/components/Modal';

const SidePanel = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const outside = useRef();

  const handleOutsideClick = (e) => {
    if (outside.current && outside.current === e.target) {
      closeModal();
    }
  };

  return (
    <div
      className="flex justify-center w-screen h-screen bg-bottom bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${bgSidePanel})`,
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <Signup />
        {showModal && (
          <div>
            <div
              ref={outside}
              onClick={handleOutsideClick}
              className="fixed inset-0 flex items-center justify-center bg-black opacity-50 z-2"
            ></div>
            <div className="fixed inset-0 flex items-center justify-center z-1" onClick={handleOutsideClick}>
              <Modal handleClose={closeModal} notice="이메일 형식이 올바르지 않습니다." />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);
