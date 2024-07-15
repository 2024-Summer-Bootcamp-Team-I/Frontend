import React from 'react';
import logo from '@root/src/assets/img/logo.png';
import SearchBar from './SearchBar';

type NavbarProps = {
  currentPage: 'RelatedNews' | 'MyNews' | 'ServiceInfo';
  onClick: (page: 'RelatedNews' | 'MyNews' | 'ServiceInfo') => void;
};

const Navbar = ({ currentPage, onClick }: NavbarProps) => {
  const handleButtonClick = (page: 'RelatedNews' | 'MyNews' | 'ServiceInfo') => {
    if (currentPage === page) {
      window.location.reload();
    } else {
      localStorage.setItem('currentPage', page);
      onClick(page);
    }
  };

  return (
    <div className="flex justify-between pt-[2.25rem]">
      <div className="flex text-2xl place-items-center">
        <img src={logo} alt="Logo" className="px-[3rem]" />
        <div className="flex space-x-[0.125rem]">
          <button
            className={`w-[10rem] h-[3rem] text-center rounded-full content-center ${currentPage === 'RelatedNews' ? 'bg-midnight text-white shadow-inner' : ''}`}
            onClick={() => handleButtonClick('RelatedNews')}
          >
            판별된 기사
          </button>
          <button
            className={`w-[10rem] h-[3rem] text-center rounded-full content-center ${currentPage === 'MyNews' ? 'bg-midnight text-white shadow-inner' : ''}`}
            onClick={() => handleButtonClick('MyNews')}
          >
            나의 기사
          </button>
          <button
            className={`w-[10rem] h-[3rem] text-center rounded-full content-center ${currentPage === 'ServiceInfo' ? 'bg-midnight text-white shadow-inner' : ''}`}
            onClick={() => handleButtonClick('ServiceInfo')}
          >
            서비스 정보
          </button>
        </div>
      </div>
      <SearchBar />
    </div>
  );
};

export default Navbar;
