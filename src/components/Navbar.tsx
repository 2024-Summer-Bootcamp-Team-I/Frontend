import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '@root/src/assets/img/Logo.svg';
import SearchBar from './SearchBar';
import bgOnBoarding from '@src/assets/img/bg_onboarding.svg';
import backGround from '@src/assets/img/bg_img.svg';

const Navbar = ({ long, short }) => {
  const location = useLocation();
  const currentPage = location.pathname;

  return (
    <div className="flex justify-between pt-[2.25rem]">
      <div className="flex text-2xl place-items-center">
        <Link to="onboarding">
          <img src={logo} alt="Logo" className="px-[3rem] h-[3rem]" onClick={long} />
        </Link>
        <div className="flex space-x-[0.125rem]">
          <Link to="/relatednews">
            <button
              className={`w-[11.2rem] h-[3rem] text-center rounded-full content-center ${currentPage === '/relatednews' ? 'bg-midnight text-white shadow-inner' : ''}`}
              onClick={short}
            >
              판별된 기사
            </button>
          </Link>
          <Link to="/mynews">
            <button
              className={`w-[10rem] h-[3rem] text-center rounded-full content-center ${currentPage === '/mynews' ? 'bg-midnight text-white shadow-inner' : ''}`}
              onClick={short}
            >
              스크랩
            </button>
          </Link>
          <Link to="/serviceinfo">
            <button
              className={`w-[10.4rem] h-[3rem] text-center rounded-full content-center ${currentPage === '/serviceinfo' ? 'bg-midnight text-white shadow-inner' : ''}`}
              onClick={short}
            >
              판별 통계
            </button>
          </Link>
        </div>
      </div>
      <SearchBar />
    </div>
  );
};

export default Navbar;
