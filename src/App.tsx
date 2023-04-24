import React, { useState } from "react";
import "./App.css";
import NumberScrollDemo from "./examples/NumberScrollDemo";
import AnimateDemo from "./examples/AnimateDemo1";
import StudioHome from "./examples/StudioHome";
// import TsDemo from "./examples/TsDemo";
import FormDemo from "./examples/FormDemo";
// import HtmlToImg from "./examples/HtmlToImg";
// import Cron from "react-cron-antd";
import { Dropdown, Input } from "antd";
import Cron from "./components/Cron";
import CronDemo from "./examples/CronDemo";
import DragSider from "./examples/DragSider";
import Left2RightDemo from "./examples/Left2RightDemo";

function App() {
  return (
    <div className="App">
      {/* <NumberScrollDemo />
      <StudioHome /> */}
      {/* <FormDemo /> */}
      {/* <HtmlToImg /> */}
      {/* <Cron
        // value="* * * * * ? *"
        // value="0/10 * * * * ? *"
        // value="0 0/1 0-23 * * ?"
        // value="0 0/6 0-17 ? 1 SUN,MON,TUE *"
        onOk={(value) => console.log("cron:", value)}
      /> */}
      {/* <CronDemo vlaue="0 0/6 0-17 * * ?" /> */}
      <DragSider />
      <Left2RightDemo />
      <Left2RightDemo />
      <Left2RightDemo />
    </div>
  );
}

export default App;
