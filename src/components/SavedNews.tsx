import React, { useState } from 'react';
import articleEx from '@src/assets/img/article1.svg';
import tvIcon from '@src/assets/img/TV.svg';
import calendarIcon from '@assets/img/Calendar.svg';
import { useNavigate } from 'react-router-dom';
import typeCmark from '@src/assets/img/typeCmark.svg';

interface MyScrapItem {
  userId: string;
  newsId: string;
  title: string;
  content: string;
  img: string;
  publishedDate: string;
  channelName: string;
  type: string;
}

type SavedNewsProps = {
  item: MyScrapItem;
};

const SavedNews: React.FC<SavedNewsProps> = ({ item }) => {
  const navigate = useNavigate();
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleClick = () => {
    console.log('Clicked item:', item); // item을 콘솔에 출력하여 newsId 확인
    if (item.type === 'a') {
      navigate(`/maintexta/${item.newsId}`);
    } else if (item.type === 'c') {
      navigate(`/maintextc/${item.newsId}`);
    }
  };

  return (
    <div onClick={handleClick} className="w-[64.75rem] h-[15.5rem] 3xl:w-[67rem] 4xl:w-[80rem] cursor-pointer">
      <div className="relative flex flex-row bg-white rounded-[3.75rem] shadow-lg items-center">
        {item.type === 'c' && (
          <div
            className="absolute top-0 right-14 drop-shadow-lg z-2"
            onMouseEnter={() => setIsTooltipVisible(true)}
            onMouseLeave={() => setIsTooltipVisible(false)}
          >
            <img src={typeCmark} alt={item.title} />
            {isTooltipVisible && (
              <div className="absolute left-1/2 transform -translate-x-1/2 px-4 py-2 text-sm text-gray-800 bg-white rounded-xl top-[-3.5rem] whitespace-nowrap">
                판별된 기사입니다.
                <div className="absolute bottom-[-0.4rem] left-1/2 transform -translate-x-1/2 w-0 h-0 border-t-8 border-t-white border-r-8 border-r-transparent border-l-8 border-l-transparent"></div>
              </div>
            )}
          </div>
        )}
        <img
          src={item.img || articleEx} // 기본 이미지 설정
          alt={item.title}
          className="w-[12.5rem] h-[12.5rem] ml-[1.25rem] my-[1.25rem] rounded-[2.5rem]"
        />
        <div className="flex flex-col w-full mx-8">
          <p
            className="flex items-center text-[1.5rem] font-semibold mr-[6rem]"
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              lineClamp: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {item.title}
          </p>
          <p
            className="pt-[2rem] text-[1rem]"
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              lineClamp: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {item.content}
          </p>
          <div className="flex items-end justify-end mt-6 text-[#505050]">
            <div className="flex items-center ml-5">
              <img src={tvIcon} className="w-[1rem] h-[1rem]" />
              <span className="ml-2 text-[1rem]">{item.channelName}</span>
            </div>
            <div className="flex items-center ml-5">
              <img src={calendarIcon} className="w-[1rem] h-[1rem]" />
              <span className="ml-2 text-[1rem]">{item.publishedDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedNews;
