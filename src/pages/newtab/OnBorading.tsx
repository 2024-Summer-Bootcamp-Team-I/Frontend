import React, { useEffect, useRef, useState } from 'react';
import EX_scrap from '@assets/img/EX_scrap.png';
import EX_timeline from '@assets/img/EX_timeline.png';
import EX_mynews from '@assets/img/EX_mynews.png';
import EX_relatednews from '@assets/img/EX_relatednews.png';
import EX_maintexta from '@assets/img/EX_maintexta.png';
import EX_maintextc from '@assets/img/EX_maintextc.png';

import dashLineForSummary from '@src/assets/img/dashLineForSummary.svg';
import dashLineForScore from '@assets/img/dashLineForScore.svg';

import whaleIcon from '@assets/img/WhaleIcon.svg';
import moveToTopIcon from '@assets/img/moveToTop.svg';
import moveToDownIcon from '@assets/img/moveToDown.svg';
import githubIcon from '@assets/img/githubIcon.svg';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';

const OnBorading = ({ setNavbarBlur }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const secondDivRef = useRef<HTMLDivElement>(null);

  const downScroll = () => {
    // if (divRef.current) {
    //   divRef.current.scrollIntoView({ behavior: 'smooth' });
    // }
    window.scrollTo({ top: 880, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: 3200, behavior: 'smooth' });
  };

  const [activeIndex, setActiveIndex] = useState(0); // slide 이동시 index 체크용
  const [secondActiveIndex, setSecondActiveIndex] = useState(0); // 2번째 swiper의 slide 이동시 index 체크용
  const [animateText, setAnimateText] = useState(false); // slide 이동시 글자텍스트 fade 애니메이션
  const [animateDiv, setAnimateDiv] = useState(false); // 캐러셀 전체 fade 애니메이션
  const [animateSecondDiv, setAnimateSecondDiv] = useState(false);

  useEffect(() => {
    setAnimateText(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimateDiv(true);
          } else {
            setAnimateDiv(false);
          }
        });
      },
      { threshold: 0.1 },
    );

    const secondObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimateSecondDiv(true);
          } else {
            setAnimateSecondDiv(false);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    if (secondDivRef.current) {
      secondObserver.observe(secondDivRef.current);
    }

    const handleScroll = () => {
      if (window.scrollY > 200) {
        setNavbarBlur(true);
      } else {
        setNavbarBlur(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }

      if (secondDivRef.current) {
        secondObserver.unobserve(secondDivRef.current);
      }

      window.removeEventListener('scroll', handleScroll);
    };
  }, [setNavbarBlur]);

  return (
    <div className="flex flex-col items-center justify-center h-full ">
      <div className="flex flex-col items-center justify-center my-[17.5rem]">
        <p
          className={`text-[4rem] text-white font-extrabold transition duration-[1500ms] ${animateText ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          가장 편리한 기사 분석,
        </p>
        <p
          className={`text-[5.3rem] text-white font-extrabold transition delay-700 duration-[1500ms] ${animateText ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          뉴스 인사이드
        </p>
      </div>
      <div className="flex flex-col justify-center items-center fixed bottom-24 right-10 w-[6rem]">
        <img src={moveToTopIcon} className="cursor-pointer animate-bounce" onClick={scrollToTop} />
        {/* <img src={moveToDownIcon} className="cursor-pointer animate-bounce" onClick={scrollToBottom} /> */}
      </div>
      <div
        className={`transition delay-1000 duration-[1500ms] ${animateText ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        <img src={moveToDownIcon} className="cursor-pointer animate-bounce " onClick={downScroll} />
      </div>

      {/* 1. 확장프로그램 소개 윈도우 */}
      <div
        ref={divRef}
        className={`flex flex-col items-center w-[66.5rem] h-[76.5rem] relative mt-10 py-8 transition delay-50 duration-1000 ${animateDiv ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        {/* 윈도우 창 */}
        <div className="w-[66.5rem] h-[71rem]">
          <div>
            <Swiper
              // effect={'coverflow'}
              // grabCursor={true}
              // centeredSlides={true}
              // slidesPerView={3}
              // coverflowEffect={{
              //   rotate: 0,
              //   stretch: 0,
              //   depth: 100,
              //   modifier: 1,
              //   slideShadows: false,
              // }}
              modules={[Navigation, Pagination, Scrollbar, A11y, EffectCoverflow, Autoplay]}
              loop={true}
              // pagination={{ clickable: true }}
              spaceBetween={50}
              // autoplay={{ delay: 5000 }}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              className="flex h-[54rem] justify-center items-center"
              // className="flex w-screen h-[60rem] justify-center items-center"
            >
              <SwiperSlide className="flex justify-center">
                <p
                  className={`absolute top-6 left-0 right-0 flex text-white text-[2rem] font-bold justify-center transition-opacity duration-700 ${activeIndex === 0 ? 'opacity-100' : 'opacity-0'}`}
                >
                  # 스크랩
                </p>
                <div className="flex flex-col items-center justify-center h-full">
                  <img src={EX_scrap} className="shadow-md rounded-b-3xl" />
                </div>
                <div
                  className={`absolute bottom-10 left-0 right-0 flex flex-col text-white text-[1.5rem] font-bold justify-center items-center transition-opacity duration-700 ${activeIndex === 0 ? 'opacity-100' : 'opacity-0'}`}
                >
                  <p>네이버 뉴스에서 읽고 있는 기사를</p>
                  <p> 드래그 앤 드롭으로 바로 스크랩!</p>
                </div>
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center ">
                <p
                  className={`absolute top-6 left-0 right-0 flex text-white text-[2rem] font-bold justify-center transition-opacity duration-700 ${activeIndex === 1 ? 'opacity-100' : 'opacity-0'}`}
                >
                  # 타임라인
                </p>
                <div className="flex flex-col items-center justify-center h-full">
                  {/* TimeLine이미지로 변경 */}
                  <img src={EX_timeline} className="shadow-md rounded-b-3xl" />
                </div>
                <div
                  className={`absolute bottom-10 left-0 right-0 flex flex-col text-white text-[1.5rem] font-bold justify-center items-center transition-opacity duration-700 ${activeIndex === 1 ? 'opacity-100' : 'opacity-0'}`}
                >
                  <p>읽고 있는 기사의 관련 이슈 타임라인을 </p>
                  <p>한 눈에 확인하세요!</p>
                </div>
              </SwiperSlide>
            </Swiper>
            <div className="absolute top-[8.75rem] left-0 right-0 flex items-center justify-start w-[66.5rem] h-[3.5rem] bg-[#ebebeb] rounded-t-3xl shadow-md">
              {/* 점 3개 div */}
              <div className="flex justify-around pl-7">
                <div className="w-[0.875rem] h-[0.875rem] bg-[#FF4444] rounded-full mr-[0.5rem]"></div>
                <div className="w-[0.875rem] h-[0.875rem] bg-[#FDB241] rounded-full mr-[0.5rem]"></div>
                <div className="w-[0.875rem] h-[0.875rem] bg-[#65D81F] rounded-full mr-[0.5rem]"></div>
              </div>
            </div>
            {/* 원래 bg-white있었음 */}
          </div>
        </div>
      </div>
      {/* 2. 뉴 탭 기능 소개 윈도우 */}
      <div
        ref={secondDivRef}
        className={`flex flex-col items-center w-[66.5rem] h-[76.5rem] relative mt-10 py-8 transition delay-50 duration-1000 ${animateSecondDiv ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        {/* 윈도우 창 */}
        <div className="w-[66.5rem] h-[71rem]">
          <div>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, EffectCoverflow, Autoplay]}
              loop={true}
              spaceBetween={50}
              // autoplay={{ delay: 5000 }}
              onSlideChange={(swiper) => setSecondActiveIndex(swiper.realIndex)}
              className="flex h-[57rem] justify-center"
            >
              <SwiperSlide className="flex flex-col">
                <p
                  className={`absolute top-6 left-0 right-0 flex text-white text-[2rem] font-bold justify-center transition-opacity duration-700 ${secondActiveIndex === 0 ? 'opacity-100' : 'opacity-0'}`}
                >
                  # 판별된 기사
                </p>
                {/* 156px내리기 */}
                <div className="mt-[10.25rem]">
                  <img src={EX_relatednews} className="shadow-md rounded-b-3xl" />
                </div>
                <div
                  className={`absolute bottom-10 left-0 right-0 flex flex-col text-white text-[2rem] font-bold justify-center items-center transition-opacity duration-700 ${secondActiveIndex === 0 ? 'opacity-100' : 'opacity-0'}`}
                >
                  <div className="flex items-end pr-8 mr-12">
                    <img src={dashLineForScore} className="mb-5 mr-[3rem]" />
                    <p># 신뢰도 판별 점수 </p>
                  </div>
                  <p className="text-[1.5rem]">SNU 팩트체크 판별 결과에 기반한 </p>
                  <p className="text-[1.5rem]">기사의 신뢰도 점수를 백분율로 보여줍니다</p>
                </div>
              </SwiperSlide>
              <SwiperSlide className="flex flex-col">
                <p
                  className={`absolute top-6 left-0 right-0 flex text-white text-[2rem] font-bold justify-center transition-opacity duration-700 ${secondActiveIndex === 1 ? 'opacity-100' : 'opacity-0'}`}
                >
                  # 스크랩한 기사
                </p>
                <div className="mt-[10.25rem]">
                  <img src={EX_mynews} className="shadow-md rounded-b-3xl" />
                </div>
                <div
                  className={`absolute bottom-20 left-0 right-0 flex flex-col text-white text-[1.5rem] font-bold justify-center items-center  transition-opacity duration-700 ${secondActiveIndex === 1 ? 'opacity-100' : 'opacity-0'}`}
                >
                  <p>확장 프로그램에서 스크랩한 기사만</p>
                  <p>모아서 볼 수 있어요!</p>
                </div>
              </SwiperSlide>
              <SwiperSlide className="flex flex-col">
                <img
                  src={dashLineForSummary}
                  className={`absolute top-[48px] right-[290px] flex text-white font-bold justify-center transition-opacity duration-700 ${secondActiveIndex === 2 ? 'opacity-100' : 'opacity-0'}`}
                />
                <p
                  className={`absolute top-6 left-0 right-0 flex text-white text-[2rem] font-bold justify-center transition-opacity duration-700 ${secondActiveIndex === 2 ? 'opacity-100' : 'opacity-0'}`}
                >
                  # 뉴스 요약
                </p>
                <div className="mt-[10.25rem]">
                  <img src={EX_maintexta} className="shadow-md rounded-b-3xl" />
                </div>
                <div
                  className={`absolute bottom-20 left-0 right-0 flex flex-col justify-center items-center text-white text-[2rem] font-bold transition-opacity duration-700 ${secondActiveIndex === 2 ? 'opacity-100' : 'opacity-0'}`}
                >
                  <p className="pb-1"># 관련/반대 기사</p>
                  <p className="text-[1.5rem]">빠르게 관련 기사 링크로 이동할 수 있어요</p>
                </div>
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center">
                <p
                  className={`absolute top-6 left-0 right-0 flex text-white text-[2rem] font-bold justify-center transition-opacity duration-700 ${secondActiveIndex === 3 ? 'opacity-100' : 'opacity-0'}`}
                >
                  # 신뢰도 판별 점수
                </p>
                <div className="mt-[10.25rem]">
                  <img src={EX_maintextc} className="shadow-md rounded-b-3xl " />
                </div>
                <div
                  className={`absolute bottom-10 left-0 right-0 flex flex-col text-white text-[1.5rem] font-bold justify-center items-center transition-opacity duration-700 ${secondActiveIndex === 3 ? 'opacity-100' : 'opacity-0'}`}
                >
                  <p>이 기사, 믿어도 될까? </p>
                  <p>뉴스 인사이드에서는 믿어도 됩니다.</p>
                  <p>신뢰도 높은 기사를 확인하고 안심 서핑하세요.</p>
                </div>
              </SwiperSlide>
            </Swiper>
            <div className="absolute top-[8.75rem] left-0 right-0 flex items-center justify-start w-[66.5rem] h-[3.5rem] bg-[#ebebeb] rounded-t-3xl">
              {/* 점 3개 div */}
              <div className="flex justify-around pl-7">
                <div className="w-[0.875rem] h-[0.875rem] bg-[#FF4444] rounded-full mr-[0.5rem]"></div>
                <div className="w-[0.875rem] h-[0.875rem] bg-[#FDB241] rounded-full mr-[0.5rem]"></div>
                <div className="w-[0.875rem] h-[0.875rem] bg-[#65D81F] rounded-full mr-[0.5rem]"></div>
              </div>
            </div>
            {/* 원래 bg-white있었음 */}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-[3rem] m-10 mb-[38.25rem]">
        <p className="font-bold text-white"> 지금 바로 뉴스 인사이드에서, </p>
        <div className="flex">
          <p className="mr-3 font-bold text-white"> 쾌적한 뉴스 서핑을 경험해보세요!</p>
          <img src={whaleIcon} />
        </div>
      </div>
      {/* 맨 아래 아이콘 */}
      <div className="flex justify-between mb-[2rem] w-screen pl-8 pr-14">
        <a href="https://github.com/2024-Summer-Bootcamp-Team-I" target="_blank" rel="noopener noreferrer">
          <img src={githubIcon} alt="GitHub" className="w-8 h-8" />
        </a>
        <a
          href="https://cut-pyjama-3c1.notion.site/News-Inside_-6300d5d15f584f2aa4a1cc48c5c597df"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="text-[1rem] text-white font-bold translate-y-2">개인정보처리방침</p>
        </a>
      </div>
    </div>
  );
};

export default OnBorading;
function useref() {
  throw new Error('Function not implemented.');
}
