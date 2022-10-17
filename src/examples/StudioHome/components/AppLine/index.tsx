// 应用模块连线
import React, { FC } from "react";
import classnames from "classnames";
import styles from "./index.module.less";
interface ClassEnum {
  line: string;
  square: string;
  dashSquare: string;
}
interface IProps {
  className?: string;
  style?: React.CSSProperties;
  type?: keyof ClassEnum;
  children?: any;
}
const classEnum: ClassEnum = {
  line: styles.line,
  square: styles.square,
  dashSquare: classnames(styles.square, styles.dashSquare),
};
const AppLine: FC<IProps> = ({ className, style, type, children }) => {
  const lineClassName = classnames(
    styles.appLine,
    type ? classEnum[type] : "",
    className
  );
  return (
    <div
      className={lineClassName}
      style={{
        ...(style ? { flex: `0 0 ${style.width}px` } : {}),
        ...style,
      }}
    >
      {children}
    </div>
  );
};
AppLine.defaultProps = {
  // css类
  className: "",
  type: "square", // 'line' || 'square'   线条和方形  'dashSquare'
};
export default AppLine;
