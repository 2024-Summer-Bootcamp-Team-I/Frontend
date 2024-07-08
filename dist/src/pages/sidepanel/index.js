import { j as jsxRuntimeExports, a as addHmrIntoView, c as createRoot, r as reactExports } from "../../../assets/js/_virtual_reload-on-update-in-view.js";
/* empty css                        */
import { w as withErrorBoundary, a as withSuspense } from "../../../assets/js/withErrorBoundary.js";
const bgSidePanel = "/assets/svg/bg_sidepannel.chunk.svg";
const SidePanel = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "w-screen h-screen bg-bottom bg-no-repeat bg-cover",
      style: {
        backgroundImage: `url(${bgSidePanel})`
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "My navernews sidepanel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "This side panel will display only on https://news.naver.com/" })
      ]
    }
  );
};
const SidePanel$1 = withErrorBoundary(withSuspense(SidePanel, /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: " Loading ... " })), /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: " Error Occur " }));
addHmrIntoView("pages/sidepanel");
function App() {
  reactExports.useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      var _a, _b;
      const tab = tabs[0];
      const isNaverNews = ((_a = tab.url) == null ? void 0 : _a.startsWith("https://news.naver.com/section/105")) || ((_b = tab.url) == null ? void 0 : _b.startsWith("https://n.news.naver.com/mnews/article/"));
      if (!isNaverNews) {
        window.close();
      }
    });
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === "closeSidePanel") {
        window.close();
      }
    });
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SidePanel$1, {});
}
function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find #app-container");
  }
  const root = createRoot(appContainer);
  root.render(/* @__PURE__ */ jsxRuntimeExports.jsx(App, {}));
}
init();
