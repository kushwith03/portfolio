"use client";

import React, { useEffect, useState } from "react";
import { Menu, X, Code2, Sun, Moon, Github } from "lucide-react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { twMerge } from "tailwind-merge";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

interface NavbarProps {
  onOpenResume?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const { scrollYProgress } = useScroll();
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
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
      const offset = 160;
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
      {/* Top ambient scroll progress line */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[80] bg-transparent">
        <motion.div
          className="h-full bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 origin-[0%]"
          style={{ scaleX: scrollYProgress }}
        />
      </div>

      {/* Floating Island Navigation Dock */}
      <header className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/80 dark:bg-[#070e20]/80 backdrop-blur-2xl border border-gray-200/80 dark:border-white/[0.09] shadow-xl dark:shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
        >
          {/* Brand Monogram */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 cursor-pointer group pr-1"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500/20 to-indigo-500/20 border border-sky-400/30 group-hover:border-sky-400/60 transition-all duration-300">
              <Code2 className="h-4 w-4 text-sky-400 group-hover:scale-110 transition-transform" />
            </div>
            <span className="hidden sm:inline font-bold text-sm tracking-tight text-gray-900 dark:text-white group-hover:text-sky-400 transition-colors">
              Khushwith<span className="text-sky-400">.dev</span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-gray-100/60 dark:bg-white/[0.04] p-1 rounded-full border border-gray-200/40 dark:border-white/[0.04]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={twMerge(
                    "relative px-3.5 py-1 text-xs font-medium rounded-full transition-all duration-200",
                    isActive
                      ? "text-white font-semibold"
                      : "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-island-active"
                      className="absolute inset-0 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full shadow-[0_0_12px_rgba(56,189,248,0.4)]"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-1 px-3 py-1 text-xs font-mono font-medium rounded-full bg-slate-100 dark:bg-white/[0.06] hover:bg-sky-500/10 dark:hover:bg-sky-500/15 text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 border border-slate-200/80 dark:border-white/[0.08] transition-all cursor-pointer"
            >
              Resume
            </button>

            <a
              href="https://github.com/kushwith03"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-gray-600 dark:text-slate-400 hover:text-sky-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-all"
              aria-label="GitHub Profile"
            >
              <Github className="h-4 w-4" />
            </a>

            {/* Dark/Light Switch */}
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full text-gray-600 dark:text-slate-400 hover:text-sky-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-all"
              aria-label="Toggle Theme"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDark ? "sun" : "moon"}
                  initial={{ y: -6, opacity: 0, rotate: -30 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 6, opacity: 0, rotate: 30 }}
                  transition={{ duration: 0.15 }}
                >
                  {isDark ? (
                    <Sun className="h-4 w-4 text-amber-400" />
                  ) : (
                    <Moon className="h-4 w-4 text-indigo-600" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-white/[0.06]"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="fixed top-20 left-4 right-4 z-50 md:hidden bg-white/95 dark:bg-[#070e20]/95 backdrop-blur-2xl border border-gray-200 dark:border-white/[0.1] rounded-2xl p-4 shadow-2xl space-y-1"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={twMerge(
                  "block px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                  activeSection === link.href.slice(1)
                    ? "bg-sky-500/10 text-sky-400 font-semibold"
                    : "text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-white/[0.04]"
                )}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;


