import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import ProductCard from "./ProductCard";

export default function Recommended() {
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const res = await api.get("/products/recommendations");
        setRecommended(res.data || []);
      } catch (err) {
        console.error("Recommended fetch error:", err);
        setRecommended([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommended();
  }, []);

  return (
    <section className="py-14 bg-gray-50">
      <div className="container max-w-full px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-gray-900 text-center">
          Recommended <span className="text-indigo-600">For You</span>
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full"
            />
          </div>
        ) : recommended.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No recommended products</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {recommended.map((p, i) => (
              <motion.div
                key={p._id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300"
              >
                <ProductCard product={p} onAdd={() => {}} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
