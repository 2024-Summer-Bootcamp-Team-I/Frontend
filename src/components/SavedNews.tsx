import articleEx from '@src/assets/img/article1.svg';
import tvIcon from '@src/assets/img/TV.svg';
import calendarIcon from '@assets/img/Calendar.svg';
import waterdrop from '@assets/img/waterdrop.svg';
import LiquidFillGauge from './LiquidFillGauge';

type SavedNewsProps = {
  item: MyScrapItem;
};

const SavedNews: React.FC<SavedNewsProps> = ({ item }) => {
  return (
    <div className="w-[64.75rem] h-[15.5rem] 3xl:w-[67rem] 4xl:w-[80rem]">
      <div className="flex flex-row bg-white rounded-[3.75rem] shadow-lg items-center">
        <img
          src={item.img || articleEx}
          alt={item.title}
          className="w-[12.5rem] h-[12.5rem] ml-[1.25rem] my-[1.25rem] rounded-[2.5rem]"
        />
        <div className="flex flex-col w-full mx-8">
          <p
            className="flex items-center text-[1.5rem] font-semibold"
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
            className="pt-[2rem] text-[1rem] "
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
