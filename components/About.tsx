"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Database, Cpu, Sparkles, Layers, UserCheck } from "lucide-react";

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section
      id="about"
      className="py-24 bg-[#f8fafc] dark:bg-[#030712] transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-sky-500/5 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="lg:grid lg:grid-cols-12 lg:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Left Column: Headline & Highlight Cards */}
          <div className="lg:col-span-5 mb-12 lg:mb-0">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/[0.04] dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.1] text-sky-600 dark:text-sky-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
              <UserCheck className="h-3.5 w-3.5" />
              <span>Engineering Background</span>
            </motion.div>

            <motion.h3
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6 tracking-tight"
            >
              Driven by Curiosity, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400">
                Built Through Practice.
              </span>
            </motion.h3>

            <div className="space-y-4">
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
                className="bg-white/80 dark:bg-[#070e20]/80 backdrop-blur-2xl p-5 rounded-2xl border border-slate-200 dark:border-white/[0.09] shadow-sm hover:shadow-md transition-all flex items-start gap-4"
              >
                <div className="p-3 bg-sky-500/10 dark:bg-sky-500/15 border border-sky-500/20 rounded-xl text-sky-500 dark:text-sky-400 flex-shrink-0">
                  <Code2 className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    Full-Stack & Systems Engineering
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    Architecting end-to-end web platforms with React, Next.js 14, Node.js, and TypeScript.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
                className="bg-white/80 dark:bg-[#070e20]/80 backdrop-blur-2xl p-5 rounded-2xl border border-slate-200 dark:border-white/[0.09] shadow-sm hover:shadow-md transition-all flex items-start gap-4"
              >
                <div className="p-3 bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/20 rounded-xl text-indigo-500 dark:text-indigo-400 flex-shrink-0">
                  <Database className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    Backend Scale & Relational Data
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    Designing performant REST APIs, PostgreSQL schemas, authentication pipelines, and cloud caching.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Detailed Narrative & Core Focus */}
          <motion.div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            <motion.p variants={itemVariants}>
              I graduated with a <strong>B.E. in Computer Science & Engineering (Data Science)</strong> from <strong>RNS Institute of Technology</strong> with an <strong>8.6 CGPA</strong>. My passion lies in designing software that combines scalable system architecture with exceptional user interfaces.
            </motion.p>

            <motion.p variants={itemVariants}>
              During my Software Engineering Internship at <strong>ATSPL</strong>, I shipped production-level features across full-stack applications, engineered RESTful APIs, optimized relational database schemas in PostgreSQL, and configured automated CI/CD deployment pipelines with AWS and Cloudflare.
            </motion.p>

            <motion.p variants={itemVariants}>
              With over <strong>250+ LeetCode DSA problems solved</strong>, I apply rigorous algorithmic thinking to write clean, modular, and testable code. Whether building AI simulations in PyTorch or full-stack web applications, I bring disciplined engineering practices to every challenge.
            </motion.p>

            {/* Quick Badges */}
            <motion.div variants={itemVariants} className="pt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/[0.06]">
                <Layers className="h-3.5 w-3.5 text-sky-400" /> Modular Architecture
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/[0.06]">
                <Cpu className="h-3.5 w-3.5 text-indigo-400" /> High Performance & Scale
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/[0.06]">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" /> Clean Code & Best Practices
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <a
                href="#contact"
                className="inline-flex items-center font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-500 group transition-colors text-sm font-mono"
              >
                Let’s connect and build together
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1.5" />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;


