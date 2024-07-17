import React, { useEffect, useState } from 'react';
import ScrapBoard from '@root/src/components/ScrapBoard';
import ScrapIcon from '@root/src/assets/img/ScrapIcon.svg';
import line from '@src/assets/img/Line1.svg';
import ShortcutIcon from '@src/assets/img/ShortcutsIcon.svg';
import axios from 'axios';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchScrapItems = async () => {
  const response = await axios.get('http://localhost:8000/api/v1/scraps/', {
    params: { user_id: 1 },
  });
  return response.data.map((news: any) => ({
    userId: news.user_id,
    newsId: news.news.news_id,
    title: news.news.title,
    img: news.news.img,
    publishedDate: news.news.published_date,
    channelName: news.channel_name,
  }));
};

const postScrapItem = async (item: DragItem) => {
  const response = await axios.post(
    'http://localhost:8000/api/v1/scraps/',
    { url: item.url },
    { params: { user_id: 1 } }, // 적절한 user_id로 변경
  );
  console.log('Scrap item posted:', response.data);
  return {
    userId: 1,
    newsId: response.data.news.news_id,
    title: response.data.news.title,
    img: response.data.news.img,
    publishedDate: response.data.news.published_date,
    channelName: response.data.channel_name,
  };
};

const Scrap: React.FC = () => {
  const queryClient = useQueryClient();
  const {
    data: scrapItems,
    isLoading,
    isError,
    error,
  } = useQuery<ScrapItem[], Error>({ queryKey: ['scrapItems'], queryFn: fetchScrapItems });
  const mutation = useMutation<
    { userId: number; newsId: any; title: any; img: any; publishedDate: any; channelName: any },
    Error,
    DragItem
  >({
    mutationFn: postScrapItem,
    onSuccess: (newItem) => {
      queryClient.setQueryData<ScrapItem[]>(['scrapItems'], (oldItems = []) => [newItem, ...oldItems]);
    },
  });

  const [scrollHeight, setScrollHeight] = useState('20rem');

  const handleButtonClick = () => {
    chrome.tabs.create({ url: 'chrome://newtab' });
    window.close();
  };

  const handleDrop = (item: DragItem) => {
    console.log('Dropped:', item);
    mutation.mutate(item);
  };

  const handleDelete = (newsId: string) => {
    queryClient.setQueryData(['scrapItems'], (oldItems: ScrapItem[] = []) =>
      oldItems.filter((item) => item.newsId !== newsId),
    );
  };

  useEffect(() => {
    console.log('Scrap component loaded');

    const handleDropEvent = (event: DragEvent) => {
      event.preventDefault();
      const data = event.dataTransfer?.getData('application/json');
      if (data) {
        const item: DragItem = JSON.parse(data);
        console.log('Item dropped:', item);
        handleDrop(item); // handleDrop 함수 호출
      }
    };

    window.addEventListener('drop', handleDropEvent);
    window.addEventListener('dragover', (event) => event.preventDefault());

    const handleResize = () => {
      if (window.innerHeight >= 1200) {
        setScrollHeight('45rem');
      } else if (window.innerHeight >= 800) {
        setScrollHeight('26.25rem');
      } else {
        setScrollHeight('20rem');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('drop', handleDropEvent);
    };
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="justify-center w-[30rem] h-[100vh]">
      <div className="flex h-[7.25rem] items-center justify-between">
        <p className="mx-8 h-[3rem] text-[2rem]">LOGO</p>
        <button
          onClick={handleButtonClick}
          className="flex mx-8 items-center justify-center w-[14rem] h-[3rem] bg-midnight text-white text-[1.25rem] rounded-full"
        >
          <p className="pr-2">저장한 기사 보러가기</p>
          <img src={ShortcutIcon} alt="Shortcut Icon" />
        </button>
      </div>
      <div className="text-midnight">
        <div className="px-[2rem] flex items-center">
          <img src={ScrapIcon} alt="Scrap Icon" />
          <p className="ml-1 font-extrabold text-[1.5rem]">스크랩</p>
        </div>
        <p className="px-[2rem] py-[0.75rem] text-[1.25rem]">
          저장하고 싶은 뉴스를 이 패널로 드래그하면 <br />
          뉴스 기사가 저장됩니다.
        </p>
      </div>
      <div className="px-8 pt-[1.25rem] pb-[0.75rem]">
        <img src={line} alt="Line" />
      </div>
      <div className="m-0">
        <div className="flex justify-center items-center w-[26rem] h-[7.5rem] mx-[2rem] my-[1.25rem] border-dashed border-2 border-midnight rounded-[1.25rem]">
          <p className="text-[1.5rem] font-semibold text-midnight">DROP</p>
        </div>
        <div className="overflow-hidden" style={{ height: scrollHeight }}>
          <PerfectScrollbar className="w-full h-full">
            {scrapItems.map((item) => (
              <ScrapBoard key={item.newsId} item={item} onDelete={handleDelete} />
            ))}
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};

export default Scrap;
