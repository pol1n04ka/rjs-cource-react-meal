import styles from "./HeaderCartButton.module.css";

import CartIcon from "./CartIcon";
import { useContext } from "react";
import { CartContext } from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  return (
    <button className={styles.button} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={styles.badge}>{cartCtx.itemsAmount}</span>
    </button>
  );
};

export default HeaderCartButton;
