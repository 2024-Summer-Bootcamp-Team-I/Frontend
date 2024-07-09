import articleEx from '@src/assets/img/article1.svg';
import tvIcon from '@src/assets/img/TV.svg';
import calendarIcon from '@assets/img/Calendar.svg';
import waterdrop from '@assets/img/waterdrop.svg';

const SavedNews = () => {
  return (
    <div className="flex flex-row w-[65rem] h-[15rem] bg-white rounded-[3.75rem] shadow-lg">
      <div className="flex items-center ml-[1.25rem]">
        <img src={articleEx} alt="ArticleImage" className="h-[12.5rem] w-[12.5rem] rounded-[2.5rem]" />
      </div>
      <div className=" w-[36.75rem] h-[10.5rem] whitespace-nowrap">
        <p className="ml-[2rem] mt-[1.25rem] text-[1.5rem] font-semibold">
          [뉴스줌인]라인야후, 탈네이버 본격화…글로벌 사업 '분수령'
        </p>
        <p className=" ml-[2rem] mt-[2rem] text-[1rem] whitespace-pre-line">
          라인야후가 일본 총무성 2차 행정지도에 대한 보고서를 제출하며 탈네이버 행보를 본격화했다. 네이버와 소프트뱅크
          간 지분 협상은 장기화될 조짐이다. 라인야후와의 추가 협상은 네이버 해외 사업의 분수령으로 작용할 전망이다.
        </p>
        <div className="flex items-end justify-end mt-[1.5rem] text-[#505050]">
          <div className="flex items-center ml-5">
            <img src={tvIcon} className="w-[1rem] h-[1rem]" />
            <span className="ml-2 text-[1rem]">한국일보</span>
          </div>
          <div className="flex items-center ml-5">
            <img src={calendarIcon} className="w-[1rem] h-[1rem]" />
            <span className="ml-2 text-[1rem]">2024.07.03</span>
          </div>
        </div>
      </div>
      <div className="flex items-center pl-[2rem]">
        <img src={waterdrop} alt="percentBar" />
      </div>
    </div>
  );
};

export default SavedNews;
