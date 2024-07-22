import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from '@src/components/Navbar';
import RelatedNews from './RelatedNews';
import ServiceInfo from './ServiceInfo';
import MyNews from './MyNews';
import MainTextA from './MainTextA';
import MainTextC from './MainTextC';
import backGround from '@src/assets/img/bg_img.svg';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';

const App: React.FC = () => {
  return (
    <Router>
      <div
        className="flex flex-col w-screen h-screen bg-bottom bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${backGround})` }}
      >
        <Navbar />
        <div className="flex items-center justify-center flex-grow">
          <Routes>
            <Route path="/relatednews" element={<RelatedNews />} />
            <Route path="/serviceinfo" element={<ServiceInfo />} />
            <Route path="/mynews" element={<MyNews />} />
            <Route path="/maintexta/:newsId" element={<MainTextA />} />
            <Route path="/maintextc/:newsId" element={<MainTextC />} />
            <Route path="*" element={<Navigate to="/mynews" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default withErrorBoundary(withSuspense(App, <div> Loading ... </div>), <div> Error Occur </div>);
