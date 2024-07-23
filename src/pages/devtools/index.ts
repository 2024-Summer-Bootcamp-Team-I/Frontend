try {
  chrome.devtools.panels.create('Dev Tools', 'Logo1.svg', 'src/pages/panel/index.html');
} catch (e) {
  console.error(e);
}
