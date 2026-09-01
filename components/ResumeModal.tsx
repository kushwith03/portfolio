"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  FileDown,
  ExternalLink,
  Copy,
  Check,
  Printer,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Code2,
  Calendar,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import skillsData from "../lib/data/skills.json";
import projectsData from "../lib/data/projects.json";

const GOOGLE_DRIVE_VIEW_URL =
  "https://drive.google.com/file/d/1KIrah5JSk8Qcujq6jZp00YOJRz4Y-BCQ/view?usp=sharing";
const GOOGLE_DRIVE_PREVIEW_URL =
  "https://drive.google.com/file/d/1KIrah5JSk8Qcujq6jZp00YOJRz4Y-BCQ/preview";

const plainTextResume = `===============================================================
R KHUSHWITH KUMAR — SOFTWARE ENGINEER
Bengaluru, Karnataka, India | kushwith03@gmail.com
GitHub: https://github.com/kushwith03 | LinkedIn: https://www.linkedin.com/in/kushwith03/
===============================================================

EDUCATION:
- B.E. in Computer Science & Engineering (Data Science)
  RNS Institute of Technology (RNSIT), Bengaluru, India
  Graduation: May 2026 | CGPA: 8.6 / 10.0

TECHNICAL SKILLS:
- Primary Languages: Java (Core & OOP), Node.js, JavaScript (ES6+), Python, SQL, C++
- Backend & Systems: Express.js, RESTful APIs, PostgreSQL, JWT Auth, MVC Pattern, Microservices
- Databases & Cloud: PostgreSQL, MongoDB, MySQL, AWS S3, CloudFront, Cloudflare CDN, GitHub Actions CI/CD, Docker
- Problem Solving: 250+ LeetCode DSA Problems Solved in Java (Arrays, DP, Graphs, Trees)
- Frontend & Tools: HTML5, CSS3, Tailwind CSS, React.js, Git, Postman, Linux CLI

EXPERIENCE:
- Software Engineering Intern — Backend & Full-Stack
  ATSPL (Angadi Technological Solution Private Limited) | Jan 2026 - May 2026 | Bengaluru, India
  * Engineered robust RESTful APIs and designed relational database schemas in PostgreSQL.
  * Automated deployment and testing pipelines with GitHub Actions CI/CD workflows.
  * Managed asset delivery and frontend caching with AWS S3, CloudFront, and Cloudflare CDN.
  * Implemented reliable transactional email delivery systems via Zoho ZeptoMail.
  * Ported core web workflows into cross-platform desktop applications using Electron.js.

KEY PROJECTS:
1. Autonomous Vehicle Simulation (Aug 2025 - Feb 2026)
   - Built an end-to-end autonomous driving perception pipeline using PyTorch & CARLA Simulator.
   - Trained a deep autoencoder on ~8,000 frames from Cityscapes and CARLA datasets, achieving sub-50ms inference.
   - Applied behavioral cloning via CNN-based models for steering and throttle prediction.

2. InstaResume — AI Resume Generator (Mar 2025 - Jul 2025)
   - Built a dynamic live-preview resume generator with React Hook Form and Google Gemini AI API.
   - Integrated client-side PDF export via @react-pdf/renderer.

3. BlogSpace — Full-Stack Blog Platform (Nov 2024 - Jan 2025)
   - Built RESTful APIs using MVC architecture, PostgreSQL, and JWT authentication.

CERTIFICATIONS:
- Microsoft Certified: Azure AI Fundamentals (AI-900)
- Microsoft Certified: Azure Data Fundamentals (DP-900)
===============================================================`;

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const openResumeModal = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-resume-modal"));
  }
};

const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"ats" | "pdf">("ats");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(plainTextResume);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handlePrint = () => {
    window.open(GOOGLE_DRIVE_VIEW_URL, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#070e20] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/[0.12] flex flex-col overflow-hidden z-10"
          >
            {/* Header Bar */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 dark:from-[#050914] dark:to-[#0b142b] border-b border-white/[0.08] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-400/30">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-white tracking-tight">
                    R Khushwith Kumar — Resume / CV
                  </h3>
                  <p className="text-xs font-mono text-slate-300">
                    B.E. CSE (Data Science) • ATSPL Software Engineer Intern
                  </p>
                </div>
              </div>

              {/* Tab Switcher & Quick Actions */}
              <div className="flex items-center gap-2">
                <div className="flex bg-black/30 p-1 rounded-xl border border-white/10 text-xs font-mono">
                  <button
                    onClick={() => setActiveTab("ats")}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      activeTab === "ats"
                        ? "bg-sky-500 text-white font-semibold shadow-sm"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    ATS Breakdown
                  </button>
                  <button
                    onClick={() => setActiveTab("pdf")}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      activeTab === "pdf"
                        ? "bg-sky-500 text-white font-semibold shadow-sm"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    PDF Preview
                  </button>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-all ml-1"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Action Buttons Toolbar */}
            <div className="px-5 py-3 bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/[0.06] flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <a
                  href={GOOGLE_DRIVE_VIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-semibold shadow-sm shadow-sky-500/20 transition-all font-mono"
                >
                  <FileDown className="h-3.5 w-3.5" />
                  <span>Download / Open PDF</span>
                </a>

                <button
                  onClick={handleCopyText}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white dark:bg-white/[0.06] hover:bg-slate-100 dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/[0.08] text-xs font-mono transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-500 dark:text-emerald-400 font-semibold">
                        Copied ATS Text!
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-sky-400" />
                      <span>Copy ATS Text</span>
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={handlePrint}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Google Drive Link</span>
                <ExternalLink className="h-3 w-3 ml-0.5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 bg-[#f8fafc] dark:bg-[#040814] space-y-8">
              {activeTab === "ats" ? (
                /* ATS Structured Breakdown */
                <div className="space-y-8 max-w-3xl mx-auto">
                  {/* Summary Card */}
                  <div className="p-6 bg-white dark:bg-[#070e20] rounded-2xl border border-slate-200 dark:border-white/[0.08] shadow-sm">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                      <span>R Khushwith Kumar</span>
                      <span className="px-2 py-0.5 text-xs font-mono font-medium rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        Available for Roles
                      </span>
                    </h4>
                    <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-3">
                      Bengaluru, Karnataka, India • kushwith03@gmail.com • 8.6 CGPA
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Software Engineer with a B.E. in Computer Science & Data Science from RNSIT. Strong foundation in <strong>Java</strong>, <strong>Node.js / Express</strong>, <strong>PostgreSQL</strong> relational databases, and 250+ LeetCode DSA problem solving. Shipped production features and CI/CD pipelines during an internship at ATSPL.
                    </p>
                  </div>

                  {/* Experience Section */}
                  <div>
                    <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-4 flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      <span>Work Experience</span>
                    </h4>

                    <div className="space-y-4">
                      {skillsData.experience.map((exp, idx) => (
                        <div
                          key={idx}
                          className="p-5 bg-white dark:bg-[#070e20] rounded-2xl border border-slate-200 dark:border-white/[0.08] shadow-sm"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
                            <div>
                              <h5 className="font-bold text-slate-900 dark:text-white text-base">
                                {exp.role}
                              </h5>
                              <p className="text-xs font-mono text-sky-600 dark:text-sky-400">
                                {exp.company}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" /> {exp.period}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" /> {exp.location}
                              </span>
                            </div>
                          </div>

                          <ul className="mt-3 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                            {exp.details.map((bullet, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Projects Section */}
                  <div>
                    <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-4 flex items-center gap-2">
                      <Code2 className="h-4 w-4" />
                      <span>Featured Engineering Projects</span>
                    </h4>

                    <div className="space-y-4">
                      {projectsData.map((proj) => (
                        <div
                          key={proj.id}
                          className="p-5 bg-white dark:bg-[#070e20] rounded-2xl border border-slate-200 dark:border-white/[0.08] shadow-sm"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-100 dark:border-white/[0.06]">
                            <h5 className="font-bold text-slate-900 dark:text-white text-base">
                              {proj.title}
                            </h5>
                            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                              {proj.timeline}
                            </span>
                          </div>
                          <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            {proj.description}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {proj.tags.map((t) => (
                              <span
                                key={t}
                                className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/[0.06]"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education & Certifications */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 bg-white dark:bg-[#070e20] rounded-2xl border border-slate-200 dark:border-white/[0.08] shadow-sm">
                      <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-3 flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        <span>Education</span>
                      </h4>
                      <h5 className="font-bold text-slate-900 dark:text-white text-sm">
                        {skillsData.education.institution}
                      </h5>
                      <p className="text-xs text-sky-600 dark:text-sky-400 font-mono mt-0.5">
                        {skillsData.education.degree}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">
                        CGPA: {skillsData.education.cgpa} • {skillsData.education.timeline}
                      </p>
                    </div>

                    <div className="p-5 bg-white dark:bg-[#070e20] rounded-2xl border border-slate-200 dark:border-white/[0.08] shadow-sm">
                      <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-amber-500 dark:text-amber-400 mb-3 flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        <span>Certifications & Stats</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                        <li>• <strong>250+ LeetCode DSA</strong> Solved (Java)</li>
                        <li>• <strong>Microsoft Certified:</strong> Azure AI Fundamentals (AI-900)</li>
                        <li>• <strong>Microsoft Certified:</strong> Azure Data Fundamentals (DP-900)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                /* PDF Document Preview Iframe */
                <div className="w-full h-[650px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.1] relative">
                  <iframe
                    src={GOOGLE_DRIVE_PREVIEW_URL}
                    className="w-full h-full border-0"
                    title="Khushwith Kumar Resume PDF"
                    allow="autoplay"
                  />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;
