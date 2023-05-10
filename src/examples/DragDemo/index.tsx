// react实现拖拽
import React from "react";
// 引入css样式
import "./demo.css";
class Drag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      translateX: 0,
      translateY: 0,
    };
  }
  small_down = (e) => {
    var obig = this.refs.move.parentNode;
    var osmall = this.refs.move;
    var e = e || window.event; /*用于保存小的div拖拽前的坐标*/
    osmall.startX = e.clientX - osmall.offsetLeft;
    osmall.startY = e.clientY - osmall.offsetTop; /*鼠标的移动事件*/
    document.onmousemove = function (e) {
      var e = e || window.event;
      osmall.style.left = e.clientX - osmall.startX + "px";
      osmall.style.top =
        e.clientY - osmall.startY + "px"; /*对于大的DIV四个边界的判断*/
      //   let x = obig.offsetWidth - osmall.offsetWidth;
      //   let y = obig.offsetHeight - osmall.offsetHeight;
      //   //   if (e.clientX - osmall.startX <= 0) {
      //   //     osmall.style.left = 0 + "px";
      //   //   }
      //   //   if (e.clientY - osmall.startY <= 0) {
      //   //     osmall.style.top = 0 + "px";
      //   //   }
      //   if (e.clientX - osmall.startX >= x) {
      //     osmall.style.left = x + "px";
      //   }
      //   if (e.clientY - osmall.startY >= y) {
      //     osmall.style.top = y + "px";
      //   }
    }; /*鼠标的抬起事件,终止拖动*/
    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
  componentDidMount() {}
  render() {
    return (
      <div className="box">
        <div
          className="box-item"
          ref="move"
          onMouseDown={(e) => this.small_down(e)}
          style={{
            position: "absolute",
            left: `${this.state.translateX}px`,
            top: `${this.state.translateY}px`,
          }}
        />
      </div>
    );
  }
}
export default Drag;
