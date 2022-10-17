import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import AnimateImg from "../../components/AnimateImg";
import styles from "./index.less";
import dataExchangeImg from "./homeImages/animate/dataExchange.png";
import dataLifeCircleImg from "./homeImages/animate/dataLifeCircle.png";
import dataMetaImg from "./homeImages/animate/dataMeta.png";
import dataModelImg from "./homeImages/animate/dataModel.png";
import dataProcessImg from "./homeImages/animate/dataProcess.png";
import dataQualityImg from "./homeImages/animate/dataQuality.png";
import dataScienceImg from "./homeImages/animate/dataScience.png";
import dataSecurityImg from "./homeImages/animate/dataSecurity.png";
import dataServiceImg from "./homeImages/animate/dataService.png";
import dataSourceImg from "./homeImages/animate/dataSource.png";
import dataStandardImg from "./homeImages/animate/dataStandard.png";
import indicatorImg from "./homeImages/animate/indicator.png";
import indicatorTitle from "./homeImages/indicator.svg";

import bgLine from "./homeImages/bg-line.svg";
import AppBlock from "./AppBlock";
import AppLine from "./AppLine";
// import BlockTitle from "./BlockTitle";

const AnimateDemo = ({ unitHeight, imgCount, bgImage }) => {
  const style1 = {
    // transform: "translateY(-50%)",
    // transform: "skew(0deg, 30deg) rotate(-60deg) translateY(-50%)",
    // top: "50%",
  };
  const wrapRef = useRef();
  const contRef = useRef();
  // 内容区域style
  const [contStyle, setContStyle] = useState({});

  const calcContStyle = () => {
    const { clientWidth, clientHeight } = wrapRef.current || {
      clientWidth: 0,
      clientHeight: 0,
    };
    console.log(clientWidth,clientHeight, "----contRef----");
    // 语法“pow(x,1/y)”，表示开x的y次方根。
    // Math.pow(3,1/2) 根号3
    const sqrt3 = Math.pow(3, 1 / 2);

    const base=clientWidth*0.4;
    const tX= base*0.5;
    const tY=-base/sqrt3;
    const cStyle = {
      height:clientWidth/1.8
      

    };
    console.log(cStyle, "---cStyle-d-sadasdasd-");
    setContStyle(cStyle);
  };
  useEffect(() => {
    calcContStyle()
    window.addEventListener("resize",calcContStyle);
    return ()=>{
      window.removeEventListener('resize',calcContStyle)
    }
  },[]);

  useLayoutEffect(() => {}, []);

  console.log(contStyle, "---contStyle");
  return (
    <div className="homeWrap">
      <div className="container" ref={wrapRef}>
        <div className="content" ref={contRef} style={contStyle}>
          <div className="outBorder">
            <AppLine type="line" style={{ width: 500 }}>
              <AppBlock
                className="appModule"
                animateBg={dataExchangeImg}
                style={style1}
              />
              <AppBlock
                className="appModule"
                animateBg={dataExchangeImg}
                style={{ marginLeft: 150, ...style1 }}
              />
              <AppBlock
                className="appModule"
                animateBg={dataExchangeImg}
                style={{ marginLeft: 350, ...style1 }}
              />
            </AppLine>
            <AppLine style={{ width: 150, height: 360 }}>
              <AppBlock
                className="appModule"
                style={{ top: -120 }}
                animateBg={dataExchangeImg}
              />
              <AppBlock className="appModule " animateBg={dataExchangeImg} />
            </AppLine>
            <AppLine style={{ width: 100 }} type="line"></AppLine>
            <AppLine style={{ width: 150, height: 360 }}>
              <AppBlock
                className="appModule appModule1"
                animateBg={dataExchangeImg}
              />
              <AppBlock
                className="appModule appModule2 "
                animateBg={dataExchangeImg}
              />
            </AppLine>
            <AppLine type="line" style={{ width: 186 }}>
              <AppBlock
                className="appModule"
                animateBg={dataExchangeImg}
                // style={{ left: "50%", marginLeft: -60, marginTop: "" }}
              />
            </AppLine>
            <AppLine style={{ width: 128, height: 248 }}>
              <AppBlock
                className="appModule"
                animateBg={dataExchangeImg}
                style={{ top: -120 }}
              />
              <AppBlock
                className="appModule"
                animateBg={dataExchangeImg}
                style={{ bottom: -28 }}
              />
            </AppLine>
            <AppLine type="line" style={{ width: 100 }}>
              <AppBlock
                className="appModule"
                animateBg={dataExchangeImg}
                style={{ top: -120 }}
              />
            </AppLine>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AnimateDemo;
