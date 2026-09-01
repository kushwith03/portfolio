"use client";

import React, { useState } from "react";
import { Project } from "../app/types";
import { Github, ArrowUpRight, FolderGit2 } from "lucide-react";
import { motion } from "framer-motion";
import projectsData from "../lib/data/projects.json";

const Projects: React.FC = () => {
  const [projects] = useState<Project[]>(projectsData as Project[]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="projects"
      className="py-24 bg-[#f8fafc] dark:bg-[#030712] transition-colors duration-300 relative overflow-hidden"
    >
      {/* Ambient background lighting */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

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
            <FolderGit2 className="h-3.5 w-3.5" />
            <span>Featured Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Production &amp; AI Systems
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Highlighted software platforms, autonomous simulations, and full-stack applications.
          </p>
        </motion.div>

        {/* Project Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300 } }}
              className="group flex flex-col bg-white/80 dark:bg-[#070e20]/80 backdrop-blur-2xl rounded-3xl border border-slate-200 dark:border-white/[0.09] hover:border-sky-400/40 dark:hover:border-sky-400/40 shadow-sm hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 overflow-hidden"
            >
              {/* Card Banner / Visual Header */}
              <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-slate-900 to-indigo-950 p-6 flex flex-col justify-between">
                <div className="absolute inset-0 bg-grid-subtle opacity-30" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

                <div className="relative z-10 flex justify-between items-start">
                  <span className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-full bg-white/[0.1] text-sky-300 border border-white/[0.1] backdrop-blur-md">
                    {project.timeline || "Project"}
                  </span>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/10 hover:bg-sky-500 text-white transition-all backdrop-blur-md border border-white/10"
                      aria-label="View Project"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>

                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-sky-300 transition-colors">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Card Content Body */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {project.description}
                </p>

                <div>
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100 dark:border-white/[0.06]">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-lg bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/[0.08]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.link && (
                    <div className="mt-5 pt-3 flex justify-between items-center text-xs font-mono">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sky-600 dark:text-sky-400 hover:text-sky-500 font-semibold"
                      >
                        <Github className="h-3.5 w-3.5" /> Source Repository
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

