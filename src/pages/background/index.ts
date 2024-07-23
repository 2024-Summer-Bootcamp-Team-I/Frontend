import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';

reloadOnUpdate('pages/background');

console.log('background loaded');
console.log('background loaded');

// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch((error) => console.error(error));

// 업데이트 될때마다 리스너 실행
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log('Tab updated:', tab.url);
  if (changeInfo.status === 'complete' && tab.url.includes('n.news.naver.com/mnews/article')) {
    //url패턴이 일치하는지 확인
    console.log('Sending message to content script');
    chrome.tabs.sendMessage(tabId, { action: 'getArticleURL' });
  }
});
// { action: 'getArticleURL' } 메시지를 content로 보냄
// 전체적 코드흐름
// 업데이트 되면 이벤트 리스너 호출 -> 로딩후 url 일치여부 확인 -> { action: 'getArticleURL' } 메세지 보냄
