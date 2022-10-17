// 应用模块连线
import React, { useEffect, useRef } from "react";
import AnimateImg from "../../../components/AnimateImg";
import indicatorImg from "../homeImages/animate/indicator.png";
import indicatorTitle from "../homeImages/indicator.svg";
import blockFoot from "../homeImages/blockFoot.svg";
import styles from "./index.less";
import classnames from "classnames";

import "./index.less";
// interface IProps{

// }\\
const classEnum={
  'line':'line',
  'square':'square',
  'dashSquare' :'square dashSquare'
}
const AppLine = ({ className, style, type, children }) => {

  const lineClassName = `appLine ${classEnum[type]} ${className}`;
  return <div className={lineClassName} style={{
    ...style ? {flex:`0 0 ${style.width}px`} :{},
    ...style,
  }}>{children}</div>;
};
AppLine.defaultProps = {
  // css类
  className: "",
  type: "square", // 'line' || 'square'   线条和方形  'dashSquare'
};
export default AppLine;
