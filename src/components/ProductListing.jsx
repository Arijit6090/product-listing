// ProductListing.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.freeapi.app/api/v1/public/randomproducts")
      .then((response) => {
        console.log("API response:", response.data);

        // Correct path: response.data.data.data
        const productData = Array.isArray(response.data.data?.data)
          ? response.data.data.data
          : [];
        setProducts(productData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-xl">Loading products...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Product Listing</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg shadow-md p-4 hover:shadow-lg transition"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-600 mb-2 line-clamp-3">
                {product.description}
              </p>
              <p className="text-blue-600 font-bold mb-2">${product.price}</p>
              <p className="text-sm text-gray-500 mb-2">
                Brand: {product.brand} | Rating: {product.rating}
              </p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <div className="text-center col-span-full text-gray-500">
            No products available.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
