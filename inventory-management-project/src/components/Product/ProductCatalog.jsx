import { useState } from "react";
import ProductList from "./ProductList";
import { useInventory } from "../../context/InventoryContext";

export default function ProductCatalog() {
  const inventory = useInventory();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = inventory.filter(
    (item) =>
      item.stock > 0 &&
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center py-8 px-4 min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-indigo-800 mb-4 drop-shadow">
        Product Catalog
      </h1>

      {/* Search Input */}
      <div className="w-full max-w-md mb-6">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
        />
      </div>

      {/* Product List or Empty Message */}
      {filteredProducts.length > 0 ? (
        <ProductList products={filteredProducts} />
      ) : (
        <p className="text-gray-500 italic">No matching products found.</p>
      )}
    </div>
  );
}
