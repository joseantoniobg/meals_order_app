import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMeals = async () => {
    try {
      setLoading(true);
      const response = await fetch("URL");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      const mealsList = loadedMeals.map((meal) => (
        <MealItem
          key={meal.id}
          id={meal.id}
          name={meal.name}
          description={meal.description}
          price={meal.price}
        />
      ));

      setMeals(mealsList);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <section className={classes.meals}>
      <Card>
        {loading && !error && <p>Loaging meals...</p>}
        {!loading && !error && <ul>{meals}</ul>}
        {error && <p>{error}</p>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
