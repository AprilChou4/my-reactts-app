import { useState, MouseEvent, ChangeEvent } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClick = (event: MouseEvent) => {
    console.log("提交被触发");
  };

  return (
    <div>
      <input
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
      />
      <button
        onClick={() => {
          console.log("提交被触发");
        }}
      >
        提交
      </button>
    </div>
  );
}
export default App;
