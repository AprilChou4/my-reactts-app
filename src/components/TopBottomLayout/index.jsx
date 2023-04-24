/**
 * 左右布局组件
 * @author: zlb
 * @since: 2021-03-24 09:14:49
 */
import React, { Component } from "react";
import styles from "./index.less";

class LeftRightLayout extends Component {
  constructor(props) {
    super(props);
    // 数据定义
    this.state = {
      editVisible: false,
    };
    this.sideRef;
    this.wrapRef;
    this.leftRef;
  }

  // 挂载后自动执行
  componentDidMount = () => {
    let height = this.leftRef.offsetHeight;
    this.sideRef.onmousedown = (mousedownEvent) => {
      let event = mousedownEvent || window.event;
      event.preventDefault();
      let pageY = event.clientY;
      let distance = 0;
      this.wrapRef.onmousemove = (mousemoveEvents) => {
        let e = mousemoveEvents || window.event;
        e.preventDefault();
        distance = e.clientY - pageY;
        if (height >= 480 && distance > 0) {
          height = 480;
          this.leftRef.style.height = height + "px";
          return;
        } else if (height <= 240 && distance < 0) {
          height = 240;

          this.leftRef.style.height = height + "px";
          return;
        }

        pageY = e.clientY;
        height = height + distance;

        this.leftRef.style.height = height + "px";

        this.wrapRef.onmouseup = () => {
          this.wrapRef.onmousemove = null;
        };

        this.wrapRef.onmouseleave = () => {
          this.wrapRef.onmousemove = null;
        };
      };
    };
  };

  // 渲染主入口
  render() {
    const {
      leftTitle,
      rightTitle,
      leftBtn,
      rightBtn,
      leftContent,
      rightContent,
      className,
    } = this.props;
    return (
      <div
        ref={(ref) => {
          this.wrapRef = ref;
        }}
        id="LeftRightWrap"
        className={`LeftRightWrap ${className || ""}`}
      >
        <div
          ref={(ref) => {
            this.leftRef = ref;
          }}
          className={"Left"}
        >
          <div className={"titleWrap"}>
            <p className={"title"}>{leftTitle}</p>
            <div className={"btnWrap"}>{leftBtn}</div>
          </div>
          {leftContent}
        </div>

        <div
          ref={(ref) => {
            this.sideRef = ref;
          }}
          className="tab"
        />
        <div className="Right">
          <div className="titleWrap">
            <div className={"titleLeft"}>
              <p className={"title"}>{rightTitle}</p>
            </div>
            <div className={"btnWrap"}>{rightBtn}</div>
          </div>
          {rightContent}
        </div>
      </div>
    );
  }
}
export default LeftRightLayout;
