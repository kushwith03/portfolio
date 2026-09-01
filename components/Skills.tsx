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
} from "lucide-react";
import skillsDataLocal from "../lib/data/skills.json";

const categoryConfig: Record<
  string,
  { title: string; icon: React.ElementType; color: string; bg: string }
> = {
  languages: {
    title: "Languages",
    icon: Code2,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/50",
  },
  frontend: {
    title: "Frontend Engineering",
    icon: Layout,
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/50",
  },
  backend: {
    title: "Backend & Systems",
    icon: Server,
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800/50",
  },
  db_cloud: {
    title: "Database & Cloud / DevOps",
    icon: Database,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/50",
  },
  tools: {
    title: "Tools & Workflow",
    icon: Wrench,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/50",
  },
};

const Skills: React.FC = () => {
  const [skillsData] = useState<SkillsData>(
    skillsDataLocal as unknown as SkillsData
  );

  const { technical, achievements, experience } = skillsData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as any },
    },
  };

  return (
    <section
      id="skills"
      className="py-24 bg-white dark:bg-[#070b14] transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 text-primary dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
                <Briefcase className="h-3.5 w-3.5" />
                <span>Experience</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
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
                  className="relative p-6 sm:p-8 bg-white/70 dark:bg-[#0d1322]/70 glass-card rounded-3xl border border-gray-200/80 dark:border-gray-800 shadow-md hover:shadow-xl transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-gray-800">
                    <div>
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                        Production Internship
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-2">
                        {exp.role}
                      </h3>
                      <p className="text-base font-semibold text-primary">
                        {exp.company}
                      </p>
                    </div>

                    <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      <span className="inline-flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800/80 px-3 py-1 rounded-lg">
                        <Calendar className="h-3.5 w-3.5 text-primary" /> {exp.period}
                      </span>
                      <span className="inline-flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800/80 px-3 py-1 rounded-lg">
                        <MapPin className="h-3.5 w-3.5 text-primary" /> {exp.location}
                      </span>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {exp.details.map((detail, dIdx) => (
                      <li
                        key={dIdx}
                        className="text-sm sm:text-base text-gray-600 dark:text-gray-300 flex items-start gap-3"
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

        {/* Technical Arsenal / Bento Grid */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 text-primary dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Skills & Technologies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Technical Arsenal
          </h2>
          <p className="mt-3 text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Tools, frameworks, and languages I use to build scalable production applications.
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
              color: "text-primary",
              bg: "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/50",
            };
            const Icon = config.icon;

            return (
              <motion.div
                key={category}
                variants={cardVariants}
                whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
                className="bg-white/70 dark:bg-[#0d1322]/70 glass-card p-6 sm:p-7 rounded-3xl border border-gray-200/80 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-5">
                    <div
                      className={`p-3 rounded-2xl ${config.bg} ${config.color} border shadow-sm group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                      {config.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {(skills as string[]).map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800/70 text-gray-700 dark:text-gray-200 border border-gray-200/80 dark:border-gray-700/80 rounded-xl text-xs sm:text-sm font-medium hover:border-primary/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all"
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

        {/* Certifications & Achievements */}
        <motion.div
          className="mt-20 pt-12 border-t border-gray-200 dark:border-gray-800/80"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center space-x-2 mb-10">
            <Award className="h-6 w-6 text-amber-500" />
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
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
                className="p-6 bg-white/70 dark:bg-[#0d1322]/70 glass-card rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-sm relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-80 group-hover:h-1.5 transition-all" />
                <p className="font-bold text-lg text-gray-900 dark:text-white mt-1">
                  {item.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
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

