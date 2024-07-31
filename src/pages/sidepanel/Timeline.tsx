import React, { useEffect, useRef, useState } from 'react';
import logo from '@root/src/assets/img/Logo.svg';
import TimelineIcon from '@src/assets/img/TimelineIcon.svg';
import line from '@src/assets/img/Line1.svg';
import PerfectScrollbar from 'react-perfect-scrollbar';

interface ArticleData {
  title: string;
  url: string;
}

interface GroupedArticles {
  date: string;
  articles: ArticleData[];
}

const Timeline: React.FC = () => {
  const [timelineData, setTimelineData] = useState<GroupedArticles[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);

  // 전체화면 스크롤 방지
  useEffect(() => {
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.height = '100%';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.height = '';
      document.body.style.overflow = '';
      document.documentElement.style.height = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  // 로컬 저장소에서 기사 데이터 가져오기
  useEffect(() => {
    chrome.storage.local.get('articleData', (result) => {
      if (result.articleData) {
        const data = result.articleData;

        // 날짜별로 그룹화
        const groupedData = data.reduce((acc: { [key: string]: ArticleData[] }, item: any) => {
          const date = item.published_date.split(' ')[0]; // 날짜만 추출
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push({
            title: item.title,
            url: item.url,
          });
          return acc;
        }, {});

        // 그룹화된 데이터를 배열로 변환
        const formattedData = Object.keys(groupedData).map((date) => ({
          date,
          articles: groupedData[date],
        }));
        console.log(formattedData);
        setTimelineData(formattedData);
      }
    });
  }, []);

  const handleButtonClick = () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('src/pages/newtab/index.html') });
    window.close();
  };

  // 로고 및 타임라인
  return (
    <div className="justify-center w-[30rem] h-[100vh] overflow-hidden flex flex-col">
      <div className="flex h-[7.25rem] items-center justify-start">
        <img src={logo} alt="Logo" onClick={handleButtonClick} className="h-[3rem] mx-8 cursor-pointer" />
      </div>
      <div className="text-midnight">
        <div className="px-[2rem] flex items-center">
          <img src={TimelineIcon} alt="Scrap Icon" />
          <p className="ml-1 font-extrabold text-[1.5rem]">타임라인</p>
        </div>

        <p className="px-[2rem] py-[0.75rem] text-[1.25rem]">
          현재 기사와 관련된 사건들을 일자별로 나열한
          <br />
          타임라인입니다.
        </p>
      </div>
      <div className="px-8 pt-[1.25rem] pb-8">
        <img src={line} alt="Line" />
      </div>
      <PerfectScrollbar className="flex-grow mb-8 ml-8 overflow-y-auto">
        {timelineData.map((item, index) => (
          <div key={index} className="relative flex items-start w-full">
            {/* 흰색 세로선 */}
            <div className="absolute left-[0.625rem] top-0 w-[0.175rem] h-[100%] bg-white z-0"></div>
            {/* 파란색 원 */}
            <div className="relative flex items-center justify-center w-[1.5rem] h-[1.5rem] mt-8 bg-blue-500 rounded-full border-2 border-white z-10">
              <span className="justify-center items-center absolute text-lg text-white left-[2rem] flex font-semibold whitespace-nowrap">
                {item.date}
              </span>
            </div>
            <div className="mt-[3rem] ml-[1.25rem] w-[75%] text-base text-md text-white">
              <ul className="list-disc mt-[1rem]">
                {item.articles.map((article, articleIndex) => (
                  <li key={articleIndex} className="mt-2">
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      {article.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </PerfectScrollbar>
    </div>
  );
};

export default Timeline;
