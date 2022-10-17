import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider, DatePicker, message } from "antd";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from "antd/es/locale/zh_CN";
import "antd/dist/antd.css";
import './index.less'
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  //  </React.StrictMode>
);
