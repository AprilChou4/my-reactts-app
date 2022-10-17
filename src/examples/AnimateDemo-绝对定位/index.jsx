import React, { useRef } from "react";
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
import dataAssetImg from "./homeImages/animate/dataAsset.png";
import indicatorTitle from "./homeImages/indicator.svg";

import bgLine from "./homeImages/bg-line.svg";
import AppBlock from "./AppBlock";
import BlockTitle from "./BlockTitle";

const AnimateDemo = ({ unitHeight, imgCount, bgImage }) => {
  return (
    <div className="homeWrap">
      <div className="container">
        <div className="lineWrap">
          <div className="line1" style={{ width: 474 }}></div>
          <div className="line2"></div>
          <div className="line1" style={{ width: 186 }}></div>
          <div className="line3"></div>
          <div className="line1" style={{ width: 100 }}></div>
          <AppBlock
            animateBg={dataExchangeImg}
            style={{ position: "absolute", top: 48, left: 418 }}
          />
        </div>
        {/* 数据工坊 */}
        <div className="dataStudio">
          <AppBlock
            titleBg={indicatorTitle}
            animateBg={dataModelImg}
            style={{ position: "absolute", top: -62, left: 356 }}
          />
          <AppBlock
            animateBg={dataModelImg}
            style={{ position: "absolute", top: 2, left: 240 }}
          />
          <AppBlock
            animateBg={dataProcessImg}
            style={{ position: "absolute", top: 72, left: 114 }}
            titleProps={{
              style: { backgroundPositionX: 24 },
              titleBg: indicatorTitle,
            }}
          />
          <div className="dataStudioName"></div>
        </div>
        <AppBlock
          animateBg={dataExchangeImg}
          style={{ position: "absolute", top: 48, left: 418 }}
        />
        <AppBlock
          animateBg={dataMetaImg}
          style={{ position: "absolute", top: 430, left: 340 }}
        />
        <AppBlock
          animateBg={dataMetaImg}
          style={{ position: "absolute", top: 120, left: 524 }}
        />
        <AppBlock
          animateBg={dataMetaImg}
          style={{ position: "absolute", top: 200, left: 634 }}
        />
        <AppBlock
          animateBg={dataModelImg}
          style={{ position: "absolute", top: 580, left: 600 }}
        />

        <AppBlock
          animateBg={dataAssetImg}
          imgProps={{ unitWidth: 280, unitHeight: 175 }}
          style={{ position: "absolute", top: 34, left: 898 }}
        />
        <AppBlock
          animateBg={dataProcessImg}
          style={{ position: "absolute", top: 200, left: 1180 }}
        />
        <AppBlock
          animateBg={dataProcessImg}
          style={{ position: "absolute", top: 396, left: 1506 }}
        />
        <AppBlock
          animateBg={dataProcessImg}
          style={{ position: "absolute", top: 450, left: 1260 }}
        />
        <AppBlock
          animateBg={dataProcessImg}
          style={{ position: "absolute", top: 436, left: 1066 }}
        />
        <AppBlock
          animateBg={dataProcessImg}
          style={{ position: "absolute", top: 565, left: 1106 }}
        />
        <AppBlock
          animateBg={dataProcessImg}
          style={{ position: "absolute", top: 664, left: 1494 }}
        />
      </div>
      {/* <BlockTitle/> */}
    </div>
  );
};
export default AnimateDemo;
