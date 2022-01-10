import classes from "./MealItemForm.module.css";
import { useState, useRef } from "react";
import Input from "../../UI/Input/Input";

const MealItemForm = (props) => {
  const [amountIsValid, setamountIsValid] = useState(true);
  const [enteredAmount, setEnteredAmount] = useState();
  const amountInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmountNumber === 0 ||
      enteredAmountNumber > 5 ||
      enteredAmountNumber < 0
    ) {
      setamountIsValid(false);
      return;
    }
    //will pass amount in form to meal item
    props.onAddToCart(enteredAmountNumber);
  };
  const onChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
    console.log(enteredAmount);
  };

  return (
    <>
      <form className={classes.form} onSubmit={submitHandler}>
        <Input
          ref={amountInputRef}
          label="Amount"
          onChange={onChangeHandler}
          input={{
            id: "amount_" + props.id,
            type: "number",
            step: "1",
            min: "1",
            max: "5",
            defaultValue: "1",
          }}
        />
        <button>+ Add</button>
        {!amountIsValid && <p>Please enter valid amount 1-5</p>}
      </form>
    </>
  );
};

export default MealItemForm;
