"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Code2, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { twMerge } from "tailwind-merge";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Set initial theme based on localStorage or system preference
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={twMerge(
        "sticky top-0 z-50 w-full transition-all duration-300",

        // 🔹 BASE (NO SCROLL)
        "bg-white dark:bg-[#0b1220]",

        // 🔥 SCROLL STATE — GLASS EFFECT
        scrolled &&
          "bg-white/70 dark:bg-[#0b1220]/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-[#0b1220]/60 shadow-md border-b border-gray-200/60 dark:border-gray-800/60"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Code2 className="h-8 w-8 text-primary relative z-10" />
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white tracking-tight">
              Portfolio<span className="text-primary">.</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative group text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
              </a>
            ))}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-200 dark:hover:bg-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-primary"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/80 dark:bg-[#0b1220]/80 backdrop-blur-xl border-t border-gray-200/60 dark:border-gray-800/60"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;