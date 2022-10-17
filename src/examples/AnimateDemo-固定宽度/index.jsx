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

const AnimateDemo = ({
  unitHeight,
  imgCount,
  bgImage,
  isTransform = true,
}) => {
  const wrapRef = useRef();
  // 内容区域style
  const [contStyle, setContStyle] = useState({});

  const calcContStyle = () => {
    const { clientWidth, clientHeight } = wrapRef.current || {
      clientWidth: 0,
      clientHeight: 0,
    };
    console.log(clientWidth, clientHeight, "----contRef----");
    // 语法“pow(x,1/y)”，表示开x的y次方根。
    // Math.pow(3,1/2) 根号3
    const sqrt3 = Math.pow(3, 1 / 2);
    const tX = clientWidth * 0.4;
    // const baseWidth = 1 * clientWidth + 100;  // 100 margin??
    const baseWidth = 1.1 * clientWidth;
    const base = baseWidth * 0.4;
    const width = ((baseWidth - base) * sqrt3) / 2;
    const cStyle = {
      width: width + "px",
      height: (base * sqrt3) / 2 + "px",
      // transform: `translate(${base - 230}px,0px)  rotate(60deg)`,
      ...(isTransform
        ? { transform: `translate(0px,0px)  rotate(60deg)` }
        : {}),
    };
    setContStyle(cStyle);
  };

  useEffect(() => {
    calcContStyle();
    window.addEventListener("resize", calcContStyle);
    return () => {
      window.removeEventListener("resize", calcContStyle);
    };
  }, []);

  useLayoutEffect(() => {}, []);

  console.log(contStyle, "---contStyle");
  const style1 = {
    // top:-138
    marginTop: -60,
  };

  const style2 = {
    marginTop: -86,
    marginLeft: 78,
  };
  const style3 = {
    alignSelf: "end",
    flex: "0 0 50%",
  };

  const style4 = {
    alignSelf: "start",
    flex: "0 0 33%",
  };

  const style5 = {
    marginBottom:70,
    marginLeft: 40,
  };
  return (
    <div className="homeWrap">
      <div className="container" ref={wrapRef}>
        <div className="content" style={contStyle}>
          <div
            className="outBorder"
            {...(isTransform && { style: { transform: "skew(0, -30deg)" } })}
          >
            <div className="column" style={{ position: "absolute", bottom: -76 }}>
              <AppBlock
                className="appModule"
                style={{ ...style3 }}
                animateBg={dataExchangeImg}
              />
              <AppBlock
                className="appModule"
                style={{ ...style3 }}
                animateBg={dataExchangeImg}
              />
            </div>
            <div className="column" style={{ position: "absolute", top: -136 }}>
              <AppBlock
                className="appModule"
                style={{ ...style4 }}
                animateBg={dataExchangeImg}
              />
              <AppBlock
                className="appModule"
                style={{ ...style4 }}
                animateBg={dataExchangeImg}
              />
              <AppBlock
                className="appModule"
                style={{ ...style4 }}
                animateBg={dataExchangeImg}
              />
            </div>
            <div className="column">
              <AppLine type="line" style={{ width: 300, marginLeft: -30 }}>
                <AppBlock
                  className="appModule"
                  animateBg={dataExchangeImg}
                  style={style1}
                />
                <AppBlock
                  className="appModule"
                  animateBg={dataExchangeImg}
                  style={{ ...style1 }}
                />
                <AppBlock
                  className="appModule"
                  animateBg={dataExchangeImg}
                  style={{ ...style1 }}
                />
              </AppLine>
              <AppLine style={{ width: 180, height: 360 }} type="dashSquare" className="studioModule">
                <div className="stdioName"></div>
                <AppLine type="line"  className="studioLine">
                  <AppBlock
                    className="appModule"
                    style={{ ...style2 }}
                    animateBg={dataExchangeImg}
                  />
                  <AppBlock
                    className="appModule "
                    animateBg={dataExchangeImg}
                    style={{ ...style2 }}
                  />
                  <AppBlock
                    className="appModule "
                    animateBg={dataExchangeImg}
                    style={{ ...style2 }}
                  />
                </AppLine>
              </AppLine>
              <AppLine style={{ width: 20 }} type="line"></AppLine>
              <AppLine style={{ width: 100, height: 260 }}>
                <AppBlock
                  className="appModule"
                  animateBg={dataExchangeImg}
                  style={{ ...style5,marginBottom: 70 }}
                />
                <AppBlock
                  className="appModule"
                  animateBg={dataExchangeImg}
                  style={style5}
                />
              </AppLine>
              <AppLine
                type="line"
                style={{ width: 126, justifyContent: "flex-end" }}
              >
                <AppBlock
                  className="appModule"
                  animateBg={dataExchangeImg}
                  style={{ ...style1, marginRight: "-40%" }}
                />
              </AppLine>
              <AppLine style={{ width: 100, height: 208 }}>
                <AppBlock
                  className="appModule appModuleSquare"
                  animateBg={dataExchangeImg}
                  style={{ marginBottom: 32 }}
                />
                <AppBlock
                  className="appModule appModuleSquare"
                  animateBg={dataExchangeImg}
                />
              </AppLine>
              <AppLine
                type="line"
                style={{ width: 100, justifyContent: "flex-end" }}
              >
                <AppBlock
                  className="appModule"
                  animateBg={dataExchangeImg}
                  style={{ ...style1, marginRight: "-100%" }}
                />
              </AppLine>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AnimateDemo;
