import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function PaymentPage() {
  const paymentMethods = [
    {
      name: "JazzCash",
      number: "0300-1234567",
      img: "data:image/png;base64,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"
    },
    {
      name: "EasyPaisa",
      number: "0345-9876543",
      img: "data:image/png;base64,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"
    },
    {
      name: "SadaPay",
      number: "PK98-SDAP-22334455-11",
      img: "data:image/png;base64,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"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br pt-40 from-gray-100 to-gray-200 flex flex-col items-center py-10 px-6">

      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold text-gray-800"
      >
        Payment Methods
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-gray-600 text-center mt-3 max-w-xl leading-relaxed"
      >
        Choose your preferred payment service below. Once paid, share receipt
        or screenshot along with Order ID for confirmation.
      </motion.p>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 w-full max-w-6xl">

        {paymentMethods.map((pm, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.07 }}
            className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition"
          >
            {/* Payment Image */}
            <div className="h-40 w-full overflow-hidden">
              <img
                src={pm.img}
                alt={pm.name}
                className="w-full h-full object-cover hover:scale-110 transition duration-700"
              />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col gap-2">
              <h2 className="text-2xl font-bold text-gray-800">{pm.name}</h2>

              <p className="text-gray-600 text-sm mt-1">Account / Wallet Number</p>
              <p className="text-gray-900 font-bold text-lg tracking-wide">{pm.number}</p>

              <button
                onClick={() => navigator.clipboard.writeText(pm.number)}
                className="mt-4 bg-gray-900 hover:bg-black text-white font-medium py-2 rounded-xl transition"
              >
                Copy Number
              </button>
            </div>
          </motion.div>
        ))}

      </div>

      {/* Footer Buttons */}
      <div className="flex gap-4 mt-14">
        <Link
          to="/"
          className="px-7 py-3 bg-gray-800 hover:bg-gray-900 rounded-xl shadow text-white font-semibold transition"
        >
          Back to Home
        </Link>
      </div>

    </div>
  );
}
