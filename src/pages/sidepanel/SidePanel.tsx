import React, { useEffect, useRef, useState } from 'react';
import '@src/global.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import bgSidePanel from '@src/assets/img/bg_sidepannel.svg';
import Scrap from './Scrap';
import Signup from './Signup';
import Login from './Login';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Timeline from './Timeline';

const isAuthenticated = () => {
  // 인증 여부를 확인하는 로직
  return !!localStorage.getItem('user_id');
};

const PrivateRoute = ({ element: Element, ...rest }) => {
  return isAuthenticated() ? <Element {...rest} /> : <Navigate to="/login" />;
};

const DefaultRoute: React.FC = () => {
  const [defaultRoute, setDefaultRoute] = useState<React.ReactElement | null>(null);

  useEffect(() => {
    chrome.storage.local.get(['currentTabUrl'], (result) => {
      const currentTabUrl = result.currentTabUrl || '';
      console.log('currentTabUrl:', currentTabUrl);

      if (currentTabUrl.includes('/section')) {
        setDefaultRoute(<Navigate to="/scrap" />);
      } else if (currentTabUrl.includes('/mnews/article')) {
        setDefaultRoute(<Navigate to="/timeline" />);
      } else {
        setDefaultRoute(<Navigate to="/scrap" />);
      }
    });
  }, []);

  return defaultRoute;
};

const SidePanel: React.FC = () => {
  // 기본 경로 설정
  return (
    <Router>
      <div
        className="flex justify-center w-screen h-screen overflow-x-hidden bg-bottom bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${bgSidePanel})`,
        }}
      >
        <div className="flex flex-col items-center justify-center">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/scrap" element={<Scrap />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="*" element={<DefaultRoute />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div>Loading ...</div>), <div>Error Occur</div>);
