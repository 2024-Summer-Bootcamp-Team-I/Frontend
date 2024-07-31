import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/mousewheel';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';
import { Mousewheel, Scrollbar, EffectCoverflow, FreeMode } from 'swiper/modules';
import SavedNews from './SavedNews';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Lottie from 'react-lottie-player';
import loadingAnimation from '@src/assets/img/loading004.json';
import { formatDate } from '@root/utils/formatDate';

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

// fetchMyScrapItems 함수
const fetchMyScrapItems = async (query: string): Promise<MyScrapItem[]> => {
  const userId = localStorage.getItem('user_id');
  const response = await axios.get('http://localhost/api/v1/scraps/', {
    params: { user_id: userId },
  });
  return response.data
    .map((news: any) => ({
      userId: news.user_id,
      newsId: news.news.news_id,
      title: news.news.title,
      content: news.news.content,
      img: news.news.img,
      publishedDate: formatDate(news.news.published_date),
      channelName: news.channel_name,
      type: news.news.type,
    }))
    .filter((item) => {
      const lowerCaseQuery = query.toLowerCase();
      return (
        item.title.toLowerCase().includes(lowerCaseQuery) || item.channelName.toLowerCase().includes(lowerCaseQuery)
      );
    });
};

// CarouselProps 인터페이스 정의
interface CarouselProps {
  searchQuery: string;
}

const Carousel: React.FC<CarouselProps> = ({ searchQuery }) => {
  // useQuery훅을 사용하여 데이터를 가져옴
  const {
    data: myScrapItems,
    isLoading,
    isError,
    error,
  } = useQuery<MyScrapItem[], Error>({
    queryKey: ['scrapItems', searchQuery],
    queryFn: () => fetchMyScrapItems(searchQuery),
  });

  const swiperRef = useRef(null);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = originalStyle;
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const updateSlideOpacityAndSize = (swiper: any) => {
    const slides = swiper.slides;
    slides.forEach((slide: any, index: number) => {
      slide.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      if (index === swiper.activeIndex) {
        slide.style.opacity = '1';
        slide.style.transform = 'scale(1)';
      } else if (index === swiper.activeIndex - 1 || index === swiper.activeIndex + 1) {
        slide.style.opacity = '0.8';
        slide.style.transform = 'scale(0.8)';
      } else if (index === swiper.activeIndex - 2 || index === swiper.activeIndex + 2) {
        slide.style.opacity = '0.6';
        slide.style.transform = 'scale(0.6)';
      } else {
        slide.style.opacity = '0.4';
        slide.style.transform = 'scale(0.4)';
      }
    });
  };

  const handleSlideClick = (index: number) => {
    console.log(`Slide ${index} clicked`);
    // 슬라이드 클릭 동작
  };

  if (isLoading)
    return (
      <div>
        <Lottie loop animationData={loadingAnimation} play style={{ width: 300, height: 300 }} />
      </div>
    );
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="flex items-center justify-center overflow-hidden scale-95 3xl:scale-100 4xl:scale-125">
      <div className="relative w-[66.75rem] h-[47rem] 3xl:w-[80rem] 4xl:w-[100rem] 4xl:h-[50rem] ">
        <style>
          {`
          .swiper-scrollbar {
            background: transparent !important;
            right: 0.375rem !important; 
            top: 50% !important; 
            transform: translateY(-50%) !important; 
            height: 80% !important; 
          }
          .swiper-scrollbar-drag {
            background: black !important;
            height: 6.25rem !important; 
            width: 0.5rem !important;  
          }
          .swiper-slide {
            display: flex;
            justify-content: center;
            align-items: center;
            height: auto;
            width: 100%;
            transition: opacity 0.5s ease, transform 0.5s ease;
          }
        `}
        </style>
        <Swiper
          ref={swiperRef}
          direction="vertical"
          modules={[Mousewheel, Scrollbar, EffectCoverflow, FreeMode]}
          mousewheel={{ forceToAxis: true, sensitivity: 1, releaseOnEdges: true }}
          effect="coverflow"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          slidesPerView={5}
          centeredSlides={true}
          scrollbar={{ draggable: true, hide: true, dragSize: 100 }}
          simulateTouch={true}
          freeMode={{ enabled: false }}
          speed={300}
          className="h-full"
          onSlideChange={updateSlideOpacityAndSize}
          onSwiper={updateSlideOpacityAndSize}
        >
          {myScrapItems &&
            myScrapItems.map((item, index) => (
              <SwiperSlide
                key={item.newsId}
                className="flex items-center justify-center"
                onClick={() => handleSlideClick(index)}
              >
                <SavedNews item={item} /> {/* SavedNews 컴포넌트에 MyScrapItem 전달 */}
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Carousel;
