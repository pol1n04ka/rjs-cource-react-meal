import styles from "./HeaderCartButton.module.css";

import CartIcon from "./CartIcon";

const HeaderCartButton = (props) => {
  return (
    <button className={styles.button} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={styles.badge}>3</span>
    </button>
  );
};

export default HeaderCartButton;