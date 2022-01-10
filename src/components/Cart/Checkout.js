import classes from "./Checkout.module.css";
import { useRef } from "react";
import useInput from "../../hooks/use-inputCopy";
const Checkout = (props) => {
  //A. Create Ref
  const nameInputRef = useRef();
  const cityInputRef = useRef();
  const postalCodeInputRef = useRef();
  const streetInputRef = useRef();
  const isNotEmpty = (value) => value.trim() !== "";

  //#1 use Custom Input hook
  const {
    value: enteredName,
    hasError: nameHasError,
    isValid: enteredNameIsValid,
    // #2 set Input with value, change blur
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(isNotEmpty);
  const {
    value: enteredCity,
    hasError: cityHasError,
    isValid: enteredCityIsValid,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCityInput,
  } = useInput(isNotEmpty);
  const {
    value: enteredStreet,
    hasError: streetHasError,
    isValid: enteredStreetIsValid,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreetInput,
  } = useInput(isNotEmpty);
  const {
    value: enteredPostalCode,
    hasError: postalCodeHasError,
    isValid: enteredPostalCodeIsValid,
    valueChangeHandler: postalCodeChangeHandler,
    inputBlurHandler: postalCodeBlurHandler,
    reset: resetPostalCodeInput,
  } = useInput(isNotEmpty);

  const confirmHandler = (event) => {
    event.preventDefault();
    //B. Assign current ref value and in input
    // const enteredName = nameInputRef.current.value;
    // const enteredCity = cityInputRef.current.value;
    // const enteredStreet = streetInputRef.current.value;
    // const enteredPostalCode = postalCodeInputRef.current.value;

    //#5 prevent form from submission if invalid
    if (
      !enteredPostalCodeIsValid ||
      !enteredStreetIsValid ||
      !enteredCityIsValid ||
      !enteredNameIsValid
    )
      return;

    //#4 RESET the touch and value OnSubmit
    resetNameInput();
    resetCityInput();
    resetStreetInput();
    resetPostalCodeInput();
    //forward user data
    props.onConfirm({
      name: enteredName,
      city: enteredCity,
      street: enteredStreet,
      postalCode: enteredPostalCode,
    });
  };

  //#3 Determine Input ClassNames
  const determineInputClass = (inputHasError) =>
    `${classes[`control`]} ${inputHasError && classes[`invalid`]}`;
  const nameInputClasses = determineInputClass(nameHasError);
  const streetInputClasses = determineInputClass(streetHasError);
  const postalCodeInputClasses = determineInputClass(postalCodeHasError);
  const cityInputClasses = determineInputClass(cityHasError);

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
          type="text"
          id="name"
        />
      </div>
      <div className={streetInputClasses}>
        <label htmlFor="street">Street</label>
        <input
          value={enteredStreet}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
          type="text"
          id="street"
        />
      </div>
      <div className={postalCodeInputClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          value={enteredPostalCode}
          onChange={postalCodeChangeHandler}
          onBlur={postalCodeBlurHandler}
          type="text"
          id="postal"
        />
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city">City</label>
        <input
          value={enteredCity}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
          type="text"
          id="city"
        />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
