import { createContext, useState } from "react";

export const Cart = createContext("");

export default function GetDataCartContext({ children }) {
  let [GetDataCart, setGetDataCart] = useState(true);
  return (
    <Cart.Provider value={{ GetDataCart, setGetDataCart }}>
      {children}
    </Cart.Provider>
  );
}
