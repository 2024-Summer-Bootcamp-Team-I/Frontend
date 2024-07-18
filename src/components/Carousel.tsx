import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/mousewheel';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';
import { Mousewheel, Scrollbar, EffectCoverflow, FreeMode } from 'swiper/modules';
import SavedNews from './SavedNews';

const Carousel: React.FC = () => {
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

  // 슬라이드 데이터 설정
  const newsData = Array.from({ length: 10 }, (_, index) => ({ id: index + 1 }));

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
        slide.style.transform = 'scale(0.7)';
      } else if (index === swiper.activeIndex - 2 || index === swiper.activeIndex + 2) {
        slide.style.opacity = '0.6';
        slide.style.transform = 'scale(0.5)';
      } else {
        slide.style.opacity = '0.4';
        slide.style.transform = 'scale(0.3)';
      }
    });
  };

  const handleSlideClick = (index) => {
    console.log(`Slide ${index} clicked`);
    // 슬라이드 클릭 동작
  };

  return (
    <div className="flex overflow-hidden justify-center items-center">
      <div className="relative w-[66.75rem] h-[47rem] 3xl:w-[75rem] 3xl:h-[52rem] 4xl:w-[85rem] 4xl:h-[55rem]">
        <style>{`
          .swiper-scrollbar {
            background: transparent;
          }
          .swiper-scrollbar-drag {
            background: black;
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
            depth: 200,
            modifier: 1,
            slideShadows: false,
          }}
          slidesPerView={5}
          centeredSlides={true}
          scrollbar={{ draggable: true }}
          simulateTouch={false}
          freeMode={{ enabled: false }}
          speed={300}
          className="h-full justify-center items-center"
          onSlideChange={updateSlideOpacityAndSize}
          onSwiper={updateSlideOpacityAndSize}
        >
          {newsData.map((news, index) => (
            <SwiperSlide
              key={news.id}
              className="flex justify-center items-center"
              onClick={() => handleSlideClick(index)}
            >
              <div>
                <SavedNews />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Carousel;
