import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Leaf, HandHeart } from "lucide-react";
import Footer from "../components/Footer";

export default function AboutSection() {
  return (
   
    <>
     <section className="w-full bg-gradient-to-br mt-10 from-amber-50 via-orange-50 to-amber-100 py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Left Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -top-6 -left-6 w-28 h-28 bg-amber-300 rounded-full blur-2xl opacity-40"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-orange-400 rounded-full blur-2xl opacity-30"></div>

          <img
            src="./about.png"
            alt="Handcrafted Work"
            className="rounded-2xl shadow-xl w-full object-cover"
          />
        </motion.div>

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight"
          >
            About <span className="text-orange-600">HunarGar</span>
          </motion.h2>

          <p className="text-gray-700 mt-5 leading-relaxed text-lg">
            HunarGar is dedicated to preserving Pakistan’s rich tradition of handmade crafts. 
            We empower local artisans by providing a platform to showcase their unique skills 
            and beautifully crafted products — each piece carrying a story, a culture, and a heritage.
          </p>

          <p className="text-gray-700 mt-4 leading-relaxed">
            From pottery and handwoven textiles to wood carving and cultural embroidery, 
            we celebrate craftsmanship that has been passed down for generations.
          </p>

          {/* Feature Badges */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[{
              icon: <Sparkles className="text-orange-600" />,
              text: "100% Handmade"
            },{
              icon: <HandHeart className="text-orange-600" />,
              text: "Support Artisans"
            },{
              icon: <Leaf className="text-orange-600" />,
              text: "Eco-Friendly"
            }].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow"
              >
                {item.icon}
                <span className="font-semibold text-gray-900 text-sm">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-16 text-center px-4 md:px-20"
      >
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight"
          >
            Our <span className="text-orange-600">Mission</span>
          </motion.h2>

        <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
          HunarGar’s mission is to preserve and celebrate the rich tradition of Pakistani handcrafted art by empowering local artisans. We provide a platform to showcase their unique skills and cultural heritage, connecting authentic, handmade products with people who value quality, craftsmanship, and tradition. Every piece tells a story of dedication, culture, and authenticity, bridging the gap between tradition and modern appreciation.
        </p>
      </motion.div>
    </section>
    
    <Footer/>
    
    </>
  );
}
