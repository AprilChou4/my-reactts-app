// 手写标题
import React, { FC } from "react";
import styles from "./index.module.less";

import "./index.module.less";
import classNames from "classnames";
interface IProps {
  className?: string;
  title: string;
  color?: string;
  style: React.CSSProperties;
}
const BlockTitle: FC<IProps> = ({
  className,
  title,
  color,
  style,
  ...rest
}) => {
  return (
    <div
      className={classNames(styles.blockTitle, className)}
      style={{
        color,
        ...style,
      }}
      {...rest}
    >
      <div className={styles.bgTop}>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.arrow}>
        <div className={styles["arrow-bottom"]}></div>
        <div className={styles["arrow-top"]}></div>
      </div>
    </div>
  );
};
BlockTitle.defaultProps = {
  // css类
  className: "",
};
export default BlockTitle;
