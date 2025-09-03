import { useState } from "react";
import { useInventory } from "../../context/InventoryContext";
import Product from "./Product";

const Inventory = () => {
  const inventory = useInventory();
  const [alertValue, setAlertValue] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [showOnlyDepleted, setShowOnlyDepleted] = useState(false);

  const lowerCaseSearchQuery = searchQuery.toLowerCase();
  const filteredInventory = inventory.filter((product) => {
    const matchesSearchQuery = product.productName
      .toLowerCase()
      .includes(lowerCaseSearchQuery);
    const isDepleted = product.stock < alertValue;
    return showOnlyDepleted ? matchesSearchQuery && isDepleted : matchesSearchQuery;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-8 px-4">
      <h1 className="text-3xl font-bold text-indigo-800 mb-6 text-center drop-shadow">
        Inventory
      </h1>

      {/* Controls */}
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center gap-4 mb-8 bg-white p-4 rounded-xl shadow">
        <input
          type="text"
          placeholder="🔍 Search inventory..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />

        <div className="flex items-center gap-3">
          <label htmlFor="alert-value" className="text-gray-700 font-medium">
            Alert Value
          </label>
          <input
            id="alert-value"
            type="number"
            className="w-20 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-indigo-300 transition"
            value={alertValue}
            onChange={(e) => setAlertValue(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="show-only-depleted" className="text-gray-700 font-medium">
            Low Stock Only
          </label>
          <input
            type="checkbox"
            id="show-only-depleted"
            checked={showOnlyDepleted}
            onChange={() => setShowOnlyDepleted(!showOnlyDepleted)}
            className="w-5 h-5 accent-indigo-500"
          />
        </div>
      </div>

      {/* Product Cards */}
      {filteredInventory.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
          {filteredInventory.map((product) => (
            <Product key={product.productName} product={product} alertValue={alertValue} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 italic">No inventory items found.</p>
      )}
    </div>
  );
};

export default Inventory;
