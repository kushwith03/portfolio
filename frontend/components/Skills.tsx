"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SkillsData } from "../app/types";
import { Cpu, Layout, Server, Database, Wrench, Award } from "lucide-react";

const Skills: React.FC = () => {
  const [skillsData, setSkillsData] = useState<SkillsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(
          "https://portfolio-5ms7.onrender.com/api/skills"
        );

        if (!response.ok) throw new Error("Failed to fetch");
        const result = await response.json();
        setSkillsData(result.data);
      } catch (err) {
        setError("Failed to load skills.");
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const icons: Record<string, any> = {
    Languages: Cpu,
    Frontend: Layout,
    Backend: Server,
    "DB & Cloud": Database,
    Tools: Wrench,
  };

  if (loading)
    return (
      <div className="py-20 flex justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  if (error || !skillsData) return null;

  const { technical, achievements } = skillsData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="skills"
      className="py-24 bg-gray-50 dark:bg-gray-950 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {Object.entries(technical).map(([category, skills]) => {
            // Map backend keys to display titles
            const titles: Record<string, string> = {
              languages: "Languages",
              frontend: "Frontend",
              backend: "Backend",
              db_cloud: "DB & Cloud",
              tools: "Tools",
            };
            const displayTitle = titles[category] || category;
            const Icon = icons[displayTitle] || Cpu;

            return (
              <motion.div
                key={category}
                variants={cardVariants}
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
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

        {/* Achievements Section */}
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
                whileHover={{ scale: 1.02 }}
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
