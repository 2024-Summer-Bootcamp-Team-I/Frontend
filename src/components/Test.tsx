import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/mousewheel';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';
import { Mousewheel, Scrollbar, EffectCoverflow } from 'swiper/modules';
import SavedNews from './SavedNews';

const Carousel = () => {
  const swiperRef = useRef(null);

  // 페이지 전체 스크롤 방지
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = originalStyle;
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // 마우스 휠 이벤트
  useEffect(() => {
    const handleWheel = (e) => {
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.mousewheel.enable();
        swiperRef.current.swiper.mousewheel.handle(e);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // 슬라이드 데이터 갯수
  const newsData = Array.from({ length: 10 }, (_, index) => ({ id: index + 1 }));

  // 슬라이드 변경 시 슬라이드 크기 및 투명도 업데이트
  const updateSlideOpacityAndSize = (swiper) => {
    const slides = swiper.slides;
    slides.forEach((slide, index) => {
      slide.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      if (index === swiper.activeIndex) {
        slide.style.opacity = '1';
        slide.style.transform = 'w-[65rem] h-[15rem]'; // 활성 슬라이드 크기 증가
      } else if (index === swiper.activeIndex - 1 || index === swiper.activeIndex + 1) {
        slide.style.opacity = '0.7';
        slide.style.transform = 'w-[60rem] h-[10rem]'; // 인접한 슬라이드 크기 증가
        // slide.style.transform = 'scale(0.8)';
      } else if (index === swiper.activeIndex - 2 || index === swiper.activeIndex + 2) {
        slide.style.opacity = '0.5';
        slide.style.transform = 'w-[55rem] h-[5rem]'; // 인접한 슬라이드 크기 증가
        // slide.style.transform = 'scale(0.5)'; // 그 다음 슬라이드 기본 크기
      } else {
        slide.style.opacity = '0';
        slide.style.transform = 'scale(0)'; // 그 외 슬라이드 크기 감소
      }
    });
  };

  // 슬라이드 클릭시 뭘 할건지
  const handleSlideClick = (index) => {
    console.log(`Slide ${index} clicked`);
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen overflow-hidden">
      <div className="relative w-full h-full" style={{ width: '66.75rem', height: '49.5rem' }}>
        <style>{`
          .swiper-scrollbar {
            background: transparent;
            position: absolute;
          }
          .swiper-scrollbar-drag {
            background: black;
          }
        `}</style>
        <Swiper
          style={{ paddingBottom: '15rem', marginBottom: '5rem' }} // 인라인 스타일로 marginBottom 추가
          ref={swiperRef}
          direction="vertical"
          modules={[Mousewheel, Scrollbar, EffectCoverflow]}
          mousewheel={{ forceToAxis: true, sensitivity: 1, releaseOnEdges: true }}
          effect="coverflow"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            modifier: 1,
            slideShadows: false,
          }}
          slidesPerView={1.9}
          centeredSlides={true}
          scrollbar={{ draggable: true }}
          simulateTouch={false}
          speed={300}
          className="h-full"
          onSlideChange={updateSlideOpacityAndSize}
          onSwiper={updateSlideOpacityAndSize}
        >
          {newsData.map((news, index) => (
            <SwiperSlide
              key={news.id}
              className="flex justify-center items-center"
              onClick={() => handleSlideClick(index)}
              style={{ paddingTop: '14.7rem' }}
            >
              <SavedNews />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Carousel;
