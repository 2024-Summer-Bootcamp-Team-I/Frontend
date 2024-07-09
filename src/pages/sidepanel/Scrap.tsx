import ScrapBoard from '@root/src/components/ScrapBoard';
import ScrapIcon from '@root/src/assets/img/ScrapIcon.svg';
import line from '@src/assets/img/Line1.svg';
import backGroundSide from '@src/assets/img/bg_sidepannel.svg';
import BlankBoard from '@root/src/components/BlankBoard';

const Scrap = () => {
  return (
    <div
      className="justify-center w-[30rem] h-[100vh]"
      style={{
        backgroundImage: `url(${backGroundSide})`,
      }}
    >
      <div className="flex h-[7.25rem] items-center justify-between">
        <p className="mx-8 h-[3rem] text-[2rem]">LOGO</p>
        <div className="flex mx-4 items-center justify-center w-[14rem] h-[3rem] bg-[#113d66] text-white text-[1.25rem] rounded-full">
          저장한 기사 보러가기
        </div>
      </div>
      <div className="text-[#113D66]">
        <div className="px-[2rem] flex items-center">
          <img src={ScrapIcon} />
          <p className="ml-1 font-extrabold text-[1.5rem]">스크랩</p>
        </div>
        <p className="px-[2rem] py-[0.75rem] text-[1.25rem]">
          저장하고 싶은 뉴스를 이 패널로 드래그하면 뉴스 기사가 저장됩니다.
        </p>
      </div>
      <div className="px-8 pt-[1.25rem] pb-[0.75rem]">
        <img src={line} />
      </div>
      <div className="m-0">
        <BlankBoard />
        <ScrapBoard />
        <ScrapBoard />
      </div>
    </div>
  );
};

export default Scrap;
