import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { useContext } from "react";
import CartContext from "../../../store/cart-context";
const MealItem = (props) => {
  //format price
  const price = `${props.price.toFixed(2)}`;
  const cartCtx = useContext(CartContext);

  //how to connect the meal item clicked to pass to addItem
  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} id={props.id} />
        {/* //form render amount to adda and add to cart  button on right side */}
      </div>
    </li>
  );
};

export default MealItem;
