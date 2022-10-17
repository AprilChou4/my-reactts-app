import React, { FC, PropsWithChildren, ReactNode } from "react";
import { IProps } from "./typing";
// type IProps = { name?: string; age?: number };
interface IProps1 extends PropsWithChildren {
  name?: string;
  age?: number;
  children: ReactNode;
}
const Child: FC<IProps> = (props) => <div>我是child{props.children}</div>;
const Child1 = (props: IProps1) => {
  const { name, children } = props;
  console.log(children);
  return (
    <div className="App">
      <h1>hello child1</h1>
      <h2>{name}</h2>
    </div>
  );
};

function useLoading() {
  const [isLoading, setState] = React.useState(false);

  const load = (aPromise: Promise<any>) => {
    setState(true);
    return aPromise.then(() => setState(false));
  };

  // 实际需要: [boolean, typeof load] 类型

  // 而不是自动推导的：(boolean | typeof load)[]

  return [isLoading, load];
}

interface Animal {
  name: string;
}
interface Cat {
  name: string;
  run(): void;
}

let tom: Cat = {
  name: "Tom",
  run: () => {
    console.log("run");
  },
};
let animal: Animal = tom;

// 使用组件
const FcComp = () => {
  const [isLoading, setLoading] = useLoading();
  return (
    <Child1 name="lucy">
      我是函数组件
      <Child>111</Child>
    </Child1>
  );
};

export default FcComp;
