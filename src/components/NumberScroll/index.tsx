/*
 * @Descripttion:
 * @version:
 * @Author: zxj
 * @Date: 2022-09-02 16:48:26
 */
import React, { Component } from "react";
import classnames from "classnames";
import "./index.less";
interface IProps {
  num: number;
  className?: string;
  style?: React.CSSProperties;
  // 动画时长 第二个参数为0 则不抖动 单位s
  duration?: [number, number];
  // 延时
  delay?: number;
  // 动画样式 主要方便控制速度
  animateStyle?: React.CSSProperties;
  formatNumber?: (num: number) => string;
}

interface IState {
  num: number;
  listAll: any[];
}

const numberReg = /[0-9]/;
class Counter extends Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      num: props.num, //初始化的值，由父组件传递
      listAll: [], //数字有多少位就有多少个二维数组
    };
  }
  public static getDerivedStateFromProps(nextProps: any, prevState: any) {
    const { num } = nextProps;
    console.log(num, "----num----dsadas");
    if (num !== prevState.num) {
      return {
        num,
      };
    }
    return null;
  }

  public componentDidMount() {
    this.run();
  }

  public run() {
    this.getNumber();
  }
  public getNumber() {
    const { num } = this.state;
    console.log(num, "----fafsdfadf----");
    const random = Math.floor(Math.random() * (100000 - 1) + 1); //加随机数
    this.getData(num + random, num);
  }

  public getData(prev: number, next: number) {
    console.log(prev, next, "-----next");
    this.start(this.getDecimal(prev), this.getDecimal(next));
    // this.start("1", "1");
  }

  public getDecimal(num: number): string {
    const { formatNumber } = this.props;
    if (formatNumber) {
      return formatNumber(num);
    }
    console.log(num, "----num");
    return num.toString();
    return num.toLocaleString();
  }

  public start(prev: string, next: string) {
    // prev(n) next(n)前后相等的情况
    const numbers = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ];
    const arr = [];
    for (let n = 0; n < next.length; n++) {
      let start = -1;
      let end = -1;
      //先判断是不是【，】,如果是的话直接放入数组中
      // if ([".", ",", "-"].includes(next[n])) {
      if (!numberReg.test(next[n])) {
        arr.push([next[n]]);
        continue;
      }
      if (n < prev.length) {
        numberReg.test(prev[n])
          ? (start = numbers.findIndex((s) => s === prev[n]))
          : "";
        end =
          start < numbers.findIndex((s) => s === next[n])
            ? numbers.findIndex((s) => s === next[n])
            : numbers.lastIndexOf(next[n]);
      } else {
        end = numbers.findIndex((s) => s === next[n]);
      }
      if (start === -1 && end !== -1) start = 0;
      arr.push(numbers.slice(start, end + 1));
    }

    this.setState({
      listAll: arr,
    });
  }
  public componentDidUpdate(_prevProps: any, prevState: any) {
    if (this.state.num !== prevState.num) {
      this.run();
    }
  }
  public render() {
    let { listAll } = this.state;
    const { className, style, duration, delay = 0, animateStyle } = this.props;
    const [rollDur, debunceDur] = duration || [0.8, 0.6];
    const debunceDelay = delay + rollDur;
    console.log(listAll, this.props, "----listAll");
    return (
      <div className={classnames("box-number", className)} style={style}>
        {listAll.map((list: number[], i: number) => {
          return (
            <div key={i} className="list-wrap">
              <div
                className={classnames("roll", `roll_${list.length - 1}`)}
                style={{
                  animationDuration: `${rollDur}s, ${debunceDur}s`,
                  animationDelay: `${delay}s, ${debunceDelay}s`,
                  ...animateStyle,
                }}
                key={i}
              >
                {list.map((item, index) => {
                  return <div key={index}>{item}</div>;
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
export default React.memo(Counter);
