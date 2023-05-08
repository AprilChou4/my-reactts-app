/*
 * @Description:
 * @Author: zhouxiaojuan
 * @Date: 2021-04-25 09:40:15
 * @LastEditTime: 2021-06-25 14:32:11
 * @LastEditors: zhouxiaojuan
 */
import React from "react";
// import { NodeTypes } from './Constants';
// import AddNode from "./Add";

function NodeWrap(props) {
  const {
    title,
    children,
    objRef,
    onContentClick,
    titleStyle,
    type,
    className,
  } = props;
  return (
    // <div>
    <div className={`node-wrap ${className || ""}`}>
      <div className={`node-wrap-box`}>
        <div className="title" style={titleStyle}>
          {title}
        </div>
        <div className="content" onClick={onContentClick}>
          {children}
        </div>
      </div>
      <div className="add-node-btn-box">
        <div className="add-node-btn">+</div>
      </div>
    </div>
    // </div>
  );
}
NodeWrap.defaultProps = {
  onContentClick() {},
};
export default NodeWrap;
