import React, { useState } from "react";

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

  return (
    <div style={{ color: "#fff" }}>
      <div>{user.name}</div>
      <div>{status}</div>
      {count}
    </div>
  );
}

export default TsDemo;
