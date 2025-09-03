// SaleRecord.jsx
const SaleRecord = ({ sale, saleId }) => {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-gray-100 border border-gray-300 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold text-gray-800">Sale #{saleId + 1}</h2>
          <span className="text-sm text-gray-500 italic">
            {new Date(sale.datetime).toLocaleString()}
          </span>
        </div>
        <p className="mb-3 text-gray-900 font-semibold text-lg">
          Total Sale Value: <span className="text-blue-600">₹{sale.saleValue.toFixed(2)}</span>
        </p>
        <p className="mb-2 font-semibold text-gray-700">Cart Details:</p>
        <ul className="list-disc list-inside text-gray-600 max-h-48 overflow-y-auto space-y-1">
          {sale.products.map((product) => (
            <li key={product.productName} className="truncate">
              {product.productName} ({product.quantity}) - ₹
              {(product.price * product.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default SaleRecord;
  