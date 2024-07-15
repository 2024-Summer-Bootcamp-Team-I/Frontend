import React from 'react';
import logo from '@root/src/assets/img/logo.png';
import SearchBar from './SearchBar';

type NavbarProps = {
  currentPage: 'ClassifiedNews' | 'MyNews' | 'ChannelRanking';
  onClick: (page: 'ClassifiedNews' | 'MyNews' | 'ChannelRanking') => void;
};

const Navbar = ({ currentPage, onClick }: NavbarProps) => {
  const handleButtonClick = (page: 'ClassifiedNews' | 'MyNews' | 'ChannelRanking') => {
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
            className={`w-[10rem] h-[3rem] text-center rounded-full content-center ${currentPage === 'ClassifiedNews' ? 'bg-midnight text-white shadow-inner' : ''}`}
            onClick={() => handleButtonClick('ClassifiedNews')}
          >
            검증된 기사
          </button>
          <button
            className={`w-[10rem] h-[3rem] text-center rounded-full content-center ${currentPage === 'MyNews' ? 'bg-midnight text-white shadow-inner' : ''}`}
            onClick={() => handleButtonClick('MyNews')}
          >
            나의 기사
          </button>
          <button
            className={`w-[10rem] h-[3rem] text-center rounded-full content-center ${currentPage === 'ChannelRanking' ? 'bg-midnight text-white shadow-inner' : ''}`}
            onClick={() => handleButtonClick('ChannelRanking')}
          >
            언론사 랭크
          </button>
        </div>
      </div>
      <SearchBar />
    </div>
  );
};

export default Navbar;
