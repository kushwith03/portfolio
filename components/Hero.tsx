"use client";

import React from "react";
import { TypeAnimation } from "react-type-animation";
import { Github, Linkedin, Mail, FileText, ArrowRight, Sparkles, Code2, Terminal, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center bg-white dark:bg-[#070b14] overflow-hidden bg-grid-pattern transition-colors duration-300"
    >
      {/* Ambient Gradient Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[550px] h-[550px] bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 -left-32 w-[450px] h-[450px] bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[350px] h-[350px] bg-indigo-500/10 dark:bg-indigo-500/10 rounded-full blur-[90px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10 w-full">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left Column: Intro & Call To Actions */}
          <motion.div
            className="md:max-w-2xl md:mx-auto lg:col-span-7 lg:text-left relative z-20 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Status Pill */}
            <motion.div variants={itemVariants} className="inline-block">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-medium shadow-sm backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span>Available for Full-Stack & Software Roles</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="mt-6 text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1]"
            >
              <span>Hi, I'm </span>
              <span className="text-gradient">Khushwith</span>
              <div className="mt-2 text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold text-gray-800 dark:text-gray-200">
                <span className="text-primary font-mono font-semibold">
                  <TypeAnimation
                    sequence={[
                      "Full-Stack Engineer",
                      1200,
                      "Backend Architect",
                      1200,
                      "AI & Simulation Builder",
                      1200,
                      "Problem Solver (250+ DSA)",
                      1200,
                    ]}
                    speed={50}
                    repeat={Infinity}
                  />
                </span>
              </div>
            </motion.h1>

            {/* Bio Description */}
            <motion.p
              variants={itemVariants}
              className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              Engineering scalable web applications, robust backend microservices, and AI-driven systems. Focused on clean architecture, high throughput, and seamless user experiences.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-blue-500/25 transition-all group"
              >
                Explore Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700/80 border border-gray-200 dark:border-gray-700 rounded-xl transition-all shadow-sm"
              >
                <Mail className="mr-2 h-4 w-4 text-primary" />
                Get in Touch
              </motion.a>
            </motion.div>

            {/* Social Links & Quick Proof */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex items-center justify-center lg:justify-start gap-4 pt-6 border-t border-gray-100 dark:border-gray-800/80"
            >
              <a
                href="https://github.com/kushwith03"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800/60 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-primary transition-all border border-gray-200/50 dark:border-gray-700/50"
                aria-label="GitHub Profile"
              >
                <Github className="h-5 w-5" />
                <span className="text-xs font-semibold hidden sm:inline">GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/kushwith03/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800/60 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-primary transition-all border border-gray-200/50 dark:border-gray-700/50"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
                <span className="text-xs font-semibold hidden sm:inline">LinkedIn</span>
              </a>

              <a
                href="mailto:kushwith03@gmail.com"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800/60 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-primary transition-all border border-gray-200/50 dark:border-gray-700/50"
                aria-label="Send Email"
              >
                <Mail className="h-5 w-5" />
                <span className="text-xs font-semibold hidden sm:inline">Email</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Profile & Badge Showcase */}
          <motion.div
            className="mt-14 lg:mt-0 lg:col-span-5 relative flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Ambient Background Behind Avatar */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl transform rotate-3" />

            {/* Profile Card Container */}
            <div className="relative w-full max-w-sm sm:max-w-md bg-white/70 dark:bg-[#0d1322]/80 glass-card p-6 sm:p-8 rounded-3xl border border-white/60 dark:border-gray-700/60 shadow-2xl">
              
              {/* Avatar with Glow Ring */}
              <div className="relative mx-auto w-36 h-36 sm:w-40 sm:h-40 mb-6">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full blur-sm opacity-80 animate-pulse-slow" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-inner">
                  <Image
                    src="/profile.jpg"
                    alt="R Khushwith Kumar"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>

              {/* Title & Info */}
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                  R Khushwith Kumar
                </h3>
                <p className="text-sm font-medium text-primary mt-1 flex items-center justify-center gap-1.5">
                  <Code2 className="h-4 w-4" /> Full-Stack Software Engineer
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Bengaluru, India • RNSIT Graduate
                </p>
              </div>

              {/* Stat Counters Grid */}
              <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-800/80 grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
                  <p className="text-lg sm:text-xl font-extrabold text-primary">
                    8.6
                  </p>
                  <p className="text-[10px] sm:text-xs uppercase font-medium text-gray-500 dark:text-gray-400 tracking-wider">
                    CGPA
                  </p>
                </div>
                <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
                  <p className="text-lg sm:text-xl font-extrabold text-indigo-500">
                    250+
                  </p>
                  <p className="text-[10px] sm:text-xs uppercase font-medium text-gray-500 dark:text-gray-400 tracking-wider">
                    DSA Solved
                  </p>
                </div>
                <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
                  <p className="text-lg sm:text-xl font-extrabold text-purple-500">
                    ATSPL
                  </p>
                  <p className="text-[10px] sm:text-xs uppercase font-medium text-gray-500 dark:text-gray-400 tracking-wider">
                    SWE Intern
                  </p>
                </div>
              </div>

              {/* Floating Mini Tech Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5 justify-center">
                <span className="px-2.5 py-1 text-[11px] font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full border border-blue-100 dark:border-blue-800/50">
                  React & Next.js
                </span>
                <span className="px-2.5 py-1 text-[11px] font-medium bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-full border border-purple-100 dark:border-purple-800/50">
                  Node & PostgreSQL
                </span>
                <span className="px-2.5 py-1 text-[11px] font-medium bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300 rounded-full border border-emerald-100 dark:border-emerald-800/50">
                  PyTorch & AI
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

