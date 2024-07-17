import React, { useState } from 'react';
import logo from '@root/src/assets/img/logo.png';
import emailicon from '@root/src/assets/img/emailicon.svg';
import passwordicon from '@root/src/assets/img/passwordicon.svg';
import axios from 'axios';
import Modal from '@root/src/components/Modal';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isButtonDisabled = !email || !password;

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const fetchPost = async () => {
    try {
      //에러 해당x 정상적으로 동작하는 코드들
      const response = await axios.post('http://localhost:8000/api/v1/accounts/login', { email, password });
      console.log(response.data);

      // 스크랩 사이드패널로 이동하는 코드 작성
    } catch (error) {
      setErrorMessage(error.response.data.message);
      openModal();
      console.log('Error', error.response.data.message);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginClick = () => {
    if (isButtonDisabled) {
      // setIsModalOpen(true);
    } else {
      fetchPost();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <img src={logo} alt="Logo" className="w-[5rem] h-[1.5rem] mb-[5.5rem]" />
      <div className="space-y-[1.5rem]">
        <div className="flex items-center w-[24rem] h-[3.75rem] bg-white rounded-full border border-gray-400">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="w-[17.5rem] mx-[1.5rem] text-base focus:outline-none"
          />
          <img src={emailicon} alt="EmailIcon" />
        </div>
        <div className="flex items-center w-[24rem] h-[3.75rem] bg-white rounded-full border border-gray-400">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="w-[17.5rem] mx-[1.5rem] text-base focus:outline-none"
          />
          <img src={passwordicon} alt="PasswordIcon" />
        </div>
      </div>
      <button
        disabled={isButtonDisabled}
        onClick={handleLoginClick}
        className={`w-[12.5rem] h-[3.75rem] mt-[3rem] mb-[0.75rem] rounded-full text-xl text-white shadow-lg ${isButtonDisabled ? 'bg-gray-500' : 'bg-midnight'}`}
      >
        로그인
      </button>
      <p className="text-white text-[1rem] underline">회원가입</p>
      {showModal && (
        <div>
          <div className="fixed inset-0 flex items-center justify-center bg-black opacity-50 z-2"></div>
          <div className="fixed inset-0 flex items-center justify-center z-1">
            <Modal handleClose={closeModal} notice={errorMessage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
