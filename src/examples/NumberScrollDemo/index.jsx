import React, { useEffect, useRef, useState } from "react";
import NumberScroll from "../../components/NumberScroll";
import styles from "./index.less";
const DigitalNumber = (props) => {
  return <div>{props.number}</div>;
};
const NumberScrollDemo = ({ unitHeight, imgCount, bgImage }) => {
  const [count, setCount] = useState(888);

  // 老虎机效果
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1);
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  });

  return (
    <div style={{color:'#fff'}}>
      <div>负数、小数点位数，小数为0,千分符,</div>
      <div style={{ display: "flex", justifyContent: "end" }}>
        {/* <NumberScroll
          num={0}
          style={{  border1: "1px solid #ccc", width: 24, height: 32,borderRadius:3 }}
          duration={[0,0.6]}
        /> */}
        {/* <NumberScroll num={12345678}/> */}
        <NumberScroll num={12345678.0} />
        {/* <NumberScroll num={12345678.001}/> */}
        {/* 滚动+抖动 */}
        {/* <NumberScroll num={12345678} formatNumber={(num)=>{
        return `¥${num.toLocaleString()}元`
      }}/> */}
        {/* 大数字：<NumberScroll num={12345678} />
      小数：<NumberScroll num={-12345678.2} />
      只滚动：<NumberScroll num={count} duration={[0.8,0]}/>
      只抖动：<NumberScroll num={count} duration={[0,1]}/>
      延迟：<NumberScroll num={count}  delay={1}/> */}
       
      </div>
      <div className="roll_single">{count}</div>
        <DigitalNumber number={'2.0'} />
    </div>
  );
};
export default NumberScrollDemo;
