import styles from "./Cart.module.css";

import Modal from "../UI/Modal/Modal";
import { useContext } from "react";
import { CartContext } from "../../store/cart-context";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const returnCartItems = (
    <ul>
      {cartCtx.cartItems.map((item) => {
        return <li key={item.id}>{item.name}</li>;
      })}
    </ul>
  );

  return (
    <Modal onHide={props.onHideCart}>
      {returnCartItems}
      <div className={styles.total}>
        <span>Total amount</span>
        <span>${cartCtx.amount.toFixed(2)}</span>
      </div>
      <div className={styles.actions}>
        <button onClick={props.onHideCart} className={styles["button--alt"]}>
          Close
        </button>
        <button className={styles.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
