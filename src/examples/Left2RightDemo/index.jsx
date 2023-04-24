import LeftRightLayout from "../../components/TopBottomLayout";
import React from "react";
import { Button } from "antd";
const App = () => {
  return (
    <LeftRightLayout
      leftTitle="参数库"
      rightTitle="rightTitle"
      leftContent={<div>1111</div>}
      leftBtn={<div style={{ display: "flex" }}>1111</div>}
      rightContent={<div>2333</div>}
      rightTitleEdit={""}
      rightTitleCancle={() => {}}
      pageLoading={false}
    />
  );
};

export default App;
