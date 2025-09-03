import Product from "./Product";

export default function ProductList({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
      {products.map((product) => (
        <Product key={product.productName} product={product} />
      ))}
    </div>
  );
}
