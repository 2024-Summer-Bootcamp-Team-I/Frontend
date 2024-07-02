import React from "react";
import logo from "@assets/img/logo.svg";
import "@src/global.css";
import withSuspense from "@src/shared/hoc/withSuspense";
import withErrorBoundary from "@src/shared/hoc/withErrorBoundary";

const Popup = () => {
  return (
    <div className="App">
      <p>가짜뉴스 판별 서비스</p>
      <p></p>
    </div>
  );
};

export default withErrorBoundary(
  withSuspense(Popup, <div> Loading ... </div>),
  <div> Error Occur </div>
);
