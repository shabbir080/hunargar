import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import Recommended from "../components/Recommended";
import InvoiceModal from "../components/InvoiceModal";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [showInvoice, setShowInvoice] = useState(false);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setItems(res.data || []);
    } catch (err) {
      console.error(err);
      setItems([]);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (productId, quantity) => {
    try {
      await api.put(`/cart/${productId}`, { productId, quantity });
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = async (productId) => {
    try {
      await api.delete("/cart", { data: { productId } });
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const total = items.reduce(
    (s, it) => s + (it.product?.price || 0) * (it.quantity || 0),
    0
  );

  return (
    <div className="container max-w-full px-6 py-10 pt-20 bg-green-200">
      <h1 className="text-4xl font-extrabold mb-12 text-gray-900 text-center">
        Your <span className="text-orange-500">Cart</span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">

        {/* Cart Items */}
        <div className="flex-1 space-y-6">
          {items.length === 0 && (
            <p className="text-center text-gray-500 text-lg">
              Your cart is empty.
            </p>
          )}

          {items.map((it, i) => (
            <motion.div
              key={it.product?._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 p-4 bg-gradient-to-r from-orange-50 via-white to-orange-50 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Product Image */}
              <motion.img
                src={it.product?.image || "https://via.placeholder.com/150"}
                alt={it.product?.name}
                className="w-28 h-28 object-cover rounded-xl border border-gray-200 shadow-md"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />

              {/* Product Info */}
              <div className="flex-1 text-center sm:text-left">
                <div className="font-semibold text-gray-900 text-lg">{it.product?.name}</div>
                <div className="text-orange-500 font-bold mt-1">₹{it.product?.price}</div>
              </div>

              {/* Quantity & Remove */}
              <div className="flex items-center gap-3 mt-3 sm:mt-0">
                <input
                  type="number"
                  min={1}
                  value={it.quantity}
                  onChange={(e) => updateQuantity(it.product._id, Number(e.target.value))}
                  className="w-20 border rounded-lg px-3 py-1 text-center focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                />
                <button
                  onClick={() => removeItem(it.product._id)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold shadow-md transition-all"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Checkout Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/3 bg-gradient-to-br from-orange-200 via-orange-100 to-white p-6 rounded-2xl shadow-xl flex flex-col justify-between transition-all duration-300"
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Summary</h2>
            <div className="flex justify-between text-gray-700 font-semibold">
              <span>Items:</span>
              <span>{items.reduce((acc, it) => acc + it.quantity, 0)}</span>
            </div>
            <div className="flex justify-between text-gray-700 font-semibold">
              <span>Total:</span>
              <span className="text-orange-500 text-lg font-bold">₹{total}</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowInvoice(true)}
            className="mt-6 w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            Checkout
          </motion.button>
        
        </motion.div>
      </div>
      
      {/* Invoice Modal */}
      <InvoiceModal
        isOpen={showInvoice}
        onClose={() => setShowInvoice(false)}
        items={items}
        total={total}
      />

      {/* Recommended Products */}
      <div className="mt-12">
        <Recommended />
      </div>
    </div>
  );
}
