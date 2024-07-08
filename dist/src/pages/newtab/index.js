import { j as jsxRuntimeExports, a as addHmrIntoView, c as createRoot } from "../../../assets/js/_virtual_reload-on-update-in-view.js";
/* empty css                        */
import { w as withErrorBoundary, a as withSuspense } from "../../../assets/js/withErrorBoundary.js";
const backGround = "/assets/svg/bg_img.chunk.svg";
const searchicon = "data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M26.1333%2028L17.7333%2019.6C17.0667%2020.1333%2016.3%2020.5556%2015.4333%2020.8667C14.5667%2021.1778%2013.6444%2021.3333%2012.6667%2021.3333C10.2444%2021.3333%208.19467%2020.4942%206.51733%2018.816C4.84%2017.1378%204.00089%2015.088%204%2012.6667C3.99911%2010.2453%204.83822%208.19556%206.51733%206.51733C8.19645%204.83911%2010.2462%204%2012.6667%204C15.0871%204%2017.1373%204.83911%2018.8173%206.51733C20.4973%208.19556%2021.336%2010.2453%2021.3333%2012.6667C21.3333%2013.6444%2021.1778%2014.5667%2020.8667%2015.4333C20.5556%2016.3%2020.1333%2017.0667%2019.6%2017.7333L28%2026.1333L26.1333%2028ZM12.6667%2018.6667C14.3333%2018.6667%2015.7502%2018.0836%2016.9173%2016.9173C18.0844%2015.7511%2018.6676%2014.3342%2018.6667%2012.6667C18.6658%2010.9991%2018.0827%209.58267%2016.9173%208.41733C15.752%207.252%2014.3351%206.66844%2012.6667%206.66667C10.9982%206.66489%209.58178%207.24844%208.41733%208.41733C7.25289%209.58622%206.66933%2011.0027%206.66667%2012.6667C6.664%2014.3307%207.24756%2015.7476%208.41733%2016.9173C9.58711%2018.0871%2011.0036%2018.6702%2012.6667%2018.6667Z'%20fill='black'/%3e%3c/svg%3e";
const SearchBar = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shadow-lg flex justify-between w-[30rem] h-[3rem] mt-[2.25rem] mr-[3rem] border border-black rounded-full text-[1rem] hover:border-white hover:border-3 focus:border-white focus:border-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "text",
        placeholder: "검색",
        className: "p-2 pl-4 m-0 text-black placeholder-gray-600 bg-transparent rounded-full focus:outline-none focus:text-white focus:placeholder-opacity-0"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        className: "mr-4 duration-200 hover:filter hover:invert transition-filter",
        src: searchicon,
        alt: "대체텍스트"
      }
    ) })
  ] }) });
};
const Newtab = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "w-screen h-screen bg-bottom bg-no-repeat bg-cover",
      style: {
        backgroundImage: `url(${backGround})`
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SearchBar, {})
    }
  );
};
const Newtab$1 = withErrorBoundary(withSuspense(Newtab, /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: " Loading ... " })), /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: " Error Occur " }));
addHmrIntoView("pages/newtab");
function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find #app-container");
  }
  const root = createRoot(appContainer);
  root.render(/* @__PURE__ */ jsxRuntimeExports.jsx(Newtab$1, {}));
}
init();
