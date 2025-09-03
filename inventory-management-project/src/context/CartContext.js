import { createContext, useContext, useEffect, useReducer } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const CartContext = createContext(null);
const CartDispatchContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItemsInLocalStorage, setCartItemsInLocalStorage] = useLocalStorage("cart", []);
  const [cartItems, dispatch] = useReducer(cartReducer, cartItemsInLocalStorage);

  // Persist cart items in localStorage whenever cart changes
  useEffect(() => {
    setCartItemsInLocalStorage(cartItems);
  }, [cartItems, setCartItemsInLocalStorage]);

  return (
    <CartContext.Provider value={cartItems}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

export function useCartDispatch() {
  return useContext(CartDispatchContext);
}

function cartReducer(state, action) {
  switch (action.type) {
    case "added": {
      return [
        ...state,
        {
          productName: action.productName,
          imageUrl: action.imageUrl,
          price: Number(action.price) || 0,
          tags: Array.isArray(action.tags) ? action.tags : [],
          quantity: 1,
          addedAt: Date.now(),
        },
      ];
    }
    case "removed": {
      return state.filter((product) => product.productName !== action.productName);
    }
    case "INC_QTY": {
      return state.map((item) =>
        item.productName === action.productName
          ? { ...item, quantity: item.quantity + 1, updatedAt: Date.now() }
          : item
      );
    }
    case "DEC_QTY": {
      return state.map((item) =>
        item.productName === action.productName && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1, updatedAt: Date.now() }
          : item
      );
    }
    case "EMPTY_CART": {
      return [];
    }
    default: {
      console.warn("Unknown action type: ", action.type);
      return state;
    }
  }
}
