import React from 'react';
import articleEx from '@src/assets/img/article1.svg';
import tvIcon from '@src/assets/img/TV.svg';
import calendarIcon from '@src/assets/img/Calendar.svg';
import TrashIcon from '@src/assets/img/TrashIcon.svg';
import axios from 'axios';

type ScrapBoardProps = {
  item: ScrapItem;
  onDelete: (newsId: string) => void; // 삭제 후 콜백
};

const ScrapBoard: React.FC<ScrapBoardProps> = ({ item, onDelete }) => {
  const handleDelete = async () => {
    try {
      console.log('Attempting to delete news:', item.newsId, 'for user:', item.userId);
      const response = await axios.delete(`http://localhost:8000/api/v1/scraps/${item.newsId}/`, {
        params: { user_id: item.userId },
      });
      if (response.status === 204) {
        console.log('뉴스가 성공적으로 삭제되었습니다.');
        onDelete(item.newsId); // 삭제 후 콜백 호출
      }
    } catch (error) {
      console.error('뉴스 삭제 실패:', error);
    }
  };

  return (
    <div className="flex w-[26rem] h-[7.5rem] mx-[2rem] my-[1.25rem] bg-white rounded-[1.25rem] shadow-lg">
      <div className="m-3 w-[6rem] h-[6rem] bg-black rounded-[0.875rem] overflow-hidden">
        <img src={item.img || articleEx} alt={item.title} className="object-cover w-full h-full" />
      </div>
      <div className="flex flex-col justify-between my-3 w-[17.75rem] h-[6rem] bg-white ">
        <div className="flex">
          <p
            className="flex items-start m-1 text-[1rem] w-[15rem] font-semibold overflow-hidden"
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
          <img src={TrashIcon} className="w-5 h-5 mt-1 ml-3 cursor-pointer" alt="Delete" onClick={handleDelete} />
        </div>
        <div className="flex items-end justify-end m-1">
          <div className="flex items-center ml-5">
            <img src={tvIcon} className="w-[0.75rem] h-[0.75rem]" />
            <span className="ml-2 text-[0.75rem] text-[#505050]">{item.channelName}</span>
          </div>
          <div className="flex items-center ml-5">
            <img src={calendarIcon} className="w-[0.75rem] h-[0.75rem]" />
            <span className="ml-2 text-[0.75rem] text-[#505050]">{item.publishedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrapBoard;
