


import React, { useEffect, useState } from "react";
import api from "../services/api";
import { motion } from "framer-motion";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: ""
  });
  const [editId, setEditId] = useState(null);

  const fetchAll = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.products || res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/products/categories");
      setCategories(res.data.categories || []);
      // Set default category if categories exist
      if (res.data.categories && res.data.categories.length > 0 && !form.category) {
        setForm(prev => ({ ...prev, category: res.data.categories[0] }));
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      // Fallback to default categories if API fails
      setCategories([
        "punjab",
        "GB",
        "sindh",
        "kashmir",
        "balochistan",
        "kpk",

      ]);
    }
  };

  useEffect(() => {
    fetchAll();
    fetchCategories();
  }, []);

  const submitCreate = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/products/${editId}`, {
          name: form.name,
          description: form.description,
          price: Number(form.price),
          category: form.category,
          image: form.image
        });
        alert("Product updated successfully");
      } else {
        await api.post("/products", {
          name: form.name,
          description: form.description,
          price: Number(form.price),
          category: form.category,
          image: form.image
        });
        alert("Product created successfully");
      }
      setForm({ name: "", description: "", price: "", category: "punjab", image: "" });
      setEditId(null);
      fetchAll();
    } catch (err) {
      alert(err.response?.data?.message || "Error saving product");
    }
  };

  const startEdit = (product) => {
    setEditId(product._id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm({ name: "", description: "", price: "", category: categories[0] || "", image: "" });
  };

  const toggleFeatured = async (id) => {
    try {
      await api.patch(`/products/${id}`);
      fetchAll();
    } catch (err) { console.error(err); }
  };

  const deleteProduct = async (id) => {
    if (!confirm("Delete product?")) return;
    try {
      await api.delete(`/products/${id}`);
      fetchAll();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br text-center from-blue-100 via-purple-100 to-pink-100 py-10 px-4 pt-30">

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-3xl md:text-5xl mb-20 font-extrabold  text-gray-900 leading-tight"
      >
        Admin<span className="text-orange-600">DashBoard</span>
      </motion.h2>

      <div className="container mx-auto px-4 p grid grid-cols-1 md:grid-cols-1 gap-10">

        {/* CREATE PRODUCT FORM */}
        <form
          onSubmit={submitCreate}
          className="
        space-y-4 p-6 rounded-2xl bg-gray-500 backdrop-blur-xl border border-white/40
        shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]
      "
        >
          "
    >
          <h2 className="text-xl font-bold text-gray-800">
            {editId ? "Update Product" : "Create Product"}
          </h2>

          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Product Name"
            required
            className="
          w-full px-3 py-2 rounded-lg border border-gray-300 bg-white
          focus:ring-4 focus:ring-indigo-300 transition-all
        "
          />

          <input
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            placeholder="Price"
            type="number"
            min="0"
            step="0.01"
            required
            className="
          w-full px-3 py-2 rounded-lg border border-gray-300 bg-white
          focus:ring-4 focus:ring-indigo-300 transition-all
        "
          />

          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
              className="
            w-full px-3 py-2 rounded-lg border border-gray-300 bg-white
            focus:ring-4 focus:ring-indigo-300 transition-all appearance-none
          "
            >
              <option value="" disabled>Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Description"
            required
            className="
          w-full px-3 py-2 rounded-lg border border-gray-300 bg-white
          focus:ring-4 focus:ring-indigo-300 transition-all
        "
            rows="3"
          />

          <input
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            placeholder="Image URL or Base64"
            required
            className="
          w-full px-3 py-2 rounded-lg border border-gray-300 bg-white
          focus:ring-4 focus:ring-indigo-300 transition-all
        "
          />

          <button
            type="submit"
            className="
          w-full py-3 rounded-xl text-white font-semibold
          bg-orange-700
          hover:scale-[1.03] active:scale-95 transition-all duration-300 shadow-lg
        "
          >
            {editId ? "Update Product" : "Create Product"}
          </button>

          {editId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="
            w-full py-3 rounded-xl text-gray-700 font-semibold
            bg-gray-300 hover:bg-gray-400
            hover:scale-[1.03] active:scale-95 transition-all duration-300 shadow-lg mt-2
          "
            >
              Cancel Edit
            </button>
          )}
        </form>

        {/* PRODUCTS LIST */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">
            Products
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p._id}
                className="
          bg-white/60 backdrop-blur-xl border border-gray-200
          shadow-lg hover:shadow-2xl transition-all duration-300
          rounded-3xl overflow-hidden group
        "
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={p.image || 'https://via.placeholder.com/300'}
                    alt={p.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {p.isFeatured && (
                    <span className="absolute top-3 left-3 bg-yellow-500 text-white px-3 py-1 text-xs font-bold rounded-full shadow">
                      Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {p.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Rs {p.price}
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <p className="inline-block bg-gray-100 text-gray-700 px-3 py-1 text-xs rounded-full border border-gray-300">
                      {p.category}
                    </p>
                    <span className="text-xs text-gray-500">
                      ({categories.includes(p.category) ? 'Valid' : 'Unknown'})
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {p.description}
                  </p>

                  {/* Actions */}
                  <div className="flex justify-between mt-5">
                    <button
                      onClick={() => toggleFeatured(p._id)}
                      className={`
                px-4 py-2 rounded-xl text-sm font-semibold shadow transition-all
                ${p.isFeatured
                          ? "bg-yellow-500 text-white hover:bg-yellow-600"
                          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        }
              `}
                    >
                      {p.isFeatured ? "Unfeature" : "Feature"}
                    </button>

                    <button
                      onClick={() => startEdit(p)}
                      className="
                px-4 py-2 rounded-xl text-sm font-semibold shadow transition-all
                bg-blue-500 text-white hover:bg-blue-600
              "
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProduct(p._id)}
                      className="
                px-4 py-2 text-sm rounded-xl bg-red-500 text-white font-semibold
                hover:bg-red-600 shadow transition-all
              "
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>
    </div>

  );
}

