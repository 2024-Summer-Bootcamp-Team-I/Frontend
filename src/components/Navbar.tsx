import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '@root/src/assets/img/logo.png';
import SearchBar from './SearchBar';

const Navbar = () => {
  const location = useLocation();
  const currentPage = location.pathname;

  return (
    <div className="flex justify-between pt-[2.25rem]">
      <div className="flex text-2xl place-items-center">
        <img src={logo} alt="Logo" className="px-[3rem]" />
        <div className="flex space-x-[0.125rem]">
          <Link to="/related-news">
            <button
              className={`w-[10rem] h-[3rem] text-center rounded-full content-center ${currentPage === '/related-news' ? 'bg-midnight text-white shadow-inner' : ''}`}
            >
              판별된 기사
            </button>
          </Link>
          <Link to="/my-news">
            <button
              className={`w-[10rem] h-[3rem] text-center rounded-full content-center ${currentPage === '/my-news' ? 'bg-midnight text-white shadow-inner' : ''}`}
            >
              나의 기사
            </button>
          </Link>
          <Link to="/service-info">
            <button
              className={`w-[10rem] h-[3rem] text-center rounded-full content-center ${currentPage === '/service-info' ? 'bg-midnight text-white shadow-inner' : ''}`}
            >
              서비스 정보
            </button>
          </Link>
        </div>
      </div>
      <SearchBar />
    </div>
  );
};

export default Navbar;
