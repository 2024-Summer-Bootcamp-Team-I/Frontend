import React, { useState } from 'react';
import logo from '@root/src/assets/img/logo.png';
import emailicon from '@root/src/assets/img/emailicon.svg';
import passwordicon from '@root/src/assets/img/passwordicon.svg';

const Login = () => {
  const data = ['가입되지 않은 이메일입니다.', '비밀번호가 일치하지 않습니다.', '이메일 양식이 잘못되었습니다.'];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isButtonDisabled = !email || !password;
  const handleLoginClick = () => {
    if (isButtonDisabled) {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <img src={logo} alt="Logo" className="w-[5rem] h-[1.5rem] mb-[5.5rem]" />
      <div className="space-y-[1.5rem]">
        <div className="flex items-center w-[24rem] h-[3.75rem] bg-white rounded-full border border-gray-400">
          <input type="text" placeholder="Email" className="w-[17.5rem] mx-[1.5rem] text-base focus:outline-none" />
          <img src={emailicon} alt="EmailIcon" />
        </div>
        <div className="flex items-center w-[24rem] h-[3.75rem] bg-white rounded-full border border-gray-400">
          <input type="text" placeholder="Password" className="w-[17.5rem] mx-[1.5rem] text-base focus:outline-none" />
          <img src={passwordicon} alt="PasswordIcon" />
        </div>
      </div>
      <button
        disabled={isButtonDisabled}
        className="w-[12.5rem] h-[3.75rem] mt-[3rem] mb-[0.75rem] bg-midnight rounded-full text-xl text-white shadow-lg"
      >
        로그인
      </button>
      <p className="text-white text-[1rem] underline">회원가입</p>
    </div>
  );
};

export default Login;
