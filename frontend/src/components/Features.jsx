import React from "react";
import { motion } from "framer-motion";

export default function Features() {
  const items = [
    { 
      title: "100% Handmade", 
      desc: "Authentic craftsmanship from skilled artisans",
      icon: "🎨", 
      color: "from-orange-400 to-orange-600" 
    },
    { 
      title: "Premium Natural Materials", 
      desc: "Crafted with organic, sustainable & traditional materials",
      icon: "🪵", 
      color: "from-yellow-400 to-yellow-600" 
    },
    { 
      title: "Secure Eco Packaging", 
      desc: "Carefully wrapped to protect delicate handcrafted pieces",
      icon: "🎁", 
      color: "from-green-400 to-green-600" 
    },
    { 
      title: "Nationwide Delivery", 
      desc: "Reliable and fast shipping across Pakistan",
      icon: "🚚", 
      color: "from-blue-400 to-blue-600" 
    },
    {
      title: "Supports Local Artisans",
      desc: "Every purchase empowers skilled Pakistani artisans",
      icon: "🤝",
      color: "from-purple-400 to-purple-600"
    },
    {
      title: "Unique & Limited Pieces",
      desc: "Each product is one-of-a-kind with limited availability",
      icon: "✨",
      color: "from-pink-400 to-pink-600"
    },
  ];

  const cardVariants = {
    offscreen: { opacity: 0, y: 50 },
    onscreen: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.3, duration: 0.8 } }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
      <div className="container mx-auto px-6">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-14 text-center text-gray-900"
        >
          Why Choose <span className="text-indigo-600">HunarGar</span>?
        </motion.h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {items.map((it, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              transition={{ delay: i * 0.1 }}
            >
              {/* Icon Background */}
              <div
                className={`w-16 h-16 flex justify-center items-center rounded-xl 
                text-4xl mb-5 shadow-md bg-gradient-to-br ${it.color} text-white transition-transform duration-300 hover:scale-110`}
              >
                {it.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {it.title}
              </h3>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed text-sm">
                {it.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
