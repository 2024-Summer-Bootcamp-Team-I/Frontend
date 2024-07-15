import TrustScore from '@root/src/components/TrustScore';
import React from 'react';
import tvIcon from '@src/assets/img/TV.svg';
import calendarIcon from '@assets/img/Calendar.svg';
import PerfectScrollbar from 'react-perfect-scrollbar';

const MainTextA: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-[2rem] 4xl:space-x-[4rem]">
      <div className="w-[54rem] 3xl:w-[70rem] 4xl:w-[80rem] h-[40rem] 3xl:h-[48rem] 4xl:h-[65rem] rounded-[2.5rem] bg-white p-[3rem] 4xl:p-[6rem] pr-0 4xl:pr-0 ">
        <PerfectScrollbar className="w-full h-full">
          <p className="text-2xl font-semibold pr-[3rem] 4xl:pr-[6rem]">
            닭 대신 미생물이 낳은 달걀…‘머랭’까지 칠 수 있다
          </p>
          <div className="flex items-end justify-end mt-4 mb-6 pr-[3rem] 4xl:pr-[6rem]">
            <div className="flex items-center ml-5">
              <img src={tvIcon} className="w-[1rem] h-[1rem]" />
              <span className="ml-2 text-base text-[#505050]">연합뉴스</span>
            </div>
            <div className="flex items-center ml-5">
              <img src={calendarIcon} className="w-[1rem] h-[1rem]" />
              <span className="ml-2 text-base text-[#505050]">2024-07-04</span>
            </div>
          </div>
          <div className="w-[48rem] 3xl:w-[64rem] 4xl:w-[68rem] h-[25rem] 3xl:h-[30rem] 4xl:h-[34rem] bg-gray-500 pr-[3rem] 4xl:pr-[6rem]"></div>
          <p className="mt-8 text-base pr-[3rem] 4xl:pr-[6rem]">
            삼성전자 폴더블폰이 가벼워지고 똑똑해졌다. 그동안 약점으로 꼽혀온 두꺼움과 무거움, 접히는 부위의 주름 등을
            대폭 개선한 데다 전작보다 한층 강력해진 인공지능(AI)을 적용한 덕분이다. 수면 질, 산소 포화도 등 각종 건강
            데이터를 손가락을 통해 정확하게 측정하는 ‘건강 집사’인 갤럭시 링도 처음 공개했다. 삼성은 기존 폴더블폰의
            두께와 무게를 줄이고, 새로운 형태의 디지털 기기를 선보이는 ‘하드웨어 혁신’과 AI 성능을 대폭 끌어올리는
            ‘소프트웨어 고도화’를 통해 애플이 잡고 있는 프리미엄 시장을 공략한다는 계획이다. 삼성전자는 10일 프랑스 파리
            루브르박물관 내 복합문화공간인 카루젤 뒤 루브르에서 ‘갤럭시 언팩 2024’를 열고 △갤럭시 Z플립6 △폴드6 △링
            △워치7 △워치 울트라 △버즈 2종 등 7개 제품을 선보였다. 폴더블폰은 전작과 크기는 비슷하지만 더 얇고
            가벼워졌다. 폴드6는 접었을 때 두께를 13.4㎜에서 12.1㎜로 줄였고, 무게도 253g에서 239g으로 낮췄다. 메인 화면
            크기는 7.6인치로 전작과 같지만, 베젤을 없애 더 커진 느낌을 줬다. 플립6는 배터리 용량(3700㎃h→4000㎃h)을
            키우고, 후면 카메라 성능(1200만 화소→5000만 화소)을 높였다. AI 기능도 강화했다. 통·번역에 걸리는 시간을 없애
            16개 외국어 강의를 실시간으로 한국어로 들을 수 있는 기능을 갖췄다. 영어 문서를 왼쪽 창에 띄우면 AI가 오른쪽
            창에 한국어로 번역·요약해주는 기능도 담았다. 링에는 사용자의 수면, 심박수 등을 측정한 뒤 AI가 수면 패턴을
            분석해주는 기능이 들어갔다. 별도 비용 없이 건강 서비스를 이용할 수 있다. 삼성은 스마트폰과 워치, 링 등을
            연동하는 식으로 ‘갤럭시 AI 생태계’를 확대한다는 전략이다. 링을 끼고 엄지와 검지를 터치하면 사진을 촬영할 수
            있고, 스마트폰 알람도 끌 수 있다. 신제품은 오는 24일부터 순차적으로 판매한다.
          </p>
        </PerfectScrollbar>
      </div>
      <div className="flex flex-col space-y-[2rem] 4xl:space-y-[4rem]">
        <div className="w-[26rem] h-[18.75rem] 3xl:h-[22.75rem] 4xl:h-[30.5rem] rounded-[2.5rem] bg-white pl-10 py-8">
          <PerfectScrollbar className="w-full h-full">
            <p className="text-2xl underline underline-offset-8 text-[#106AAB] font-semibold pb-8">관련 기사</p>
            <p className="pr-10 text-base">
              1. 시민위원회 심의 미거침: 광화문광장에 조형물을 설치하려면 시민위원회의 심의 의결이 필요하지만, 설계안이
              구체화되지 않아 심의를 거치지 않았습니다. 2. 게양대 설치 근거 여론 조사: 게양대 설치의 근거가 되는 2020년
              여론 조사는 민간 태극기 게양이 저조해지는 실태에 대한 인식을 묻는 조사였습니다.
            </p>
          </PerfectScrollbar>
        </div>
        <div className="w-[26rem] h-[18.75rem] 3xl:h-[22.75rem] 4xl:h-[30.5rem] rounded-[2.5rem] bg-white pl-10 py-8">
          <PerfectScrollbar className="w-full h-full">
            <p className="text-2xl underline underline-offset-8 text-[#106AAB] font-semibold pb-8">
              흠 뭐가 들어가는지 모름
            </p>
            <p className="pr-10 text-base">
              1. 시민위원회 심의 미거침: 광화문광장에 조형물을 설치하려면 시민위원회의 심의 의결이 필요하지만, 설계안이
              구체화되지 않아 심의를 거치지 않았습니다. 2. 게양대 설치 근거 여론 조사: 게양대 설치의 근거가 되는 2020년
              여론 조사는 민간 태극기 게양이 저조해지는 실태에 대한 인식을 묻는 조사였습니다.
            </p>
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};

export default MainTextA;
