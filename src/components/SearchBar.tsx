import searchicon from '@src/assets/img/SearchIcon.svg';

const SearchBar = () => {
  return (
    <div className="flex justify-end">
      <div className="shadow-lg flex justify-between w-[30rem] h-[3rem] mr-[3rem] border border-black rounded-full text-[1rem] hover:border-white hover:border-3 focus:border-white focus:border-4">
        <input
          type="text"
          placeholder="검색"
          className="w-[26rem] p-2 pl-4 m-0 text-black placeholder-gray-600 bg-transparent rounded-full focus:outline-none focus:text-white focus:placeholder-opacity-0"
        />
        <button type="submit">
          <img
            className="mr-4 duration-200 hover:filter hover:invert transition-filter"
            src={searchicon}
            alt="대체텍스트"
          />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
