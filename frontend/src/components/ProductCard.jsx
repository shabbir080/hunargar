import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 flex flex-col shadow-sm hover:shadow-lg transition-all duration-300">
      {/* IMAGE */}
      <div className="h-48 w-full overflow-hidden rounded-xl mb-4">
        <img
          src={product.image || "https://via.placeholder.com/400"}
          alt={product.name}
          className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
        />
      </div>

      {/* PRODUCT DETAILS */}
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">{product.name}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm flex-1 mb-3">
        {product.description?.slice(0, 80)}{product.description?.length > 80 ? "..." : ""}
      </p>

      <p className="text-sm mb-2">
        {product.stock > 0 ? (
          <span className="text-green-600 font-medium">In stock: {product.stock}</span>
        ) : (
          <span className="text-red-600 font-medium">Out of stock</span>
        )}
      </p>

      {/* PRICE & ACTIONS */}
      <div className="flex items-center justify-between mt-auto">
        <strong className="text-indigo-600 dark:text-indigo-400 text-lg">₹{product.price}</strong>
        <div className="flex items-center gap-2">
          <Link
            to={`/product/${product._id}`}
            className="text-sm text-gray-500 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 underline transition"
          >
            Details
          </Link>
          <button
            onClick={() => onAdd(product._id)}
            disabled={product.stock <= 0}
            className={`px-3 py-1.5 ${product.stock > 0 ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'} rounded-lg text-sm font-semibold transition`}
          >
            {product.stock > 0 ? 'Add' : 'Out' }
          </button>
        </div>
      </div>
    </div>
  );
}
