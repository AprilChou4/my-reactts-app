// 应用模块
import React, { useEffect, useRef } from "react";
import AnimateImg from "../../../components/AnimateImg";
import indicatorImg from "../homeImages/animate/indicator.png";
import indicatorTitle from "../homeImages/indicator.svg";
import blockFoot from "../homeImages/blockFoot.svg";
import styles from "./index.less";

import "./index.less";
// interface IProps{

// }
const AppBlock = ({
  className,
  animateBg,
  style,
  titleProps,
  isFoot = true,
  imgProps = {},
  footProps={}
}) => {
  const finalImgProps = {
    unitWidth: 100,
    unitHeight: 100,
    imgCount: 50,
    delay: 30,
    className: "custom-img",
    init: false,
    ...imgProps,
  };
  const { style: titleStyle, titleBg, ...titleRest } = titleProps || {};
  const { style: footStyle,  ...footRest } = footProps || {};
  return (
    <div className={`appBlock ${className || ""}`} style={style}>
      <div
        className="appBlockTitle"
        style={{
          backgroundImage: `url(${titleBg})`,
          ...titleStyle,
        }}
        {...titleRest}
      ></div>
      <AnimateImg bgImage={animateBg} {...finalImgProps} />
      {isFoot && (
        <div
          className="appBlockFoot"
          style={{ backgroundImage: `url(${blockFoot})`,...footStyle, }}
        />
      )}
    </div>
  );
};
AppBlock.defaultProps = {
  // css类
  className: "",
  // 动画背景
  animateBg: "",
  // 标题设置  titleBg
  titleProps: undefined,
};
export default AppBlock;
