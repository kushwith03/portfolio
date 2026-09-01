"use client";

import React, { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Eye, ArrowUp, Heart, Code2 } from "lucide-react";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setVisits(data.visits);
      })
      .catch((err) => console.error("Failed to fetch visit stats:", err));
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { href: "https://github.com/kushwith03", icon: Github, label: "GitHub" },
    {
      href: "https://www.linkedin.com/in/kushwith03/",
      icon: Linkedin,
      label: "LinkedIn",
    },
    { href: "mailto:kushwith03@gmail.com", icon: Mail, label: "Email" },
  ];

  return (
    <footer className="relative bg-white dark:bg-[#070b14] border-t border-gray-200/80 dark:border-gray-800/80 transition-colors duration-300 overflow-hidden">
      {/* Top glowing gradient border accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Brand / Bio */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-blue-500/10 text-primary">
                <Code2 className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                R Khushwith Kumar
              </h3>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-sm">
              Full-Stack Software Engineer building reliable, high-performance systems and engaging interfaces.
            </p>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800/70 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-gray-200/60 dark:border-gray-700/60 transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>

            {/* Back to top button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-primary border border-blue-200 dark:border-blue-800/50 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all flex items-center gap-1.5 text-xs font-semibold"
              aria-label="Back to Top"
            >
              <ArrowUp className="h-4 w-4" />
              <span className="hidden sm:inline">Top</span>
            </motion.button>
          </div>
        </div>

        {/* Bottom divider & Copyright & Views */}
        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <p className="flex items-center gap-1.5 text-center sm:text-left">
            <span>© {new Date().getFullYear()} R Khushwith Kumar.</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart className="h-3 w-3 text-red-500 inline fill-red-500" /> in Bengaluru
            </span>
          </p>

          {visits !== null && (
            <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-800/60 px-3 py-1 rounded-full border border-gray-200/60 dark:border-gray-700/60">
              <Eye className="h-3.5 w-3.5 text-primary" />
              <span className="font-mono text-xs text-gray-700 dark:text-gray-300">
                {visits.toLocaleString()} views
              </span>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

