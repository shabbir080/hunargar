import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-950 via-gray-800 to-gray-900 text-gray-300 pt-24 pb-10 overflow-hidden">

      {/* Glow Background Effects */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-700/20 blur-3xl rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600/10 blur-3xl rounded-full animate-pulse-slow"></div>

      <div className="relative container mx-auto px-6">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group"
          >
            <h2 className="text-3xl font-extrabold text-white mb-4 tracking-wide transition-all group-hover:text-purple-300">
              HandCrafted.pk
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium handmade products crafted with love by Pakistani artisans. Experience authenticity, quality, and tradition.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-6">
              {[{
                icon: <FaFacebookF size={18} />,
                link: "https://www.facebook.com/share/1HXTmqPYrE/",
                color: "blue-600",
              },{
                icon: <FaInstagram size={18} />,
                link: "https://www.instagram.com/shabbir_madhupuri_0080?igsh=MXFxaHg4czl5eTl4cQ==",
                color: "pink-600",
              },{
                icon: <FaWhatsapp size={18} />,
                link: "https://wa.me/923001234567",
                color: "green-600",
              }].map((s, i) => (
                <motion.a
                  key={i}
                  href={s.link}
                  target="_blank"
                  whileHover={{ scale: 1.2 }}
                  className={`p-3 bg-gray-900 rounded-full border border-gray-700 hover:bg-${s.color} hover:border-${s.color} transition-all shadow-lg shadow-${s.color}/20`}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-white mb-5">Quick Links</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              {[
                { name: "Home", path: "/" },
                { name: "Products", path: "/products" },
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="hover:text-white hover:translate-x-1 block transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Policies */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-white mb-5">Policies</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              {["Privacy Policy","Refund Policy","Terms & Conditions"].map((policy, i) => (
                <li key={i} className="hover:text-white hover:translate-x-1 transition cursor-pointer">
                  {policy}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-white mb-5">Contact Us</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>Email: shabbir.madhupuri1780@gmail.com</li>
              <li>Phone: +92 340 8004867</li>
              <li>Address: skardu, Pakistan</li>
            </ul>
          </motion.div>

        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="border-t border-gray-800 mt-12 pt-6"
        />

        {/* Bottom */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center text-gray-500 text-sm tracking-wide"
        >
          © {new Date().getFullYear()} HandCrafted.pk — All Rights Reserved.
        </motion.p>
      </div>
    </footer>
  );
}
