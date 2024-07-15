import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import '@src/global.css';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import SidePanel from '@pages/sidepanel/SidePanel';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import queryClient from '@src/queryClient';

refreshOnUpdate('pages/sidepanel');

function App() {
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      const isNaverNews =
        tab.url?.startsWith('https://news.naver.com/section/105') ||
        tab.url?.startsWith('https://n.news.naver.com/mnews/article/');
      if (!isNaverNews) {
        window.close(); // Close the side panel if not on allowed Naver News pages
      }
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'closeSidePanel') {
        window.close();
      }
    });
  }, []);

  return <SidePanel />;
}

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);
  root.render(
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>,
  );
}

init();
