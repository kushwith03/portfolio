"use client";

import React, { useState } from "react";
import { Send, CheckCircle, AlertCircle, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="py-24 bg-gray-50 dark:bg-gray-950 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid lg:grid-cols-2 gap-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Info Side */}
          <div className="space-y-8">
            <div>
              <h2 className="text-base text-primary font-bold tracking-wide uppercase">
                Get in Touch
              </h2>
              <h3 className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                Let's work together
              </h3>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Have a project in mind or want to discuss a potential
                opportunity? I'm available for internships starting January
                2026.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Email
                  </p>
                  <a
                    href="mailto:kushwith03@gmail.com"
                    className="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors"
                  >
                    kushwith03@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Location
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    Bengaluru, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-8"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <motion.input
                  type="text"
                  name="name"
                  required
                  whileFocus={{ scale: 1.01 }}
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <motion.input
                  type="email"
                  name="email"
                  required
                  whileFocus={{ scale: 1.01 }}
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
                  placeholder="youremail@gmail.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <motion.textarea
                  name="message"
                  rows={4}
                  required
                  whileFocus={{ scale: 1.01 }}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white resize-none"
                  placeholder="Hi Khushwith, I came across your portfolio and wanted to get in touch..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === "loading" || status === "success"}
                whileHover={{
                  y: -3,
                  transition: { type: "spring", stiffness: 300 },
                }}
                className={`w-full py-4 rounded-lg font-bold text-white shadow-lg transition-all ${
                  status === "success"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary"
                } disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                {status === "loading" ? (
                  <span className="flex items-center justify-center">
                    <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Sending...
                  </span>
                ) : status === "success" ? (
                  <span className="flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 mr-2" /> Message Sent
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Send Message <Send className="h-5 w-5 ml-2" />
                  </span>
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
