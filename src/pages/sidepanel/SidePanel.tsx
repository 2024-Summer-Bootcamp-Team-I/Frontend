import React, { useRef, useState } from 'react';
import '@src/global.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import bgSidePanel from '@src/assets/img/bg_sidepannel.svg';
import Scrap from './Scrap';
import Signup from './Signup';
import Login from './Login';
<<<<<<< HEAD
import Modal from '@src/components/Modal';
import axios from 'axios';
import Timeline from './Timeline';

const queryClient = new QueryClient();

const SidePanel: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const outside = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (outside.current && outside.current === e.target) {
      closeModal();
=======
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  // 인증 여부를 확인하는 로직
  return !!localStorage.getItem('user_id');
};

const PrivateRoute = ({ element: Element, ...rest }) => {
  return isAuthenticated() ? <Element {...rest} /> : <Navigate to="/login" />;
};

const SidePanel: React.FC = () => {
  // 기본 경로 설정
  const getDefaultRoute = () => {
    if (location.pathname.startsWith('/section')) {
      return <Navigate to="/scrap" />;
    } else if (location.pathname.startsWith('/mnews/article')) {
      return <Navigate to="/timeline" />;
    } else {
      return <Navigate to="/scrap" />;
>>>>>>> develop
    }
  };

  return (
<<<<<<< HEAD
    <QueryClientProvider client={queryClient}>
=======
    <Router>
>>>>>>> develop
      <div
        className="flex justify-center w-screen h-screen bg-bottom bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${bgSidePanel})`,
        }}
      >
        <div className="flex flex-col items-center justify-center">
<<<<<<< HEAD
          <Timeline />
        </div>
      </div>
    </QueryClientProvider>
=======
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/scrap" element={<Scrap />} />
            <Route path="*" element={getDefaultRoute()} />
          </Routes>
        </div>
      </div>
    </Router>
>>>>>>> develop
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div>Loading ...</div>), <div>Error Occur</div>);
