import React from 'react';
import tvIcon from '@src/assets/img/TV.svg';
import calendarIcon from '@assets/img/Calendar.svg';
import LiquidFillGauge from './LiquidFillGauge';
import { useNavigate } from 'react-router-dom';

type CardNewsProps = {
  article: {
    newsId: number;
    title: string;
    content: string;
    img: string;
    publishedDate: string;
    channelName: string;
    score: number;
  };
};

const CardNews: React.FC<CardNewsProps> = ({ article }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/maintextc/${article.newsId}`);
  };
  return (
    <div
      onClick={handleClick}
      className="w-[26rem] 3xl:w-[35rem] 4xl:w-[47.375rem] h-[11.5rem] 3xl:h-[12rem] 4xl:h-[16rem] bg-white rounded-[1.875rem] shadow-md cursor-pointer"
    >
      <img
        src={article.img}
        alt={article.title}
        className="w-[26rem] 3xl:w-[35rem] 4xl:w-[47.375rem] h-[4.625rem] 3xl:h-[5.125rem] 4xl:h-[9.125rem] rounded-ss-[1.875rem] rounded-se-[1.875rem] object-cover"
      />

      <div className="flex items-center justify-between">
        <div className="flex flex-col m-5 w-[18.25rem] 3xl:w-[27.25rem] 4xl:w-[39.625rem] h-[4.375rem] ">
          <p className="flex-1 items-start text-[1rem] font-semibold">{article.title}</p>
          <div className="flex items-end justify-end">
            <div className="flex items-center ml-5">
              <img src={tvIcon} className="w-[0.75rem] h-[0.75rem]" />
              <span className="ml-2 text-[0.75rem] text-[#505050]">{article.channelName}</span>
            </div>
            <div className="flex items-center ml-5">
              <img src={calendarIcon} className="w-[0.75rem] h-[0.75rem]" />
              <span className="ml-2 text-[0.75rem] text-[#505050]">{article.publishedDate}</span>
            </div>
          </div>
        </div>
        <div className="m-5 ml-0 w-[4rem] h-[4rem]">
          <LiquidFillGauge elementId={article.newsId} value={article.score} />
        </div>
      </div>
    </div>
  );
};

export default CardNews;
