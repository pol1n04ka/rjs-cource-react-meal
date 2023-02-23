import styles from "./Cart.module.css";

import Modal from "../UI/Modal/Modal";
import { useContext } from "react";
import { CartContext } from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const hasItems = cartCtx.cartItems.length > 0;

  const onAddHandler = (item) => {
    cartCtx.onAddCartItem(item);
  };

  const onRemoveHandler = (id) => {
    cartCtx.onRemoveCartItem(id);
  };

  const returnCartItems = (
    <ul>
      {cartCtx.cartItems.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onAdd={onAddHandler.bind(false, { ...item, amount: 1 })}
            onRemove={onRemoveHandler.bind(false, item.id)}
          />
        );
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
        {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
