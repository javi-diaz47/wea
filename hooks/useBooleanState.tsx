import { useState } from "react";

const useBooleanState = (defaultBool: boolean) => {
  const [bool, setBool] = useState(defaultBool);

  const onTrue = () => {
    setBool(true);
  };
  const onFalse = () => {
    setBool(false);
  };

  return {
    bool,
    onTrue,
    onFalse,
  };
};

export { useBooleanState };
