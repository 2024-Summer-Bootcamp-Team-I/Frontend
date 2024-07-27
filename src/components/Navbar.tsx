import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '@root/src/assets/img/Logo.svg';
import SearchBar from './SearchBar';

const Navbar = () => {
  const location = useLocation();
  const currentPage = location.pathname;

  return (
    <div className="font-pretendardFontBold flex justify-between pt-[2.25rem]">
      <div className="flex text-2xl place-items-center">
        <img src={logo} alt="Logo" className="px-[3rem] h-[3rem] cursor-pointer" />
        <div className="flex space-x-[0.125rem]">
          <Link to="/relatednews">
            <button
              className={`w-[11.2rem] h-[3rem] text-center rounded-full content-center cursor-pointer ${currentPage === '/relatednews' ? 'bg-midnight text-white shadow-inner' : ''}`}
            >
              판별된 기사
            </button>
          </Link>
          <Link to="/mynews">
            <button
              className={`w-[10rem] h-[3rem] text-center rounded-full content-center cursor-pointer ${currentPage === '/mynews' ? 'bg-midnight text-white shadow-inner' : ''}`}
            >
              스크랩
            </button>
          </Link>
          <Link to="/serviceinfo">
            <button
              className={`w-[10.4rem] h-[3rem] text-center rounded-full content-center cursor-pointer ${currentPage === '/serviceinfo' ? 'bg-midnight text-white shadow-inner' : ''}`}
            >
              분석 통계
            </button>
          </Link>
        </div>
      </div>
      <SearchBar />
    </div>
  );
};

export default Navbar;
