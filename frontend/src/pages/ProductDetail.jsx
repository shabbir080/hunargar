import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../services/api";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/products");
        const items = res.data.products || res.data;
        const found = items.find(p => p._id === id);
        setProduct(found || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const addToCart = async () => {
    try {
      await api.post("/cart", { productId: id });
      alert("Added to cart");
    } catch (err) {
      alert("Please login or try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!product) return <div className="container mx-auto px-4 py-8 text-center text-gray-500">Product not found.</div>;

  return (
    <div className="container mx-auto px-4 pt-30 py-12">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Product Image */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="overflow-hidden rounded-2xl shadow-lg"
        >
          <img
            src={product.image || "https://via.placeholder.com/600"}
            alt={product.name}
            className="w-full h-96 object-cover"
          />
        </motion.div>

        {/* Product Details */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">{product.name}</h1>
          <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>

          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <span className="text-2xl font-bold text-orange-600">₹{product.price}</span>
            <button
              onClick={addToCart}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300"
            >
              Add to Cart
            </button>
          </div>

          {/* Additional Info / CTA */}
          <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl shadow-inner border border-white/50">
            <h3 className="font-semibold text-gray-900 mb-2">Product Highlights:</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>100% Handmade</li>
              <li>Eco-Friendly Materials</li>
              <li>Supports Local Artisans</li>
              <li>Unique & Limited Edition</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
