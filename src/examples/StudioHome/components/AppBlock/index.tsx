// 应用模块
import React, { FC } from "react";
import AnimateImg from "../AnimateImg";
import blockFoot from "@assets/images/homeImages/blockFoot.svg";
import classnames from "classnames";
import BlockTitle from "../BlockTitle";
import styles from "./index.module.less";

interface IProps {
  className?: string;
  animateBg?: any;
  style?: React.CSSProperties;
  titleProps?: any;
  isFoot?: boolean;
  imgProps?: any;
  footProps?: any;
  lineDirection?: any;
  onClick?: (url: string, code: string) => void;
}

const defaultDirection = {
  left: false,
  right: false,
  top: false,
  bottom: false,
};

const AppBlock: FC<IProps> = ({
  className,
  animateBg,
  style,
  titleProps,
  isFoot = true,
  imgProps = {},
  footProps = {},
  lineDirection,
  ...rest
}: IProps) => {
  const finalImgProps = {
    unitWidth: 100,
    unitHeight: 100,
    imgCount: 50,
    delay: 30,
    className: styles["custom-img"],
    init: true,
    ...imgProps,
  };
  const { style: footStyle, ...footRest } = footProps || {};

  const finalDirection = {
    ...defaultDirection,
    ...lineDirection,
  };
  const { left, right, bottom, top } = finalDirection;

  return (
    <div
      className={classnames(styles.appBlock, className || "")}
      style={style}
      {...rest}
    >
      {/* <div
        className={styles.appBlockTitle}
        style={{
          backgroundImage: `url(${titleBg})`,
          ...titleStyle
        }}
        {...titleRest}
      >
        数据占位
      </div> */}
      <BlockTitle className="appBlockTitle" {...titleProps} />
      <AnimateImg bgImage={animateBg} {...finalImgProps} />

      {left && <div className={classnames(styles.line, styles.lineLeft)} />}
      {right && <div className={classnames(styles.line, styles.lineRight)} />}
      {top && <div className={classnames(styles.line, styles.lineTop)} />}
      {bottom && <div className={classnames(styles.line, styles.lineBottom)} />}
      {isFoot && (
        <div
          className={styles.appBlockFoot}
          style={{ backgroundImage: `url(${blockFoot})`, ...footStyle }}
          {...footRest}
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
