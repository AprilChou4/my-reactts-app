import React, { useEffect, useRef } from "react";
import "./index.less";
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
  init
}) => {
  // 图片引用
  const imgRef = useRef();
  // 图片从0开始
  const baseRef=useRef(0)
  const enterTimer = useRef();
  const leaveTimer = useRef();
  const maxHeight = unitHeight * imgCount ;
  // console.log(unitHeight, imgCount, maxHeight, imgRef,baseRef,"-----maxHeight");

  useEffect(()=>{
    if(init){
      startAnimation();
    }
    return ()=>{
      clearInterval(enterTimer.current);
    }
  },[])

  // 开始动画
  const startAnimation=()=>{
    if(!init){
      return
    }
    let base = baseRef.current;
    enterTimer.current = setInterval(() => {
      // 49 50
      if (base < imgCount && unitHeight * base < maxHeight) {
        imgRef.current.style.backgroundPositionY = -unitHeight * base + "px";
        base++;
        console.log(base, "---base---");
      } else {
        base = 0;
      }
      baseRef.current = base;
      console.log("初始化。。。。。");
    }, delay);
    // clearInterval(leaveTimer.current);
  }

  //   鼠标进入动画停止
  const mouseEnter = () => {
    clearInterval(enterTimer.current);
  };

  //   鼠标移出重新开始动画
  const mouseLeave = () => {
    startAnimation()
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
  bgImage: '', // 背景图片
  delay: 30, // 延时时间
  // style: // 样式
  init: true, // 初始是否开启动画
};
export default AnimateImg;
