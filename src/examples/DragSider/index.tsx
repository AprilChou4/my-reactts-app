import "antd/dist/antd.css";
import "./index.less";
import React, { useEffect, useRef, useState, CSSProperties } from "react";

import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import throttle from "lodash/throttle";

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

// 实现元素左右拖拽的Hook逻辑
function useLeft2Right(resizeLine, setNavWidth) {
  useEffect(() => {
    let { current } = resizeLine;

    let mouseDown = (e: any) => {
      let resize = throttle(function (e: any) {
        if (e.clientX > 150 && e.clientX < window.innerWidth * 0.8) {
          setNavWidth(e.clientX);
        }
      }, 50);

      let resizeUp = function () {
        document.removeEventListener("mousemove", resize);
        document.removeEventListener("mouseup", resizeUp);
      };

      document.addEventListener("mousemove", resize);
      document.addEventListener("mouseup", resizeUp);
    };

    (current as HTMLElement).addEventListener("mousedown", mouseDown);

    return function () {
      (current as HTMLElement).removeEventListener("mousedown", mouseDown);
    };
  }, []);
}

// 实现元素上下拖拽的Hook逻辑
function useTop2Bottom(resizeLine, wrapRef, setNavWidth) {
  useEffect(() => {
    let { current } = resizeLine;
    let height = wrapRef.current.offsetHeight;
    console.log(height, "----height---");
    let mouseDown = (e: any) => {
      let pageY = e.clientY;
      let distance = 0;
      console.log(e.clientY, current, "----e.clientY----mouseDown");
      //   let mouseMove = throttle(function (e: any) {
      //     console.log(e.clientY, "----e.clientY", e);
      //     distance = e.clientY - pageY;
      //     if (height > 350 && distance > 0) {
      //       height = 350;
      //       setNavWidth(height);
      //     } else if (height <= 100 && distance < 0) {
      //       height = 100;
      //       setNavWidth(height);
      //     } else {
      //       pageY = e.clientY;
      //       height = height + distance;
      //       setNavWidth(height);
      //     }
      //   }, 50);

      let mouseMove = function (e: any) {
        console.log(e.clientY, "----e.clientY", e);
        distance = e.clientY - pageY;
        pageY = e.clientY;
        height = height + distance;
        setNavWidth(height < 100 ? 100 : height);
      };

      let mouseUp = function () {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);
      };

      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
    };
    (current as HTMLElement).addEventListener("mousedown", mouseDown);

    return function () {
      (current as HTMLElement).removeEventListener("mousedown", mouseDown);
    };
  }, []);
}

// 可以拖拽改变宽度的侧边栏组件
function DragSider1(props: { children: JSX.Element | JSX.Element[] }) {
  let { children } = props;

  let [navWidth, setNavWidth] = useState(200);
  let resizeLine = useRef<HTMLDivElement>(null);

  useLeft2Right(resizeLine, setNavWidth);

  let asideStyle: CSSProperties = {
    width: navWidth,
  };

  let resizeLineStyle: CSSProperties = {
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 100,
    width: 8,
    height: "100%",
    backgroundColor: "white",
    cursor: "w-resize",
  };

  let rootClassName =
    "ant-layout-sider ant-layout-sider-dark ant-layout-sider-has-trigger";

  return (
    <aside className={rootClassName} style={asideStyle}>
      <div ref={resizeLine} style={resizeLineStyle} />
      {children}
    </aside>
  );
}

// 可以拖拽改变宽度的侧边栏组件
function DragSider(props: { children: JSX.Element | JSX.Element[] }) {
  let { children } = props;

  let [navHeight, setNavHeight] = useState(200);
  let resizeLine = useRef<HTMLDivElement>(null);
  let wrapRef = useRef(null);

  useTop2Bottom(resizeLine, wrapRef, setNavHeight);

  let asideStyle: CSSProperties = {
    height: navHeight,
    position: "relative",
    // overflow: "auto",
    background: "#ccc",
  };

  let resizeLineStyle: CSSProperties = {
    position: "absolute",
    right: 0,
    bottom: 0,
    zIndex: 100,
    height: 8,
    width: "100%",
    backgroundColor: "#cfc",
    cursor: "row-resize",
  };

  return (
    <div style={asideStyle} className="wrap" ref={wrapRef}>
      {children}
      <div ref={resizeLine} style={resizeLineStyle} />
    </div>
  );
}

function App() {
  return (
    <React.StrictMode>
      <div style={{ minHeight: "100vh", userSelect: "none" }}>
        <DragSider>
          <div className="siderWrap">
            <div className="logo">logo</div>
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item key="1" icon={<PieChartOutlined />}>
                Option 1
              </Menu.Item>
              <Menu.Item key="2" icon={<DesktopOutlined />}>
                Option 2
              </Menu.Item>
              <Menu.Item key="3" icon={<DesktopOutlined />}>
                Option 2
              </Menu.Item>
              <Menu.Item key="4" icon={<DesktopOutlined />}>
                Option 2
              </Menu.Item>
              <Menu.Item key="5" icon={<DesktopOutlined />}>
                Option 2
              </Menu.Item>
              <Menu.Item key="6" icon={<DesktopOutlined />}>
                Option 2
              </Menu.Item>
              <Menu.Item key="9" icon={<FileOutlined />} />
            </Menu>
          </div>
        </DragSider>
        <DragSider>
          <div>我是第二个</div>
        </DragSider>
        <DragSider>
          <div>我是第三个</div>
        </DragSider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              Bill is a cat.
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </div>
    </React.StrictMode>
  );
}
export default App;
