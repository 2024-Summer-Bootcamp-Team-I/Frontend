import { j as jsxRuntimeExports, a as addHmrIntoView, c as createRoot } from "../../../assets/js/_virtual_reload-on-update-in-view.js";
/* empty css                        */
import { w as withErrorBoundary, a as withSuspense } from "../../../assets/js/withErrorBoundary.js";
const backGround = "/assets/svg/bg_img.chunk.svg";
const Logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAAAZCAYAAACfIRhSAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALuSURBVHgB7VnRbRsxDH0p+t/boOwEcSeoPEGzQW+DeIPcBnYnsDdwO4GdCexMYHWCJBOkkq1DKPkkUdYFRYA+gMAdTnqkSEomZeA/LsbSyMYJoR6NkTsjOyMvTA5Ol8JlUEbmjofzPuJke+t0j8W7c/ZSbCKfQKjDLU4LecnIulDXXMDZB+dGTivmteO8oFw5ZeTevxjRuAx3Rjr2/mTkl5E/Tuk1/GzTRqbI69sE87ZGHozsHe/EyDf4gZi6cSnYbGrZu+W7d3Y3jnMSfJ+670eMkXG38CM0i4yjQN8mTXsMBt+SKsG7CsY2I/DeBPbO+cdax1HAMcuMb4TjCX4wJshjw8Z3Ql5CGvY7P35U/6HWcR2bvxTOUfAjPoRlJe9BwNtBhg4Du6TWcXy+JCt68OxQGV4FOXZurpVwuzYoyzY+j2ddExpIKAMhH+EYFohvV77AR4wHBfn5GmLN5rYfUAeeYQ8ow549Xyd49xgPNfbes2eqdRzfChpl4A6h4Bt/f8Z4IPasUYYn9vy51nEUIS41hBLjxtyqTUR/MT7i/cI6Idcl2AK8ykExvHfH5cqULd7IcbVblRtV2mDXnI//HLUZxx33CWVohLyx2lDj1FuHsGUGJeb0iI2Jgdv7XOu4LXtWKEOqNEj94nJolEFjWL8EvGQ62lfbOZxV1ELwzmHokL+0c0itJyysS+w965BqHcc7gE44h5DvDDpcVuXn1sMD1kIGhYEOqdZxBN8JJJizRL6BD/vDXOnRI7ceBd8JVMjZShVJsCgwZl4wdgY/KC3SUJA18RuhDTZ4awxkW3gD/BOyuseOWQQKrDH8wF0Z+Y3XG1V7uLYov6ldGfkxwKsZt9X7HX5W2gP8a4ST4P/69rfVob0zvJ6DGsGNNc84qRxwjgb+LWxKUreuQ1gU2rdC/uAnyNc+mJVjOa5HC38rhA7rUF4s9wtdIR0Mq1ehDC3O/5Hj6+yG7L3C26HfQj00xusQVPCuUc9dZO9fhi+im0Ou+g4AAAAASUVORK5CYII=";
const Navbar = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex place-items-center  py-[2.25rem] text-2xl ", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: Logo, alt: "Logo", className: "px-[3rem]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-[0.125rem]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "active:bg-[#113D66] w-[10rem] h-[3rem] text-center rounded-full content-center", children: "검증된 기사" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "active:bg-[#113D66] w-[10rem] h-[3rem] rounded-full text-center content-center", children: "나의 기사" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "active:bg-[#113D66] w-[10rem] h-[3rem] rounded-full text-center content-center", children: "언론사 랭크" })
    ] })
  ] });
};
const Newtab = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "w-screen h-screen bg-bottom bg-no-repeat bg-cover",
      style: {
        backgroundImage: `url(${backGround})`
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {})
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
