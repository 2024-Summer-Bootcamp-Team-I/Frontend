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
document.addEventListener('mousedown', (event) => {
  console.log('Mousedown event:', event.target);
});

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
