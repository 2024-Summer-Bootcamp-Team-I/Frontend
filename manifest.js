import packageJson from './package.json' assert { type: 'json' };

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = {
  manifest_version: 3,
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,

  background: {
    service_worker: 'src/pages/background/index.js',
    type: 'module',
  },

  action: {
    default_title: 'Click to open panel',
    default_icon: 'icon-34.png',
  },

  permissions: ['storage', 'sidePanel', 'tabs'],
  host_permissions: ['https://news.naver.com/section/*', 'https://n.news.naver.com/mnews/article/*'],

  side_panel: {
    default_path: 'src/pages/sidepanel/index.html',
    matches: ['https://news.naver.com/section/*', 'https://n.news.naver.com/mnews/article/*'],
  },
  options_page: 'src/pages/options/index.html',

  icons: {
    128: 'icon-128.png',
  },
  content_scripts: [
    {
      matches: ['https://news.naver.com/section/*', 'https://n.news.naver.com/mnews/article/*'],
      js: ['src/pages/content/index.js'],
      type: 'module',
    },
  ],
  devtools_page: 'src/pages/devtools/index.html',
  web_accessible_resources: [
    {
      resources: [
        'assets/js/*.js',
        'assets/css/*.css',
        'icon-128.png',
        'icon-34.png',
        'assets/img/*.svg',
        'src/pages/newtab/index.html',
        'src/pages/sidepanel/index.html',
      ],
      matches: ['*://*/*'],
    },
  ],
};

export default manifest;
