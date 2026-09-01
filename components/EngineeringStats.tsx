"use client";

import React, { useState, useEffect } from "react";
import {
  Github,
  Flame,
  ArrowUpRight,
  FolderGit2,
  RefreshCw,
} from "lucide-react";
import { motion } from "framer-motion";

interface StatsData {
  github: {
    public_repos: number;
    followers: number;
    languages: Array<{ name: string; percentage: number; color: string }>;
    recent_repos: Array<{
      name: string;
      language: string;
      description: string;
      url: string;
    }>;
  };
  leetcode: {
    total_solved: number;
    target: number;
    breakdown: {
      easy: { count: number; total: number; label: string; color: string; bg: string };
      medium: { count: number; total: number; label: string; color: string; bg: string };
      hard: { count: number; total: number; label: string; color: string; bg: string };
    };
    categories: Array<{ name: string; solved: number; progress: number }>;
    primary_lang: string;
    ranking_percentile: string;
  };
  timestamp: string;
}

const defaultStats: StatsData = {
  github: {
    public_repos: 22,
    followers: 3,
    languages: [
      { name: "Java", percentage: 42, color: "#f89820" },
      { name: "JavaScript / Node", percentage: 32, color: "#f7df1e" },
      { name: "Python", percentage: 16, color: "#3776ab" },
      { name: "TypeScript", percentage: 10, color: "#3178c6" },
    ],
    recent_repos: [
      {
        name: "Autonomous-Vehicle",
        language: "Python",
        description: "End-to-end perception & deep autoencoder simulation in CARLA",
        url: "https://github.com/kushwith03/Autonomous-Vehicle",
      },
      {
        name: "ai-resume-builder",
        language: "JavaScript",
        description: "Dynamic AI resume generator with Gemini API & PDF export",
        url: "https://github.com/kushwith03/ai-resume-builder",
      },
      {
        name: "blogspace",
        language: "Node.js",
        description: "MVC-based REST API platform with PostgreSQL & JWT auth",
        url: "https://github.com/kushwith03/blogspace",
      },
      {
        name: "portfolio",
        language: "TypeScript",
        description: "Production Next.js 14 engineering showcase & AI assistant",
        url: "https://github.com/kushwith03/portfolio",
      },
    ],
  },
  leetcode: {
    total_solved: 252,
    target: 300,
    breakdown: {
      easy: { count: 112, total: 850, label: "Easy", color: "text-emerald-400", bg: "bg-emerald-500" },
      medium: { count: 126, total: 1750, label: "Medium", color: "text-amber-400", bg: "bg-amber-500" },
      hard: { count: 14, total: 750, label: "Hard", color: "text-rose-400", bg: "bg-rose-500" },
    },
    categories: [
      { name: "Arrays & Hashing (Java)", solved: 64, progress: 92 },
      { name: "Binary Trees & Graphs", solved: 52, progress: 84 },
      { name: "Two Pointers & Binary Search", solved: 48, progress: 88 },
      { name: "Dynamic Programming", solved: 42, progress: 78 },
      { name: "Stacks, Queues & Heaps", solved: 46, progress: 85 },
    ],
    primary_lang: "Java (JDK 17/21)",
    ranking_percentile: "Top 18%",
  },
  timestamp: new Date().toISOString(),
};

const EngineeringStats: React.FC = () => {
  const [stats, setStats] = useState<StatsData>(defaultStats);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/stats");
      if (res.ok) {
        const data = await res.json();
        if (data.github && data.leetcode) {
          setStats(data);
        }
      }
    } catch {
      // Graceful fallback to defaultStats
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <section
      id="engineering-stats"
      className="py-20 bg-[#f8fafc] dark:bg-[#030712] transition-colors duration-300 relative overflow-hidden"
    >
      {/* Ambient glow backgrounds */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-sky-500/5 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/[0.04] dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.1] text-sky-600 dark:text-sky-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Live Activity &amp; Problem Solving</span>
            <button
              onClick={fetchStats}
              title="Refresh Live Metrics"
              className="ml-1 p-0.5 hover:text-sky-400 transition-colors"
            >
              <RefreshCw className={`h-3 w-3 ${isLoading ? "animate-spin text-sky-400" : ""}`} />
            </button>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Engineering Telemetry
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Real-time activity across GitHub repositories and LeetCode algorithmic benchmarks in Java.
          </p>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT BENTO: GitHub Live Hub (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-white/80 dark:bg-[#070e20]/80 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/[0.09] shadow-xl flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-slate-900 dark:bg-white/[0.08] text-white rounded-2xl border border-slate-800 dark:border-white/[0.1] shadow-sm">
                    <Github className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>GitHub Engineering Activity</span>
                    </h3>
                    <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      @kushwith03 • Open Source & Production Code
                    </p>
                  </div>
                </div>

                <a
                  href="https://github.com/kushwith03"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.05] hover:bg-sky-500/10 dark:hover:bg-sky-500/20 text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 text-xs font-mono transition-all border border-slate-200/80 dark:border-white/[0.08]"
                >
                  <span>Profile</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Quick Metrics Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 my-6">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06]">
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400">Public Repos</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white mt-1 font-mono">
                    {stats.github.public_repos}+
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06]">
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400">Core Language</p>
                  <p className="text-2xl font-black text-amber-500 dark:text-amber-400 mt-1 font-mono">
                    Java
                  </p>
                </div>

                <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06]">
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400">CI/CD Pipeline</p>
                  <p className="text-2xl font-black text-emerald-500 dark:text-emerald-400 mt-1 font-mono flex items-center gap-1.5">
                    <span>100%</span>
                    <span className="text-xs font-normal text-slate-400 font-sans">Automated</span>
                  </p>
                </div>
              </div>

              {/* Language Distribution Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 mb-2">
                  <span>Language Distribution</span>
                  <span>4 Primary Languages</span>
                </div>
                <div className="h-3 w-full rounded-full overflow-hidden flex bg-slate-100 dark:bg-white/[0.06] p-0.5 border border-slate-200 dark:border-white/[0.08]">
                  {stats.github.languages.map((lang) => (
                    <div
                      key={lang.name}
                      style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                      className="h-full first:rounded-l-full last:rounded-r-full transition-all duration-500"
                      title={`${lang.name}: ${lang.percentage}%`}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 mt-2.5">
                  {stats.github.languages.map((lang) => (
                    <div key={lang.name} className="flex items-center gap-1.5 text-xs font-mono">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: lang.color }}
                      />
                      <span className="text-slate-700 dark:text-slate-300 font-medium">
                        {lang.name}
                      </span>
                      <span className="text-slate-400">{lang.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Repositories Spotlight */}
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                  <FolderGit2 className="h-3.5 w-3.5 text-sky-400" />
                  <span>Pinned Repositories</span>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {stats.github.recent_repos.map((repo) => (
                    <a
                      key={repo.name}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-white/[0.06] border border-slate-200/80 dark:border-white/[0.06] hover:border-sky-400/40 transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-xs text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                          {repo.name}
                        </span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-sky-400 transition-colors" />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                        {repo.description}
                      </p>
                      <span className="inline-block mt-2 px-2 py-0.5 text-[10px] font-mono rounded-md bg-slate-200/60 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300">
                        {repo.language}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT BENTO: LeetCode DSA Benchmark (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 bg-white/80 dark:bg-[#070e20]/80 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/[0.09] shadow-xl flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-500/10 dark:bg-amber-500/20 text-amber-500 dark:text-amber-400 rounded-2xl border border-amber-500/20 shadow-sm">
                    <Flame className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>LeetCode DSA Mastery</span>
                    </h3>
                    <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      Primary Logic Language: {stats.leetcode.primary_lang}
                    </p>
                  </div>
                </div>
              </div>

              {/* Total Solved Hero Banner */}
              <div className="my-6 p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-indigo-500/5 to-purple-500/10 border border-amber-500/20 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Total Solved
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl font-extrabold text-slate-900 dark:text-white font-mono">
                      {stats.leetcode.total_solved}+
                    </span>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      DSA Problems
                    </span>
                  </div>
                </div>
                <div className="text-right font-mono">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-500/30">
                    {stats.leetcode.ranking_percentile}
                  </span>
                </div>
              </div>

              {/* Difficulty Badges */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06] text-center">
                  <p className="text-xs font-mono font-bold text-emerald-500 dark:text-emerald-400">Easy</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white font-mono mt-0.5">
                    {stats.leetcode.breakdown.easy.count}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06] text-center">
                  <p className="text-xs font-mono font-bold text-amber-500 dark:text-amber-400">Medium</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white font-mono mt-0.5">
                    {stats.leetcode.breakdown.medium.count}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06] text-center">
                  <p className="text-xs font-mono font-bold text-rose-500 dark:text-rose-400">Hard</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white font-mono mt-0.5">
                    {stats.leetcode.breakdown.hard.count}
                  </p>
                </div>
              </div>

              {/* Topic Mastery Progress Bars */}
              <div className="space-y-3.5">
                <p className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Topic Proficiency
                </p>

                {stats.leetcode.categories.map((cat) => (
                  <div key={cat.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-700 dark:text-slate-300 font-medium">{cat.name}</span>
                      <span className="text-sky-500 dark:text-sky-400 font-bold">{cat.solved} Solved</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-white/[0.06] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${cat.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-sky-400 via-indigo-500 to-amber-400 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default EngineeringStats;
