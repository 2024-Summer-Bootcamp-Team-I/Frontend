import TrustScore from '@root/src/components/TrustScore';
import React from 'react';
import tvIcon from '@src/assets/img/TV.svg';
import calendarIcon from '@assets/img/Calendar.svg';
import PerfectScrollbar from 'react-perfect-scrollbar';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Lottie from 'react-lottie-player';
import loadingAnimation from '@src/assets/img/loading004.json';
import { formatDate } from '@root/utils/formatDate';

const fetchNewsData = async (newsId: string) => {
  const response = await axios.get(`https://localhost/api/v1/classifies/C/${newsId}`);
  console.log('Response:', response);
  const news = response.data.news;
  const score = response.data.score;
  const reason = response.data.reason;
  const channel = response.data.channel_name;
  return {
    ...news,
    score,
    reason,
    channel,
  };
};

const MainTextC: React.FC = () => {
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

  if (isLoading)
    return (
      <div>
        <Lottie loop animationData={loadingAnimation} play style={{ width: 300, height: 300 }} />
      </div>
    );

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  console.log('News data:', newsData);
  return (
    <div className="flex items-center justify-center space-x-[2rem] 4xl:space-x-[4rem]">
      <div className="w-[54rem] 3xl:w-[70rem] 4xl:w-[80rem] h-[40rem] 3xl:h-[48rem] 4xl:h-[65rem] rounded-[2.5rem] bg-white p-[3rem] 4xl:p-[6rem] pr-0 4xl:pr-0 ">
        <PerfectScrollbar className="w-full h-full">
          <p className="text-2xl font-bold pr-[3rem] 4xl:pr-[6rem]">{newsData.title}</p>
          <div className="flex items-end justify-end mt-4 mb-6 pr-[3rem] 4xl:pr-[6rem]">
            <div className="flex items-center ml-5">
              <img src={tvIcon} className="w-[1rem] h-[1rem]" />
              <span className="ml-2 text-base text-[#505050]">{newsData.channel}</span>
            </div>
            <div className="flex items-center ml-5">
              <img src={calendarIcon} className="w-[1rem] h-[1rem]" />
              <span className="ml-2 text-base text-[#505050]">{formatDate(newsData.published_date)}</span>
            </div>
          </div>
          <div className="pr-[3rem] 4xl:pr-[6rem]">
            <img src={newsData.img} alt={newsData.title} className="w-full h-full rounded-[2.5rem] scale-90" />
          </div>
          <p
            className="mt-8 text-base pr-[3rem] 4xl:pr-[6rem]"
            dangerouslySetInnerHTML={{ __html: newsData.content.replace(/\n/g, '<br/>') }}
          ></p>
        </PerfectScrollbar>
      </div>
      <div className="flex flex-col space-y-[2rem] 4xl:space-y-[4rem]">
        <div className="w-[30rem] h-[9rem] 3xl:h-[14rem] 4xl:h-[17rem] rounded-[2.5rem] bg-white pl-10 py-8">
          <PerfectScrollbar className="w-full h-full">
            <p className="text-2xl underline underline-offset-8 text-[#078A0C] font-semibold pb-8">뉴스 요약</p>
            <p className="pr-10 text-base">{newsData.summarize}</p>
          </PerfectScrollbar>
        </div>
        <TrustScore newsId={newsData.news_id} score={newsData.score} />
        <div className="w-[30rem] h-[9rem] 3xl:h-[12rem] 4xl:h-[21rem] rounded-[2.5rem] bg-white pl-10 py-8 mt-[2rem] 3xl:mt-0">
          <PerfectScrollbar className="w-full h-full">
            <p className="text-2xl underline underline-offset-8 text-[#106AAB] font-semibold pb-8">판단 근거 요약</p>
            <p className="pr-10 text-base">{newsData.reason}</p>
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};

export default MainTextC;
