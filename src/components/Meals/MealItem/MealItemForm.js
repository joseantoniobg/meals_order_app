import { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
  const [isValid, setIsValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = inputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  const inputRef = useRef();

  const ValidNumberHandler = (event) => {
    if (
      event.target.value.trim().length === 0 ||
      event.target.value < 1 ||
      event.target.value > 5
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={inputRef}
        label="Amount"
        onChange={ValidNumberHandler}
        input={{
          id: "amount",
          type: "number",
          min: 1,
          max: 5,
          step: 1,
          defaultValue: 1,
        }}
      />
      <button type="submit">+ Add</button>
      {!isValid && <p>Please enter a valid value!</p>}
    </form>
  );
};

export default MealItemForm;
