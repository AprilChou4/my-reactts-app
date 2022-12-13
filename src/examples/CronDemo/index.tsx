import React, { FC } from "react";
import { Dropdown, Input } from "antd";
import Cron from "../../components/Cron";
interface IProps {
  value: any;
  onChange: any;
}
const CronInput: FC<IProps> = (props) => {
  const { value, onChange } = props;

  return (
    <Dropdown
      trigger={["click"]}
      placement="bottomLeft"
      overlay={<Cron value={value} onOk={onChange} />}
    >
      <Input value={value} />
    </Dropdown>
  );
};

export default CronInput;
