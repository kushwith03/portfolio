"use client";

import { useStore } from "@/lib/store";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const EXPERIENCES = [
  {
    role: "Full-Stack SWE Intern",
    company: "ATSPL",
    time: "Jan 2026 — Apr 2026",
    desc: "Shipped production React, Node, and PostgreSQL features. Designed optimized relational schemas, REST APIs, and automated CI/CD workflows."
  },
  {
    role: "Autonomous Systems Builder",
    company: "Research & Simulation",
    time: "Aug 2025 — Feb 2026",
    desc: "Engineering end-to-end autonomous driving pipelines and steering prediction systems within high-fidelity simulation environments."
  },
  {
    role: "CSE (Data Science)",
    company: "RNSIT",
    time: "Expected May 2026",
    desc: "Focus on Systems Architecture, DBMS, and Machine Learning. Building a foundation in production-ready digital products."
  }
];

export default function Experience() {
  const activeScene = useStore((state) => state.activeScene);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeScene === 2) {
      gsap.to(containerRef.current, { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, ease: "power3.out" });
    } else {
      gsap.to(containerRef.current, { opacity: 0, filter: "blur(10px)", y: 20, duration: 0.5 });
    }
  }, [activeScene]);

  return (
    <section className="fixed inset-0 pointer-events-none z-10 flex items-center justify-center px-6 md:px-24">
      <div 
        ref={containerRef} 
        className="max-w-5xl w-full flex flex-col gap-12 opacity-0 translate-y-5 filter blur-md"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-[0.6em] text-cyan-400 font-black">Timeline // Heritage</span>
            <div className="h-px w-12 bg-cyan-400/20" />
          </div>
          <h2 className="text-5xl md:text-8xl font-black uppercase leading-none tracking-tighter text-white">
            Experience.
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {EXPERIENCES.map((exp, i) => (
            <div key={i} className="flex flex-col gap-6 group pointer-events-auto cursor-default">
              <div className="flex flex-col gap-1">
                <span className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-bold">{exp.time}</span>
                <h4 className="text-white font-black tracking-widest uppercase text-sm group-hover:text-cyan-400 transition-colors">{exp.role}</h4>
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black italic">{exp.company}</span>
              </div>
              <p className="text-white/30 text-xs md:text-sm leading-relaxed font-light group-hover:text-white/60 transition-colors border-l border-white/10 pl-4">
                {exp.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
