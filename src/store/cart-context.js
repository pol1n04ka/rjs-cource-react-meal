import { createContext, useReducer } from "react";

export const CartContext = createContext({
  cartItems: [],
  itemsAmount: null,
  amount: null,
  onAddCartItem: (item) => {},
  onRemoveCartItem: (id) => {},
});

const defaultCartState = {
  cartItems: [],
  itemsAmount: 0,
  amount: 0.0,
};

const cartReducer = (state, action) => {
  const calcAmounts = (items) => {
    let amount = 0.0;
    let itemsAmount = 0;
    items.forEach((item) => {
      amount += item.price * item.amount;
      itemsAmount += item.amount;
    });

    return { amount, itemsAmount };
  };

  if (action.type === "ADD") {
    let updatedItem;
    let updatedItems;

    const existingItemIndex = state.cartItems.findIndex(
      (item) => item.id === action.item.id
    );

    const existingItem = state.cartItems[existingItemIndex];

    if (existingItem) {
      updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      updatedItems = [...state.cartItems];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItem = { ...action.item };
      updatedItems = state.cartItems.concat(updatedItem);
    }

    const { amount, itemsAmount } = calcAmounts(updatedItems);

    return {
      cartItems: updatedItems,
      itemsAmount: itemsAmount,
      amount: amount,
    };
  } else if (action.type === "DELETE") {
    const itemIndex = state.cartItems.findIndex(
      (item) => item.id === action.id
    );
    const item = state.cartItems[itemIndex];
    let newItem;
    let newItems = state.cartItems;

    if (item.amount > 1) {
      newItem = { ...item, amount: item.amount - 1 };
      newItems[itemIndex] = newItem;
    } else if (item.amount === 1) {
      newItems.splice(itemIndex, 1);
    }

    const { amount, itemsAmount } = calcAmounts(newItems);

    return {
      cartItems: newItems,
      itemsAmount: itemsAmount,
      amount: amount,
    };
  }

  return defaultCartState;
};

const CartContextProvider = (props) => {
  const [cart, dispatchCart] = useReducer(cartReducer, defaultCartState);

  const onAddCartItem = (item) => {
    dispatchCart({ type: "ADD", item: item });
  };

  const onRemoveCartItem = (id) => {
    dispatchCart({ type: "DELETE", id: id });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: cart.cartItems,
        itemsAmount: cart.itemsAmount,
        amount: cart.amount,
        onAddCartItem: onAddCartItem,
        onRemoveCartItem: onRemoveCartItem,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
