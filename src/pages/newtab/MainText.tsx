import TrustScore from '@root/src/components/TrustScore';
import React from 'react';
import tvIcon from '@src/assets/img/TV.svg';
import calendarIcon from '@assets/img/Calendar.svg';
import PerfectScrollbar from 'react-perfect-scrollbar';
import AverageRating from '@root/src/components/AverageRating';

type MainTextProps = {
  article: Article;
  getChannelName: (channelId: number) => string;
  getDiscriminant: (newsId: number) => Discriminant | undefined;
};

const MainText: React.FC<MainTextProps> = ({ article, getChannelName, getDiscriminant }) => {
  const averageRating = 4.2; // 예제 평균 별점 값
  const discriminant = getDiscriminant(article.id);

  return (
    <div className="flex items-center justify-center space-x-[2rem] 4xl:space-x-[4rem]">
      <div className="w-[54rem] 3xl:w-[70rem] 4xl:w-[80rem] h-[40rem] 3xl:h-[48rem] 4xl:h-[65rem] rounded-[2.5rem] bg-white p-[3rem] 4xl:p-[6rem] pr-0 4xl:pr-0 ">
        <PerfectScrollbar className="w-full h-full">
          <p className="text-2xl font-semibold pr-[3rem] 4xl:pr-[6rem]">{article.title}</p>
          <div className="flex items-end justify-end mt-4 mb-6 pr-[3rem] 4xl:pr-[6rem]">
            <div className="flex items-center ml-5">
              <img src={tvIcon} className="w-[1rem] h-[1rem]" />
              <span className="ml-2 text-base text-[#505050]">{getChannelName(article.channelId)}</span>
            </div>
            <div className="flex items-center ml-5">
              <img src={calendarIcon} className="w-[1rem] h-[1rem]" />
              <span className="ml-2 text-base text-[#505050]">{article.publishDate}</span>
            </div>
          </div>
          <div className="w-[48rem] 3xl:w-[64rem] 4xl:w-[68rem] h-[25rem] 3xl:h-[30rem] 4xl:h-[34rem] bg-gray-500 pr-[3rem] 4xl:pr-[6rem]"></div>
          <p className="mt-8 text-base pr-[3rem] 4xl:pr-[6rem]">{article.content}</p>
        </PerfectScrollbar>
      </div>
      <div className="flex flex-col space-y-[2rem] 4xl:space-y-[4rem]">
        <TrustScore newsId={discriminant.newsId} score={discriminant.score} />
        <div className="w-[26rem] h-[6.25rem] rounded-[2.5rem] bg-white">
          <AverageRating rating={averageRating} /> {/* 평균 별점 표시 */}
        </div>
        <div className="w-[26rem] h-[11.75rem] 3xl:h-[19.75rem] 4xl:h-[32.75rem] rounded-[2.5rem] bg-white pl-10 py-8">
          <PerfectScrollbar className="w-full h-full">
            <p className="text-2xl underline underline-offset-8 text-[#106AAB] font-semibold pb-8">판단 근거 요약</p>
            <p className="pr-10 text-base">{discriminant.reason}</p>
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};

export default MainText;
