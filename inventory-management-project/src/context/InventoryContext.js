import { createContext, useContext, useReducer, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const InventoryContext = createContext(null);
const InventoryDispatchContext = createContext(null);

export const InventoryProvider = ({ children }) => {
  const [inventoryInLS, setInventoryInLS] = useLocalStorage("inventory", initialInventory);
  const [inventory, dispatch] = useReducer(inventoryReducer, inventoryInLS);

  // Persist inventory to localStorage whenever it changes
  useEffect(() => {
    setInventoryInLS(inventory);
  }, [inventory, setInventoryInLS]);

  return (
    <InventoryContext.Provider value={inventory}>
      <InventoryDispatchContext.Provider value={dispatch}>
        {children}
      </InventoryDispatchContext.Provider>
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);

export const useInventoryDispatch = () => useContext(InventoryDispatchContext);

const inventoryReducer = (state, action) => {
  const parseStock = (value) => Math.max(0, parseInt(value) || 0);

  switch (action.type) {
    case "NEW_PRODUCT": {
      // Add a new product to inventory
      return [
        ...state,
        {
          productName: action.productName,
          imageUrl: action.imageUrl,
          price: Number(action.price) || 0,
          tags: Array.isArray(action.tags) ? action.tags : [],
          stock: parseStock(action.stock),
          addedAt: Date.now(), // Timestamp to track new items (can be used for animation)
        },
      ];
    }
    case "STOCK_ADDED": {
      // Add stock to an existing product
      return state.map((product) =>
        product.productName === action.productName
          ? {
              ...product,
              stock: parseStock(product.stock) + parseStock(action.stock),
              updatedAt: Date.now(), // Track update time for UI effects
            }
          : product
      );
    }
    case "STOCK_SOLD": {
      // Deduct sold stock, never below zero
      return state.map((product) =>
        product.productName === action.productName
          ? {
              ...product,
              stock: Math.max(0, parseStock(product.stock) - parseStock(action.stock)),
              updatedAt: Date.now(),
            }
          : product
      );
    }
    default: {
      console.warn("Unknown Inventory action type:", action.type);
      return state;
    }
  }
};

const initialInventory = [
  {
    productName: "Sample Item",
    imageUrl: "/cartImage.png",
    price: 0,
    tags: ["sample"],
    stock: 1,
    addedAt: Date.now(),
  },
];
