"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SkillsData } from "../app/types";
import { Cpu, Layout, Server, Database, Wrench, Award, Briefcase } from "lucide-react";
import skillsDataLocal from "../lib/data/skills.json";

// A more human-readable and maintainable config for skill categories
const categoryConfig: Record<string, { title: string; icon: React.ElementType }> = {
  languages: { title: "Languages", icon: Cpu },
  frontend: { title: "Frontend", icon: Layout },
  backend: { title: "Backend", icon: Server },
  db_cloud: { title: "DB & Cloud", icon: Database },
  tools: { title: "Tools", icon: Wrench },
};

const Skills: React.FC = () => {
  const [skillsData] = useState<SkillsData>(skillsDataLocal as unknown as SkillsData);

  const { technical, achievements, experience } = skillsData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as any },
    },
  };

  return (
    <section
      id="skills"
      className="py-24 bg-gray-50 dark:bg-gray-950 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Experience Section */}
        {experience && experience.length > 0 && (
          <div className="mb-24">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-base text-primary font-bold tracking-wide uppercase">
                History
              </h2>
              <p className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                Professional Journey
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-8">
              {experience.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative pl-8 pb-8 border-l-2 border-primary/20 last:pb-0"
                >
                  <div className="absolute left-[-9px] top-0 w-4 h-4 bg-primary rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.role}</h3>
                        <p className="text-primary font-medium">{exp.company}</p>
                      </div>
                      <div className="text-right md:text-right text-sm">
                        <p className="text-gray-500 dark:text-gray-400 font-medium">{exp.period}</p>
                        <p className="text-gray-400 dark:text-gray-500">{exp.location}</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {exp.details.map((detail, dIdx) => (
                        <li key={dIdx} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                          <span className="text-primary mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-base text-primary font-bold tracking-wide uppercase">
            Expertise
          </h2>
          <p className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            Technical Arsenal
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {Object.entries(technical).map(([category, skills]) => {
            const config = categoryConfig[category];
            const displayTitle = config?.title || category;
            const Icon = config?.icon || Cpu;

            return (
              <motion.div
                key={category}
                variants={cardVariants}
                whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300 } }}
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {displayTitle}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(skills as string[]).map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-md text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-20 pt-10 border-t border-gray-200 dark:border-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Award className="h-6 w-6 text-yellow-500" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Certifications & Wins
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {achievements.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 300 } }}
                className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-purple-600" />
                <p className="font-bold text-lg text-gray-900 dark:text-white">
                  {item.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
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
