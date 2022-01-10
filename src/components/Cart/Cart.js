import classes from "./Cart.module.css";
import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import Modal from "../UI/Modal/Modal";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckOut, setIsCheckOut] = useState(false);

  const [isCancel, setIsCancel] = useState(false);
  const cartCtx = useContext(CartContext);
  const cartTotal = `$${cartCtx.totalAmount.toFixed(2)}`;
  const cartItems = cartCtx.items;
  //only show order button if has items
  const hasItems = cartItems.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
    console.log(id);
  };
  const cartItemAddHandler = (item) => {
    console.log(cartCtx.items);
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckOut(true);
    console.log("ordered");
  };
  const cancelHandler = () => {
    setIsCheckOut(false);
    console.log("cancel");
  };
  const [error, setError] = useState(null);
  const [isSumbiting, setIsSumbiting] = useState(false);
  const [didSumbit, setDidSubmit] = useState(false);

  const confirmOrderHandler = async (userdata) => {
    console.log("confirm");

    try {
      //SET ERROR AND LOADING
      setIsSumbiting(true);
      setError(null);
      const response = await fetch(
        "https://meals-data-50c20-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userdata,
            orderedItem: cartCtx.items,
          }),
        }
      );
      //GUARD CLAUSE
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      // DATA TRANSFORMATION
    } catch (error) {
      setError(error.message || "Something went wrong");
    }
    //SET is Submitting
    setIsSumbiting(false);
    //SET did Submit
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const modalActions = (
    <div className={classes.actions}>
      <button onClick={props.onClose} className={classes["button--alt"]}>
        Close
      </button>
      {hasItems && (
        <button onClick={orderHandler} className={classes.button}>
          Order
        </button>
      )}
    </div>
  );

  const cartItemslist = cartItems.map((item) => {
    return (
      <CartItem
        key={item.id}
        id={item.id}
        name={item.name}
        amount={item.amount}
        price={item.price}
        onRemove={cartItemRemoveHandler.bind(null, item.id)}
        onAdd={cartItemAddHandler.bind(null, item)}
      />
    );
  });

  const cartModalContent = (
    <>
      {" "}
      <ul className={classes["cart-items"]}> {cartItemslist}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span> {cartTotal} </span>
      </div>
      {isCheckOut && (
        <Checkout onConfirm={confirmOrderHandler} onCancel={cancelHandler} />
      )}
      {!isCheckOut && modalActions}
    </>
  );
  const isSumbitingModalContent = <p>Sending Ordering Data...</p>;
  const didSumbitModalContent = (
    <>
      <p>Sucessfully Sent Order!</p>
      <div className={classes.actions}>
        <button onClick={props.onClose} className={classes.button}>
          Close
        </button>
      </div>
    </>
  );

  const errorModalContent = (
    <>
      <p>Something Went Wrong!</p>
      <div className={classes.actions}>
        <button onClick={props.onClose} className={classes.button}>
          Close
        </button>
      </div>
    </>
  );
  return (
    <>
      <Modal onClose={props.onClose}>
        {!isSumbiting && !didSumbit && cartModalContent}
        {!error && isSumbiting && isSumbitingModalContent}
        {!error && didSumbit && !isSumbiting && didSumbitModalContent}
        {error && errorModalContent}
      </Modal>
    </>
  );
};

export default Cart;
