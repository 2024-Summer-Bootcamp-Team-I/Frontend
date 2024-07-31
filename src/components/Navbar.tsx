import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '@root/src/assets/img/Logo.svg';
import SearchBar from './SearchBar';

const Navbar = ({ long, short, isBlurActive }) => {
  const NavBarRef = useRef<HTMLDivElement>();

  const location = useLocation();
  const currentPage = location.pathname;

  const ChangeNavbarBg = () => {
    NavBarRef.current.className =
      'sticky top-0 flex justify-between pt-[2.25rem] pb-1 transition duration-300 backdrop-blur-md z-10';
  };

  const NavbarBgToOrigin = () => {
    NavBarRef.current.className = 'sticky top-0 flex justify-between pt-[2.25rem] z-10';
  };

  const HandleOnboarding = () => {
    ChangeNavbarBg();
    long();
  };

  const HandleRest = () => {
    NavbarBgToOrigin();
    short();
  };

  useEffect(() => {
    if (NavBarRef.current) {
      if (isBlurActive) {
        // NavBarRef.current.classList.add('bg-[#64BBF9]', 'bg-opacity-60', 'backdrop-blur-md');
        ChangeNavbarBg();
      } else {
        // NavBarRef.current.classList.remove('bg-[#64BBF9]', 'bg-opacity-60', 'backdrop-blur-md');
        NavbarBgToOrigin();
      }
    }
  }, [isBlurActive]);

  return (
    <div ref={NavBarRef} className="sticky top-0 flex justify-between pt-[2.25rem] z-10">
      <div className="flex text-2xl place-items-center">
        <Link to="onboarding">
          <img src={logo} alt="Logo" className="px-[3rem] h-[3rem]" onClick={long} />
        </Link>
        <div className="flex space-x-[0.125rem]">
          <Link to="/relatednews">
            <button
              className={`w-[11.2rem] h-[3rem] text-center rounded-full content-center ${currentPage === '/relatednews' ? 'bg-midnight text-white shadow-inner' : ''}`}
              onClick={HandleRest}
            >
              판별된 기사
            </button>
          </Link>
          <Link to="/mynews">
            <button
              className={`w-[10rem] h-[3rem] text-center rounded-full content-center ${currentPage === '/mynews' ? 'bg-midnight text-white shadow-inner' : ''}`}
              onClick={HandleRest}
            >
              스크랩
            </button>
          </Link>
          <Link to="/serviceinfo">
            <button
              className={`w-[10.4rem] h-[3rem] text-center rounded-full content-center ${currentPage === '/serviceinfo' ? 'bg-midnight text-white shadow-inner' : ''}`}
              onClick={HandleRest}
            >
              판별 통계
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
