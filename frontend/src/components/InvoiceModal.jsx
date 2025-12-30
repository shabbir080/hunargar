import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";     // <-- Added import

export default function InvoiceModal({ isOpen, onClose, items = [], total = 0 }) {
  if (!isOpen) return null;

  const safeItems = Array.isArray(items) ? items : [];

  const orderId = "ORD-" + Math.floor(Math.random() * 900000 + 100000);
  const date = new Date().toLocaleString();

  const handlePrint = () => {
    const content = document.getElementById("invoice-content");
    const printWindow = window.open("", "", "width=900,height=700");
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1, h2, h3 { margin: 0; padding: 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            th { background-color: #4f46e5; color: white; }
            tfoot td { font-weight: bold; }
            .text-center { text-align: center; }
            .mt-6 { margin-top: 1.5rem; }
            .mb-4 { margin-bottom: 1rem; }
          </style>
        </head>
        <body>
          ${content.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-fadeIn">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-6 text-center">
          <h2 className="text-2xl font-bold">🧾 INVOICE</h2>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight"
          >
            <span className="text-orange-600">HunarGar</span>
          </motion.h2>
        </div>

        {/* Invoice Content */}
        <div className="p-6" id="invoice-content">
          
          {/* Order Info */}
          <div className="mb-6 flex justify-between text-sm text-gray-600">
            <div>Order ID: <span className="font-semibold">{orderId}</span></div>
            <div>Date: <span className="font-semibold">{date}</span></div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left">Item</th>
                  <th>Qty</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {safeItems.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      No items in cart
                    </td>
                  </tr>
                ) : (
                  safeItems.map((it, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td>{it?.product?.name || "Unknown"}</td>
                      <td className="text-center">{it?.quantity || 1}</td>
                      <td className="text-right">₹{it?.product?.price || 0}</td>
                      <td className="text-right">
                        ₹{(it?.product?.price || 0) * (it?.quantity || 1)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

              <tfoot>
                <tr>
                  <td colSpan="3" className="text-right">Total:</td>
                  <td className="text-right">₹{total}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="text-center mt-6 text-gray-700 font-semibold">
            Thank you for shopping with <span className="text-purple-600 font-bold">HunarGar</span>!
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-6 flex flex-col gap-3">

          {/* Print */}
          <button
            onClick={handlePrint}
            className="w-full bg-green-600 text-white py-2 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            Print Invoice
          </button>

          {/* New Button - Other Payment Options */}
          <Link
            to="/payment-options"         
            className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold text-center hover:bg-blue-700 transition"
          >
            Other Payment Options
          </Link>

          {/* Close */}
          <button
            onClick={onClose}
            className="w-full bg-gray-700 text-white py-2 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
