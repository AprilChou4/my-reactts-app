import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import AnimateImg from "../../components/AnimateImg";
import styles from "./index.less";
import dataMetaImg from "./homeImages/animate/dataMeta.png";
import dataMetaTitle from "./homeImages/dataMetaTitle.svg";
import dataStandardImg from "./homeImages/animate/dataStandard.png";
import dataStandardTitle from "./homeImages/dataStandardTitle.svg";
import dataQualityImg from "./homeImages/animate/dataQuality.png";
import dataQualityTitle from "./homeImages/dataStandardTitle.svg";

import dataSourceImg from "./homeImages/animate/dataSource.png";
import dataSourceTitle from "./homeImages/dataSourceTitle.svg";

import dataLifeCircleImg from "./homeImages/animate/dataLifeCircle.png";
import dataLifeCircleTitle from "./homeImages/dataLifeCircleTitle.svg";
import dataSecurityImg from "./homeImages/animate/dataSecurity.png";
import dataSecurityTitle from "./homeImages/dataSecurityTitle.svg";
import dataExchangeImg from "./homeImages/animate/dataExchange.png";
import dataExchangeTitle from "./homeImages/dataExchangeTitle.svg";
import dataProcessImg from "./homeImages/animate/dataProcess.png";
import dataProcessTitle from "./homeImages/dataProcessTitle.svg";
import indicatorImg from "./homeImages/animate/indicator.png";
import indicatorTitle from "./homeImages/indicator.svg";
import dataModelImg from "./homeImages/animate/dataModel.png";
import dataModelTitle from "./homeImages/dataModelTitle.svg";
import dataServiceImg from "./homeImages/animate/dataService.png";
import dataServiceTitle from "./homeImages/dataServiceTitle.svg";
import dataScienceImg from "./homeImages/animate/dataScience.png";
import dataScienceTitle from "./homeImages/dataScienceTitle.svg";

import commonDataImg from "./homeImages/animate/dataSource.png";
import standardDataTitle from "./homeImages/standardDataTitle.svg";
import marketDataTitle from "./homeImages/marketDataTitle.svg";
import odsDataTitle from "./homeImages/odsDataTitle.svg";
import dataApplicationTitle from "./homeImages/dataApplicationTitle.svg";
import dataAssetTitle from "./homeImages/dataAssetTitle.svg";

import AppBlock from "./AppBlock";
import AppLine from "./AppLine";
// import BlockTitle from "./BlockTitle";

const AnimateDemo = ({ unitHeight, imgCount, bgImage, isTransform = false }) => {
  const wrapRef = useRef();
  // ????????????style
  const [contStyle, setContStyle] = useState({});

  const calcContStyle = () => {
    const { clientWidth, clientHeight } = wrapRef.current || {
      clientWidth: 0,
      clientHeight: 0,
    };
    console.log(clientWidth, clientHeight, "----contRef----");
    // ?????????pow(x,1/y)???????????????x???y????????????
    // Math.pow(3,1/2) ??????3
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
    marginBottom: 70,
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
            <div
              className="column columnTop"
              style={{ position: "absolute", top: -136 }}
            >
              <AppBlock
                className="appModule"
                style={{ ...style4 }}
                animateBg={dataMetaImg}
                titleProps={{ title: "?????????", titleBg: dataMetaTitle }}
              />
              <AppBlock
                className="appModule"
                style={{ ...style4 }}
                animateBg={dataStandardImg}
                titleProps={{ title: "????????????", titleBg: dataStandardTitle }}
              />
              <AppBlock
                className="appModule"
                style={{ ...style4 }}
                animateBg={dataQualityImg}
                titleProps={{ title: "????????????", titleBg: dataQualityTitle }}
              />
            </div>
           

            <div className="column columnMiddle">
              <AppLine type="line" style={{ width: "30%", marginLeft: -30 }}>
                <AppBlock
                  className="appModule"
                  isFoot={false}
                  animateBg={dataSourceImg}
                  imgProps={{ unitWidth: 140, unitHeight: 140 }}
                  titleProps={{ title: "?????????", titleBg: dataSourceTitle }}
                  style={{ ...style1, marginTop: -118 }}
                />
                <AppBlock
                  className="appModule"
                  animateBg={dataExchangeImg}
                  titleProps={{
                    title: "??????????????????",
                    titleBg: dataExchangeTitle,
                  }}
                  style={{ ...style1 }}
                />
                <AppBlock
                  className="appModule"
                  animateBg={commonDataImg}
                  titleProps={{ title: "????????????", titleBg: odsDataTitle }}
                  style={{ ...style1 }}
                />
              </AppLine>
              <AppLine
                style={{ width: "20%", height: 360 }}
                type="dashSquare"
                className="studioModule"
              >
                <div className="stdioName"></div>
                <AppLine type="line" className="studioLine">
                  <AppBlock
                    className="appModule"
                    style={{ ...style2 }}
                    animateBg={indicatorImg}
                    titleProps={{
                      title: "??????????????????",
                      titleBg: indicatorTitle,
                    }}
                  />
                  <AppBlock
                    className="appModule "
                    animateBg={dataModelImg}
                    titleProps={{ title: "????????????", titleBg: dataModelTitle }}
                    style={{ ...style2 }}
                  />
                  <AppBlock
                    className="appModule "
                    animateBg={dataProcessImg}
                    titleProps={{
                      title: "????????????",
                      titleBg: dataProcessTitle,
                    }}
                    style={{ ...style2 }}
                  />
                </AppLine>
              </AppLine>
              <AppLine style={{ width: "5%" }} type="line"></AppLine>
              <AppLine style={{ width: "10%", height: 260 }}>
                <AppBlock
                  className="appModule"
                  animateBg={commonDataImg}
                  titleProps={{ title: "????????????", titleBg: marketDataTitle }}
                  style={{ ...style5, marginBottom: 70 }}
                />
                <AppBlock
                  className="appModule"
                  animateBg={commonDataImg}
                  titleProps={{ title: "????????????", titleBg: standardDataTitle }}
                  style={style5}
                />
              </AppLine>
              <AppLine
                type="line"
                style={{ width: "15%", justifyContent: "flex-end" }}
              >
                <AppBlock
                  className="appModule"
                  animateBg={dataExchangeImg}
                  titleProps={{ title: "????????????", titleBg: dataAssetTitle }}
                  style={{ ...style1, marginRight: "-40%" }}
                />
              </AppLine>
              <AppLine style={{ width: "10%", height: 208 }}>
                <AppBlock
                  className="appModule appModuleSquare"
                  imgProps={{ unitWidth: 100, unitHeight: 120 }}
                  animateBg={dataScienceImg}
                  titleProps={{ title: "????????????", titleBg: dataScienceTitle }}
                  style={{ marginBottom: 32 }}
                />
                <AppBlock
                  className="appModule appModuleSquare"
                  animateBg={dataServiceImg}
                  titleProps={{ title: "????????????", titleBg: dataServiceTitle }}
                />
              </AppLine>
              <AppLine
                type="line"
                style={{ width: "auto", justifyContent: "flex-end" }}
              >
                <AppBlock
                  className="appModule"
                  animateBg={dataExchangeImg}
                  titleProps={{
                    title: "????????????",
                    titleBg: dataApplicationTitle,
                  }}
                  style={{ ...style1, marginRight: "-100%" }}
                />
              </AppLine>
            </div>
            <div
              className="column columnBottom"
              style={{ position: "absolute", bottom: -76 }}
            >
              <AppBlock
                className="appModule"
                style={{ ...style3 }}
                imgProps={{ unitWidth: 110 }}
                animateBg={dataLifeCircleImg}
                titleProps={{
                  title: "??????????????????",
                  titleBg: dataLifeCircleTitle,
                }}
              />
              <AppBlock
                className="appModule"
                style={{ ...style3 }}
                animateBg={dataSecurityImg}
                titleProps={{ title: "????????????", titleBg: dataSecurityTitle }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AnimateDemo;
