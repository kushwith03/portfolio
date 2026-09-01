"use client";

import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  FileDown,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const Hero: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "code">("profile");

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center bg-[#f8fafc] dark:bg-[#030712] overflow-hidden bg-grid-subtle transition-colors duration-300 pt-20 pb-16"
    >
      {/* Ambient Iridescent Lighting Mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] right-[-10%] w-[650px] h-[650px] bg-sky-400/[0.05] dark:bg-sky-500/[0.12] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-[25%] left-[-15%] w-[550px] h-[550px] bg-indigo-400/[0.04] dark:bg-indigo-600/[0.1] rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[20%] w-[450px] h-[450px] bg-purple-400/[0.04] dark:bg-purple-600/[0.08] rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left Column: Headline, Bio & Primary CTAs */}
          <motion.div
            className="md:max-w-2xl md:mx-auto lg:col-span-7 lg:text-left relative z-20 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Status Pill Badge */}
            <motion.div variants={itemVariants} className="inline-block">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-white/[0.05] border border-slate-200/90 dark:border-white/[0.1] text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-medium shadow-sm backdrop-blur-xl">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-mono text-xs tracking-tight">Available for Software Roles</span>
                <span className="text-slate-400 dark:text-slate-600">•</span>
                <span className="text-sky-600 dark:text-sky-400 text-xs font-semibold">Bengaluru, IN</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="mt-6 text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08]"
            >
              <span>Hi, I&apos;m </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 dark:from-sky-400 dark:via-indigo-400 dark:to-purple-400">
                Khushwith
              </span>
              <div className="mt-2 text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold font-mono">
                <span className="text-sky-600 dark:text-sky-400">
                  <TypeAnimation
                    sequence={[
                      "Full-Stack Engineer",
                      1400,
                      "Backend Architect",
                      1400,
                      "AI & CARLA Simulation Builder",
                      1400,
                      "Problem Solver (250+ DSA)",
                      1400,
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
              className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              Computer Science & Data Science graduate from <strong>RNSIT (8.6 CGPA)</strong>. Specialized in architecting scalable MERN & PostgreSQL web applications, low-latency microservices, and deep learning autonomous vehicle pipelines.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start items-center"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 rounded-xl shadow-lg shadow-sky-500/20 transition-all group border border-sky-400/30"
              >
                <span>View Featured Projects</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.a>

              <motion.a
                href="https://drive.google.com/file/d/1rwW-rMO64I4ZwNR4NbUCu5IDRmCElqGf/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white/80 dark:bg-white/[0.06] hover:bg-slate-100 dark:hover:bg-white/[0.1] border border-slate-300/80 dark:border-white/[0.12] rounded-xl transition-all shadow-sm backdrop-blur-xl group"
              >
                <FileDown className="mr-2 h-4 w-4 text-sky-500 dark:text-sky-400 group-hover:scale-110 transition-transform" />
                <span>Resume / CV</span>
              </motion.a>
            </motion.div>

            {/* Social Proof & Quick Repositories */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-6 border-t border-slate-200/80 dark:border-white/[0.08]"
            >
              <a
                href="https://github.com/kushwith03"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100/80 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-white transition-all border border-slate-200/80 dark:border-white/[0.06] text-xs font-mono"
              >
                <Github className="h-4 w-4 text-sky-400" />
                <span>github/kushwith03</span>
              </a>

              <a
                href="https://www.linkedin.com/in/kushwith03/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100/80 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-white transition-all border border-slate-200/80 dark:border-white/[0.06] text-xs font-mono"
              >
                <Linkedin className="h-4 w-4 text-sky-400" />
                <span>linkedin/kushwith03</span>
              </a>

              <a
                href="mailto:kushwith03@gmail.com"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100/80 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-white transition-all border border-slate-200/80 dark:border-white/[0.06] text-xs font-mono"
              >
                <Mail className="h-4 w-4 text-sky-400" />
                <span>kushwith03@gmail.com</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Developer Terminal & Bento Card */}
          <motion.div
            className="mt-14 lg:mt-0 lg:col-span-5 relative flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {/* Ambient Spotlight */}
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/20 via-indigo-500/20 to-purple-500/20 rounded-3xl blur-2xl transform rotate-2 pointer-events-none" />

            {/* Terminal Container */}
            <div className="relative w-full max-w-md bg-white/90 dark:bg-[#070e20]/90 backdrop-blur-2xl rounded-3xl border border-slate-200 dark:border-white/[0.12] shadow-2xl overflow-hidden">
              
              {/* Terminal Header Tabs */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-100/80 dark:bg-white/[0.03] border-b border-slate-200 dark:border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>

                <div className="flex items-center gap-1 bg-slate-200/60 dark:bg-white/[0.06] p-1 rounded-lg">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-medium transition-all ${
                      activeTab === "profile"
                        ? "bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    profile.json
                  </button>
                  <button
                    onClick={() => setActiveTab("code")}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-medium transition-all ${
                      activeTab === "code"
                        ? "bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    stack.ts
                  </button>
                </div>
              </div>

              {/* Terminal Tab Content */}
              {activeTab === "profile" ? (
                <div className="p-6">
                  {/* Avatar + Info */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-sky-400/40 shadow-lg shadow-sky-500/20 flex-shrink-0">
                      <Image
                        src="/profile.jpg"
                        alt="R Khushwith Kumar"
                        fill
                        className="object-cover object-top"
                        priority
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                          Khushwith Kumar
                        </h3>
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500" title="Online" />
                      </div>
                      <p className="text-xs font-mono text-sky-600 dark:text-sky-400 mt-0.5">
                        Software Engineer @ ATSPL Intern
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        B.E. CSE (Data Science) • RNSIT
                      </p>
                    </div>
                  </div>

                  {/* Highlight Stat Grid */}
                  <div className="mt-6 grid grid-cols-3 gap-2.5 text-center">
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06]">
                      <p className="text-lg font-bold font-mono text-sky-500 dark:text-sky-400">
                        8.6
                      </p>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                        CGPA
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06]">
                      <p className="text-lg font-bold font-mono text-indigo-500 dark:text-indigo-400">
                        250+
                      </p>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                        DSA Solved
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06]">
                      <p className="text-lg font-bold font-mono text-emerald-500 dark:text-emerald-400">
                        ATSPL
                      </p>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                        Production
                      </p>
                    </div>
                  </div>

                  {/* Core Architecture Badges */}
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/[0.06] flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-300 border border-sky-500/20">
                      React / Next.js 14
                    </span>
                    <span className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
                      Node / PostgreSQL
                    </span>
                    <span className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20">
                      PyTorch / CV
                    </span>
                    <span className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20">
                      AWS S3 & Cloudflare
                    </span>
                  </div>
                </div>
              ) : (
                /* Code Snippet Tab */
                <div className="p-5 font-mono text-xs text-slate-800 dark:text-slate-200 space-y-2 overflow-x-auto">
                  <div className="text-slate-400 dark:text-slate-500">{"// System Architecture Spec"}</div>
                  <div>
                    <span className="text-purple-500 dark:text-purple-400">const</span>{" "}
                    <span className="text-sky-500 dark:text-sky-400">engineer</span> = &#123;
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-600 dark:text-slate-400">name:</span>{" "}
                    <span className="text-emerald-500 dark:text-emerald-400">&quot;R Khushwith Kumar&quot;</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-600 dark:text-slate-400">focus:</span>{" "}
                    <span className="text-emerald-500 dark:text-emerald-400">&quot;Full-Stack &amp; Scalable Systems&quot;</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-600 dark:text-slate-400">coreStack:</span> [
                    <span className="text-amber-500 dark:text-amber-400">&quot;React&quot;</span>,{" "}
                    <span className="text-amber-500 dark:text-amber-400">&quot;Next.js&quot;</span>,{" "}
                    <span className="text-amber-500 dark:text-amber-400">&quot;Node.js&quot;</span>,{" "}
                    <span className="text-amber-500 dark:text-amber-400">&quot;PostgreSQL&quot;</span>],
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-600 dark:text-slate-400">aiMlStack:</span> [
                    <span className="text-amber-500 dark:text-amber-400">&quot;PyTorch&quot;</span>,{" "}
                    <span className="text-amber-500 dark:text-amber-400">&quot;CARLA Simulator&quot;</span>],
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-600 dark:text-slate-400">metrics:</span> &#123;{" "}
                    <span className="text-sky-400">dsaSolved:</span> 250+,{" "}
                    <span className="text-sky-400">cgpa:</span> 8.6 &#125;,
                  </div>
                  <div>&#125;;</div>
                </div>
              )}

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;


