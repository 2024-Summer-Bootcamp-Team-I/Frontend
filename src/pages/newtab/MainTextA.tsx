import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import tvIcon from '@src/assets/img/TV.svg';
import calendarIcon from '@assets/img/Calendar.svg';
import PerfectScrollbar from 'react-perfect-scrollbar';

const fetchNewsData = async (newsId: string) => {
  const response = await axios.get(`http://localhost:8000/api/v1/classifies/${newsId}`);
  const targetArticle = response.data.target_article;
  const similarArticles = response.data.similar_articles || [];
  const oppositeArticles = response.data.opposite_articles || [];

  return {
    ...targetArticle,
    similar_articles: similarArticles,
    opposite_articles: oppositeArticles,
  };
};

const MainTextA: React.FC = () => {
  const { newsId } = useParams<{ newsId: string }>();

  const {
    data: newsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['newsData', newsId],
    queryFn: () => fetchNewsData(newsId!),
    enabled: !!newsId,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <div className="flex items-center justify-center space-x-[2rem] 4xl:space-x-[4rem]">
      <div className="w-[54rem] 3xl:w-[70rem] 4xl:w-[80rem] h-[40rem] 3xl:h-[48rem] 4xl:h-[65rem] rounded-[2.5rem] bg-white p-[3rem] 4xl:p-[6rem] pr-0 4xl:pr-0 ">
        <PerfectScrollbar className="w-full h-full">
          <p className="text-2xl font-semibold pr-[3rem] 4xl:pr-[6rem]">{newsData.title}</p>
          <div className="flex items-end justify-end mt-4 mb-6 pr-[3rem] 4xl:pr-[6rem]">
            <div className="flex items-center ml-5">
              <img src={tvIcon} className="w-[1rem] h-[1rem]" />
              <span className="ml-2 text-base text-[#505050]">{newsData.channel}</span>
            </div>
            <div className="flex items-center ml-5">
              <img src={calendarIcon} className="w-[1rem] h-[1rem]" />
              <span className="ml-2 text-base text-[#505050]">{newsData.published_date}</span>
            </div>
          </div>
          <div className="pr-[3rem] 4xl:pr-[6rem]">
            <img src={newsData.img} alt={newsData.title} className="w-full h-full rounded-[2.5rem] scale-90" />
          </div>

          <p className="mt-8 text-base pr-[3rem] 4xl:pr-[6rem]">{newsData.content}</p>
        </PerfectScrollbar>
      </div>
      <div className="flex flex-col space-y-[2rem] 4xl:space-y-[4rem]">
        <div className="w-[30rem] h-[11rem] 3xl:h-[14rem] 4xl:h-[17rem] rounded-[2.5rem] bg-white pl-10 py-8">
          <PerfectScrollbar className="w-full h-full">
            <p className="text-2xl underline underline-offset-8 text-[#078A0C] font-semibold pb-8">뉴스 요약</p>
            <p className="pr-10 text-base">{newsData.summarize}</p>
          </PerfectScrollbar>
        </div>
        <div className="w-[30rem] h-[12.5rem] 3xl:h-[15rem] 4xl:h-[20rem] rounded-[2.5rem] bg-white pl-10 py-8">
          <PerfectScrollbar className="w-full h-full">
            <p className="text-2xl underline underline-offset-8 text-[#106A0A] font-semibold pb-8">관련 기사</p>
            {newsData.similar_articles.map((article, index) => (
              <p key={index} className="pr-10 text-base">
                {index + 1}.{' '}
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  {article.title}
                </a>
              </p>
            ))}
          </PerfectScrollbar>
        </div>
        <div className="w-[30rem] h-[12.5rem] 3xl:h-[15rem] 4xl:h-[20rem] rounded-[2.5rem] bg-white pl-10 py-8">
          <PerfectScrollbar className="w-full h-full">
            <p className="text-2xl underline underline-offset-8 text-[#C20A0A] font-semibold pb-8">반대 기사</p>
            {newsData.opposite_articles.map((article, index) => (
              <p key={index} className="pr-10 text-base">
                {index + 1}.{' '}
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  {article.title}
                </a>
              </p>
            ))}
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};

export default MainTextA;
