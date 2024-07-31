import React, { useEffect, useRef, useState } from 'react';
import { HashRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from '@src/components/Navbar';
import RelatedNews from './RelatedNews';
import ServiceInfo from './ServiceInfo';
import MyNews from './MyNews';
import MainTextA from './MainTextA';
import MainTextC from './MainTextC';
import backGround from '@src/assets/img/bg_img.svg';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import OnBorading from './OnBorading';
import bgOnBoarding from '@src/assets/img/bg_onboarding_3222.svg';

const App: React.FC = () => {
  const [wallpaper, setWallpaper] = useState<string>(backGround);
  const [isBlurActive, setIsBlurActive] = useState(false);

  const divElement = useRef<HTMLDivElement>();

  const longWallpaper = () => {
    setWallpaper(bgOnBoarding);
    divElement.current.className = 'flex flex-col justify-center w-screen h-full bg-local bg-no-repeat bg-cover';
  };

  const shortWallpaper = () => {
    setWallpaper(backGround);
    divElement.current.className = 'flex flex-col w-screen h-screen bg-bottom bg-no-repeat bg-cover';
  };

  return (
    <Router>
      <div
        ref={divElement}
        className="flex flex-col w-screen h-screen bg-bottom bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${wallpaper})` }}
      >
        <Navbar long={longWallpaper} short={shortWallpaper} isBlurActive={isBlurActive} />
        <div className="flex items-center justify-center flex-grow">
          <Routes>
            <Route path="/relatednews" element={<RelatedNews />} />
            <Route path="/serviceinfo" element={<ServiceInfo />} />
            <Route path="/mynews" element={<MyNews />} />
            <Route path="/maintexta/:newsId" element={<MainTextA />} />
            <Route path="/maintextc/:newsId" element={<MainTextC />} />
            <Route path="*" element={<Navigate to="/mynews" />} />
            <Route path="/onboarding" element={<OnBorading setNavbarBlur={setIsBlurActive} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default withErrorBoundary(withSuspense(App, <div> Loading ... </div>), <div> Error Occur </div>);
