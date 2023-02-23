import styles from "./MealItemForm.module.css";

import Input from "../../UI/Input/Input";
import { useContext, useState } from "react";
import { CartContext } from "../../../store/cart-context";

const MealItemForm = (props) => {
  const cartCtx = useContext(CartContext);
  const [amount, setAmount] = useState(1);

  const submitHandler = (event) => {
    event.preventDefault();
    let result = {
      id: props.meal.id,
      name: props.meal.name,
      desciption: props.meal.description,
      price: props.meal.price,
      amount: +amount,
    };
    cartCtx.onAddCartItem(result);
    setAmount(1);
  };

  const onChangeHandler = (event) => {
    setAmount(event.target.value);
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <Input
        label="Amount"
        input={{
          id: "amount_" + props.id,
          value: amount,
          onChange: onChangeHandler,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default MealItemForm;
