import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const neonGradients = [
    "from-[#ff758c] via-[#ff7eb3] to-[#ff4b5c]",
    "from-[#4e54c8] via-[#8f94fb] to-[#4e54c8]",
    "from-[#00c6ff] via-[#0072ff] to-[#00c6ff]",
    "from-[#f7971e] via-[#ffd200] to-[#f7971e]",
    "from-[#a770ef] via-[#cf8bf3] to-[#fdb99b]",
    "from-[#ff9068] via-[#fd746c] to-[#ff9068]",
  ];

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data.products || res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addToCart = async (productId) => {
    try {
      await api.post("/cart", { productId });
      alert("Added to cart!");
    } catch (err) {
      alert("Please login or try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] bg-black">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-14 h-14 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="w-full px-6 pt-24 pb-20 bg-black min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-extrabold mb-16 text-center text-white drop-shadow-xl"
      >
        Explore Our{" "}
        <span className="bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text">
          Products
        </span>
      </motion.h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-400 text-lg mt-10">
          No products available.
        </p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {products.map((p, i) => {
            const gradient = neonGradients[i % neonGradients.length];

            return (
              <motion.div
                key={p._id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.06 }}
                className={`
                  relative rounded-3xl overflow-hidden shadow-2xl
                  bg-gradient-to-br ${gradient}
                  p-[2px] transition-all duration-300
                `}
              >
                {/* Inner glass card */}
                <div className="bg-black/70 backdrop-blur-xl rounded-3xl overflow-hidden">
                  {/* Featured Badge */}
                  {p.isFeatured && (
                    <span className="absolute top-4 left-4 bg-yellow-300/90 text-black text-xs font-bold px-3 py-1 rounded-full shadow-xl z-20">
                      Featured
                    </span>
                  )}

                  {/* Product Image */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-full h-60 overflow-hidden"
                  >
                    <img
                      src={p.image || "/placeholder.png"}
                      alt={p.name}
                      className="w-full h-full object-cover rounded-t-3xl"
                    />
                  </motion.div>

                  {/* Product Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-white line-clamp-2 tracking-wide">
                      {p.name}
                    </h3>

                    <p className="text-sm text-white/70 mt-2 line-clamp-2">
                      {p.description || "Premium quality crafted product."}
                    </p>

                    {/* Ratings */}
                    <div className="flex items-center mt-2">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <svg
                          key={idx}
                          className={`w-5 h-5 ${
                            idx < (p.rating || 4)
                              ? "text-yellow-400"
                              : "text-white/40"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927C9.3 2.32 10.7 2.32 10.951 2.927l1.286 3.938a1 1 0 00.95.69h4.15c.665 0 .942.858.405 1.27l-3.363 2.445a1 1 0 00-.364 1.118l1.287 3.938c.25.608-.515 1.117-1.05.734l-3.363-2.446a1 1 0 00-1.175 0l-3.363 2.446c-.535.383-1.3-.126-1.05-.734l1.287-3.938a1 1 0 00-.364-1.118L2.364 8.825c-.537-.412-.26-1.27.405-1.27h4.15a1 1 0 00.95-.69l1.286-3.938z" />
                        </svg>
                      ))}
                    </div>

                    {/* Price and Add to Cart */}
                    <div className="mt-5 flex justify-between items-center">
                      <span className="font-bold text-white text-xl drop-shadow-lg">
                        ₹{p.price}
                      </span>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addToCart(p._id)}
                        className="bg-white text-gray-800 px-5 py-2 rounded-xl font-bold shadow-lg hover:bg-gray-200 transition"
                      >
                        Add to Cart
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
