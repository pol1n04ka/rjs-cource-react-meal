import { createContext, useContext, useState } from "react";

export const CartContext = createContext({
  cartItems: [],
  amount: null,
  onAddCartItem: (item) => {},
  onSetAmount: (items) => {},
});

const CartContextProvider = (props) => {
  const ctx = useContext(CartContext);

  const [cartItems, setCartItems] = useState([]);
  const [amount, setAmount] = useState(0);

  const onAddCartItem = (item) => {
    setCartItems((prevState) => {
      return {
        ...prevState,
        item,
      };
    });
  };

  const onSetAmount = (items) => {
    let amount = 0.0;

    // items.map((item) => {
    //   amount += item.price.toFixed(2);
    // });

    items.forEach((item) => {
      amount += item.price;
    });

    setAmount(amount);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: cartItems,
        amount: amount,
        onAddCartItem: onAddCartItem,
        onSetAmount: onSetAmount,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
