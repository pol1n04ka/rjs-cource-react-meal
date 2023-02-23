import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  cartItems: [],
  itemsAmount: null,
  amount: null,
  onAddCartItem: (item) => {},
  onRemoveCartItem: (id) => {},
});

const CartContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [itemsAmount, setItemsAmount] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    let amount = 0.0;
    let itemsAmount = 0;

    cartItems.forEach((item) => {
      amount += item.price * item.amount;
      itemsAmount += item.amount;
    });

    setAmount(amount);
    setItemsAmount(itemsAmount);
  }, [cartItems]);

  const onAddCartItem = (item) => {
    setCartItems((prevState) => {
      return [...prevState, item];
    });
  };

  const onRemoveCartItem = (id) => {};

  return (
    <CartContext.Provider
      value={{
        cartItems: cartItems,
        itemsAmount: itemsAmount,
        amount: amount,
        onAddCartItem: onAddCartItem,
        onRemoveCartItem: onRemoveCartItem,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
