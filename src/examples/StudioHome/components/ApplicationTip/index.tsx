// 应用模块连线
import React, { FC } from "react";
import styles from "./index.module.less";

interface IProps {}
// 应用大类
const typeData = [
  {
    title: "智能研发",
  },
  {
    title: "智能制造",
  },
  {
    title: "数字化运营",
  },
  {
    title: "工程优化",
  },
  {
    title: "智能服务",
  },
];

// 业务小类
const businessData = [
  {
    title: "产品数据包",
  },
  {
    title: "企业运营可视化",
  },
  {
    title: "车间生产可视化",
  },
  {
    title: "库存预锁定",
  },
  {
    title: "设备健康管理",
  },
  {
    title: "刀具寿命预测",
  },
  {
    title: "人员尽职分析",
  },
  {
    title: "供应商履职分析",
  },
  {
    title: "工艺优化",
  },
  {
    title: "远程故障预判",
  },
  {
    title: "质量追溯",
  },
  {
    title: "……",
  },
];
const ApplicationTip: FC<IProps> = () => {
  return (
    <div className={styles.applicationTip}>
      <h3>行业应用</h3>
      <div className={styles.tipContent}>
        <ul className={styles.typeList}>
          {typeData.map((item, index: number) => (
            <li key={index}>{item.title}</li>
          ))}
        </ul>
        <ul className={styles.businessList}>
          {businessData.map((item, index: number) => (
            <li key={index}>{item.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default ApplicationTip;
