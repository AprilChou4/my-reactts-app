import React from "react";
class MyComponent<P extends IProps> extends React.Component<P> {
  internalProp: P;
  constructor(props: P) {
    super(props);
    this.internalProp = props;
  }
  render() {
    const { age, name } = this.props;
    return (
      <span>
        hello world,{name},{age}
      </span>
    );
  }
}
// 使用组件
type IProps = { name: string; age: number };
const ClassComponent = () => {
  return (
    <div>
      <MyComponent<IProps> name="React" age={18} />
      {/* <MyComponent<IProps> name="TypeScript" age="hello" />; // Error */}
    </div>
  );
};
export default ClassComponent;
