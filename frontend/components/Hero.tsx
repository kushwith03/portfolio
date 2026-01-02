"use client";

import React from "react";
import { Github, Linkedin, Mail, FileText, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center bg-gray-50 dark:bg-gray-950 overflow-hidden"
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-50 dark:opacity-20" />
        <div className="absolute top-[20%] -left-[10%] w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl opacity-50 dark:opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-7 lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 text-sm font-medium mb-6"
            >
              <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 animate-pulse"></span>
              Available for Internships (Jan 2026)
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl xl:text-7xl leading-tight"
            >
              <span className="block">Hi, I'm Khushwith</span>
              <span className="block text-primary mt-1">
                Full Stack Developer
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg text-gray-600 dark:text-gray-300 sm:max-w-xl sm:mx-auto md:text-xl lg:mx-0 leading-relaxed"
            >
              Final-year{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                Computer Science
              </span>{" "}
              student at RNSIT. Crafting scalable web applications with{" "}
              <span className="font-semibold text-primary">
                React, Node.js, & Data Science
              </span>
              .
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start"
            >
              <a
                href="#projects"
                className="group inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-primary rounded-full transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-primary/30"
              >
                View Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="/resume.pdf"
                download="R_Khushwith_Kumar_Resume.pdf"
                className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-full text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all hover:shadow-md"
              >
                <FileText className="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
                Resume
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex items-center justify-center lg:justify-start space-x-6"
            >
              <a href="https://github.com/kushwith03" target="_blank" rel="noopener noreferrer">
                <Github className="h-7 w-7 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-transform hover:scale-110 cursor-pointer" />
              </a>
              <a href="https://linkedin.com/in/kushwith" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-7 w-7 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-transform hover:scale-110 cursor-pointer" />
              </a>
              <a href="mailto:kushwith03@gmail.com">
                <Mail className="h-7 w-7 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-transform hover:scale-110 cursor-pointer" />
              </a>
            </motion.div>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            className="mt-16 lg:mt-0 lg:col-span-5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative mx-auto max-w-md"
            >
              <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl p-8 rounded-3xl border border-white/20 dark:border-gray-700 shadow-2xl">
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 border-4 border-white/30 dark:border-gray-700 shadow-lg shadow-primary/20">
                    <Image
                      src="/profile.jpg"
                      alt="R Khushwith Kumar"
                      fill
                      className="object-cover object-top"
                      priority
                    />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    R Khushwith Kumar
                  </h3>
                  <p className="text-primary font-medium mt-1">
                    Bengaluru, India
                  </p>

                  <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-around">
                    {[
                      { value: "8.41", label: "CGPA" },
                      { value: "5+", label: "Projects" },
                      { value: "200+", label: "DSA Solved" },
                    ].map((item) => (
                      <div key={item.label} className="text-center">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {item.value}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
