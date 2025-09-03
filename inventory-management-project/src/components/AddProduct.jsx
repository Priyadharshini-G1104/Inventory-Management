import { useInventoryDispatch } from "../context/InventoryContext";

export default function AddProduct() {
  const dispatchToInventory = useInventoryDispatch();

  const onAddProduct = (e) => {
    e.preventDefault();

    const newProduct = {
      productName: e.target.productName.value.trim(),
      imageUrl: e.target.imageUrl.value.trim(),
      price: parseFloat(e.target.price.value),
      tags: e.target.tags.value.split(",").map((tag) => tag.trim()),
      stock: parseInt(e.target.stock.value),
    };

    dispatchToInventory({
      type: "NEW_PRODUCT",
      ...newProduct,
    });

    e.target.reset();
    alert("✅ Product added successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex justify-center items-start pt-10 pb-6 px-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-8 transition-all duration-300">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6 drop-shadow">
          ➕ Add New Product
        </h1>

        <form onSubmit={onAddProduct} className="space-y-5">
          {/* Product Name */}
          <div>
            <label htmlFor="productName" className="text-sm font-semibold text-gray-700 block mb-1">
              Product Name
            </label>
            <input
              id="productName"
              type="text"
              placeholder="E.g. iPhone 15"
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="imageUrl" className="text-sm font-semibold text-gray-700 block mb-1">
              Image URL
            </label>
            <input
              id="imageUrl"
              type="text"
              placeholder="https://example.com/image.jpg"
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="text-sm font-semibold text-gray-700 block mb-1">
              Price (₹)
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              placeholder="1999.00"
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
          </div>

          {/* Stock */}
          <div>
            <label htmlFor="stock" className="text-sm font-semibold text-gray-700 block mb-1">
              Stock
            </label>
            <input
              id="stock"
              type="number"
              min="0"
              placeholder="20"
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="text-sm font-semibold text-gray-700 block mb-1">
              Tags (comma-separated)
            </label>
            <input
              id="tags"
              type="text"
              placeholder="electronics, mobile, trending"
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2 px-4 rounded transition shadow-lg hover:shadow-xl"
            >
              ✅ Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
