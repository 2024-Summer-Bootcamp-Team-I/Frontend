import Logo from '@root/src/assets/img/logo.png';

const Navbar = () => {
  return (
    <nav className="flex place-items-center  py-[2.25rem] text-2xl ">
      <img src={Logo} alt="Logo" className="px-[3rem]" />
      <div className="flex space-x-[0.125rem]">
        <div className="active:bg-[#113D66] w-[10rem] h-[3rem] text-center rounded-full content-center">
          검증된 기사
        </div>
        <div className="active:bg-[#113D66] w-[10rem] h-[3rem] rounded-full text-center content-center">나의 기사</div>
        <div className="active:bg-[#113D66] w-[10rem] h-[3rem] rounded-full text-center content-center">
          언론사 랭크
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
