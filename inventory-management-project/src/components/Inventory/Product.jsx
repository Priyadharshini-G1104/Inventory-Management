import { useState } from "react";
import { useInventoryDispatch } from "../../context/InventoryContext";

const Product = ({ product, alertValue }) => {
  const [addStock, setAddStock] = useState(0);
  const inventoryDispatch = useInventoryDispatch();
  const isLowStock = product.stock < alertValue;

  const handleUpdateStock = () => {
    if (!addStock || addStock <= 0) return;
    inventoryDispatch({
      type: "STOCK_ADDED",
      productName: product.productName,
      stock: parseInt(addStock),
    });
    setAddStock(0);
  };

  return (
    <div
      className={`rounded-xl shadow-md p-4 flex flex-col items-center transition-all bg-white border-2 ${
        isLowStock
          ? "border-red-500 bg-red-50"
          : "border-gray-200 hover:border-indigo-300"
      }`}
    >
      {/* Title */}
      <h1 className="text-lg font-semibold text-indigo-900 mb-2 text-center">
        {product.productName}
      </h1>

      {/* Image */}
      <div className="w-48 h-48 overflow-hidden rounded-md border border-gray-300 mb-3">
        <img
          src={product.imageUrl}
          alt={product.productName}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Price and Stock */}
      <p className="text-md text-gray-700 mb-1">Price: ₹ {product.price.toFixed(2)}</p>
      <p className={`mb-2 font-medium ${isLowStock ? "text-red-500" : "text-gray-700"}`}>
        Stock Available: {product.stock}
      </p>

      {/* Add Stock Input */}
      <div className="flex items-center gap-2 mb-2">
        <label className="text-sm font-medium text-gray-700">Add Stock:</label>
        <input
          type="number"
          min="1"
          value={addStock}
          onChange={(e) => setAddStock(e.target.value)}
          className="w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
      </div>

      {/* Update Button */}
      <button
        onClick={handleUpdateStock}
        className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white px-4 py-2 rounded-full font-medium transition"
      >
        Update Stock
      </button>
    </div>
  );
};

export default Product;
