import React, { useRef, useState } from 'react';
import '@src/global.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import bgSidePanel from '@src/assets/img/bg_sidepannel.svg';
import Scrap from './Scrap';
import Signup from './Signup';
import Login from './Login';
import Modal from '@src/components/Modal';

const SidePanel: React.FC = () => {
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
        <Scrap />
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);
