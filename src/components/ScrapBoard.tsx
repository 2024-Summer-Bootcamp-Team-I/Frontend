import articleEx from '@src/assets/img/article1.svg';
import tvIcon from '@src/assets/img/TV.svg';
import calendarIcon from '@assets/img/Calendar.svg';

const ScrapBoard = () => {
  return (
    <div className="flex w-[26rem] h-[7.5rem] mx-[2rem] my-[1.25rem] bg-white rounded-[1.25rem] shadow-lg">
      <div className="m-3 w-[6rem] h-[6rem] bg-black rounded-[0.875rem]">
        <img src={articleEx} />
      </div>
      <div className="flex flex-col my-3 w-[17.75rem] h-[6rem] bg-white ">
        <p className="flex-1 items-start m-1 text-[1rem] font-semibold">
          [뉴스줌인]라인야후, 탈네이버 본격화…글로벌 사업 '분수령'
        </p>
        <div className="flex items-end justify-end m-1">
          <div className="flex items-center ml-5">
            <img src={tvIcon} className="w-[0.75rem] h-[0.75rem]" />
            <span className="ml-2 text-[0.75rem]">한국일보</span>
          </div>
          <div className="flex items-center ml-5">
            <img src={calendarIcon} className="w-[0.75rem] h-[0.75rem]" />
            <span className="ml-2 text-[0.75rem]">2024.07.03</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrapBoard;
