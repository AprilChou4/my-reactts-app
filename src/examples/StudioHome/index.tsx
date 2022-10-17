import React, { useEffect, useRef, useState, FC } from "react";
import { Popover } from "antd";
import { observer, inject } from "mobx-react";
// import cc from "@assets/";
import dataMetaImg from "@assets/images/homeImages/animate/dataMeta.png";
// import dataMetaTitle from '@assets/images/homeImages/dataMetaTitle.svg';
import dataStandardImg from "@assets/images/homeImages/animate/dataStandard.png";
// import dataStandardTitle from '@assets/images/homeImages/dataStandardTitle.svg';
import dataQualityImg from "@assets/images/homeImages/animate/dataQuality.png";
// import dataQualityTitle from '@assets/images/homeImages/dataQualityTitle.svg';
import dataSourceImg from "@assets/images/homeImages/animate/dataSource.png";
// import dataSourceTitle from '@assets/images/homeImages/dataSourceTitle.svg';
import dataLifeCircleImg from "@assets/images/homeImages/animate/dataLifeCircle.png";
// import dataLifeCircleTitle from '@assets/images/homeImages/dataLifeCircleTitle.svg';
import dataSecurityImg from "@assets/images/homeImages/animate/dataSecurity.png";
// import dataSecurityTitle from '@assets/images/homeImages/dataSecurityTitle.svg';
import dataExchangeImg from "@assets/images/homeImages/animate/dataExchange.png";
// import dataExchangeTitle from '@assets/images/homeImages/dataExchangeTitle.svg';
import dataProcessImg from "@assets/images/homeImages/animate/dataProcess.png";
// import dataProcessTitle from '@assets/images/homeImages/dataProcessTitle.svg';
import indicatorImg from "@assets/images/homeImages/animate/indicator.png";
// import indicatorTitle from '@assets/images/homeImages/indicator.svg';
import dataModelImg from "@assets/images/homeImages/animate/dataModel.png";
// import dataModelTitle from '@assets/images/homeImages/dataModelTitle.svg';
import dataServiceImg from "@assets/images/homeImages/animate/dataService.png";
// import dataServiceTitle from '@assets/images/homeImages/dataServiceTitle.svg';
import dataScienceImg from "@assets/images/homeImages/animate/dataScience.png";
// import dataScienceTitle from '@assets/images/homeImages/dataScienceTitle.svg';
import commonDataImg from "@assets/images/homeImages/animate/commonData.png";
// import standardDataTitle from '@assets/images/homeImages/standardDataTitle.svg';
// import marketDataTitle from '@assets/images/homeImages/marketDataTitle.svg';
// import odsDataTitle from '@assets/images/homeImages/odsDataTitle.svg';
import dataAssetImg from "@assets/images/homeImages/animate/dataAsset.png";
// import dataAssetTitle from '@assets/images/homeImages/dataAssetTitle.svg';
import dataApplicationImg from "@assets/images/homeImages/animate/dataApplication.png";
// import dataApplicationTitle from '@assets/images/homeImages/dataApplicationTitle.svg';
import AppBlock from "./components/AppBlock";
import AppLine from "./components/AppLine";
import ApplicationTip from "./components/ApplicationTip";
import classnames from "classnames";
import { detectZoom } from "@utils/common";
import styles from "./index.module.less";

interface IProps {
  global?: any;
}
//
const commonDataStyle = {
  marginTop: 6,
};

// 黑色的title样式
const titleStyle = {
  color: "#333",
};

const StudioHome: FC<IProps> = (props: IProps) => {
  const { global } = props || {};
  const wrapRef: any = useRef();
  // 内容区域style
  const [contStyle, setContStyle] = useState({});

  const calcContStyle = () => {
    let { clientWidth } = wrapRef.current || {
      clientWidth: 0,
      clientHeight: 0,
    };
    console.log(clientWidth, detectZoom(), "----contRef----");

    // 设置最小最大宽度
    if (clientWidth < 1600) {
      // clientWidth = 1600;
    } else if (clientWidth > 1750) {
      clientWidth = 1750;
    }
    clientWidth = 1750;

    // 语法“pow(x,1/y)”，表示开x的y次方根。
    // Math.pow(3,1/2) 根号3
    const sqrt3 = Math.pow(3, 1 / 2);
    // const baseWidth = 1 * clientWidth + 100;  // 100 margin??
    const baseWidth = 1 * clientWidth;
    const base = baseWidth * 0.3;
    const width = ((baseWidth - base) * sqrt3) / 2; //cWidth*0.595
    const cStyle = {
      width: width + "px",
      height: (base * 2) / sqrt3 + "px", // bWidth *0.352
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

  const jumpUrl = (url: string, code: string) => {
    // window.parent.location.href = '#/data-governance';
    global.iframeRoutePush(url, { code, open: false });
  };

  // 默认100 有些笔记本默认是125
  const zoom = detectZoom() / 100;

  return (
    <div className={styles.homeWrap}>
      <div
        className={styles.container}
        ref={wrapRef}
        style={{ transform: `scale(${1 / zoom})` }}
      >
        {/* <div className={styles.content} style={contStyle}> */}
        <div className={styles.outBorder} style={contStyle}>
          <div className={classnames(styles.column, styles.columnTop)}>
            <AppBlock
              className={styles.appModule}
              animateBg={dataMetaImg}
              titleProps={{ title: "元数据" }}
              onClick={() => jumpUrl("/metadata/list", "DataStudio")}
            />
            <AppBlock
              className={styles.appModule}
              animateBg={dataStandardImg}
              titleProps={{ title: "数据标准" }}
              onClick={() =>
                jumpUrl("/data-standard/manager", "DataGovernance")
              }
            />
            <AppBlock
              className={styles.appModule}
              animateBg={dataQualityImg}
              titleProps={{ title: "数据质量" }}
              onClick={() => jumpUrl("/data-quality/rules", "DataGovernance")}
            />
          </div>

          <div className={classnames(styles.column, styles.columnMiddle)}>
            <AppLine type="line" className={styles.line1}>
              <AppBlock
                className={classnames(
                  styles.appModule,
                  styles.datasourceModule
                )}
                isFoot={false}
                animateBg={dataSourceImg}
                imgProps={{ unitWidth: 140, unitHeight: 140, delay: 50 }}
                titleProps={{
                  title: "数据源",
                  ...titleStyle,
                }}
                onClick={() => jumpUrl("/integrated/source", "DataStudio")}
              />
            </AppLine>
            <AppLine type="line" className={styles.line2}>
              <AppBlock
                className={classnames(styles.appModule, styles.exchangeModule)}
                animateBg={dataExchangeImg}
                titleProps={{
                  title: "数据集成交换",
                }}
                onClick={() => jumpUrl("/process/migrate", "DataStudio")}
              />
            </AppLine>
            <AppLine type="line" className={styles.line3}>
              <AppBlock
                className={classnames(styles.appModule, styles.odsModule)}
                style={{ cursor: "default" }}
                isFoot={false}
                animateBg={commonDataImg}
                imgProps={{ style: commonDataStyle }}
                titleProps={{
                  title: "贴源数据",
                  ...titleStyle,
                }}
              />
            </AppLine>
            <AppLine
              style={{ width: "25%", height: "70%" }}
              type="dashSquare"
              className={styles.studioModule}
            >
              <div className={styles.stdioName} />
              <AppLine type="line" className={styles.studioLine}>
                <AppBlock
                  className={classnames(
                    styles.appModule,
                    styles.indicatorModule
                  )}
                  animateBg={indicatorImg}
                  titleProps={{
                    title: "指标开发",
                  }}
                  onClick={() =>
                    jumpUrl("/data-model/indicator/manager", "DataStudio")
                  }
                />
                <AppBlock
                  className={classnames(
                    styles.appModule,
                    styles.dataModelModule
                  )}
                  animateBg={dataModelImg}
                  titleProps={{ title: "数据建模" }}
                  lineDirection={{
                    top: true,
                    bottom: true,
                  }}
                  onClick={() => jumpUrl("/data-model/overview", "DataStudio")}
                />
                <AppBlock
                  className={classnames(
                    styles.appModule,
                    styles.dataProcessModule
                  )}
                  animateBg={dataProcessImg}
                  imgProps={{
                    style: { marginRight: -18 },
                  }}
                  titleProps={{
                    title: "数据加工",
                  }}
                  onClick={() => jumpUrl("/process/dev", "DataStudio")}
                />
              </AppLine>
            </AppLine>
            <AppLine style={{ width: "5%" }} type="line" />
            <AppLine style={{ width: "10%", height: "45%" }}>
              <AppBlock
                className={classnames(styles.appModule, styles.standardModule)}
                style={{ cursor: "default" }}
                isFoot={false}
                animateBg={commonDataImg}
                imgProps={{ style: commonDataStyle }}
                titleProps={{
                  title: "标准数据",
                  ...titleStyle,
                }}
              />
              <AppBlock
                className={classnames(styles.appModule, styles.marketModule)}
                style={{ cursor: "default" }}
                isFoot={false}
                animateBg={commonDataImg}
                imgProps={{ style: commonDataStyle }}
                titleProps={{
                  title: "集市数据",
                  ...titleStyle,
                }}
              />
            </AppLine>
            <AppLine type="line" style={{ width: "20%" }}>
              <AppBlock
                className={classnames(styles.appModule, styles.assetModule)}
                // imgProps={{ unitWidth: 320, unitHeight: 200 }}
                imgProps={{
                  unitWidth: 280,
                  unitHeight: 175,
                  style: { marginTop: -24 },
                }}
                footProps={{ style: { marginTop: -84 } }}
                animateBg={dataAssetImg}
                titleProps={{ title: "数据资产" }}
                onClick={() => jumpUrl("/metadata/data-asset", "DataAssets")}
              />
            </AppLine>
            <AppLine style={{ width: "15%", height: "35%" }}>
              <AppBlock
                className={classnames(
                  styles.appModule,
                  styles.appModuleSquare,
                  styles.scienceModule
                )}
                imgProps={{ unitWidth: 100, unitHeight: 120 }}
                animateBg={dataScienceImg}
                titleProps={{ title: "数据科学" }}
                onClick={() => jumpUrl("", "DataScience")}
              />
              <AppBlock
                className={classnames(
                  styles.appModule,
                  styles.appModuleSquare,
                  styles.serviceModule
                )}
                animateBg={dataServiceImg}
                titleProps={{ title: "数据服务" }}
                footProps={{ style: { marginTop: -62 } }}
                onClick={() => jumpUrl("/data-service/overview", "DataAPI")}
              />
            </AppLine>
            <AppLine type="line" style={{ width: "auto", marginRight: -12 }}>
              <Popover
                content={<ApplicationTip />}
                title={null}
                overlayClassName={styles.applicationTipWrap}
              >
                <AppBlock
                  className={classnames(
                    styles.appModule,
                    styles.applicationModule
                  )}
                  style={{ cursor: "default" }}
                  isFoot={false}
                  imgProps={{ unitWidth: 160, unitHeight: 160 }}
                  animateBg={dataApplicationImg}
                  titleProps={{
                    title: "数据应用",
                  }}
                />
              </Popover>
            </AppLine>
          </div>
          <div className={classnames(styles.column, styles.columnBottom)}>
            <AppBlock
              className={styles.appModule}
              style={{ cursor: "default" }}
              imgProps={{ unitWidth: 110 }}
              animateBg={dataLifeCircleImg}
              titleProps={{
                title: "数据全生命周期",
              }}
            />
            <AppBlock
              className={styles.appModule}
              style={{ cursor: "default" }}
              animateBg={dataSecurityImg}
              titleProps={{ title: "数据安全" }}
            />
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};
export default StudioHome;
