import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartContextProvider from "./store/cart-context";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const onHideCartHandler = () => {
    setCartIsShown(false);
  };

  const onShowCartHandler = () => {
    setCartIsShown(true);
  };

  return (
    <CartContextProvider>
      {cartIsShown && <Cart onHideCart={onHideCartHandler} />}
      <Header onShowCart={onShowCartHandler} />
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;
