import CartItem from "./CartItem";
import { useCart } from "../../context/CartContext";
import { useCartDispatch } from "../../context/CartContext";
import { useInventoryDispatch } from "../../context/InventoryContext";
import { useSalesDispatch } from "../../context/SalesContext";

export default function Cart() {
  const inventoryDispatch = useInventoryDispatch();
  const cartItemsFromContext = useCart();
  const cartDispatch = useCartDispatch();
  const saleDispatch = useSalesDispatch();

  let count = 0;
  let cartValue = 0;

  if (cartItemsFromContext.length > 0)
    cartItemsFromContext.forEach((item) => {
      cartValue += item.price * item.quantity;
      count += item.quantity;
    });

  const handleCheckout = () => {
    cartItemsFromContext.forEach((cartItem) => {
      inventoryDispatch({
        type: "STOCK_SOLD",
        productName: cartItem.productName,
        stock: cartItem.quantity,
      });
    });
    saleDispatch({
      type: "NEW_SALE",
      saleValue: cartValue,
      products: cartItemsFromContext,
    });
    cartDispatch({ type: "EMPTY_CART" });
    alert("🎉 Checkout successful! Inventory has been updated.");
  };

  const handleClear = () => {
    cartDispatch({ type: "EMPTY_CART" });
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-purple-50 to-indigo-100 text-center">
      <h1 className="text-3xl font-bold text-indigo-800 mb-4 drop-shadow-sm">
        Your Cart
      </h1>

      {count === 0 ? (
        <p className="text-lg text-gray-600 italic">Your cart is empty.</p>
      ) : (
        <div className="w-full max-w-6xl mx-auto">
          <p className="text-lg mb-4 text-gray-700">
            🛍️ Total Items: <b>{count}</b> | 💰 Total Value:{" "}
            <b>₹ {cartValue.toFixed(2)}</b>
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <button
              onClick={handleCheckout}
              className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold px-6 py-2 rounded-full shadow transition-all"
            >
              ✅ Checkout
            </button>
            <button
              onClick={handleClear}
              className="bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-semibold px-6 py-2 rounded-full shadow transition-all"
            >
              ❌ Clear Cart
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cartItemsFromContext.map((product) => (
              <CartItem key={product.productName} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
