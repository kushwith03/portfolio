"use client";

import React, { useEffect, useState } from "react";
import { Menu, X, Code2, Sun, Moon } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { twMerge } from "tailwind-merge";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const Navbar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const sparkleTranslateX = useTransform(
    scrollYProgress,
    (v) => `calc(${v * 100}% - 8px)`
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");


  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const dark = stored === "dark" || (!stored && prefersDark);

    document.documentElement.classList.toggle("dark", dark);
    setIsDark(dark);
  }, []);


  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);

      const offset = 120;
      const scrollPos = window.scrollY + offset;

      let current = "";

      navLinks.forEach(({ href }) => {
        const section = document.querySelector(href) as HTMLElement | null;
        if (!section) return;

        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (scrollPos >= top && scrollPos < bottom) {
          current = section.id;
        }
      });

      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [activeSection]);

  const toggleTheme = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  };

  return (
    <>
     
      <div className="fixed top-0 left-0 right-0 h-1 z-[60]">
        <motion.div
          className="h-full bg-primary origin-[0%]"
          style={{ scaleX: scrollYProgress }}
        />
        <motion.div
          className="absolute top-1/2 left-0 w-4 h-4 rounded-full bg-primary/50 blur-md"
          style={{
            translateX: sparkleTranslateX,
            translateY: "-50%",
            x: "-50%",
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={twMerge(
          "sticky top-0 z-50 w-full transition-all duration-300",
          "bg-white dark:bg-[#0b1220]",
          scrolled &&
            "bg-white/70 dark:bg-[#0b1220]/70 backdrop-blur-xl shadow-md border-b border-gray-200/60 dark:border-gray-800/60"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={twMerge(
              "flex items-center justify-between transition-all duration-300",
              scrolled ? "h-16" : "h-20"
            )}
          >
       
            <div
              className="flex items-center cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-primary/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <Code2 className="h-8 w-8 text-primary relative z-10" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                Portfolio<span className="text-primary">.</span>
              </span>
            </div>

      
            <div className="hidden md:flex items-center space-x-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="relative px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-dot"
                        className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-primary rounded-full"
                        style={{ x: "-50%" }}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.a>
                );
              })}

              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:text-primary"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isDark ? "sun" : "moon"}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isDark ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>

            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100/80 dark:bg-gray-800/80"
              >
                {isDark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-gray-700 dark:text-gray-200"
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

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/80 dark:bg-[#0b1220]/80 backdrop-blur-xl border-t"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:text-primary"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
