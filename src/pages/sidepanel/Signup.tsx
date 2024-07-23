import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import logo from '@root/src/assets/img/Logo.svg';
import usernameicon from '@root/src/assets/img/usernameicon.svg';
import emailicon from '@root/src/assets/img/emailicon.svg';
import passwordicon from '@root/src/assets/img/passwordicon.svg';
import Modal from '@root/src/components/Modal';
import { useNavigate } from 'react-router-dom';

interface SignupData {
  email: string;
  password: string;
  name: string;
}

interface SignupResponse {
  message: string;
}

const signup = async (userData: SignupData): Promise<SignupResponse> => {
  const response = await axios.post('http://0.0.0.0:8000/api/v1/accounts/signup', userData);
  return response.data;
};

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notice, setNotice] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mutation = useMutation<SignupResponse, AxiosError<unknown>, SignupData>({
    mutationFn: signup,
    onSuccess: (data) => {
      setNotice('회원가입이 완료되었습니다.');
      setIsModalOpen(true);
    },
    onError: (error: AxiosError<SignupResponse>) => {
      const errorMessage = error.response?.data[0];
      setNotice(errorMessage);
      console.log(error);
      setIsModalOpen(true);
    },
  });

  const handleSignup = () => {
    mutation.mutate({ email, password, name: username });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNotice('');
    navigate(`/login`);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const isFormValid = username && email && password;

  return (
    <div className={`relative flex flex-col items-center ${isModalOpen ? 'overflow-hidden' : ''}`}>
      <img src={logo} alt="Logo" className="w-[16rem] h-[4rem] mb-[5.5rem]" />
      <div className="space-y-[1.5rem]">
        <div className="flex items-center w-[24rem] h-[3.75rem] bg-white rounded-full border border-gray-400">
          <input
            type="text"
            placeholder="UserName"
            className="w-[17.5rem] mx-[1.5rem] text-base focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <img src={usernameicon} alt="UsernameIcon" />
        </div>
        <div className="flex items-center w-[24rem] h-[3.75rem] bg-white rounded-full border border-gray-400">
          <input
            type="text"
            placeholder="Email"
            className="w-[17.5rem] mx-[1.5rem] text-base focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <img src={emailicon} alt="EmailIcon" />
        </div>
        <div className="flex items-center w-[24rem] h-[3.75rem] bg-white rounded-full border border-gray-400">
          <input
            type="password"
            placeholder="Password"
            className="w-[17.5rem] mx-[1.5rem] text-base focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <img src={passwordicon} alt="PasswordIcon" />
        </div>
      </div>
      <button
        className={`w-[12.5rem] h-[3.75rem] mt-[3rem] mb-[0.75rem] rounded-full text-xl text-white shadow-lg ${
          isFormValid ? 'bg-midnight' : 'bg-gray-400 cursor-not-allowed'
        }`}
        onClick={isFormValid ? handleSignup : null}
        disabled={!isFormValid}
      >
        가입하기
      </button>
      <p onClick={handleLoginClick} className="text-white text-[1rem] underline cursor-pointer">
        로그인
      </p>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10">
            <Modal notice={notice} handleClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
