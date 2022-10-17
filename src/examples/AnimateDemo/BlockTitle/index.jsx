// 手写标题
import React, { useEffect, useRef } from "react";
import styles from "./index.less";

import "./index.less";
// interface IProps{

// }
const BlockTitle = ({ className, animateBg }) => {
  return (
    <div className="blockTitle">
      <div className="item-top"></div>
      <div className="item-title">指标开发</div>
    </div>
  );
};
BlockTitle.defaultProps = {
  // css类
  className: "",
  // 动画背景
  animateBg: "",
};
export default BlockTitle;
