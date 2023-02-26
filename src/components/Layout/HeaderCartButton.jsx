import styles from "./HeaderCartButton.module.css";

import CartIcon from "./CartIcon";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const { cartItems: items } = cartCtx;

  const [btnIsAnimated, setBtnIsAnimated] = useState(false);

  let buttonStyles = `${styles.button} ${btnIsAnimated ? styles.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsAnimated(true);
    const timer = setTimeout(() => {
      setBtnIsAnimated(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={buttonStyles} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={styles.badge}>{cartCtx.itemsAmount}</span>
    </button>
  );
};

export default HeaderCartButton;
