import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import Features from "../components/Features";
import { ChevronRight } from "lucide-react";
import Footer from "../components/Footer";

const categories = [
  { name: "Punjab", slug: "punjab", image: "/punjab.jpg" },
  { name: "Gilgit-Baltistan", slug: "GB", image: "/gb.jpg" },
  { name: "Sindh", slug: "sindh", image: "/sindh.jpg" },
  { name: "Kashmir", slug: "kashmir", image: "/kasmir.jpg" },
  { name: "Balochistan", slug: "balochistan", image: "baloch.jpg" },
  { name: "Kpk", slug: "kpk", image: "/kpk.jpg" },
  
];

export default function Home() {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Load products for selected category
  const loadCategoryProducts = async (slug) => {
    if (!slug) return setCategoryProducts([]);
    try {
      const res = await api.get(`/products/category/${slug}`);
      setCategoryProducts(res.data.products || []);
    } catch (err) {
      console.log(err);
      setCategoryProducts([]);
    }
  };

  const addToCart = async (productId) => {
    try {
      await api.post("/cart", { productId });
      alert("Added to cart");
    } catch (err) {
      alert("Please login or try again.");
    }
  };

  // Fetch products when selectedCategory changes
  useEffect(() => {
    loadCategoryProducts(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="w-full">
      {/* HERO */}
      <section
        className="relative w-full h-[520px] sm:h-[700px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/hero2.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight drop-shadow-2xl tracking-wide">
            Discover Authentic Handcrafted Art
          </h1>
          <p className="mt-5 text-lg sm:text-2xl opacity-90 font-light tracking-wide">
            Every Piece Tells a Pakistani Story 

          </p>
        </div>
      </section>

  <div className="container mx-auto px-4 py-12 select-none">

  {/* ------------------ CATEGORY HEADING ------------------ */}
  <h1
    className="
      text-5xl font-extrabold mb-14 text-center 
      bg-gradient-to-r from-blue-500 to-indigo-600 
      bg-clip-text text-transparent tracking-tight
    "
  >
    Explore by Region
  </h1>

  {/* ------------------ NEW CATEGORY UI ------------------ */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">

    {categories.map((cat, i) => (
      <div
        key={i}
        onClick={() => loadCategoryProducts(cat.slug)}
        className="
          group relative cursor-pointer rounded-3xl overflow-hidden 
          shadow-xl bg-gradient-to-br from-white to-gray-100
          hover:shadow-3xl transition-all duration-500 
          border border-gray-300
        "
      >
        {/* BACKGROUND IMAGE */}
        <div className="h-56 overflow-hidden">
          <img
            src={cat.image}
            alt={cat.name}
            className="
              w-full h-full object-cover 
              transition duration-700 group-hover:scale-110
            "
          />
        </div>

        {/* FADE MASK */}
        <div className="
          absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent
          opacity-70 group-hover:opacity-60 transition-all duration-500
        "></div>

        {/* CATEGORY NAME */}
        <div className="
          absolute bottom-6 left-0 right-0 text-center
          text-2xl font-bold tracking-wide text-white 
          drop-shadow-lg
          group-hover:translate-y-[-6px] transition-all duration-500
        ">
          {cat.name}
        </div>

        {/* "View Items" Button on Hover */}
        <div className="
          absolute inset-0 flex items-center justify-center opacity-0
          group-hover:opacity-100 transition-all duration-500
        ">
          <span
            className="
              bg-white text-gray-900 px-6 py-2 rounded-full shadow-lg
              font-semibold tracking-wide border border-gray-300
            "
          >
            View Items
          </span>
        </div>
      </div>
    ))}

  </div>

  {/* ------------------ CATEGORY PRODUCTS ------------------ */}
  {categoryProducts.length > 0 && (
    <>
      <h2 className="text-3xl font-bold mb-6 text-gray-900">
        Showing Results
      </h2>

      <div
        className="
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
          gap-6 mb-20
        "
      >
        {categoryProducts.map((p) => (
          <div
            key={p._id}
            className="
              rounded-3xl bg-white border border-gray-200 shadow-xl
              hover:shadow-2xl hover:-translate-y-2
              transition-all duration-300
            "
          >
            <ProductCard product={p} onAdd={addToCart} />
          </div>
        ))}
      </div>
    </>
  )}

  {/* ------------------ FEATURES SECTION ------------------ */}
  <div className="my-20 animate-fadeInSlow">
    <Features />
  </div>

</div>

     <Footer/>
    </div>
  );
}
