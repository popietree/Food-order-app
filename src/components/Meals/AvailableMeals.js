import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const AvailibleMeals = () => {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLaoding] = useState(false);
  const sendRequest = async () => {
    try {
      //SET ERROR AND LOADING
      setIsLaoding(true);
      setError(null);
      const response = await fetch(
        "https://meals-data-50c20-default-rtdb.firebaseio.com/meals.json"
      );
      //GUARD CLAUSE
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      console.log(data, 999);
      // DATA TRANSFORMATION
      const loadedMeals = []; //CREATE EMPTY ARRAY
      for (const key in data) {
        loadedMeals.push({
          // PUSH VALUES TO ARRAY TO EXTRACT DATA
          key: key,
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals); // GET ARRAY GLOBALLY WITH STATE Variable
    } catch (error) {
      setError(error.message || "Something went wrong");
    }
    setIsLaoding(false);
  };

  //only run when first loaded
  useEffect(() => {
    sendRequest();
  }, []); //can call in useEffect w/ function
  // list of meals

  const listOfMeals = meals.map((item) => (
    <MealItem
      key={item.id}
      id={item.id}
      name={item.name}
      description={item.description}
      price={item.price}
    ></MealItem>
  ));
  let content = listOfMeals;

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p> Loading...</p>
      </section>
    );
  }
  if (error) {
    return (
      <section className={classes.MealsError}>
        <p> {error}</p>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{listOfMeals}</ul>
      </Card>
    </section>
  );
};

export default AvailibleMeals;
