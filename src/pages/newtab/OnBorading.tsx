import React, { useEffect, useRef } from 'react';
import bgOnBoarding from '@assets/img/bg_onboarding.svg';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const OnBorading = () => {
  const swiperRef = useRef(null);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center my-40">
        <p className="text-[4rem] text-white font-extrabold">가장 편리한 기사 분석,</p>
        <p className="text-[5.3rem] text-white font-extrabold">뉴스 인사이드</p>
      </div>
      {/* 상단 설명 */}
      <div className="w-[66.5rem] h-[3.5rem] my-4">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          loop={true}
          className="flex items-center justify-center"
        >
          <SwiperSlide>
            <p className="flex text-white text-[3rem] font-bold justify-center"> # 스크랩 </p>
          </SwiperSlide>
          <SwiperSlide>
            <p className="flex text-white text-[3rem] font-bold justify-center"> # 타임라인 </p>
          </SwiperSlide>
          <SwiperSlide>
            <p className="flex text-white text-[3rem] font-bold justify-center"> # 판별된 기사 </p>
          </SwiperSlide>
          <SwiperSlide>
            <p className="flex text-white text-[3rem] font-bold justify-center"> # 스크랩한 기사 </p>
          </SwiperSlide>
        </Swiper>
      </div>
      {/* 윈도우 창 */}
      <div className="w-[66.5rem] h-[37.5rem] m-4 bg-white rounded-3xl">
        {/* 상단바 */}
        <div className="flex items-center justify-start h-[3.5rem] bg-[#ebebeb] rounded-t-3xl">
          <div className="flex justify-around pl-7">
            <div className="w-[0.875rem] h-[0.875rem] bg-[#FF4444] rounded-full mr-[0.5rem]"></div>
            <div className="w-[0.875rem] h-[0.875rem] bg-[#FDB241] rounded-full mr-[0.5rem]"></div>
            <div className="w-[0.875rem] h-[0.875rem] bg-[#65D81F] rounded-full mr-[0.5rem]"></div>
          </div>
        </div>
        {/* 내부 캐러셀 */}
        <div>
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            loop={true}
            pagination={{ clickable: true }}
            // navigation // 좌우 화살표 버튼
            // scrollbar={{ draggable: true }}

            spaceBetween={50}
            // slidesPerView={3}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            className="flex h-[34rem] justify-center items-center"
          >
            <SwiperSlide className="flex items-center justify-center">
              <div>Slide 1</div>
            </SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            ...
          </Swiper>
        </div>
      </div>
      {/* 하단 설명 */}
      <div className="w-[66.5rem] h-[6rem] my-4">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          loop={true}
          className="flex items-center justify-center"
        >
          <SwiperSlide>
            <div>
              <p className="flex text-white text-[2rem] font-bold justify-center">네이버 뉴스에서 원하는 기사를</p>
              <p className="flex text-white text-[2rem] font-bold justify-center">드래그 앤 드롭으로 바로 스크랩!</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <p className="flex text-white text-[2rem] font-bold justify-center">
                읽고 있는 기사의 관련 이슈 타임라인을
              </p>
              <p className="flex text-white text-[2rem] font-bold justify-center">한눈에 확인하세요!</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <p className="flex text-white text-[2rem] font-bold justify-center">SNU 팩트체크 판별 결과에 기반한</p>
              <p className="flex text-white text-[2rem] font-bold justify-center">
                기사의 신뢰도 점수를 백준율로 보여줍니다.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <p className="flex text-white text-[2rem] font-bold justify-center">확장 프로그램에서 스크랩한 기사만</p>
              <p className="flex text-white text-[2rem] font-bold justify-center">모아서 볼 수 있어요</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default OnBorading;
function useref() {
  throw new Error('Function not implemented.');
}
