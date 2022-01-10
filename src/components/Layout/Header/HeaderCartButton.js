import classes from "./HeaderCartButton.module.css";
import CartIcon from "./CartIcon";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  //will chanage when set to true and trigger in element calsses
  const [buttonIsHighlihgted, setButtonIsHighlihgted] = useState(false);

  const btnClasses = `${classes.button} ${
    buttonIsHighlihgted ? classes.bump : ""
  }`;

  useEffect(() => {
    //if no items in cart, return
    if (cartCtx.items.length === 0) {
      return;
    }
    //highlight button
    setButtonIsHighlihgted(true);
    //remove bump classs
    const timer = setTimeout(() => {
      setButtonIsHighlihgted(false);
    }, 300);
    //cleanup function to clear the timer if elemnet removed
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button onClick={props.onClick} className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span> Your cart</span>

      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
