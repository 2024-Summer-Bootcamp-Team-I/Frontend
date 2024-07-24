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
import { formatDate } from '@root/utils/formatDate';

const fetchMyScrapItems = async () => {
  const userId = localStorage.getItem('user_id');
  const response = await axios.get('http://localhost/api/v1/scraps/', {
    params: { user_id: userId },
  });
  return response.data.map((news: any) => ({
    userId: news.user_id,
    newsId: news.news.news_id,
    title: news.news.title,
    content: news.news.content,
    img: news.news.img,
    publishedDate: formatDate(news.news.published_date),
    channelName: news.channel_name,
    type: news.news.type,
  }));
};

const Carousel: React.FC = () => {
  const {
    data: myScrapItems,
    isLoading,
    isError,
    error,
  } = useQuery<MyScrapItem[], Error>({ queryKey: ['scrapItems'], queryFn: fetchMyScrapItems });

  const swiperRef = useRef(null);

  // 페이지 스크롤 방지
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = originalStyle;
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // 슬라이드 변경 시 슬라이드 투명도 및 크기 업데이트
  const updateSlideOpacityAndSize = (swiper) => {
    const slides = swiper.slides;
    slides.forEach((slide, index) => {
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

  const handleSlideClick = (index) => {
    console.log(`Slide ${index} clicked`);
    // 슬라이드 클릭 동작
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const sortedScrapItems = [...myScrapItems].reverse();

  return (
    <div className="flex overflow-hidden justify-center items-center mt-[-4rem] 3xl:scale-100 4xl:scale-125">
      <div className="relative w-[66.75rem] h-[47rem] 3xl:w-[80rem] 4xl:w-[100rem] 4xl:h-[50rem] ">
        <style>{`
          .swiper-scrollbar {
            background: transparent;
          }
          .swiper-scrollbar-drag {
            background: black;
          }
          .swiper-slide {
            display: flex;
            justify-content: center;
            align-items: center;
            height: auto;
            width: 100%
            transition: opacity 0.5s ease, transform 0.5s ease;
          }
        `}</style>
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
          scrollbar={{ draggable: true }}
          simulateTouch={false}
          freeMode={{ enabled: false }}
          speed={300}
          className="h-full"
          onSlideChange={updateSlideOpacityAndSize}
          onSwiper={updateSlideOpacityAndSize}
        >
          {sortedScrapItems.map((item, index) => (
            <SwiperSlide
              key={item.newsId}
              className="flex items-center justify-center"
              onClick={() => handleSlideClick(index)}
            >
              <SavedNews item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Carousel;
