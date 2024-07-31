import React, { useEffect, useState } from 'react';
import ScrapBoard from '@root/src/components/ScrapBoard';
import ScrapIcon from '@root/src/assets/img/ScrapIcon.svg';
import line from '@src/assets/img/Line1.svg';
import ShortcutIcon from '@src/assets/img/ShortcutsIcon.svg';
import axios from 'axios';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import logo from '@root/src/assets/img/Logo.svg';
import Lottie from 'react-lottie-player';
import loadingAnimation from '@src/assets/img/loading004.json';

const fetchScrapItems = async () => {
  const userId = localStorage.getItem('user_id');
  const response = await axios.get('https://fakenew.site/api/v1/scraps/', {
    params: { user_id: userId },
  });
  console.log('userId:', userId); // user_id 확인
  return response.data.map((news: any) => ({
    userId: news.user_id,
    newsId: news.news.news_id,
    title: news.news.title,
    img: news.news.img,
    publishedDate: news.news.published_date,
    channelName: news.channel_name,
    type: news.news.type,
  }));
};

const postScrapItem = async (item: DragItem) => {
  const userId = localStorage.getItem('user_id');
  const response = await axios.post(
    'https://fakenew.site/api/v1/scraps/',
    { url: item.url },
    { params: { user_id: userId } }, // 적절한 user_id로 변경
  );
  console.log('Scrap item posted:', response.data);
  console.log('userId:', userId); // user_id 확인
  return {
    userId: response.data.user_id,
    newsId: response.data.news.news_id,
    title: response.data.news.title,
    img: response.data.news.img,
    publishedDate: response.data.news.published_date,
    channelName: response.data.channel_name,
    type: response.data.news.type,
  };
};

const Scrap: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      navigate('/login'); // 사용자 ID가 없으면 로그인 페이지로 이동
    }
  }, [navigate]);

  const {
    data: scrapItems,
    isLoading,
    isError,
    error,
  } = useQuery<ScrapItem[], Error>({ queryKey: ['scrapItems'], queryFn: fetchScrapItems });

  const mutation = useMutation<
    { userId: number; newsId: any; title: any; img: any; publishedDate: any; channelName: any; type: any },
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
    chrome.tabs.create({ url: chrome.runtime.getURL('src/pages/newtab/index.html') });
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

  const handleLogout = () => {
    localStorage.removeItem('user_id'); // 사용자 ID 제거
    navigate('/login'); // 로그인 페이지로 이동
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

  if (isLoading)
    return (
      <div>
        <Lottie loop animationData={loadingAnimation} play style={{ width: 300, height: 300 }} />
      </div>
    );
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="justify-center w-[30rem] h-[100vh] mb-10">
      <div className="flex h-[7.25rem] items-center justify-start">
        <img src={logo} alt="Logo" onClick={handleButtonClick} className="h-[3rem] mx-8 cursor-pointer" />
      </div>
      <div className="text-midnight">
        <div className="px-[2rem] flex items-center">
          <img src={ScrapIcon} alt="Scrap Icon" />
          <p className="font-pretendardFontBold ml-1 font-extrabold text-[1.5rem]">스크랩</p>
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
          <p className=" text-[1.5rem] font-semibold text-midnight">DROP</p>
        </div>
        <div className="overflow-hidden" style={{ height: scrollHeight }}>
          <PerfectScrollbar className="w-full h-full">
            {scrapItems.map((item) => (
              <ScrapBoard key={item.newsId} item={item} onDelete={handleDelete} />
            ))}
          </PerfectScrollbar>
        </div>
        <p
          onClick={handleLogout}
          className="flex justify-center items-center text-white text-[1rem] underline cursor-pointer mt-4"
        >
          로그아웃
        </p>
      </div>
    </div>
  );
};

export default Scrap;
