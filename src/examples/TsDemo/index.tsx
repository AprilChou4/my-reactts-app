import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import React, { useState, useEffect, useRef, useCallback } from "react";
import ClassComponent from "./ClassComponent";
import FcComp from "./FcComp";

interface Person {
  name: string;
  age: number;
  sex: string;
}

const person: Exclude<Person, "name" | "age"> = {
  sex: "female",
  name: "zhou",
  age: 18,
};

function TsDemo() {
  const [user, setUser] = useState<Person>({} as Person);

  const [status, setStatus] = useState(false);

  const [count, setCount] = useState(1);

  // #region ============类型断言=====================
  function getLength(params: number | string): number {
    const str = params as string;
    if (str.length) {
      return str.length;
    }
    return str.toString().length;
  }
  console.log(getLength(1), getLength("2"));

  interface Cat {
    name: string;
    run(): void;
  }
  interface Fish {
    name: string;
    swim(): void;
  }

  function isFish(animal: Cat | Fish) {
    //这里讲animal 断言成Fish对象 强制类型转换，运行报错
    if (typeof (animal as Fish).swim === "function") {
      return true;
    }
    return false;
  }
  const cat: Cat = {} as Cat;
  console.log(cat.name, "----cat.name----");
  // #endregion  ============类型断言=====================

  // useEffect(() => {
  //   console.log("useEffect");
  //   return null;
  // }, []);

  const inpRef = useRef<HTMLInputElement>(null!);
  const numberRef = useRef(1);
  const onClickHandler = () => {
    console.log(inpRef.current, inpRef.current.value);
    console.log(numberRef, numberRef.current, "-----dasd-----");
    numberRef.current = 2;
  };

  const add = (a: number, b: number) => a + b;
  const [b, setB] = useState(1);
  const memoizedCallback = useCallback(
    (a) => {
      add(a, b);
    },
    [b]
  );
  memoizedCallback(5);

  const radioChange = (e: RadioChangeEvent) => {
    console.log(e.target.value);
  };

  return (
    <div>
      <div>{user.name}</div>
      <div>{status}</div>
      {count}

      <div>
        <input type="text" ref={inpRef} />
        <button onClick={onClickHandler}>点我呀</button>
        <Radio.Group onChange={radioChange}>
          <Radio value={1}>1</Radio>
          <Radio value={2}>2</Radio>
        </Radio.Group>
      </div>
      <div>=====================================</div>
      {/* <ClassComponent /> */}
      <FcComp />
    </div>
  );
}

export default TsDemo;
