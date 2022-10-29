import { useState } from "react";

const useBooleanState = (defaultBool: boolean) => {
  const [bool, setBool] = useState(defaultBool);

  const onTrue = () => {
    setBool(true);
    console.log(bool);
  };
  const onFalse = () => {
    setBool(false);
    console.log(bool);
  };

  return {
    bool,
    onTrue,
    onFalse,
  };
};

export { useBooleanState };
