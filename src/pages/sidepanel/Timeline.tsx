import React, { useEffect, useRef, useState } from 'react';
import ShortcutIcon from '@src/assets/img/ShortcutsIcon.svg';

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

        setTimelineData(formattedData);
      }
    });
  }, []);

  // 로고 및 타임라인
  return (
    <div className="justify-center w-[30rem] h-[100vh] overflow-hidden">
      <div className="flex h-[7.25rem] items-center justify-between">
        <p className="mx-8 h-[3rem] text-[2rem]">LOGO</p>
        <button className="flex mx-8 items-center justify-center w-[14rem] h-[3rem] bg-midnight text-white text-[1.25rem] rounded-full">
          <p className="pr-[0.5rem]">저장한 기사 보러가기</p>
          <img src={ShortcutIcon} alt="Shortcut Icon" />
        </button>
      </div>
      {timelineData.map((item, index) => (
        <div key={index} className="ml-[1.75rem] relative flex items-start w-full">
          {/* 흰색 세로선 */}
          <div className="absolute left-[0.625rem] rounded-full top-0 w-[0.175rem] h-[101%] bg-white z-0"></div>
          {/* 파란색 원 */}
          <div className="relative flex items-center justify-center w-[1.5rem] h-[1.5rem] mt-8 bg-blue-500 rounded-full border-2 border-white z-10">
            <span className="justify-center items-center absolute text-lg text-white left-[2rem] flex font-semibold whitespace-nowrap">
              {item.date}
            </span>
          </div>
          <div className="mt-[3rem] ml-[1.5rem] w-[80%] text-base text-md text-white">
            <ul className="list-disc">
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
    </div>
  );
};

export default Timeline;
