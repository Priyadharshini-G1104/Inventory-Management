// Sales.jsx
import { useSales } from "../../context/SalesContext";
import SaleRecord from "./SaleRecord";

const Sales = () => {
  const sales = useSales();

  const totalRevenue = sales.reduce((acc, sale) => acc + sale.saleValue, 0);

  return (
    <div className="m-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Sales Record</h1>

      {sales.length > 0 ? (
        <>
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-300 to-blue-400 text-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">
              Total Revenue: <span className="text-yellow-200">₹{totalRevenue.toFixed(2)}</span>
            </h2>
            <p className="mt-1 italic">Number of sales: {sales.length}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {sales.map((sale, index) => (
              <SaleRecord key={index} sale={sale} saleId={index} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-600 text-center text-lg mt-10">No sales recorded yet.</p>
      )}
    </div>
  );
};

export default Sales;
