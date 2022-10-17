import React, { useEffect, useRef } from "react";
import "./index.less";
import defauleImg from "./default_bg.png";
// interface {
//     maxHeight:number; // 最大高度
//     unitHeight:number ;  // 单个高度
//     imgCount:number ;  // 图片基数 = 总图片个数-1
// }
const AnimateImg = ({
  className,
  unitHeight,
  unitWidth,
  imgCount,
  bgImage,
  delay,
  style,
}) => {
  const imgRef = useRef(0);
  const enterTimer = useRef();
  const leaveTimer = useRef();
  const maxHeight = unitHeight * imgCount;
  console.log(unitHeight, imgCount, maxHeight, "-----maxHeight");

  // useEffect(()=>{
  //   mouseEnter();
  //   return ()=>{
  //     clearInterval(enterTimer.current);
  //   }
  // },[])

  //   鼠标进入
  const mouseEnter = () => {
    let base = 0;
    enterTimer.current = setInterval(() => {
      if (base < imgCount && unitHeight * base < maxHeight) {
        imgRef.current.style.backgroundPositionY = -unitHeight * base + "px";
        base++;
        console.log(base, "---base---");
        imgRef.current.base = base;
      } else {
        clearInterval(enterTimer.current);
      }
      console.log("enterTimer111111111");
    }, delay);
    clearInterval(leaveTimer.current);
  };

  //   鼠标移出
  const mouseLeave = () => {
    let base = imgRef.current.base;
    leaveTimer.current = setInterval(() => {
      if (base > 0 && unitHeight * base > 0) {
        base--;
        imgRef.current.style.backgroundPositionY = -unitHeight * base + "px";
      } else {
        clearInterval(leaveTimer.current);
      }
      console.log("leaveTimer111111111");
    }, delay);
    clearInterval(enterTimer.current);
  };
  return (
    <div
      className={`title-img ${className}`}
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
  // maxHeight: 1344, // 最大高度 = unitHeight*(imgCount+1)
  unitWidth: 64, // 单个宽度  和设计稿单个保持一致的宽高
  unitHeight: 64, // 单个高度
  imgCount: 20, // 图片基数 = 总图片个数-1
  bgImage: defauleImg, // 背景图片
  delay: 30, // 延时时间
  // style: // 样式
  // init: false, // 初始是否开启动画
};
export default AnimateImg;
