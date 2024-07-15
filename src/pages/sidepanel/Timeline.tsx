import React, { useEffect, useRef } from 'react';
import ShortcutIcon from '@src/assets/img/ShortcutsIcon.svg';

// 타임라인 데이터
interface TimelineData {
  date: string;
  title: string;
  description: string;
}

const timelineData: TimelineData[] = [
  { date: '', title: '2024.07.04', description: '기사 제목' },
  { date: '', title: '2024.07.03', description: '기사 제목' },
  { date: '', title: '2024.07.02', description: '기사 제목' },
  { date: '', title: '2024.07.01', description: '기사 제목' },
  { date: '', title: '2024.06.30', description: '기사 제목' },
];

// 타임라인 아이템
const TimelineItem: React.FC<{ date: string; title: string; description: string; isLast: boolean }> = ({
  date,
  title,
  description,
  isLast,
}) => {
  return (
    <div className="relative flex items-start w-full mb-8">
      <div className="flex flex-col items-center">
        <div className="w-6 h-6 mt-8 ml-[0.125rem] bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
          {date}
        </div>
        {!isLast && <div className="h-full border-l-2 border-white mt-4" />}
        {/* 마지막 항목이 아닌 경우 */}
      </div>
      <div className="ml-[0.375rem] mt-8 flex flex-col text-base text-white">
        <p className="text-lg font-semibold">{title}</p>
        <ul className="list-disc pl-6">
          <li>{description}</li>
          <li>{description}</li>
          <li>{description}</li>
        </ul>
      </div>
    </div>
  );
};

const Timeline: React.FC = () => {
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

  return (
    <div className="justify-center w-[30rem] h-[100vh] overflow-hidden">
      <div className="flex h-[7.25rem] items-center justify-between">
        <p className="mx-8 h-[3rem] text-[2rem]">LOGO</p>
        <button className="flex mx-8 items-center justify-center w-[14rem] h-[3rem] bg-midnight text-white text-[1.25rem] rounded-full">
          <p className="pr-[0.5rem]">저장한 기사 보러가기</p>
          <img src={ShortcutIcon} alt="Shortcut Icon" />
        </button>
      </div>
      <div
        ref={timelineRef}
        className="relative flex flex-col items-start ml-[2rem] mt-8 w-full h-[calc(100vh-7.25rem)] overflow-auto"
      >
        {/* 타임라인선의 길이를 위에 빠져나온 2.125rem만큼 더 길게 */}
        <div
          className="absolute left-3 top-0 w-[0.2rem] rounded-full bg-white"
          style={{ height: 'calc(100% + 2.125rem)' }}
        ></div>
        {timelineData.map((item, index) => (
          <TimelineItem
            key={index}
            date={item.date}
            title={item.title}
            description={item.description}
            isLast={index === timelineData.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
