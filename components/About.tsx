"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code, Database } from "lucide-react";

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="about"
      className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="lg:grid lg:grid-cols-2 lg:gap-16 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="mb-12 lg:mb-0 relative">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl opacity-60" />

            <motion.h2
              variants={itemVariants}
              className="text-base text-primary font-bold tracking-wide uppercase mb-2"
            >
              About Me
            </motion.h2>

            <motion.h3
              variants={itemVariants}
              className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6"
            >
              Driven by Curiosity, <br />
              Built Through Practice.
            </motion.h3>

            <motion.div
              variants={itemVariants}
              className="relative z-10 bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                  <Code className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    Full Stack Engineering
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Designing and building complete web applications end to end.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                  <Database className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    Backend & Databases
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Working with APIs, databases, and backend logic to build
                    reliable systems.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            <motion.p variants={itemVariants}>
              I am a <strong>Computer Science & Engineering (Data Science)</strong> graduate from <strong>RNS Institute of Technology</strong> with a strong foundation in full-stack development and scalable systems.
            </motion.p>

            <motion.p variants={itemVariants}>
              My expertise lies in building <strong>production-ready web applications</strong> using the <strong>MERN stack</strong> and <strong>PostgreSQL</strong>. I have hands-on experience designing RESTful APIs, implementing secure authentication flows, and managing cloud deployments.
            </motion.p>

            <motion.p variants={itemVariants}>
              I am driven by a passion for solving complex technical challenges. Having solved over <strong>250+ LeetCode problems</strong>, I bring a disciplined, algorithmic approach to writing clean and maintainable code. My goal is to build digital products that are not only functional but also scalable and user-centric.
            </motion.p>

            <motion.div variants={itemVariants} className="pt-4">
              <a
                href="#contact"
                className="inline-flex items-center text-primary font-semibold hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
              >
                Let’s discuss my work <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
