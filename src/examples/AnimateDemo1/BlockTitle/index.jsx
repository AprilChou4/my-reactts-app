// 手写标题
import React, { useEffect, useRef } from "react";
import styles from "./index.less";

import "./index.less";
import classNames from "classnames";
// interface IProps{

// }
const BlockTitle = ({ className, title }) => {
  return (
    <div className={classNames('blockTitle',className)}>
      {/*  */}
      <div className="item-top">
        <div className="item-title">{title}</div>
      </div>
      <div className="item-arrow">
        <div className="arrow-bottom"></div>
        <div className="arrow-top"></div>
      </div>
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
