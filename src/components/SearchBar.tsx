import React, { useState } from 'react';
import searchicon from '@src/assets/img/SearchIcon.svg';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  // 입력값 변경 시 상태 업데이트
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-end font-pretendardFont">
      <div className="shadow-lg flex justify-between w-[30rem] h-[3rem] mr-[3rem] border border-black rounded-full text-[1rem] hover:border-white hover:border-3 focus:border-white focus:border-4">
        <input
          type="text"
          placeholder="검색"
          value={query}
          onChange={handleChange}
          className="w-[26rem] p-2 pl-4 m-0 text-black placeholder-gray-600 bg-transparent rounded-full focus:outline-none focus:text-white focus:placeholder-opacity-0"
        />
        <button type="submit">
          <img
            className="mr-4 duration-200 hover:filter hover:invert transition-filter"
            src={searchicon}
            alt="검색 아이콘"
          />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
