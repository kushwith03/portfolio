"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SkillsData } from "../app/types";
import {
  Code2,
  Layout,
  Server,
  Database,
  Wrench,
  Award,
  Briefcase,
  Sparkles,
  Calendar,
  MapPin,
  CheckCircle2,
  Cpu,
} from "lucide-react";
import skillsDataLocal from "../lib/data/skills.json";

const categoryConfig: Record<
  string,
  { title: string; icon: React.ElementType; color: string; badge: string }
> = {
  languages: {
    title: "Programming Languages",
    icon: Code2,
    color: "text-sky-400",
    badge: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  },
  frontend: {
    title: "Frontend Engineering",
    icon: Layout,
    color: "text-indigo-400",
    badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  },
  backend: {
    title: "Backend & Systems",
    icon: Server,
    color: "text-purple-400",
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  db_cloud: {
    title: "Databases & Cloud / DevOps",
    icon: Database,
    color: "text-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  tools: {
    title: "Developer Tools & Workflow",
    icon: Wrench,
    color: "text-amber-400",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
};

const Skills: React.FC = () => {
  const [skillsData] = useState<SkillsData>(
    skillsDataLocal as unknown as SkillsData
  );

  const { technical, achievements, experience } = skillsData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="skills"
      className="py-24 bg-[#fafafa] dark:bg-[#050914] transition-colors duration-300 relative overflow-hidden"
    >
      {/* Ambient background lighting */}
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-sky-500/5 dark:bg-sky-500/[0.08] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Experience Section */}
        {experience && experience.length > 0 && (
          <div className="mb-24">
            <motion.div
              className="text-center mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/[0.04] dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.1] text-sky-600 dark:text-sky-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
                <Briefcase className="h-3.5 w-3.5" />
                <span>Work Experience</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Professional Journey
              </h2>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-8">
              {experience.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative p-6 sm:p-8 bg-white/90 dark:bg-[#070e20]/90 backdrop-blur-2xl rounded-3xl border border-slate-200 dark:border-white/[0.1] shadow-xl"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-white/[0.08]">
                    <div>
                      <span className="px-3 py-1 text-xs font-mono font-semibold rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                        Production Internship
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2">
                        {exp.role}
                      </h3>
                      <p className="text-base font-semibold text-sky-600 dark:text-sky-400">
                        {exp.company}
                      </p>
                    </div>

                    <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-mono">
                      <span className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-white/[0.04] px-3 py-1 rounded-lg border border-slate-200 dark:border-white/[0.06]">
                        <Calendar className="h-3.5 w-3.5 text-sky-400" /> {exp.period}
                      </span>
                      <span className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-white/[0.04] px-3 py-1 rounded-lg border border-slate-200 dark:border-white/[0.06]">
                        <MapPin className="h-3.5 w-3.5 text-sky-400" /> {exp.location}
                      </span>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {exp.details.map((detail, dIdx) => (
                      <li
                        key={dIdx}
                        className="text-sm sm:text-base text-slate-600 dark:text-slate-300 flex items-start gap-3"
                      >
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Technical Arsenal Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/[0.04] dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.1] text-sky-600 dark:text-sky-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Cpu className="h-3.5 w-3.5" />
            <span>Core Competencies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Technical Arsenal
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Battle-tested technologies, frameworks, and architecture tools I use in production.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {Object.entries(technical).map(([category, skills]) => {
            const config = categoryConfig[category] || {
              title: category,
              icon: Code2,
              color: "text-sky-400",
              badge: "bg-sky-500/10 text-sky-400 border-sky-500/20",
            };
            const Icon = config.icon;

            return (
              <motion.div
                key={category}
                variants={cardVariants}
                whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
                className="bg-white/80 dark:bg-[#070e20]/80 backdrop-blur-2xl p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-white/[0.09] hover:border-sky-400/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-5">
                    <div
                      className={`p-3 rounded-2xl bg-slate-100 dark:bg-white/[0.05] ${config.color} border border-slate-200 dark:border-white/[0.08] shadow-sm group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                      {config.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {(skills as string[]).map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-slate-100/80 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/[0.06] rounded-xl text-xs font-mono font-medium hover:border-sky-400/40 transition-all"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Certifications & Milestones */}
        <motion.div
          className="mt-20 pt-12 border-t border-slate-200 dark:border-white/[0.08]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center space-x-2 mb-10">
            <Award className="h-6 w-6 text-amber-400" />
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Certifications & Milestones
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {achievements.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{
                  y: -4,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300 },
                }}
                className="p-6 bg-white/80 dark:bg-[#070e20]/80 backdrop-blur-2xl rounded-2xl border border-slate-200 dark:border-white/[0.09] shadow-sm relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 to-indigo-500 opacity-80 group-hover:h-1.5 transition-all" />
                <p className="font-bold text-base sm:text-lg text-slate-900 dark:text-white mt-1">
                  {item.title}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;


