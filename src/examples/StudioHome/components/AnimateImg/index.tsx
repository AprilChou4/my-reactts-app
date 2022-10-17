import React, { useEffect, useRef, FC } from "react";
import classnames from "classnames";
import styles from "./index.module.less";
interface IProps {
  maxHeight?: number; // 最大高度
  unitHeight?: number; // 单个高度
  unitWidth?: number; // 单个宽度
  imgCount?: number; // 图片基数 = 总图片个数-1
  bgImage: any;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  init?: boolean;
}
const AnimateImg: FC<IProps> = ({
  className,
  unitHeight = 100,
  unitWidth = 100,
  imgCount = 50,
  bgImage,
  delay,
  style,
  init,
}) => {
  // 图片引用
  const imgRef: any = useRef();
  // 图片从0开始
  const baseRef = useRef(0);
  const enterTimer: any = useRef();
  const leaveTimer = useRef();
  const maxHeight = unitHeight * imgCount;

  useEffect(() => {
    if (init) {
      startAnimation();
    }
    return () => {
      clearInterval(enterTimer.current);
    };
  }, []);

  // 开始动画
  const startAnimation = () => {
    if (!init) {
      return;
    }
    let base = baseRef.current;
    enterTimer.current = setInterval(() => {
      // 49 50
      if (base < imgCount && unitHeight * base < maxHeight) {
        imgRef.current.style.backgroundPositionY = -unitHeight * base + "px";
        base++;
      } else {
        base = 0;
      }
      baseRef.current = base;
    }, delay);
    // clearInterval(leaveTimer.current);
  };

  //   鼠标进入动画停止
  const mouseEnter = () => {
    clearInterval(enterTimer.current);
  };

  //   鼠标移出重新开始动画
  const mouseLeave = () => {
    startAnimation();
  };

  return (
    <div
      className={classnames(styles["title-img"], className)}
      style={{
        backgroundImage: `url(${bgImage})`,
        height: unitHeight,
        width: unitWidth,
        ...style,
      }}
      data-spm-anchor-id="5176.19720258.J_2686872250.i10.183e76f4xFDSOj"
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      ref={imgRef}
    />
  );
};
AnimateImg.defaultProps = {
  unitWidth: 100, // 单个宽度  和设计稿单个保持一致的宽高
  unitHeight: 100, // 单个高度
  imgCount: 20, // 图片基数 = 总图片个数-1
  bgImage: "", // 背景图片
  delay: 30, // 延时时间
  init: true, // 初始是否开启动画
};
export default AnimateImg;
