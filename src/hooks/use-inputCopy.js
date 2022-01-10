import { useState } from "react";
const useInput = (validateValue) => {
  // #1 touch state and value
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  //#2 Inferred States
  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  //#3 change and blur handler
  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };
  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };
  //#4 reset function
  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  //#5 return the needed states
  return {
    value: enteredValue,
    hasError, // expose handlers so can be called from component using hook
    isValid: valueIsValid,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
