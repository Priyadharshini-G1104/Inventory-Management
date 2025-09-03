import { useCartDispatch } from "../../context/CartContext";
import { useInventory } from "../../context/InventoryContext";
import { useEffect, useState } from "react";

export default function CartItem({ product }) {
  const dispatchToCart = useCartDispatch();
  const inventory = useInventory();
  const productInInventory = inventory.find((item) => item.productName === product.productName);
  const stockAvailable = productInInventory ? productInInventory.stock : 0;

  // State for animation class
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setAnimate(true);
  }, []);

  return (
    <div
      className={`border border-gray-400 m-2 p-2 px-3 rounded text-center flex flex-col items-center transition-shadow duration-300 ${
        animate ? "animate-fade-slide-up shadow-lg" : ""
      }`}
    >
      <h1 className="font-bold text-xl">{product.productName}</h1>
      <div className="w-[250px] h-[250px] overflow-hidden border border-gray-300 rounded">
        <img
          src={product.imageUrl}
          alt={product.productName}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-lg mt-2">Price: ₹ {product.price.toFixed(2)}</p>
      <div>
        {product.quantity > 1 ? (
          <button
            onClick={() => {
              dispatchToCart({
                type: "DEC_QTY",
                ...product,
              });
            }}
            className="bg-red-500 hover:bg-red-600 text-white p-1 m-1 rounded transition duration-200 transform hover:scale-105 active:scale-95"
          >
            -
          </button>
        ) : (
          <button disabled className="bg-red-300 text-white p-1 m-1 rounded cursor-not-allowed">
            -
          </button>
        )}
        {" "}
        {product.quantity}{" "}
        {product.quantity < stockAvailable ? (
          <button
            onClick={() => {
              dispatchToCart({
                type: "INC_QTY",
                ...product,
              });
            }}
            className="bg-green-500 hover:bg-green-600 p-1 m-1 rounded text-white transition duration-200 transform hover:scale-105 active:scale-95"
          >
            +
          </button>
        ) : (
          <button disabled className="bg-gray-300 p-1 m-1 rounded text-white cursor-not-allowed">
            +
          </button>
        )}
      </div>
      <button
        onClick={() => {
          dispatchToCart({
            type: "removed",
            ...product,
          });
        }}
        className="bg-red-500 hover:bg-red-600 text-white rounded p-1 m-1 block transition duration-200 transform hover:scale-105 active:scale-95"
      >
        Remove from Cart
      </button>
    </div>
  );
}
