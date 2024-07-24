// content/index.ts
/**
 * DO NOT USE import someModule from '...';
 *
 * @issue-url https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/issues/160
 *
 * Chrome extensions don't support modules in content scripts.
 * If you want to use other modules in content scripts, you need to import them via these files.
 *
 */
console.log('Content script 실행 됨');

// 페이지 로드 후 모든 sa_item_inner 요소에 draggable 속성 추가
document.querySelectorAll('.sa_item_inner').forEach((element) => {
  element.setAttribute('draggable', 'true');
});

// 마우스 다운 이벤트 추가 (디버깅용)
// document.addEventListener('mousedown', (event) => {
//   console.log('Mousedown event:', event.target);
// });

document.addEventListener('dragstart', (event) => {
  const target = event.target as HTMLElement;
  const articleElement = target.closest('.sa_item_inner'); // 드래그할 요소 선택기 수정
  if (articleElement) {
    const article = {
      url: articleElement.querySelector('a')?.href || '',
    };
    console.log('Article dragged:', article);
    event.dataTransfer?.setData('application/json', JSON.stringify(article));
  }
});

// request, sender, sendResponse 세 가지 인자를 받음
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getArticleURL') {
    // getArticleURL 메시지의 action이 'getArticleURL'인지 확인, true면 요청 처리함
    const articleUrl = window.location.href; // 현재 페이지의 URL을 articleUrl 변수에 저장
    console.log('Article URL:', articleUrl);
    // 서버에 POST 요청
    fetch('http://localhost/api/v1/news/timeline', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: articleUrl }),
    })
      .then((response) => response.json()) // 서버로부터의 응답을 JSON 형식으로 변환
      .then((data) => {
        console.log('Response data:', data);
        chrome.storage.local.set({ articleData: data });
        chrome.storage.local.set({ articleUrl: articleUrl });
        // 받은 데이터를 크롬의 로컬 저장소에 저장
        sendResponse({ success: true }); // success 메세지 보냄
      })
      .catch((error) => {
        console.error('Error:', error);
        sendResponse({ success: false });
      });
    return true; // async response
  }
});
// 전체적 코드 흐름
// 현재 페이지의 URL 콘솔 출력 -> POST 요청 -> 응답받아서 로컬에 저장 -> 성공여부 메세지 보냄
