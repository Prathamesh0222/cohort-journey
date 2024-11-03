import { useState } from "react";
import Button from "./components/Button";
import Input from "./components/Input";
import Label from "./components/Label";

function App() {
  const [inputValue, setInputValue] = useState("");

  const handleButton = () => {
    console.log("Button clicked with input", inputValue);
  };

  return (
    <div className="flex flex-col justify-center bg-blue-500 min-h-screen">
      <div className="mx-auto">
        <div>
          <Label text={"Verify Your Age"} size={"large"} className="mb-8" />
          <Label
            text={
              "Please confirm your birth year. This data will not be stored. "
            }
            size={"small"}
            color={"gray"}
            className="mb-4"
          />
          <Input
            variant={"outlined"}
            type={"text"}
            placeholder={"Your Birth Date"}
            fullWidth
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            size={"medium"}
            variant={"primary"}
            onClick={handleButton}
            label={"Continue"}
            disabled={!inputValue.trim()}
            className="mt-8"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
