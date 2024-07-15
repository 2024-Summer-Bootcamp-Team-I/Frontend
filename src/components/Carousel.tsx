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

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = originalStyle;
      document.body.style.overflow = originalStyle;
    };
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      if (swiperRef.current && swiperRef.current.swiper) {
        const swiper = swiperRef.current.swiper;
        swiper.mousewheel.enable();
        swiper.mousewheel.handle(e);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const newsData = Array.from({ length: 20 }, (_, index) => ({ id: index + 1 }));

  const spaceBetweenInPx = 1.125 * 16; // 1.125rem을 픽셀 값으로 변환 (18px)

  const updateSlideOpacityAndSize = (swiper) => {
    const slides = swiper.slides;
    slides.forEach((slide, index) => {
      slide.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      if (index === swiper.activeIndex) {
        slide.style.opacity = '1';
        slide.style.transform = 'scale(1)'; // 활성 슬라이드 크기 증가
      } else if (index === swiper.activeIndex - 1 || index === swiper.activeIndex + 1) {
        slide.style.opacity = '0.8';
        slide.style.transform = 'w-[60rem] h-[10rem]'; // 인접한 슬라이드 크기 증가
      } else if (index === swiper.activeIndex - 2 || index === swiper.activeIndex + 2) {
        slide.style.opacity = '0.6';
        slide.style.transform = 'w-[55rem] h-[5rem]'; // 그 다음 슬라이드 기본 크기
      } else {
        slide.style.opacity = '0';
        slide.style.transform = 'scale(0)'; // 그 외 슬라이드 크기 감소
      }
    });
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen overflow-hidden">
      <div className="relative w-full h-full" style={{ width: '1068px', height: '792px' }}>
        <style>{`
          .swiper-scrollbar {
            background: transparent;
            position: absolute;

          }
          .swiper-scrollbar-drag {
            background: black;
          }
          @media (max-width: 768px) {
            .swiper-scrollbar {
              right: 10px; /* 작은 화면에서는 오른쪽에 더 가깝게 */
              width: 8px; /* 작은 화면에서는 스크롤바를 더 얇게 */
            }
          }
        `}</style>
        <Swiper
          ref={swiperRef}
          direction="vertical"
          modules={[Mousewheel, Scrollbar, EffectCoverflow]}
          mousewheel={{ forceToAxis: true, sensitivity: 1, releaseOnEdges: true }}
          effect="coverflow"
          coverflowEffect={{
            rotate: 0,
            stretch: spaceBetweenInPx, // 간격을 설정
            depth: 200,
            modifier: 1,
            slideShadows: false,
          }}
          slidesPerView={5}
          centeredSlides={true}
          spaceBetween={spaceBetweenInPx} // 간격을 픽셀 값으로 설정
          scrollbar={{ draggable: true }}
          simulateTouch={false} // 마우스 드래그 비활성화
          speed={300} // 스크롤링 속도 조절 (기본값: 300ms)
          className="h-full"
          onSlideChange={(swiper) => updateSlideOpacityAndSize(swiper)}
          onSwiper={(swiper) => updateSlideOpacityAndSize(swiper)}
        >
          {newsData.map((news) => (
            <SwiperSlide key={news.id} className="flex justify-center items-center">
              <SavedNews />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Carousel;
