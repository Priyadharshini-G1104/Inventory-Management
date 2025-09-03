import { useCartDispatch } from "../../context/CartContext";
import { useCart } from "../../context/CartContext";

export default function Product({ product }) {
  const cartItems = useCart();
  const dispatchToCart = useCartDispatch();

  const isInCart = cartItems.some(
    (item) => item.productName === product.productName
  );

  const onCartToggle = () => {
    dispatchToCart({
      type: isInCart ? "removed" : "added",
      ...product,
    });
  };

  return (
    <div className="rainbow-border p-[2px] rounded-2xl">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition p-4 flex flex-col items-center text-center">
        {/* Product Name */}
        <h1 className="font-semibold text-xl text-indigo-900 mb-2">
          {product.productName}
        </h1>

        {/* Product Image */}
        <div className="w-48 h-48 overflow-hidden rounded-lg border border-gray-300 mb-3">
          <img
            src={product.imageUrl}
            alt={product.productName}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Price */}
        <p className="text-lg text-gray-700 mb-3">
          Price: ₹ {product.price.toFixed(2)}
        </p>

        {/* Add/Remove Button */}
        <button
          onClick={onCartToggle}
          className={`px-4 py-2 rounded-full font-medium text-white transition-all duration-300 shadow-md ${
            isInCart
              ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
              : "bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700"
          }`}
        >
          {isInCart ? "Remove from Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

