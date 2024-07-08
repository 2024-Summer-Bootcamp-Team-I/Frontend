import { j as jsxRuntimeExports, a as addHmrIntoView, c as createRoot } from "../../../assets/js/_virtual_reload-on-update-in-view.js";
/* empty css                        */
const Options = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container", children: "Options" });
};
addHmrIntoView("pages/options");
function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find #app-container");
  }
  const root = createRoot(appContainer);
  root.render(/* @__PURE__ */ jsxRuntimeExports.jsx(Options, {}));
}
init();
