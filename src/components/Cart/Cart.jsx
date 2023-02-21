import styles from "./Cart.module.css";

import Modal from "../UI/Modal/Modal";

const Cart = (props) => {
  const returnCartItems = (
    <ul>
      {[
        {
          id: "m1",
          name: "Sushi",
          description: "Finest fish and veggies",
          price: 22.99,
        },
      ].map((item) => {
        return <li key={item.id}>{item.name}</li>;
      })}
    </ul>
  );

  return (
    <Modal>
      {returnCartItems}
      <div className={styles.total}>
        <span>Total amount</span>
        <span>$38.90</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]}>Close</button>
        <button className={styles.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
