"use client";

import React, { useEffect, useState } from "react";
import { Menu, X, Code2, Sun, Moon, Github, Sparkles } from "lucide-react";
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
  const scaleX = scrollYProgress;

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
      setScrolled(window.scrollY > 15);

      const offset = 140;
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
      {/* Dynamic Top Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[70] bg-transparent">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 origin-[0%]"
          style={{ scaleX }}
        />
      </div>

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={twMerge(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "bg-white/80 dark:bg-[#070b14]/80 glass-nav border-b border-gray-200/70 dark:border-gray-800/70 shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
            : "bg-white/50 dark:bg-[#070b14]/50 backdrop-blur-md border-b border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={twMerge(
              "flex items-center justify-between transition-all duration-300",
              scrolled ? "h-16" : "h-20"
            )}
          >
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div className="relative flex items-center justify-center p-2 rounded-xl bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/20 group-hover:border-blue-500/40 transition-all duration-300">
                <Code2 className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="ml-3 text-lg sm:text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Khushwith<span className="text-primary">.dev</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <div className="flex items-center bg-gray-100/70 dark:bg-gray-800/60 p-1.5 rounded-full border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-md">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.slice(1);
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      className={twMerge(
                        "relative px-4 py-1.5 text-xs lg:text-sm font-medium rounded-full transition-all duration-200",
                        isActive
                          ? "text-white"
                          : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="active-pill"
                          className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-md shadow-blue-500/30"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className="relative z-10">{link.name}</span>
                    </a>
                  );
                })}
              </div>

              {/* GitHub Link */}
              <a
                href="https://github.com/kushwith03"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-all"
                aria-label="GitHub Profile"
              >
                <Github className="h-5 w-5" />
              </a>

              {/* Theme Toggle Button */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-full bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 hover:text-primary border border-gray-200/60 dark:border-gray-700/60 shadow-sm transition-all"
                aria-label="Toggle Theme"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isDark ? "sun" : "moon"}
                    initial={{ y: -10, opacity: 0, rotate: -45 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 10, opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isDark ? (
                      <Sun className="h-4 w-4 text-amber-400" />
                    ) : (
                      <Moon className="h-4 w-4 text-indigo-600" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
                aria-label="Toggle Theme"
              >
                {isDark ? (
                  <Sun className="h-5 w-5 text-amber-400" />
                ) : (
                  <Moon className="h-5 w-5 text-indigo-600" />
                )}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 dark:bg-[#070b14]/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-xl"
            >
              <div className="px-4 pt-3 pb-6 space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={twMerge(
                      "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      activeSection === link.href.slice(1)
                        ? "bg-primary text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    )}
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

